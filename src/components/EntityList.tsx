import React, { useState } from 'react';
import { GameEntity, PlayerState, PrestigeState, GameProgress } from '../types/game';
import { calculateUpgradeCost, calculateProduction, canAfford } from '../utils/calculations';
import { formatNumber, formatGoldPerSecond } from '../utils/formatting';
import { PrestigePanel } from './PrestigePanel';

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

interface EntityListProps {
  entities: GameEntity[];
  player: PlayerState;
  prestige: PrestigeState;
  progress: GameProgress;
  onBuyEntity: (entityId: string) => void;
  onUpgradeClickPower: () => void;
  onExecutePrestige: () => void;
  onBuyPrestigeUpgrade: (upgradeId: string) => void;
}

type TabType = 'companions' | 'facilities' | 'upgrades' | 'prestige';

export const EntityList: React.FC<EntityListProps> = ({ 
  entities, 
  player, 
  prestige,
  progress,
  onBuyEntity,
  onUpgradeClickPower,
  onExecutePrestige,
  onBuyPrestigeUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('companions');

  const companionEntities = entities.filter(e => e.category === 'companion' && e.isUnlocked);
  const facilityEntities = entities.filter(e => e.category === 'facility' && e.isUnlocked);

  const clickPowerUpgradeCost = player.clickPower * 10;

  const renderEntity = (entity: GameEntity) => {
    const cost = calculateUpgradeCost(entity.baseCost, entity.level);
    const currentProduction = calculateProduction(entity);
    const nextLevelEntity = { ...entity, level: entity.level + 1 };
    const nextProduction = calculateProduction(nextLevelEntity);
    const productionIncrease = nextProduction - currentProduction;
    const affordable = canAfford(player.gold, cost);

    return (
      <div key={entity.id} className={`entity-item ${!affordable ? 'unaffordable' : ''}`}>
        <div className="entity-info">
          <div className="entity-header">
            <span className="entity-icon">{getEntityIcon(entity.id)}</span>
            <span className="entity-name">{entity.name}</span>
          </div>
          <div className="entity-description">{entity.description}</div>
          <div className="entity-stats">
            <span className="entity-level">レベル: {entity.level}</span>
            {entity.level > 0 && (
              <span className="entity-production">
                生産: {formatGoldPerSecond(currentProduction)}
              </span>
            )}
            {productionIncrease > 0 && (
              <span className="entity-upgrade-info">
                アップグレード: +{formatGoldPerSecond(productionIncrease)}
              </span>
            )}
          </div>
        </div>
        
        <button 
          className="buy-button"
          onClick={(e) => {
            onBuyEntity(entity.id);
            e.currentTarget.blur();
          }}
          disabled={!affordable}
        >
          <span className="buy-cost">{formatNumber(cost)}</span>
          <span className="buy-label">
            {entity.level === 0 ? '購入' : 'アップグレード'}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className="entity-list">
      <div className="entity-tabs">
        <button 
          className={`tab ${activeTab === 'companions' ? 'active' : ''}`}
          onClick={() => setActiveTab('companions')}
        >
          仲間 ({companionEntities.length})
        </button>
        <button 
          className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
          onClick={() => setActiveTab('facilities')}
        >
          施設 ({facilityEntities.length})
        </button>
        <button 
          className={`tab ${activeTab === 'upgrades' ? 'active' : ''}`}
          onClick={() => setActiveTab('upgrades')}
        >
          アップグレード
        </button>
        <button 
          className={`tab ${activeTab === 'prestige' ? 'active' : ''}`}
          onClick={() => setActiveTab('prestige')}
        >
          プレステージ
        </button>
      </div>

      <div className="entity-content">
        {activeTab === 'companions' && (
          <div className="entities">
            {companionEntities.length > 0 ? (
              companionEntities.map(renderEntity)
            ) : (
              <div className="no-entities">まだ仲間がいません</div>
            )}
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="entities">
            {facilityEntities.length > 0 ? (
              facilityEntities.map(renderEntity)
            ) : (
              <div className="no-entities">まだ施設がありません</div>
            )}
          </div>
        )}

        {activeTab === 'upgrades' && (
          <div className="entities">
            <div className={`entity-item ${!canAfford(player.gold, clickPowerUpgradeCost) ? 'unaffordable' : ''}`}>
              <div className="entity-info">
                <div className="entity-name">クリック力アップ</div>
                <div className="entity-description">
                  クリック1回で得られるゴールドが+1増加します
                </div>
                <div className="entity-stats">
                  <span className="entity-level">現在: {player.clickPower}</span>
                </div>
              </div>
              
              <button 
                className="buy-button"
                onClick={(e) => {
                  onUpgradeClickPower();
                  e.currentTarget.blur();
                }}
                disabled={!canAfford(player.gold, clickPowerUpgradeCost)}
              >
                <span className="buy-cost">{formatNumber(clickPowerUpgradeCost)}</span>
                <span className="buy-label">アップグレード</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'prestige' && (
          <PrestigePanel
            prestige={prestige}
            player={player}
            progress={progress}
            onExecutePrestige={onExecutePrestige}
            onBuyUpgrade={onBuyPrestigeUpgrade}
          />
        )}
      </div>
    </div>
  );
};