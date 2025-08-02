export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return Math.floor(num).toString();
  }
  
  const units = ['', 'K', 'M', 'B', 'T', 'AA', 'BB', 'CC'];
  const unitIndex = Math.floor(Math.log10(num) / 3);
  const value = num / Math.pow(1000, unitIndex);
  
  if (unitIndex >= units.length) {
    return num.toExponential(2);
  }
  
  return `${value.toFixed(1)}${units[unitIndex]}`;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatGoldPerSecond = (gps: number): string => {
  return `${formatNumber(gps)}/sec`;
};