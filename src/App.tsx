import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { useAutoGold } from './hooks/useAutoGold';
import { Header } from './components/Header';
import { ClickButton } from './components/ClickButton';
import { EntityList } from './components/EntityList';
import { LogPanel } from './components/LogPanel';
import { CompanionDisplay } from './components/CompanionDisplay';
import { UpgradeEffect } from './components/UpgradeEffect';
import './App.css'

function App() {
  const { 
    gameState, 
    clickGold, 
    buyEntity, 
    upgradeClickPower, 
    addAutoGold,
    addLog 
  } = useGameState();

  const [upgradeEffect, setUpgradeEffect] = useState<{entityId: string; entityName: string} | null>(null);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  useAutoGold(gameState.player.goldPerSecond, addAutoGold);

  React.useEffect(() => {
    if (gameState.logs.length === 0) {
      addLog('インクリメンタルファンタジーへようこそ！', 'info');
    }
  }, []);

  const handleBuyEntity = (entityId: string) => {
    const entity = gameState.entities.find(e => e.id === entityId);
    if (entity) {
      setUpgradeEffect({ entityId, entityName: entity.name });
    }
    buyEntity(entityId);
  };

  const handleUpgradeClickPower = () => {
    setUpgradeEffect({ entityId: 'click_power', entityName: 'クリック力' });
    upgradeClickPower();
  };

  return (
    <div className="app">
      <Header player={gameState.player} />
      
      <main className="main-content">
        <div className="game-area">
          <div className="click-section">
            <ClickButton 
              clickPower={gameState.player.clickPower}
              onClick={clickGold}
            />
          </div>
          
          <div className="companion-section">
            <CompanionDisplay entities={gameState.entities} />
          </div>
        </div>
        
        <div className="side-panel">
          <EntityList 
            entities={gameState.entities}
            player={gameState.player}
            onBuyEntity={handleBuyEntity}
            onUpgradeClickPower={handleUpgradeClickPower}
          />
        </div>
      </main>
      
      <footer className="footer">
        <div className="log-toggle">
          <button 
            className="toggle-logs-button"
            onClick={() => setShowLogs(!showLogs)}
          >
            {showLogs ? 'ログを隠す' : 'ログを表示'}
          </button>
        </div>
        {showLogs && <LogPanel logs={gameState.logs} />}
      </footer>

      <UpgradeEffect 
        entityId={upgradeEffect?.entityId || null}
        entityName={upgradeEffect?.entityName || ''}
        onComplete={() => setUpgradeEffect(null)}
      />
    </div>
  );
}

export default App
