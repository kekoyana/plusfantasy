import React from 'react';
import { OfflineProgress } from '../types/game';
import { formatOfflineTime } from '../utils/offline';
import { formatNumber } from '../utils/formatting';

interface OfflineProgressModalProps {
  offlineProgress: OfflineProgress;
  offlineTimeMs: number;
  onContinue: () => void;
}

const OfflineProgressModal: React.FC<OfflineProgressModalProps> = ({
  offlineProgress,
  offlineTimeMs,
  onContinue
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#2c1810',
        border: '3px solid #8b4513',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        color: '#d4af37',
        fontFamily: 'monospace'
      }}>
        <h2 style={{
          marginTop: 0,
          marginBottom: '20px',
          color: '#ffd700',
          fontSize: '24px'
        }}>
          🌙 おかえりなさい！
        </h2>
        
        <div style={{
          backgroundColor: '#1a0f0a',
          border: '2px solid #654321',
          borderRadius: '4px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: '10px 0', fontSize: '16px' }}>
            あなたが離れていた間:
          </p>
          <p style={{ margin: '10px 0', fontSize: '18px', color: '#87ceeb' }}>
            ⏰ {formatOfflineTime(offlineTimeMs)}
          </p>
          
          <div style={{ margin: '15px 0' }}>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              オフライン効率: {Math.round(offlineProgress.offlineEfficiency * 100)}%
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              最大オフライン時間: {offlineProgress.maxOfflineHours}時間
            </p>
          </div>
          
          {offlineProgress.offlineGoldEarned > 0 ? (
            <div style={{ 
              backgroundColor: '#2a1810',
              border: '1px solid #8b4513',
              borderRadius: '4px',
              padding: '15px',
              margin: '15px 0'
            }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#ffd700' }}>
                💰 獲得ゴールド
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: '#ffff00'
              }}>
                {formatNumber(offlineProgress.offlineGoldEarned)}
              </p>
            </div>
          ) : (
            <p style={{ 
              margin: '20px 0', 
              fontSize: '16px', 
              color: '#cd853f'
            }}>
              まだゴールド生産施設がないようです。<br />
              仲間や施設を購入して、オフライン収益を得ましょう！
            </p>
          )}
        </div>
        
        <button
          onClick={onContinue}
          style={{
            backgroundColor: '#8b4513',
            color: '#ffd700',
            border: '2px solid #654321',
            borderRadius: '4px',
            padding: '12px 30px',
            fontSize: '16px',
            fontFamily: 'monospace',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#a0522d';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#8b4513';
          }}
        >
          冒険を続ける
        </button>
      </div>
    </div>
  );
};

export default OfflineProgressModal;