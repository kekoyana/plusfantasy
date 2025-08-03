import { useCallback, useEffect } from 'react';
import { GameState, GameLog, PlayerState } from '../types/game';
import { initialEntities } from '../data/initial-entities';
import { calculateUpgradeCost, calculateTotalGoldPerSecond, canAfford, checkUnlockCondition } from '../utils/calculations';
import { useLocalStorage } from './useLocalStorage';

const initialPlayerState: PlayerState = {
  gold: 0,
  clickPower: 1,
  goldPerSecond: 0,
  totalGoldEarned: 0,
  playtime: 0
};

const initialGameState: GameState = {
  player: initialPlayerState,
  entities: initialEntities,
  logs: []
};

export function useGameState() {
  const [gameState, setGameState] = useLocalStorage<GameState>('incremental-fantasy-save', initialGameState);

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newLog: GameLog = {
      id: Date.now().toString(),
      message,
      timestamp: Date.now(),
      type
    };

    setGameState(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs.slice(0, 99)]
    }));
  }, [setGameState]);

  const updateUnlockedEntities = useCallback((state: GameState) => {
    const updatedEntities = state.entities.map(entity => {
      if (!entity.isUnlocked) {
        const shouldUnlock = checkUnlockCondition(
          entity.unlockCondition,
          state.player.gold,
          state.player.totalGoldEarned,
          state.entities
        );
        
        if (shouldUnlock) {
          return { ...entity, isUnlocked: true };
        }
      }
      return entity;
    });

    return { ...state, entities: updatedEntities };
  }, []);

  const clickGold = useCallback(() => {
    setGameState(prev => {
      const goldGained = prev.player.clickPower;
      const newState = {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold + goldGained,
          totalGoldEarned: prev.player.totalGoldEarned + goldGained
        }
      };
      
      return updateUnlockedEntities(newState);
    });
  }, [setGameState, updateUnlockedEntities]);

  const buyEntity = useCallback((entityId: string) => {
    setGameState(prev => {
      const entity = prev.entities.find(e => e.id === entityId);
      if (!entity) return prev;

      const cost = calculateUpgradeCost(entity.baseCost, entity.level);
      
      if (!canAfford(prev.player.gold, cost)) {
        return prev;
      }

      const updatedEntities = prev.entities.map(e => 
        e.id === entityId 
          ? { ...e, level: e.level + 1 }
          : e
      );

      const goldPerSecond = calculateTotalGoldPerSecond(updatedEntities);

      const newState = {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - cost,
          goldPerSecond
        },
        entities: updatedEntities
      };

      const finalState = updateUnlockedEntities(newState);
      
      // ログを新しい状態から取得
      const updatedEntity = finalState.entities.find(e => e.id === entityId);
      if (updatedEntity) {
        setTimeout(() => {
          addLog(`${updatedEntity.name}をレベルアップしました！`, 'success');
        }, 0);
      }

      return finalState;
    });
  }, [setGameState, updateUnlockedEntities, addLog]);

  const upgradeClickPower = useCallback(() => {
    setGameState(prev => {
      const cost = prev.player.clickPower * 10;
      
      if (!canAfford(prev.player.gold, cost)) {
        return prev;
      }

      setTimeout(() => {
        addLog('クリック力がアップしました！', 'success');
      }, 0);

      return {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - cost,
          clickPower: prev.player.clickPower + 1
        }
      };
    });
  }, [setGameState, addLog]);

  const addAutoGold = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        gold: prev.player.gold + amount,
        totalGoldEarned: prev.player.totalGoldEarned + amount
      }
    }));
  }, [setGameState]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    addLog('ゲームをリセットしました。新しい冒険を始めましょう！', 'info');
  }, [setGameState, addLog]);

  useEffect(() => {
    let lastUpdate = Date.now();
    
    const updatePlaytime = () => {
      const now = Date.now();
      const deltaSeconds = (now - lastUpdate) / 1000;
      lastUpdate = now;
      
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          playtime: prev.player.playtime + deltaSeconds
        }
      }));
    };

    const interval = setInterval(updatePlaytime, 5000);
    return () => clearInterval(interval);
  }, [setGameState]);

  return {
    gameState,
    clickGold,
    buyEntity,
    upgradeClickPower,
    addAutoGold,
    addLog,
    resetGame
  };
}