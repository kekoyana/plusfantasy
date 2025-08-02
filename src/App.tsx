import React from 'react';
import { useGameState } from './hooks/useGameState';
import { useAutoGold } from './hooks/useAutoGold';
import { Header } from './components/Header';
import { ClickButton } from './components/ClickButton';
import { EntityList } from './components/EntityList';
import { LogPanel } from './components/LogPanel';
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

  useAutoGold(gameState.player.goldPerSecond, addAutoGold);

  React.useEffect(() => {
    if (gameState.logs.length === 0) {
      addLog('インクリメンタルファンタジーへようこそ！', 'info');
    }
  }, []);

  return (
    <div className="app">
      <Header player={gameState.player} />
      
      <main className="main-content">
        <div className="game-area">
          <ClickButton 
            clickPower={gameState.player.clickPower}
            onClick={clickGold}
          />
        </div>
        
        <div className="side-panel">
          <EntityList 
            entities={gameState.entities}
            player={gameState.player}
            onBuyEntity={buyEntity}
            onUpgradeClickPower={upgradeClickPower}
          />
        </div>
      </main>
      
      <footer className="footer">
        <LogPanel logs={gameState.logs} />
      </footer>
    </div>
  );
}

export default App
