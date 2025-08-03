# デバッグ機能

## 概要
Plus Fantasy Gameには開発・テスト用のデバッグ機能が組み込まれています。これらの機能を使用することで、ゲームの各段階を素早くテストしたり、特定の状況を再現したりできます。

## ゴールド追加機能

### 使用方法
1. **ブラウザの開発者ツールを開く**
   - Windows/Linux: `F12` または `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

2. **コンソールタブに移動**
   - 開発者ツール内の「Console」タブをクリック

3. **デバッグコマンドを実行**
   ```javascript
   debugAddGold(金額)
   ```

### 使用例

#### 基本的な使用例
```javascript
// 1,000ゴールド追加（序盤テスト用）
debugAddGold(1000)

// 10,000ゴールド追加（中盤テスト用）
debugAddGold(10000)

// 100,000ゴールド追加（終盤テスト用）
debugAddGold(100000)

// 1,000,000ゴールド追加（ゲームクリア条件達成）
debugAddGold(1000000)
```

#### 段階別テストシナリオ
```javascript
// 序盤: 見習い冒険者を購入可能
debugAddGold(50)

// 中盤: 複数の仲間と施設を購入可能
debugAddGold(5000)

// 終盤: 高レベルエンティティの購入が可能
debugAddGold(50000)

// ゲームクリア: 世界樹建設条件を満たす
debugAddGold(1000000)
```

### 動作詳細
- **ゴールド残高**: 指定した金額が現在のゴールドに加算されます
- **総獲得ゴールド**: 追加された金額が総獲得ゴールドにも反映されます
- **ログ表示**: ゲーム内ログに「デバッグ: Xゴールドを追加しました」と記録されます
- **エンティティアンロック**: 総獲得ゴールドの増加により、新しいエンティティがアンロックされる場合があります
- **ゲームクリア**: 世界樹建設済み + 総獲得ゴールド100万以上でゲームクリア条件を満たします

## テストシナリオ

### 1. チュートリアルテスト
```javascript
// チュートリアルをスキップせずに、各段階で必要な金額を追加
debugAddGold(10)   // 見習い冒険者購入
debugAddGold(50)   // 複数回のレベルアップ
debugAddGold(200)  // 施設建設
```

### 2. エンティティアンロックテスト
```javascript
// 段階的にエンティティをアンロック
debugAddGold(100)    // 初期エンティティ
debugAddGold(1000)   // 中級エンティティ
debugAddGold(10000)  // 上級エンティティ
debugAddGold(100000) // 最終エンティティ
```

### 3. ゲームクリアテスト
```javascript
// 世界樹建設 + クリア条件達成
debugAddGold(1000000)
// その後、world_treeエンティティを購入してクリア画面を確認
```

### 4. パフォーマンステスト
```javascript
// 大量のゴールドでUI動作確認
debugAddGold(10000000)  // 1000万ゴールド
debugAddGold(100000000) // 1億ゴールド
```

## 注意事項

### セキュリティ
- この機能は**開発・テスト専用**です
- 本番環境では削除または無効化することを推奨します
- `window.debugAddGold`としてグローバルスコープに公開されています

### データ整合性
- デバッグで追加されたゴールドも通常のゲームデータと同様に扱われます
- LocalStorageに保存され、ゲーム再起動後も維持されます
- 正常なゲーム状態に戻すには「ゲームリセット」機能を使用してください

### パフォーマンス
- 極端に大きな数値（例: 1兆ゴールド）は表示やパフォーマンスに影響する可能性があります
- テストには適度な金額を使用することを推奨します

## その他のデバッグ情報

### LocalStorage確認
ゲーム状態は以下のキーでLocalStorageに保存されています：
```javascript
// ゲーム状態を確認
console.log(JSON.parse(localStorage.getItem('incremental-fantasy-save')))

// ゲーム状態をクリア
localStorage.removeItem('incremental-fantasy-save')
```

### ゲーム状態のバックアップ
```javascript
// 現在の状態をバックアップ
const backup = localStorage.getItem('incremental-fantasy-save')
console.log('Backup:', backup)

// バックアップから復元
localStorage.setItem('incremental-fantasy-save', backup)
location.reload()
```

## 実装済みデバッグ機能

### ゲーム状態確認
```javascript
// 現在のゲーム状態を詳細表示
debugCheckGameState()
```

**表示される情報：**
- 世界樹の状態とレベル
- 総獲得ゴールド
- 各クリア条件の達成状況
- ゲームクリア状態
- クリア画面表示フラグ

**使用例：**
```javascript
// ゲームクリアが表示されない時の調査
debugCheckGameState()

// 出力例:
// === ゲーム状態デバッグ (最新) ===
// 世界樹: {id: 'world_tree', level: 1, ...}
// 世界樹レベル > 0: true
// 総獲得ゴールド: 1500000
// ゴールド条件達成: true
// ゲームクリア状態: true
// クリア画面表示済み: false
```

### クリア状態管理
```javascript
// クリア状態をリセット（再度クリア画面を表示可能にする）
debugResetClearState()

// 強制的にゲームクリア状態を設定
debugForceGameClear()
```

**`debugResetClearState()`の用途：**
- ゲームクリア画面のテスト
- クリア条件達成後の動作確認
- 複数回のクリア体験テスト

**`debugForceGameClear()`の用途：**
- クリア画面の表示テスト
- クリア時間やランキング表示の確認
- UI/UXのテスト

### 使用シナリオ例

#### ゲームクリア機能のテスト
```javascript
// 1. クリア状態をリセット
debugResetClearState()

// 2. 充分なゴールドを追加
debugAddGold(2000000)

// 3. 世界樹を購入（ゲーム画面で）
// → ゲームクリア画面が表示される

// 4. 状態確認
debugCheckGameState()
```

#### クリア画面表示の緊急テスト
```javascript
// クリア条件を満たさずに強制表示
debugForceGameClear()
// → 即座にゲームクリア画面が表示される
```

#### クリア後の継続プレイテスト
```javascript
// 1. クリア画面表示
debugForceGameClear()

// 2. 「続けてプレイ」ボタンをクリック

// 3. 状態確認
debugCheckGameState()
// → hasShownClearScreen: true になっている

// 4. 再度クリア画面を表示したい場合
debugResetClearState()
```

## セキュリティと注意事項

### 本番環境での取り扱い
- これらの機能は開発・テスト専用です
- 本番環境では削除または無効化を推奨します
- すべて`window`オブジェクトにアタッチされています

### データ整合性
- デバッグ機能で変更された状態もLocalStorageに保存されます
- 正常な状態に戻すには「ゲームリセット」機能を使用してください
- バックアップ機能を活用して安全にテストを行ってください

## 今後の拡張予定

### 追加予定のデバッグ機能
- エンティティレベル直接設定: `debugSetEntityLevel(entityId, level)`
- 時間経過シミュレート: `debugFastForward(seconds)`
- チュートリアル段階制御: `debugSetTutorialStep(step)`
- ゲーム進行状況リセット: `debugResetProgress()`

これらの機能により、様々な角度からゲームの動作を検証できるようになります。