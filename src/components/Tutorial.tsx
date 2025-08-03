import React from 'react';
import { TutorialState } from '../types/game';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  action?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'インクリメンタルファンタジーへようこそ！',
    description: 'このゲームでは、クリックしてゴールドを集め、仲間や施設を雇って自動でゴールドを生産していきます。',
  },
  {
    id: 'click',
    title: 'ゴールドを稼ごう',
    description: '💰ボタンをクリックしてゴールドを稼ぎましょう。クリック1回で1ゴールドもらえます。',
    target: 'click-button',
    action: '💰ボタンをクリック'
  },
  {
    id: 'buy-entity',
    title: '仲間を雇おう',
    description: 'ゴールドが10枚貯まったら、右側の「仲間」タブから「見習い冒険者」を購入してみましょう。自動でゴールドを生産してくれます。',
    target: 'entity-list',
    action: '見習い冒険者を購入'
  },
  {
    id: 'auto-gold',
    title: '自動生産',
    description: '仲間を雇うと、時間経過で自動的にゴールドが増えていきます。画面上部で毎秒の収入を確認できます。',
  },
  {
    id: 'upgrade',
    title: 'レベルアップ',
    description: '同じ仲間をもう一度購入すると、レベルがアップして生産量が増加します。効率的にゴールドを稼ぎましょう。',
  },
  {
    id: 'facilities',
    title: '施設を建設',
    description: '「施設」タブでは建物を建設できます。仲間と組み合わせてさらに効率的にゴールドを稼ぎましょう。',
  },
  {
    id: 'goal',
    title: 'ゲームの目標',
    description: '最終目標は「世界樹」を建設することです。総獲得ゴールド100万を目指して頑張りましょう！',
  }
];

interface TutorialProps {
  tutorialState: TutorialState;
  onNextStep: () => void;
  onSkipTutorial: () => void;
  onComplete: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({
  tutorialState,
  onNextStep,
  onSkipTutorial,
  onComplete
}) => {
  if (!tutorialState || !tutorialState.isActive || tutorialState.hasCompletedTutorial) {
    return null;
  }

  const currentStep = tutorialSteps[tutorialState.currentStep];
  const isLastStep = tutorialState.currentStep >= tutorialSteps.length - 1;

  if (!currentStep) {
    return null;
  }

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-dialog">
        <div className="tutorial-header">
          <h3>📖 チュートリアル ({tutorialState.currentStep + 1}/{tutorialSteps.length})</h3>
          <button 
            className="tutorial-skip"
            onClick={onSkipTutorial}
            title="チュートリアルをスキップ"
          >
            ✖
          </button>
        </div>
        
        <div className="tutorial-content">
          <h4>{currentStep.title}</h4>
          <p>{currentStep.description}</p>
          
          {currentStep.action && (
            <div className="tutorial-action">
              💡 <strong>やってみよう:</strong> {currentStep.action}
            </div>
          )}
        </div>
        
        <div className="tutorial-buttons">
          {!isLastStep ? (
            <button 
              className="tutorial-button next"
              onClick={onNextStep}
            >
              次へ
            </button>
          ) : (
            <button 
              className="tutorial-button complete"
              onClick={onComplete}
            >
              チュートリアル完了！
            </button>
          )}
        </div>
        
        <div className="tutorial-progress">
          {tutorialSteps.map((_, index) => (
            <div 
              key={index}
              className={`progress-dot ${
                index <= tutorialState.currentStep ? 'completed' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};