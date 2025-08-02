import React from 'react';
import { GameEntity } from '../types/game';

interface CompanionDisplayProps {
  entities: GameEntity[];
}

const getEntityIcon = (entityId: string): string => {
  const icons: Record<string, string> = {
    // 仲間
    'apprentice': '👤',
    'warrior': '⚔️',
    'archer': '🏹',
    'rogue': '🗡️',
    'mage': '🧙‍♂️',
    'cleric': '⛪',
    'paladin': '🛡️',
    'necromancer': '💀',
    'dragon': '🐉',
    'phoenix': '🔥',
    
    // 施設
    'small_mine': '⛏️',
    'logging_camp': '🪓',
    'farm': '🌾',
    'smithy': '🔨',
    'tavern': '🍺',
    'magic_tower': '🗼',
    'library': '📚',
    'cathedral': '⛪',
    'colosseum': '🏟️',
    'dark_fortress': '🏰',
    'dragon_lair': '🕳️',
    'treasury': '🏛️',
    'world_tree': '🌳'
  };
  return icons[entityId] || '❓';
};

export const CompanionDisplay: React.FC<CompanionDisplayProps> = ({ entities }) => {
  const activeEntities = entities.filter(entity => entity.level > 0);
  const totalFacilities = activeEntities.filter(e => e.category === 'facility').length;
  const totalCompanions = activeEntities.filter(e => e.category === 'companion').length;
  const totalLevels = activeEntities.reduce((sum, entity) => sum + entity.level, 0);

  // 発展段階の判定
  const getDevelopmentStage = () => {
    if (totalLevels >= 200) return { stage: 'empire', title: '🏰 偉大なる魔法帝国', description: '伝説の帝国が誕生した' };
    if (totalLevels >= 100) return { stage: 'kingdom', title: '👑 繁栄する王国', description: '王国として発展している' };
    if (totalLevels >= 50) return { stage: 'city', title: '🏙️ 発展した都市', description: '大きな都市に成長した' };
    if (totalLevels >= 20) return { stage: 'town', title: '🏘️ にぎやかな街', description: '活気ある街になった' };
    if (totalLevels >= 5) return { stage: 'village', title: '🏡 小さな村', description: '小さな村ができた' };
    return { stage: 'settlement', title: '🏕️ 開拓地', description: '冒険の始まり' };
  };

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

  const development = getDevelopmentStage();
  const companions = activeEntities.filter(e => e.category === 'companion');
  const facilities = activeEntities.filter(e => e.category === 'facility');

  return (
    <div className="companion-display">
      <div className="development-header">
        <div className="development-title">{development.title}</div>
        <div className="development-stats">
          <span className="stat-badge companions">👥 {totalCompanions}</span>
          <span className="stat-badge facilities">🏗️ {totalFacilities}</span>
          <span className="stat-badge total">⭐ Lv.{totalLevels}</span>
        </div>
        <div className="development-description">{development.description}</div>
      </div>

      <div className="kingdom-view">
        {companions.length > 0 && (
          <div className="entity-category">
            <div className="category-header">
              <span className="category-icon">👥</span>
              <span className="category-title">仲間たち</span>
            </div>
            <div className="companion-sections">
              {companions.map(entity => (
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
        )}

        {facilities.length > 0 && (
          <div className="entity-category">
            <div className="category-header">
              <span className="category-icon">🏗️</span>
              <span className="category-title">施設・建物</span>
            </div>
            <div className="facility-grid">
              {facilities.map(entity => (
                <div key={entity.id} className={`facility-block ${development.stage}`}>
                  <div className="facility-main-icon" title={`${entity.name} (Lv.${entity.level})`}>
                    {getEntityIcon(entity.id)}
                  </div>
                  <div className="facility-level">Lv.{entity.level}</div>
                  <div className="facility-extensions">
                    {Array.from({ length: Math.min(entity.level - 1, 8) }, (_, index) => (
                      <div key={index} className="facility-extension">▫</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};