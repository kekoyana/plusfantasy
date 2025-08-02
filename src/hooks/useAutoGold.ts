import { useEffect, useRef } from 'react';

export function useAutoGold(goldPerSecond: number, onAddGold: (amount: number) => void) {
  const intervalRef = useRef<number>();
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (goldPerSecond <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      const goldToAdd = goldPerSecond * deltaTime;
      
      if (goldToAdd > 0) {
        onAddGold(goldToAdd);
      }
      
      lastTimeRef.current = currentTime;
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goldPerSecond, onAddGold]);

  useEffect(() => {
    lastTimeRef.current = Date.now();
  }, []);
}