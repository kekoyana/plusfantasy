import React, { useState } from 'react';
import { formatNumber } from '../utils/formatting';

interface ClickButtonProps {
  clickPower: number;
  onClick: () => void;
}

interface ClickEffect {
  id: string;
  value: number;
  x: number;
  y: number;
}

export const ClickButton: React.FC<ClickButtonProps> = ({ clickPower, onClick }) => {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newEffect: ClickEffect = {
      id: Date.now().toString(),
      value: clickPower,
      x,
      y
    };
    
    setClickEffects(prev => [...prev, newEffect]);
    
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
  };

  return (
    <div className="click-button-container">
      <button 
        className="click-button"
        onClick={handleClick}
        type="button"
      >
        <span className="click-button-text">💰</span>
        <span className="click-button-label">クリック!</span>
      </button>
      
      {clickEffects.map(effect => (
        <div
          key={effect.id}
          className="click-effect"
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`
          }}
        >
          +{formatNumber(effect.value)}
        </div>
      ))}
    </div>
  );
};