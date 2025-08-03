import { PrestigeUpgrade } from '../types/game';

export const initialPrestigeUpgrades: PrestigeUpgrade[] = [
  // === クリック力強化系 ===
  {
    id: 'click_power_boost',
    name: 'ゴールデンタッチ',
    description: 'クリック力が50%増加します。',
    cost: 1,
    maxLevel: 10,
    currentLevel: 0,
    effect: {
      type: 'click_multiplier',
      value: 0.5,
      isPercentage: true
    },
    isUnlocked: true
  },
  {
    id: 'super_click',
    name: 'スーパークリック',
    description: 'クリック力が100%増加します。',
    cost: 5,
    maxLevel: 5,
    currentLevel: 0,
    effect: {
      type: 'click_multiplier',
      value: 1.0,
      isPercentage: true
    },
    unlockCondition: {
      type: 'upgrade_level',
      threshold: 3,
      upgradeId: 'click_power_boost'
    },
    isUnlocked: false
  },

  // === 生産力強化系 ===
  {
    id: 'production_boost',
    name: 'マジックエンハンス',
    description: '全エンティティの生産力が25%増加します。',
    cost: 2,
    maxLevel: 15,
    currentLevel: 0,
    effect: {
      type: 'production_multiplier',
      value: 0.25,
      isPercentage: true
    },
    isUnlocked: true
  },
  {
    id: 'mega_production',
    name: 'メガプロダクション',
    description: '全エンティティの生産力が75%増加します。',
    cost: 8,
    maxLevel: 8,
    currentLevel: 0,
    effect: {
      type: 'production_multiplier',
      value: 0.75,
      isPercentage: true
    },
    unlockCondition: {
      type: 'upgrade_level',
      threshold: 5,
      upgradeId: 'production_boost'
    },
    isUnlocked: false
  },

  // === アンロック支援系 ===
  {
    id: 'quick_unlock',
    name: 'ファストアンロック',
    description: 'エンティティのアンロック条件が20%緩和されます。',
    cost: 3,
    maxLevel: 5,
    currentLevel: 0,
    effect: {
      type: 'unlock_discount',
      value: 0.2,
      isPercentage: true
    },
    unlockCondition: {
      type: 'prestige_level',
      threshold: 2
    },
    isUnlocked: false
  },

  // === 高級アップグレード ===
  {
    id: 'golden_multiplier',
    name: 'ゴールデンマルチプライヤー',
    description: '全体の効率が200%増加します。',
    cost: 15,
    maxLevel: 3,
    currentLevel: 0,
    effect: {
      type: 'special',
      value: 2.0,
      isPercentage: true
    },
    unlockCondition: {
      type: 'total_stones',
      threshold: 50
    },
    isUnlocked: false
  },
  {
    id: 'magic_accelerator',
    name: 'マジックアクセラレーター',
    description: 'ゲーム速度が50%向上します。',
    cost: 25,
    maxLevel: 2,
    currentLevel: 0,
    effect: {
      type: 'special',
      value: 0.5,
      isPercentage: true
    },
    unlockCondition: {
      type: 'total_stones',
      threshold: 100
    },
    isUnlocked: false
  },

  // === 極限アップグレード ===
  {
    id: 'transcendence',
    name: 'トランセンデンス',
    description: '全ての効果が300%増加する究極の力。',
    cost: 50,
    maxLevel: 1,
    currentLevel: 0,
    effect: {
      type: 'special',
      value: 3.0,
      isPercentage: true
    },
    unlockCondition: {
      type: 'total_stones',
      threshold: 250
    },
    isUnlocked: false
  }
];