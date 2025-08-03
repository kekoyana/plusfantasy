export interface PlayerState {
  gold: number;
  clickPower: number;
  goldPerSecond: number;
  totalGoldEarned: number;
  playtime: number;
  gameStartTime: number;
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