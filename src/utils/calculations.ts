import { GameEntity } from '../types/game';

export const calculateUpgradeCost = (baseCost: number, level: number): number => {
  return Math.floor(baseCost * Math.pow(1.15, level));
};

export const calculateProduction = (entity: GameEntity): number => {
  return entity.baseProduction * entity.level;
};

export const calculateTotalGoldPerSecond = (entities: GameEntity[]): number => {
  return entities
    .filter(entity => entity.level > 0)
    .reduce((total, entity) => total + calculateProduction(entity), 0);
};

export const canAfford = (gold: number, cost: number): boolean => {
  return gold >= cost;
};

export const checkUnlockCondition = (
  condition: GameEntity['unlockCondition'],
  playerGold: number,
  totalEarned: number,
  entities: GameEntity[]
): boolean => {
  switch (condition.type) {
    case 'gold':
      return playerGold >= condition.threshold;
    case 'total_earned':
      return totalEarned >= condition.threshold;
    case 'entity_level':
      if (!condition.entityId) return false;
      const entity = entities.find(e => e.id === condition.entityId);
      return entity ? entity.level >= condition.threshold : false;
    default:
      return false;
  }
};