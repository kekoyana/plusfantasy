import React, { useState } from 'react';
import { GameEntity, PlayerState } from '../types/game';
import { calculateUpgradeCost, calculateProduction, canAfford } from '../utils/calculations';
import { formatNumber, formatGoldPerSecond } from '../utils/formatting';

interface EntityListProps {
  entities: GameEntity[];
  player: PlayerState;
  onBuyEntity: (entityId: string) => void;
  onUpgradeClickPower: () => void;
}

type TabType = 'companions' | 'facilities' | 'upgrades';

export const EntityList: React.FC<EntityListProps> = ({ 
  entities, 
  player, 
  onBuyEntity,
  onUpgradeClickPower 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('companions');

  const companionEntities = entities.filter(e => e.category === 'companion' && e.isUnlocked);
  const facilityEntities = entities.filter(e => e.category === 'facility' && e.isUnlocked);

  const clickPowerUpgradeCost = player.clickPower * 10;

  const renderEntity = (entity: GameEntity) => {
    const cost = calculateUpgradeCost(entity.baseCost, entity.level);
    const production = calculateProduction(entity);
    const affordable = canAfford(player.gold, cost);

    return (
      <div key={entity.id} className={`entity-item ${!affordable ? 'unaffordable' : ''}`}>
        <div className="entity-info">
          <div className="entity-name">{entity.name}</div>
          <div className="entity-description">{entity.description}</div>
          <div className="entity-stats">
            <span className="entity-level">レベル: {entity.level}</span>
            {entity.level > 0 && (
              <span className="entity-production">
                生産: {formatGoldPerSecond(production)}
              </span>
            )}
          </div>
        </div>
        
        <button 
          className="buy-button"
          onClick={() => onBuyEntity(entity.id)}
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
                onClick={onUpgradeClickPower}
                disabled={!canAfford(player.gold, clickPowerUpgradeCost)}
              >
                <span className="buy-cost">{formatNumber(clickPowerUpgradeCost)}</span>
                <span className="buy-label">アップグレード</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};