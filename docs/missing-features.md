# Plus Fantasy - 不足機能仕様書

## 概要
現在のPlus Fantasyゲームの実装状況を分析し、インクリメンタルゲームとしてより完成度を高めるために必要な機能を特定しました。

## 現在実装済みの機能

### ✅ 基本機能
- **手動クリック**: ゴールド獲得（1回あたり1ゴールドから開始）
- **自動収入**: エンティティによる毎秒ゴールド生成
- **エンティティ購入**: 仲間10種類、施設13種類の計23エンティティ
- **段階的アンロック**: ゴールド・総獲得・エンティティレベル条件
- **セーブ機能**: localStorageによる自動保存
- **ログシステム**: アクション履歴の表示/非表示
- **ゲームリセット**: 確認ダイアログ付きリセット機能

### ✅ UI/UX機能
- **タブ切り替え**: 仲間・施設・アップグレードの分類
- **リアルタイム表示**: 所持金・毎秒収入・クリック力・総獲得量
- **購入可否表示**: 資金不足時のグレーアウト
- **アップグレード効果プレビュー**: 購入後の生産量増加表示

## 🚫 不足している重要機能

### 1. プレステージ/転生システム（優先度: 高）
```typescript
interface PrestigeSystem {
  // プレステージ通貨（例：マジックストーン）
  prestigeCurrency: number;
  
  // プレステージ条件（例：総獲得10万ゴールド以上）
  prestigeRequirement: number;
  
  // プレステージボーナス（永続的な効果）
  prestigeBonuses: {
    clickMultiplier: number;    // クリック倍率
    productionMultiplier: number; // 生産倍率
    goldGainMultiplier: number;   // ゴールド獲得倍率
  };
  
  // プレステージレベル
  prestigeLevel: number;
}
```

### 2. 実績システム（優先度: 高）
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: AchievementCondition;
  reward: AchievementReward;
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface AchievementCondition {
  type: 'totalGold' | 'entityLevel' | 'clicks' | 'timeSpent';
  target: number;
  entityId?: string;
}

interface AchievementReward {
  type: 'multiplier' | 'currency' | 'unlock';
  value: number;
  description: string;
}
```

### 3. オフライン進行（優先度: 高）
```typescript
interface OfflineProgress {
  lastPlayTime: number;
  maxOfflineHours: number;      // 最大オフライン時間
  offlineEfficiency: number;    // オフライン効率（例：50%）
  offlineGoldEarned: number;
}
```

### 4. 倍率・ボーナスシステム（優先度: 中）
```typescript
interface Multipliers {
  global: {
    clickMultiplier: number;
    productionMultiplier: number;
    goldMultiplier: number;
  };
  
  temporary: {
    id: string;
    type: 'click' | 'production' | 'gold';
    multiplier: number;
    duration: number;      // 秒数
    startTime: number;
  }[];
  
  permanent: {
    source: 'achievement' | 'prestige' | 'upgrade';
    type: 'click' | 'production' | 'gold';
    multiplier: number;
  }[];
}
```

### 5. 自動化機能（優先度: 中）
```typescript
interface Automation {
  autoClicker: {
    isUnlocked: boolean;
    level: number;
    clicksPerSecond: number;
    cost: number;
  };
  
  bulkPurchase: {
    isEnabled: boolean;
    quantities: [1, 10, 25, 100, 'max'];
  };
  
  autoUpgrade: {
    isEnabled: boolean;
    maxCostPercentage: number; // 所持金の何%まで使うか
  };
}
```

## 🔧 品質向上機能

### 6. 設定システム（優先度: 中）
```typescript
interface GameSettings {
  audio: {
    soundEffects: boolean;
    backgroundMusic: boolean;
    volume: number; // 0-100
  };
  
  display: {
    notation: 'scientific' | 'engineering' | 'letters';
    showAnimations: boolean;
    theme: 'classic' | 'dark' | 'retro';
  };
  
  gameplay: {
    confirmPurchases: boolean;
    autoSave: boolean;
    saveInterval: number; // 秒
  };
}
```

### 7. 統計システム（優先度: 低）
```typescript
interface GameStatistics {
  gameplay: {
    totalClicks: number;
    totalPlayTime: number;
    totalGoldEarned: number;
    totalGoldSpent: number;
    prestigeCount: number;
  };
  
  entities: {
    [entityId: string]: {
      purchaseCount: number;
      totalGoldProduced: number;
      maxLevel: number;
    };
  };
  
  milestones: {
    firstMillionGold: number;    // 達成時刻
    firstBillionGold: number;
    fastestPrestige: number;     // 最速プレステージ時間
  };
}
```

### 8. イベントシステム（優先度: 低）
```typescript
interface GameEvent {
  id: string;
  name: string;
  description: string;
  type: 'goldBonus' | 'clickBonus' | 'productionBonus' | 'discount';
  effect: {
    multiplier?: number;
    duration: number; // 秒
    discount?: number; // パーセント
  };
  triggerCondition: {
    type: 'random' | 'timeSpent' | 'goldSpent' | 'achievement';
    probability?: number; // ランダムの場合
    threshold?: number;
  };
}
```

## 📋 実装優先度ロードマップ

### フェーズ1: 基本的なメタ進行（必須）
1. **オフライン進行計算** - ゲームを閉じている間の進行
2. **簡単な実績システム** - 基本的な目標設定
3. **基本倍率システム** - 実績による永続ボーナス

### フェーズ2: プレステージシステム（コア）
1. **プレステージ通貨** - マジックストーンなど
2. **プレステージボーナス** - 永続的な効果
3. **プレステージアップグレード** - 専用のアップグレードツリー

### フェーズ3: 自動化・QoL改善
1. **オートクリッカー** - 自動クリック機能
2. **一括購入** - まとめて購入機能
3. **設定画面** - ゲーム設定のカスタマイズ

### フェーズ4: 高度な機能（オプション）
1. **イベントシステム** - ランダムイベント
2. **詳細統計** - プレイ記録の詳細表示
3. **テーマシステム** - 見た目のカスタマイズ

## 🎯 推奨実装順序

1. **オフライン進行** - インクリメンタルゲームの基本
2. **実績システム** - 目標設定によるモチベーション維持
3. **プレステージシステム** - 長期的な進行目標
4. **自動化機能** - 操作の効率化
5. **設定・統計** - プレイヤー体験の向上

この順序で実装することで、段階的にゲームの深度と魅力を向上させることができます。