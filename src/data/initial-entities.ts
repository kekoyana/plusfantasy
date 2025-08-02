import { GameEntity } from '../types/game';

export const initialEntities: GameEntity[] = [
  // === 仲間 (Companions) ===
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
    id: 'archer',
    name: '精鋭弓兵',
    description: '遠距離から敵を狙撃する熟練の弓使い。',
    level: 0,
    baseCost: 200,
    baseProduction: 2,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'warrior' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'rogue',
    name: '影の盗賊',
    description: '隠れた宝を見つける技に長けた盗賊。',
    level: 0,
    baseCost: 400,
    baseProduction: 4,
    unlockCondition: { type: 'entity_level', threshold: 2, entityId: 'archer' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'mage',
    name: '賢い魔法使い',
    description: '魔法でゴールドを錬金する神秘的な魔法使い。',
    level: 0,
    baseCost: 800,
    baseProduction: 8,
    unlockCondition: { type: 'total_earned', threshold: 2000 },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'cleric',
    name: '聖なる僧侶',
    description: '神の加護で仲間たちの効率を上げる聖職者。',
    level: 0,
    baseCost: 1500,
    baseProduction: 15,
    unlockCondition: { type: 'entity_level', threshold: 5, entityId: 'mage' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'paladin',
    name: '聖騎士',
    description: '光の力を纏う神聖な騎士。強大な敵も恐れる存在。',
    level: 0,
    baseCost: 3000,
    baseProduction: 30,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'cleric' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'necromancer',
    name: '死霊術師',
    description: '禁断の魔法を操る闇の魔法使い。危険だが強力。',
    level: 0,
    baseCost: 6000,
    baseProduction: 60,
    unlockCondition: { type: 'entity_level', threshold: 8, entityId: 'mage' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'dragon',
    name: '古代のドラゴン',
    description: '伝説の生き物。その威光だけで莫大な富を引き寄せる。',
    level: 0,
    baseCost: 15000,
    baseProduction: 150,
    unlockCondition: { type: 'entity_level', threshold: 5, entityId: 'paladin' },
    isUnlocked: false,
    category: 'companion'
  },
  {
    id: 'phoenix',
    name: '不死鳥',
    description: '永遠の炎を纏う神話の鳥。無限の富をもたらす。',
    level: 0,
    baseCost: 50000,
    baseProduction: 500,
    unlockCondition: { type: 'entity_level', threshold: 10, entityId: 'dragon' },
    isUnlocked: false,
    category: 'companion'
  },

  // === 施設 (Facilities) ===
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
    id: 'logging_camp',
    name: '伐採場',
    description: '木材を切り出して売る林業施設。',
    level: 0,
    baseCost: 75,
    baseProduction: 1.5,
    unlockCondition: { type: 'entity_level', threshold: 2, entityId: 'small_mine' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'farm',
    name: '農場',
    description: '作物を育てて市場で売る農業施設。',
    level: 0,
    baseCost: 150,
    baseProduction: 3,
    unlockCondition: { type: 'entity_level', threshold: 2, entityId: 'logging_camp' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'smithy',
    name: '鍛冶場',
    description: '武器を作って売る工房。冒険者たちが買い求める。',
    level: 0,
    baseCost: 400,
    baseProduction: 6,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'warrior' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'tavern',
    name: '酒場',
    description: '冒険者たちが集まる憩いの場。情報も集まる。',
    level: 0,
    baseCost: 800,
    baseProduction: 12,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'farm' },
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
    unlockCondition: { type: 'entity_level', threshold: 2, entityId: 'mage' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'library',
    name: '古代図書館',
    description: '失われた知識が眠る図書館。魔法の秘密を売る。',
    level: 0,
    baseCost: 4000,
    baseProduction: 50,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'magic_tower' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'cathedral',
    name: '大聖堂',
    description: '神聖な力が宿る巨大な聖堂。信者の寄付が集まる。',
    level: 0,
    baseCost: 8000,
    baseProduction: 100,
    unlockCondition: { type: 'entity_level', threshold: 5, entityId: 'cleric' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'colosseum',
    name: '闘技場',
    description: '戦士たちが戦う巨大な競技場。観客から大金が集まる。',
    level: 0,
    baseCost: 12000,
    baseProduction: 150,
    unlockCondition: { type: 'entity_level', threshold: 8, entityId: 'warrior' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'dark_fortress',
    name: '闇の要塞',
    description: '死霊術師の拠点。恐怖と引き換えに富を生み出す。',
    level: 0,
    baseCost: 20000,
    baseProduction: 250,
    unlockCondition: { type: 'entity_level', threshold: 3, entityId: 'necromancer' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'dragon_lair',
    name: 'ドラゴンの巣',
    description: 'ドラゴンが住む洞窟。宝の山が眠る秘密の場所。',
    level: 0,
    baseCost: 40000,
    baseProduction: 400,
    unlockCondition: { type: 'entity_level', threshold: 5, entityId: 'dragon' },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'treasury',
    name: '王室金庫',
    description: '王国の宝物庫。定期的に税収が入る。',
    level: 0,
    baseCost: 75000,
    baseProduction: 750,
    unlockCondition: { type: 'total_earned', threshold: 200000 },
    isUnlocked: false,
    category: 'facility'
  },
  {
    id: 'world_tree',
    name: '世界樹',
    description: '世界の中心に立つ巨大な聖なる樹。無限の恵みをもたらす。',
    level: 0,
    baseCost: 150000,
    baseProduction: 1500,
    unlockCondition: { type: 'entity_level', threshold: 10, entityId: 'phoenix' },
    isUnlocked: false,
    category: 'facility'
  }
];