export interface PlayerState {
  gold: number;
  clickPower: number;
  goldPerSecond: number;
  totalGoldEarned: number;
  playtime: number;
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