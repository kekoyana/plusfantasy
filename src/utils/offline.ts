import { OfflineProgress } from '../types/game';

export const OFFLINE_CONFIG = {
  maxOfflineHours: 24,
  offlineEfficiency: 0.75 // 75% efficiency during offline
};

export function calculateOfflineProgress(
  lastPlayTime: number,
  goldPerSecond: number
): OfflineProgress {
  const now = Date.now();
  const offlineTimeMs = now - lastPlayTime;
  const offlineTimeHours = offlineTimeMs / (1000 * 60 * 60);
  
  // Cap offline time to maximum allowed hours
  const cappedOfflineHours = Math.min(offlineTimeHours, OFFLINE_CONFIG.maxOfflineHours);
  
  // Calculate offline gold production
  const offlineGoldEarned = Math.floor(
    cappedOfflineHours * 60 * 60 * goldPerSecond * OFFLINE_CONFIG.offlineEfficiency
  );
  
  return {
    lastPlayTime,
    maxOfflineHours: OFFLINE_CONFIG.maxOfflineHours,
    offlineEfficiency: OFFLINE_CONFIG.offlineEfficiency,
    offlineGoldEarned
  };
}

export function formatOfflineTime(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}時間${minutes}分`;
  } else {
    return `${minutes}分`;
  }
}

export function shouldShowOfflineProgress(
  lastPlayTime: number,
  minOfflineTimeMinutes: number = 5
): boolean {
  const now = Date.now();
  const offlineTimeMs = now - lastPlayTime;
  const offlineTimeMinutes = offlineTimeMs / (1000 * 60);
  
  return offlineTimeMinutes >= minOfflineTimeMinutes;
}