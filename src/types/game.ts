export interface PlayerState {
  gold: number;
  clickPower: number;
  goldPerSecond: number;
  totalGoldEarned: number;
  playtime: number;
  gameStartTime: number;
  lastPlayTime: number;
}

export interface TutorialState {
  isActive: boolean;
  currentStep: number;
  completedSteps: string[];
  hasCompletedTutorial: boolean;
}

export interface GameProgress {
  isGameCleared: boolean;
  clearTime: number | null;
  totalEntitiesOwned: number;
  highestTotalGold: number;
  hasShownClearScreen: boolean;
}

export interface UnlockCondition {
  type: 'gold' | 'entity_level' | 'total_earned';
  threshold: number;
  entityId?: string;
}

export interface GameEntity {
  id: string;
  name: string;
  description: string;
  level: number;
  baseCost: number;
  baseProduction: number;
  unlockCondition: UnlockCondition;
  isUnlocked: boolean;
  category: 'companion' | 'facility';
}

export interface GameState {
  player: PlayerState;
  entities: GameEntity[];
  logs: GameLog[];
  tutorial: TutorialState;
  progress: GameProgress;
  achievements: Achievement[];
  multipliers: Multipliers;
}

export interface GameLog {
  id: string;
  message: string;
  timestamp: number;
  type: 'info' | 'success' | 'warning';
}

export interface SaveData {
  gameState: GameState;
  lastSaved: number;
}

export interface OfflineProgress {
  lastPlayTime: number;
  maxOfflineHours: number;
  offlineEfficiency: number;
  offlineGoldEarned: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: AchievementCondition;
  reward: AchievementReward;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface AchievementCondition {
  type: 'totalGold' | 'entityLevel' | 'clicks' | 'timeSpent';
  target: number;
  entityId?: string;
}

export interface AchievementReward {
  type: 'multiplier' | 'currency' | 'unlock';
  value: number;
  description: string;
}

export interface Multipliers {
  global: {
    clickMultiplier: number;
    productionMultiplier: number;
    goldMultiplier: number;
  };
  
  permanent: {
    source: 'achievement' | 'prestige' | 'upgrade';
    type: 'click' | 'production' | 'gold';
    multiplier: number;
  }[];
}