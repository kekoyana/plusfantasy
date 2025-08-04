import { Achievement, GameState } from '../types/game';

export function checkAchievementCompletion(
  achievement: Achievement,
  gameState: GameState,
  totalClicks: number = 0
): boolean {
  if (achievement.isCompleted) return false;

  const { condition } = achievement;
  
  switch (condition.type) {
    case 'totalGold':
      return gameState.player.totalGoldEarned >= condition.target;
      
    case 'entityLevel':
      if (!condition.entityId) return false;
      const entity = gameState.entities.find(e => e.id === condition.entityId);
      return entity ? entity.level >= condition.target : false;
      
    case 'clicks':
      return totalClicks >= condition.target;
      
    case 'timeSpent':
      return gameState.player.playtime >= condition.target;
      
    default:
      return false;
  }
}

export function applyAchievementReward(
  achievement: Achievement,
  gameState: GameState
): GameState {
  if (!achievement.isCompleted) return gameState;

  const { reward } = achievement;
  
  switch (reward.type) {
    case 'multiplier':
      // Add permanent multiplier based on description
      const newMultiplier = {
        source: 'achievement' as const,
        type: getMultiplierType(reward.description),
        multiplier: reward.value
      };
      
      return {
        ...gameState,
        multipliers: {
          ...gameState.multipliers,
          permanent: [...gameState.multipliers.permanent, newMultiplier]
        }
      };
      
    case 'currency':
      return {
        ...gameState,
        player: {
          ...gameState.player,
          gold: gameState.player.gold + reward.value,
          totalGoldEarned: gameState.player.totalGoldEarned + reward.value
        }
      };
      
    default:
      return gameState;
  }
}

function getMultiplierType(description: string): 'click' | 'production' | 'gold' {
  if (description.includes('クリック')) return 'click';
  if (description.includes('生産') || description.includes('エンティティ')) return 'production';
  if (description.includes('ゴールド')) return 'gold';
  return 'production'; // default
}

export function calculateTotalMultipliers(multipliers: GameState['multipliers']) {
  const result = {
    clickMultiplier: multipliers.global.clickMultiplier,
    productionMultiplier: multipliers.global.productionMultiplier,
    goldMultiplier: multipliers.global.goldMultiplier
  };

  multipliers.permanent.forEach(perm => {
    switch (perm.type) {
      case 'click':
        result.clickMultiplier *= perm.multiplier;
        break;
      case 'production':
        result.productionMultiplier *= perm.multiplier;
        break;
      case 'gold':
        result.goldMultiplier *= perm.multiplier;
        break;
    }
  });

  return result;
}

export function getNewlyCompletedAchievements(
  achievements: Achievement[],
  gameState: GameState,
  totalClicks: number = 0
): Achievement[] {
  return achievements.filter(achievement => 
    !achievement.isCompleted && 
    checkAchievementCompletion(achievement, gameState, totalClicks)
  );
}