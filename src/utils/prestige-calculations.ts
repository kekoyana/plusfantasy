import { PrestigeUpgrade, PrestigeState, GameState } from '../types/game';

/**
 * 総獲得ゴールドからマジックストーンの獲得数を計算
 */
export function calculateMagicStonesFromGold(totalGoldEarned: number): number {
  if (totalGoldEarned < 1000000) return 0; // 100万未満ではプレステージ不可
  
  // 対数スケールでマジックストーンを計算
  // log10(totalGold / 1000000) * 2 + ボーナス
  const baseStones = Math.floor(Math.log10(totalGoldEarned / 1000000) * 2);
  
  // ボーナス計算（大きな金額ほど効率アップ）
  let bonus = 0;
  if (totalGoldEarned >= 10000000) bonus += 2;   // 1000万以上で+2
  if (totalGoldEarned >= 100000000) bonus += 5;  // 1億以上で+5
  if (totalGoldEarned >= 1000000000) bonus += 10; // 10億以上で+10
  
  return Math.max(1, baseStones + bonus);
}

/**
 * プレステージ可能かどうかを判定
 */
export function canPrestige(gameState: GameState): boolean {
  return gameState.player.totalGoldEarned >= 1000000 && 
         gameState.progress.isGameCleared;
}

/**
 * プレステージ実行時に獲得できるマジックストーン数を計算
 */
export function calculatePrestigePendingStones(gameState: GameState): number {
  if (!canPrestige(gameState)) return 0;
  return calculateMagicStonesFromGold(gameState.player.totalGoldEarned);
}

/**
 * プレステージアップグレードのコストを計算（レベルごとに増加）
 */
export function calculateUpgradeCost(upgrade: PrestigeUpgrade): number {
  const baseCost = upgrade.cost;
  const level = upgrade.currentLevel;
  
  // レベルごとにコスト増加（1.5倍ずつ）
  return Math.floor(baseCost * Math.pow(1.5, level));
}

/**
 * プレステージアップグレードが購入可能かどうかを判定
 */
export function canBuyPrestigeUpgrade(upgrade: PrestigeUpgrade, magicStones: number): boolean {
  if (!upgrade.isUnlocked) return false;
  if (upgrade.currentLevel >= upgrade.maxLevel) return false;
  
  const cost = calculateUpgradeCost(upgrade);
  return magicStones >= cost;
}

/**
 * プレステージボーナスの総計算
 */
export function calculatePrestigeBonus(prestige: PrestigeState): {
  clickMultiplier: number;
  productionMultiplier: number;
  unlockDiscount: number;
  specialMultiplier: number;
} {
  let clickMultiplier = 1;
  let productionMultiplier = 1;
  let unlockDiscount = 0;
  let specialMultiplier = 1;

  for (const upgrade of prestige.upgrades) {
    if (upgrade.currentLevel === 0) continue;

    const totalEffect = upgrade.effect.value * upgrade.currentLevel;

    switch (upgrade.effect.type) {
      case 'click_multiplier':
        clickMultiplier += totalEffect;
        break;
      case 'production_multiplier':
        productionMultiplier += totalEffect;
        break;
      case 'unlock_discount':
        unlockDiscount += totalEffect;
        break;
      case 'special':
        if (upgrade.id === 'golden_multiplier') {
          clickMultiplier += totalEffect;
          productionMultiplier += totalEffect;
        } else if (upgrade.id === 'transcendence') {
          clickMultiplier += totalEffect;
          productionMultiplier += totalEffect;
          specialMultiplier += totalEffect;
        }
        break;
    }
  }

  return {
    clickMultiplier: Math.max(1, clickMultiplier),
    productionMultiplier: Math.max(1, productionMultiplier),
    unlockDiscount: Math.min(0.8, unlockDiscount), // 最大80%割引
    specialMultiplier: Math.max(1, specialMultiplier)
  };
}

/**
 * プレステージアップグレードのアンロック条件をチェック
 */
export function checkPrestigeUnlockConditions(prestige: PrestigeState, progress: any): PrestigeUpgrade[] {
  return prestige.upgrades.map(upgrade => {
    if (upgrade.isUnlocked || !upgrade.unlockCondition) {
      return upgrade;
    }

    const condition = upgrade.unlockCondition;
    let shouldUnlock = false;

    switch (condition.type) {
      case 'prestige_level':
        shouldUnlock = progress.prestigeLevel >= condition.threshold;
        break;
      case 'total_stones':
        shouldUnlock = progress.totalPrestigePoints >= condition.threshold;
        break;
      case 'upgrade_level':
        if (condition.upgradeId) {
          const requiredUpgrade = prestige.upgrades.find(u => u.id === condition.upgradeId);
          shouldUnlock = requiredUpgrade ? requiredUpgrade.currentLevel >= condition.threshold : false;
        }
        break;
    }

    return {
      ...upgrade,
      isUnlocked: shouldUnlock
    };
  });
}