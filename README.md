# AI Agent Strands 🚀

## リアルタイム AI 対話を実現するストリーミング API サーバー

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

### 🌟 プロジェクト概要

**「身近な人にAIを有効活用して欲しい」** というシンプルな願いから生まれたプロジェクト。

- **スケーラビリティ**: 軽量フレームワーク Hono で、高負荷にも対応
- **開発効率**: TypeScript とモジュール化されたアーキテクチャで、メンテナンス性向上

### 🎯 主な機能

#### 1. ヘルスチェック API (`/ping`)
サーバーの稼働状況を確認できます。

```bash
curl http://localhost:9000/ping
# {"status":"Healthy","time_of_last_update":1768641359}
```

#### 2. AI 対話 API (`/invocations`)
プロンプトを送信すると、AI がストリーミングでレスポンスを返します。

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"prompt":"日本の総理大臣は？"}' \
     http://localhost:9000/invocations

# 出力例:
# 2026年1月17日現在、日本の総理大臣は高市早苗氏です。
# 彼女は自民党の政治家で、...
```

### 🏗️ アーキテクチャ & 技術的なハイライト

#### モジュール化された設計
```
src/
├── index.ts              # 🚀 エントリーポイント
├── server/
│   ├── app.ts           # ⚙️ Hono アプリ設定 & サーバー起動
│   └── routes/          # 🛣️ API エンドポイント
├── strands-agents/      # 🤖 AI 関連コア機能
│   ├── agent.ts         # AI エージェント作成
│   ├── model.ts         # Bedrock モデル設定
│   └── tools.ts         # 検索・カレンダーツール
```

#### ストリーミングの実装
```typescript
// リアルタイムストリーミングの核心
return streamText(c, async (stream) => {
  for await (const event of agent.stream(prompt)) {
    if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
      await stream.write(event.delta.text);  // 文字単位で送信
    }
  }
});
```

#### パフォーマンス最適化
- **軽量フレームワーク**: Hono でメモリ使用量を最小化
- **ストリーミング**: 大量データでもメモリ効率的に処理
- **型安全**: TypeScript でランタイムエラーを防ぐ

### 🛠️ 技術スタック詳細

| 技術 | 役割 | 選定理由 |
|------|------|----------|
| **Hono** | Web フレームワーク | 高速・軽量、ストリーミングネイティブ対応 |
| **TypeScript** | 言語 | 型安全で大規模開発に適し、エラーを早期発見 |
| **Node.js** | ランタイム | 非同期処理が得意で、ストリーミングに最適 |
| **Docker** | コンテナ化 | 環境依存ゼロ、CI/CD との統合が容易 |
| **@strands-agents/sdk** | AI SDK | AWS Bedrock を簡単に利用可能 |

### 🚀 セットアップ & 実行方法

#### 必要条件
- Docker & Docker Compose
- AWS クレデンシャル (Bedrock 利用時)

#### 1. リポジトリをクローン
```bash
git clone <repository-url>
cd ai_agent_strands
```

#### 2. 環境変数を設定
`.env` ファイルを編集:
```bash
# AWS 設定
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Tavily API (検索機能用)
TAVILY_API_KEY=your-tavily-key
```

#### 3. Docker で起動
```bash
# ビルド & 起動
docker compose up --build

# バックグラウンド実行
docker compose up -d --build
```

#### 4. API をテスト
```bash
# ヘルスチェック
curl http://localhost:9000/ping

# AI 対話テスト
curl -X POST -H "Content-Type: application/json" \
     -d '{"prompt":"こんにちは！"}' \
     http://localhost:9000/invocations
```

