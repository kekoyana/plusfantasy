import React from 'react';
import { GameEntity } from '../types/game';

interface CompanionDisplayProps {
  entities: GameEntity[];
}

const getEntityIcon = (entityId: string): string => {
  const icons: Record<string, string> = {
    'apprentice': '👤',
    'warrior': '⚔️',
    'mage': '🧙‍♂️',
    'dragon': '🐉',
    'small_mine': '⛏️',
    'smithy': '🔨',
    'magic_tower': '🗼',
    'treasury': '🏛️'
  };
  return icons[entityId] || '❓';
};

export const CompanionDisplay: React.FC<CompanionDisplayProps> = ({ entities }) => {
  const activeEntities = entities.filter(entity => entity.level > 0);

  if (activeEntities.length === 0) {
    return (
      <div className="companion-display empty">
        <div className="empty-message">
          <span className="empty-icon">🌟</span>
          <p>仲間や施設を購入すると<br />ここに表示されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="companion-display">
      <div className="companion-sections">
        {activeEntities.map(entity => (
          <div key={entity.id} className={`entity-section ${entity.category}`}>
            <div className="entity-icons">
              {Array.from({ length: Math.min(entity.level, 15) }, (_, index) => (
                <div 
                  key={index} 
                  className="entity-icon"
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                  title={`${entity.name} (Lv.${entity.level})`}
                >
                  {getEntityIcon(entity.id)}
                </div>
              ))}
              {entity.level > 15 && (
                <div className="overflow-indicator" title={`${entity.name} - 合計レベル${entity.level}`}>
                  +{entity.level - 15}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};