import { useCallback, useEffect } from 'react';
import { GameState, GameLog, PlayerState, TutorialState, GameProgress } from '../types/game';
import { initialEntities } from '../data/initial-entities';
import { calculateUpgradeCost, calculateTotalGoldPerSecond, canAfford, checkUnlockCondition } from '../utils/calculations';
import { useLocalStorage } from './useLocalStorage';

const initialPlayerState: PlayerState = {
  gold: 0,
  clickPower: 1,
  goldPerSecond: 0,
  totalGoldEarned: 0,
  playtime: 0,
  gameStartTime: Date.now()
};

const initialTutorialState: TutorialState = {
  isActive: true,
  currentStep: 0,
  completedSteps: [],
  hasCompletedTutorial: false
};

const initialGameProgress: GameProgress = {
  isGameCleared: false,
  clearTime: null,
  totalEntitiesOwned: 0,
  highestTotalGold: 0,
  hasShownClearScreen: false
};

const initialGameState: GameState = {
  player: initialPlayerState,
  entities: initialEntities,
  logs: [],
  tutorial: initialTutorialState,
  progress: initialGameProgress
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

  // ゲームクリア関連の関数
  const checkGameClear = useCallback((state: GameState) => {
    // クリア条件: 世界樹を建設する（総獲得ゴールド100万以上）
    const hasWorldTree = state.entities.find(e => e.id === 'world_tree' && e.level > 0);
    const hasRequiredGold = state.player.totalGoldEarned >= 1000000;
    
    if (hasWorldTree && hasRequiredGold && !state.progress.hasShownClearScreen) {
      const clearTime = Date.now() - state.player.gameStartTime; // ゲーム開始からの経過時間（ミリ秒）
      const totalEntitiesOwned = state.entities.filter(e => e.level > 0).length;
      
      return {
        ...state,
        progress: {
          ...state.progress,
          isGameCleared: true,
          clearTime,
          totalEntitiesOwned,
          highestTotalGold: Math.max(state.progress.highestTotalGold, state.player.totalGoldEarned),
          hasShownClearScreen: false // 画面表示前なのでfalse
        }
      };
    }
    
    return state;
  }, []);

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

      const unlockedState = updateUnlockedEntities(newState);
      const finalState = checkGameClear(unlockedState);
      
      // ログを新しい状態から取得
      const updatedEntity = finalState.entities.find(e => e.id === entityId);
      if (updatedEntity) {
        setTimeout(() => {
          addLog(`${updatedEntity.name}をレベルアップしました！`, 'success');
          
          // ゲームクリアチェック
          if (finalState.progress.isGameCleared && !prev.progress.isGameCleared) {
            setTimeout(() => {
              addLog('🎉 おめでとうございます！世界樹の建設が完了し、ゲームクリアです！', 'success');
            }, 1000);
          }
        }, 0);
      }

      // 世界樹購入時の特別処理: もう一度クリア判定を実行
      if (entityId === 'world_tree' && finalState.entities.find(e => e.id === 'world_tree')?.level === 1) {
        setTimeout(() => {
          setGameState(current => checkGameClear(current));
        }, 100);
      }

      return finalState;
    });
  }, [setGameState, updateUnlockedEntities, addLog, checkGameClear]);

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
    const newGameState = {
      ...initialGameState,
      player: {
        ...initialPlayerState,
        gameStartTime: Date.now() // リセット時に新しい開始時刻を設定
      }
    };
    setGameState(newGameState);
    addLog('ゲームをリセットしました。新しい冒険を始めましょう！', 'info');
  }, [setGameState, addLog]);

  // チュートリアル関連の関数
  const nextTutorialStep = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      tutorial: {
        ...prev.tutorial,
        currentStep: prev.tutorial.currentStep + 1,
        completedSteps: [...prev.tutorial.completedSteps, `step_${prev.tutorial.currentStep}`]
      }
    }));
  }, [setGameState]);

  const skipTutorial = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      tutorial: {
        ...prev.tutorial,
        isActive: false,
        hasCompletedTutorial: true
      }
    }));
    addLog('チュートリアルをスキップしました。', 'info');
  }, [setGameState, addLog]);

  const completeTutorial = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      tutorial: {
        ...prev.tutorial,
        isActive: false,
        hasCompletedTutorial: true
      }
    }));
    addLog('チュートリアルが完了しました！冒険を楽しんでください！', 'success');
  }, [setGameState, addLog]);

  const continueAfterClear = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        hasShownClearScreen: true // クリア画面を閉じる
      }
    }));
    addLog('クリア後も冒険は続きます！さらなる高みを目指しましょう！', 'info');
  }, [setGameState, addLog]);

  // デバッグ用関数
  const addDebugGold = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        gold: prev.player.gold + amount,
        totalGoldEarned: prev.player.totalGoldEarned + amount
      }
    }));
    addLog(`デバッグ: ${amount}ゴールドを追加しました`, 'info');
  }, [setGameState, addLog]);

  const debugCheckGameState = useCallback(() => {
    // LocalStorageから最新の状態を取得
    const currentGameData = JSON.parse(localStorage.getItem('incremental-fantasy-save') || '{}');
    const worldTree = currentGameData.entities?.find((e: any) => e.id === 'world_tree');
    const hasWorldTree = worldTree && worldTree.level > 0;
    const hasRequiredGold = (currentGameData.player?.totalGoldEarned || 0) >= 1000000;
    
    console.log('=== ゲーム状態デバッグ (最新) ===');
    console.log('世界樹:', worldTree);
    console.log('世界樹レベル > 0:', hasWorldTree);
    console.log('総獲得ゴールド:', currentGameData.player?.totalGoldEarned);
    console.log('ゴールド条件達成:', hasRequiredGold);
    console.log('ゲームクリア状態:', currentGameData.progress?.isGameCleared);
    console.log('クリア画面表示済み:', currentGameData.progress?.hasShownClearScreen);
    console.log('クリア条件達成:', hasWorldTree && hasRequiredGold);
    
    return {
      worldTree,
      hasWorldTree,
      hasRequiredGold,
      isGameCleared: currentGameData.progress?.isGameCleared,
      hasShownClearScreen: currentGameData.progress?.hasShownClearScreen,
      shouldShowClear: hasWorldTree && hasRequiredGold && !currentGameData.progress?.hasShownClearScreen
    };
  }, []);

  const debugResetClearState = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        isGameCleared: false,
        hasShownClearScreen: false
      }
    }));
    addLog('デバッグ: クリア状態をリセットしました', 'info');
  }, [setGameState, addLog]);

  const debugForceGameClear = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        isGameCleared: true,
        hasShownClearScreen: false,
        clearTime: Date.now() - prev.player.gameStartTime,
        totalEntitiesOwned: prev.entities.filter(e => e.level > 0).length,
        highestTotalGold: Math.max(prev.progress.highestTotalGold, prev.player.totalGoldEarned)
      }
    }));
    addLog('デバッグ: ゲームクリア状態を強制設定しました', 'info');
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

  // デバッグ用: グローバルにアクセス可能にする
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).debugAddGold = addDebugGold;
      (window as any).debugCheckGameState = debugCheckGameState;
      (window as any).debugResetClearState = debugResetClearState;
      (window as any).debugForceGameClear = debugForceGameClear;
    }
  }, [addDebugGold, debugCheckGameState, debugResetClearState]);

  return {
    gameState,
    clickGold,
    buyEntity,
    upgradeClickPower,
    addAutoGold,
    addLog,
    resetGame,
    nextTutorialStep,
    skipTutorial,
    completeTutorial,
    continueAfterClear,
    addDebugGold,
    debugCheckGameState,
    debugResetClearState,
    debugForceGameClear
  };
}