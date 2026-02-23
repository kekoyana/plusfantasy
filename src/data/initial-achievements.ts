import { Achievement } from '../types/game';

export const initialAchievements: Achievement[] = [
  // ゴールド関連の実績
  {
    id: 'first_gold',
    name: '初めてのゴールド',
    description: '初回のクリックでゴールドを獲得する',
    condition: { type: 'totalGold', target: 1 },
    reward: { type: 'multiplier', value: 1.1, description: 'クリック力 10%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'gold_collector',
    name: 'ゴールドコレクター',
    description: '累計100ゴールドを獲得する',
    condition: { type: 'totalGold', target: 100 },
    reward: { type: 'multiplier', value: 1.2, description: '全体生産量 20%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'gold_master',
    name: 'ゴールドマスター',
    description: '累計1,000ゴールドを獲得する',
    condition: { type: 'totalGold', target: 1000 },
    reward: { type: 'multiplier', value: 1.3, description: '全体ゴールド獲得量 30%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'wealthy_adventurer',
    name: '裕福な冒険者',
    description: '累計10,000ゴールドを獲得する',
    condition: { type: 'totalGold', target: 10000 },
    reward: { type: 'multiplier', value: 1.5, description: '全体生産量 50%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'gold_tycoon',
    name: 'ゴールド大富豪',
    description: '累計100,000ゴールドを獲得する',
    condition: { type: 'totalGold', target: 100000 },
    reward: { type: 'multiplier', value: 2.0, description: 'クリック力 2倍' },
    isUnlocked: true,
    isCompleted: false
  },

  // エンティティレベル関連の実績
  {
    id: 'first_companion',
    name: '初めての仲間',
    description: '見習い冒険者をレベル1にする',
    condition: { type: 'entityLevel', target: 1, entityId: 'apprentice' },
    reward: { type: 'multiplier', value: 1.1, description: '見習い冒険者の生産量 10%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'warrior_trainer',
    name: '戦士の訓練師',
    description: '勇敢な戦士をレベル5にする',
    condition: { type: 'entityLevel', target: 5, entityId: 'warrior' }, 
    reward: { type: 'multiplier', value: 1.25, description: '戦士系の生産量 25%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'magic_researcher',
    name: '魔法研究者',
    description: '賢い魔法使いをレベル3にする',
    condition: { type: 'entityLevel', target: 3, entityId: 'mage' },
    reward: { type: 'multiplier', value: 1.3, description: '魔法系の生産量 30%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'dragon_tamer',
    name: 'ドラゴンテイマー',
    description: '古代のドラゴンをレベル1にする',
    condition: { type: 'entityLevel', target: 1, entityId: 'dragon' },
    reward: { type: 'multiplier', value: 1.5, description: '全エンティティの生産量 50%アップ' },
    isUnlocked: true,
    isCompleted: false
  },

  // クリック関連の実績
  {
    id: 'clicker',
    name: 'クリッカー',
    description: '100回クリックする',
    condition: { type: 'clicks', target: 100 },
    reward: { type: 'multiplier', value: 1.2, description: 'クリック力 20%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'click_master',
    name: 'クリックマスター', 
    description: '1,000回クリックする',
    condition: { type: 'clicks', target: 1000 },
    reward: { type: 'multiplier', value: 1.5, description: 'クリック力 50%アップ' },
    isUnlocked: true,
    isCompleted: false
  },

  // プレイ時間関連の実績
  {
    id: 'dedicated_player',
    name: '熱心なプレイヤー',
    description: '1時間プレイする',
    condition: { type: 'timeSpent', target: 3600 }, // 3600秒 = 1時間
    reward: { type: 'multiplier', value: 1.1, description: '全体生産量 10%アップ' },
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'veteran_adventurer',
    name: 'ベテラン冒険者',
    description: '5時間プレイする',
    condition: { type: 'timeSpent', target: 18000 }, // 18000秒 = 5時間
    reward: { type: 'multiplier', value: 1.25, description: '全体ゴールド獲得量 25%アップ' },
    isUnlocked: true,
    isCompleted: false
  }
];