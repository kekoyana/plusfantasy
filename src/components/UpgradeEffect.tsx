import React, { useState, useEffect } from 'react';

interface UpgradeEffectProps {
  entityId: string | null;
  entityName: string;
  onComplete: () => void;
}

export const UpgradeEffect: React.FC<UpgradeEffectProps> = ({ entityId, entityName, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (entityId) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [entityId, onComplete]);

  if (!entityId || !isVisible) {
    return null;
  }

  return (
    <div className="upgrade-effect">
      <div className="upgrade-effect-content">
        <div className="upgrade-icon">⭐</div>
        <div className="upgrade-text">
          <div className="upgrade-title">レベルアップ！</div>
          <div className="upgrade-entity">{entityName}</div>
        </div>
      </div>
    </div>
  );
};