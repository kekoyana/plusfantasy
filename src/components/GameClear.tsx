import React from 'react';
import { GameProgress, PlayerState } from '../types/game';
import { formatNumber } from '../utils/formatting';

interface GameClearProps {
  progress: GameProgress;
  player: PlayerState;
  onContinue: () => void;
  onResetGame: () => void;
}

export const GameClear: React.FC<GameClearProps> = ({
  progress,
  player,
  onContinue,
  onResetGame
}) => {
  if (!progress || !progress.isGameCleared || progress.hasShownClearScreen) {
    return null;
  }

  const clearTimeMinutes = progress.clearTime ? Math.floor(progress.clearTime / 60000) : 0;
  const clearTimeSeconds = progress.clearTime ? Math.floor((progress.clearTime % 60000) / 1000) : 0;

  return (
    <div className="game-clear-overlay">
      <div className="game-clear-dialog">
        <div className="game-clear-header">
          <h2>🎉 ゲームクリア！ 🎉</h2>
          <div className="clear-crown">👑</div>
        </div>
        
        <div className="game-clear-content">
          <div className="clear-message">
            <h3>🌳 世界樹の建設完了！</h3>
            <p>
              おめでとうございます！あなたは見事に世界の中心に立つ聖なる樹を建設し、
              <br />
              この魔法の王国を完成させました。
            </p>
          </div>
          
          <div className="clear-stats">
            <h4>📊 最終成績</h4>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-label">クリア時間</div>
                <div className="stat-value">
                  {clearTimeMinutes}分{clearTimeSeconds}秒
                </div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">最終ゴールド</div>
                <div className="stat-value">
                  {formatNumber(player.gold)}
                </div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">総獲得ゴールド</div>
                <div className="stat-value">
                  {formatNumber(player.totalGoldEarned)}
                </div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">エンティティ数</div>
                <div className="stat-value">
                  {progress.totalEntitiesOwned}
                </div>
              </div>
            </div>
          </div>
          
          <div className="clear-ranking">
            <h4>🏆 評価</h4>
            <div className="ranking-result">
              {(() => {
                const ranking = getRanking(progress.clearTime || 0);
                return (
                  <>
                    <div className="rank-display">
                      <span className="rank-emoji">{ranking.emoji}</span>
                      <span className="rank-grade">ランク {ranking.rank}</span>
                    </div>
                    <div className="rank-message">{ranking.message}</div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
        
        <div className="game-clear-buttons">
          <button 
            className="clear-button continue"
            onClick={onContinue}
          >
            🎮 続けてプレイ
          </button>
          
          <button 
            className="clear-button restart"
            onClick={onResetGame}
          >
            🔄 最初からプレイ
          </button>
        </div>
        
        <div className="clear-footer">
          <p>✨ Plus Fantasy をプレイしていただき、ありがとうございました！ ✨</p>
        </div>
      </div>
    </div>
  );
};

function getRanking(clearTime: number): { rank: string; emoji: string; message: string } {
  const minutes = clearTime / 60000;
  
  if (minutes <= 10) {
    return {
      rank: 'S',
      emoji: '👑',
      message: '伝説のスピードクリア！'
    };
  } else if (minutes <= 20) {
    return {
      rank: 'A',
      emoji: '🥇',
      message: '素晴らしいタイムです！'
    };
  } else if (minutes <= 30) {
    return {
      rank: 'B',
      emoji: '🥈',
      message: '良いペースでした！'
    };
  } else if (minutes <= 60) {
    return {
      rank: 'C',
      emoji: '🥉',
      message: 'じっくりプレイですね！'
    };
  } else {
    return {
      rank: 'D',
      emoji: '🎯',
      message: 'のんびりプレイお疲れ様！'
    };
  }
}