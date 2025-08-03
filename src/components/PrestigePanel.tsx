import React, { useState } from 'react';
import { PrestigeState, PlayerState, GameProgress } from '../types/game';
import { calculateUpgradeCost as calculatePrestigeUpgradeCost, canBuyPrestigeUpgrade } from '../utils/prestige-calculations';
import { formatNumber } from '../utils/formatting';

interface PrestigePanelProps {
  prestige: PrestigeState;
  player: PlayerState;
  progress: GameProgress;
  onExecutePrestige: () => void;
  onBuyUpgrade: (upgradeId: string) => void;
}

export const PrestigePanel: React.FC<PrestigePanelProps> = ({
  prestige,
  player,
  progress,
  onExecutePrestige,
  onBuyUpgrade
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handlePrestigeClick = () => {
    if (prestige.canPrestige) {
      setShowConfirmDialog(true);
    }
  };

  const confirmPrestige = () => {
    onExecutePrestige();
    setShowConfirmDialog(false);
  };

  return (
    <div className="prestige-panel">
      {/* プレステージ実行セクション */}
      <div className="prestige-section">
        <div className="prestige-header">
          <h3>🌟 プレステージ</h3>
          <div className="prestige-level">レベル {progress.prestigeLevel}</div>
        </div>
        
        <div className="prestige-info">
          <div className="current-stones">
            <span className="stones-icon">💎</span>
            <span className="stones-amount">{formatNumber(player.magicStones)}</span>
            <span className="stones-label">マジックストーン</span>
          </div>
          
          {prestige.canPrestige && (
            <div className="prestige-preview">
              <p>プレステージを実行すると:</p>
              <ul>
                <li>+{prestige.pendingStones}個のマジックストーンを獲得</li>
                <li>ゲームがリセットされます</li>
                <li>プレステージボーナスが適用されます</li>
              </ul>
            </div>
          )}
        </div>
        
        <button 
          className={`prestige-button ${prestige.canPrestige ? 'enabled' : 'disabled'}`}
          onClick={handlePrestigeClick}
          disabled={!prestige.canPrestige}
        >
          {prestige.canPrestige 
            ? `プレステージ実行 (+${prestige.pendingStones}💎)`
            : 'ゲームクリア後に使用可能'
          }
        </button>
      </div>

      {/* アップグレードセクション */}
      <div className="upgrades-section">
        <h4>🔮 プレステージアップグレード</h4>
        <div className="upgrades-grid">
          {prestige.upgrades.map(upgrade => {
            const cost = calculatePrestigeUpgradeCost(upgrade);
            const canBuy = canBuyPrestigeUpgrade(upgrade, player.magicStones);
            const isMaxed = upgrade.currentLevel >= upgrade.maxLevel;

            return (
              <div 
                key={upgrade.id} 
                className={`upgrade-card ${!upgrade.isUnlocked ? 'locked' : ''} ${isMaxed ? 'maxed' : ''}`}
              >
                <div className="upgrade-header">
                  <h5>{upgrade.name}</h5>
                  <div className="upgrade-level">
                    Lv.{upgrade.currentLevel}/{upgrade.maxLevel}
                  </div>
                </div>
                
                <p className="upgrade-description">{upgrade.description}</p>
                
                {upgrade.isUnlocked ? (
                  <div className="upgrade-actions">
                    {!isMaxed ? (
                      <button
                        className={`upgrade-buy-button ${canBuy ? 'enabled' : 'disabled'}`}
                        onClick={() => onBuyUpgrade(upgrade.id)}
                        disabled={!canBuy}
                      >
                        購入 ({cost}💎)
                      </button>
                    ) : (
                      <div className="upgrade-maxed">最大レベル</div>
                    )}
                  </div>
                ) : (
                  <div className="upgrade-locked">
                    {upgrade.unlockCondition && (
                      <p className="unlock-condition">
                        {getUnlockConditionText(upgrade.unlockCondition)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* プレステージ確認ダイアログ */}
      {showConfirmDialog && (
        <div className="prestige-confirm-overlay">
          <div className="prestige-confirm-dialog">
            <h3>⚠️ プレステージ確認</h3>
            <p>本当にプレステージを実行しますか？</p>
            <div className="prestige-warning">
              <p>⚠️ 以下がリセットされます:</p>
              <ul>
                <li>現在のゴールド</li>
                <li>全エンティティのレベル</li>
                <li>ゲーム進行状況</li>
              </ul>
              <p>✅ 以下が保持されます:</p>
              <ul>
                <li>マジックストーン (+{prestige.pendingStones}個)</li>
                <li>プレステージアップグレード</li>
                <li>永続ボーナス効果</li>
              </ul>
            </div>
            <div className="confirm-buttons">
              <button 
                className="confirm-button execute"
                onClick={confirmPrestige}
              >
                実行する
              </button>
              <button 
                className="confirm-button cancel"
                onClick={() => setShowConfirmDialog(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getUnlockConditionText(condition: any): string {
  switch (condition.type) {
    case 'prestige_level':
      return `プレステージレベル${condition.threshold}で解放`;
    case 'total_stones':
      return `総獲得ストーン${condition.threshold}個で解放`;
    case 'upgrade_level':
      return `${condition.upgradeId}をレベル${condition.threshold}で解放`;
    default:
      return '条件不明';
  }
}