import React from 'react';
import { PlayerState } from '../types/game';
import { formatNumber, formatGoldPerSecond, formatTime } from '../utils/formatting';

interface HeaderProps {
  player: PlayerState;
}

export const Header: React.FC<HeaderProps> = ({ player }) => {
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
            <span className="stat-label">プレイ時間:</span>
            <span className="stat-value">{formatTime(player.playtime)}</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">総獲得:</span>
            <span className="stat-value">{formatNumber(player.totalGoldEarned)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};