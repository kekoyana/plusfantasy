import React from 'react';
import { Achievement } from '../types/game';
import { formatNumber } from '../utils/formatting';

interface AchievementPanelProps {
  achievements: Achievement[];
  isVisible: boolean;
  onClose: () => void;
}

const AchievementPanel: React.FC<AchievementPanelProps> = ({ 
  achievements, 
  isVisible, 
  onClose 
}) => {
  if (!isVisible) return null;

  const completedAchievements = achievements.filter(a => a.isCompleted);
  const availableAchievements = achievements.filter(a => !a.isCompleted);

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
      zIndex: 999
    }}>
      <div style={{
        backgroundColor: '#2c1810',
        border: '3px solid #8b4513',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80%',
        overflowY: 'auto',
        color: '#d4af37',
        fontFamily: 'monospace'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#ffd700', 
            fontSize: '24px' 
          }}>
            🏆 実績システム
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#8b4513',
              color: '#ffd700',
              border: '2px solid #654321',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            閉じる
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '5px 0', fontSize: '16px' }}>
            完了: {completedAchievements.length} / {achievements.length}
          </p>
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#1a0f0a',
            border: '1px solid #654321',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(completedAchievements.length / achievements.length) * 100}%`,
              height: '100%',
              backgroundColor: '#ffd700',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {completedAchievements.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: '#ffd700', 
              fontSize: '18px',
              marginBottom: '10px' 
            }}>
              ✅ 達成済み
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '10px' 
            }}>
              {completedAchievements.map(achievement => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                  isCompleted={true} 
                />
              ))}
            </div>
          </div>
        )}

        {availableAchievements.length > 0 && (
          <div>
            <h3 style={{ 
              color: '#cd853f', 
              fontSize: '18px',
              marginBottom: '10px' 
            }}>
              🎯 未達成
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '10px' 
            }}>
              {availableAchievements.map(achievement => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                  isCompleted={false} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  isCompleted: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  achievement, 
  isCompleted 
}) => {
  const getConditionText = (achievement: Achievement) => {
    const { condition } = achievement;
    switch (condition.type) {
      case 'totalGold':
        return `累計${formatNumber(condition.target)}ゴールド獲得`;
      case 'entityLevel':
        return `${condition.entityId} レベル${condition.target}`;
      case 'clicks':
        return `${formatNumber(condition.target)}回クリック`;
      case 'timeSpent':
        const hours = Math.floor(condition.target / 3600);
        const minutes = Math.floor((condition.target % 3600) / 60);
        return hours > 0 ? `${hours}時間${minutes}分プレイ` : `${minutes}分プレイ`;
      default:
        return '不明な条件';
    }
  };

  return (
    <div style={{
      backgroundColor: isCompleted ? '#2a1810' : '#1a0f0a',
      border: `2px solid ${isCompleted ? '#8b4513' : '#654321'}`,
      borderRadius: '4px',
      padding: '12px',
      opacity: isCompleted ? 1 : 0.8
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <h4 style={{ 
          margin: 0,
          color: isCompleted ? '#ffd700' : '#cd853f',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {isCompleted ? '🏆' : '⏳'} {achievement.name}
        </h4>
      </div>
      
      <p style={{ 
        margin: '5px 0',
        fontSize: '14px',
        color: '#d4af37'
      }}>
        {achievement.description}
      </p>
      
      <div style={{ 
        fontSize: '12px',
        color: '#87ceeb',
        marginBottom: '8px'
      }}>
        条件: {getConditionText(achievement)}
      </div>
      
      <div style={{ 
        fontSize: '12px',
        color: '#98fb98',
        fontStyle: 'italic'
      }}>
        報酬: {achievement.reward.description}
      </div>
    </div>
  );
};

export default AchievementPanel;