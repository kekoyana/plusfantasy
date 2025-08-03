import React from 'react';
import { PlayerState } from '../types/game';
import { formatNumber, formatGoldPerSecond } from '../utils/formatting';

interface HeaderProps {
  player: PlayerState;
  onResetGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({ player, onResetGame }) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleResetClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmReset = () => {
    onResetGame();
    setShowConfirm(false);
  };

  const handleCancelReset = () => {
    setShowConfirm(false);
  };
  return (
    <header className="game-header">
      <div className="header-content">
        <div className="gold-display">
          <span className="gold-amount">{formatNumber(player.gold)}</span>
          <span className="gold-label">ゴールド</span>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">毎秒:</span>
            <span className="stat-value">{formatGoldPerSecond(player.goldPerSecond)}</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">クリック力:</span>
            <span className="stat-value">{formatNumber(player.clickPower)}</span>
          </div>
          
          
          <div className="stat-item">
            <span className="stat-label">総獲得:</span>
            <span className="stat-value">{formatNumber(player.totalGoldEarned)}</span>
          </div>
          
          <button 
            className="reset-button"
            onClick={handleResetClick}
            title="ゲームをリセット"
          >
            🔄
          </button>
        </div>
        
        {showConfirm && (
          <div className="reset-confirm-overlay">
            <div className="reset-confirm-dialog">
              <h3>ゲームリセット確認</h3>
              <p>本当にゲームを最初からやり直しますか？<br />すべての進行状況が失われます。</p>
              <div className="reset-confirm-buttons">
                <button 
                  className="confirm-button danger"
                  onClick={handleConfirmReset}
                >
                  リセットする
                </button>
                <button 
                  className="confirm-button cancel"
                  onClick={handleCancelReset}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};