import { GameEntity } from '../types/game';

export const initialEntities: GameEntity[] = [
  {
    id: 'apprentice',
    name: '見習い冒険者',
    description: '駆け出しの冒険者。小さなコインを集めてくれる。',
    level: 0,
    baseCost: 10,
    baseProduction: 0.1,
    unlockCondition: { type: 'gold', threshold: 0 },
    isUnlocked: true,
    category: 'companion'
  },
  {
    id: 'warrior',
    name: '勇敢な戦士',
    description: '剣と盾を持つ頼もしい戦士。より多くのゴールドを稼ぐ。',
    level: 0,
    baseCost: 100,
    baseProduction: 1,
    unlockCondition: { type: 'gold', threshold: 50 },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'mage',
    name: '賢い魔法使い',
    description: '魔法でゴールドを錬金する神秘的な魔法使い。',
    level: 0,
    baseCost: 500,
    baseProduction: 8,
    unlockCondition: { type: 'total_earned', threshold: 1000 },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'dragon',
    name: '古代のドラゴン',
    description: '伝説の生き物。その威光だけで莫大な富を引き寄せる。',
    level: 0,
    baseCost: 10000,
    baseProduction: 100,
    unlockCondition: { type: 'entity_level', threshold: 10, entityId: 'mage' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'small_mine',
    name: '小さな鉱山',
    description: '金の鉱脈を掘る小規模な採掘場。',
    level: 0,
    baseCost: 25,
    baseProduction: 0.5,
    unlockCondition: { type: 'gold', threshold: 15 },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'smithy',
    name: '鍛冶場',
    description: '武器を作って売る工房。冒険者たちが買い求める。',
    level: 0,
    baseCost: 250,
    baseProduction: 4,
    unlockCondition: { type: 'entity_level', threshold: 5, entityId: 'warrior' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'magic_tower',
    name: '魔法の塔',
    description: '魔法の研究と教育を行う塔。魔法使いたちが貢献する。',
    level: 0,
    baseCost: 2000,
    baseProduction: 25,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'mage' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'treasury',
    name: '王室金庫',
    description: '王国の宝物庫。定期的に税収が入る。',
    level: 0,
    baseCost: 50000,
    baseProduction: 500,
    unlockCondition: { type: 'total_earned', threshold: 100000 },
    isUnlocked: false,
    category: 'facility'
  }
];