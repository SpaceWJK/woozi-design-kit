[한국어](README.md) | [English](README.en.md) | 日本語 | [中文](README.zh.md)

# woozi-design-kit

> **[種類: デザインキット] — 構造骨格31種のカタログ + AI感のないUI生成スキル**

**Claude Code スキル + デザイン骨格カタログ** — 構造骨格31種を目で選び、taste スキルで
AI感のないUIを生成する。

[クイックスタート](#クイックスタート) • [AIに任せる](#-aiに任せる) • [なぜこのツールなのか](#なぜこのツールなのか) • [何が入っているか](#何が入っているか) • [強みと限界](#強みと限界) • [Provenance](#provenance--これはどこから来たのか) • [互換性](#互換性)

---

## クイックスタート

1. `skills/taste/` をプロジェクトの `.claude/skills/` にコピーする。
2. `gallery/index.html` をダブルクリックして開く(サーバー不要)。
3. 気に入った構造骨格カードをクリックして `/taste --macro=<id>` スニペットをコピーする。
4. プロジェクトで `/taste "希望する説明" --macro=<id>` を実行する。

一通りのウォークスルーと架空のランディングページの実践例は
[`docs/usage-guide.md`](docs/usage-guide.md) にある。

---

## 🤖 AIに任せる

手動インストールが面倒な場合は、以下のプロンプトを Claude Code など AI コーディングツールにそのまま
貼り付けてください。AI がインストールから使い方の案内まで代行します。

```text
https://github.com/SpaceWJK/woozi-design-kit リポジトリをインストールして使い方を教えて。

1. リポジトリを clone して README.md を読み、このツールの目的と構造を把握して。
2. npm test で7個のテストが通ることを検証し、gallery/index.html をブラウザで開いてカード
   31個が正常に表示されるか確認して。
3. 私の環境に合わせてスキル/プリセットの参照設定(skills/taste/ を .claude/skills/ にコピー、
   macrostructures参照パスの確認)をして。適用前に何をどこにインストール/変更するかをまず
   見せて、私の承認を得て。
4. インストールが終わったら: 主要機能ごとの使い方、有効化/無効化の方法、問題発生時の
   ロールバック方法をまとめて教えて。
5. 失敗するステップがあれば、エラー原文と原因、解決方法を説明して。
```

---

## なぜこのツールなのか

- **課題** — AIが作るUIはどれも似たような見た目になる。紫のグラデーションカード、均等な3列
  グリッド、中央揃えのヒーロー — 色やフォントを変えても「AIが作った感」は残る。原因は色/
  フォント(表層)ではなく、**構造の文法**(ページがどんな形に組まれるか)がそもそも存在しない
  ことにある。ダイヤルで強度を調整する生成スキルはあっても、「このページはbentoグリッドで
  組むのか、statリードで組むのか」を決める語彙自体が欠けていれば、毎回同じデフォルトレイアウト
  に収束してしまう。
- **解決策** — 構造骨格31種を定義したカタログ(`macrostructures/`)と、その骨格を `--macro=<id>`
  引数で直接消費する生成スキル(`skills/taste/`)を1つのリポジトリにまとめた。骨格が「体の形を
  どう組むか」を、ダイヤル(VAR/MOT/DEN — バリエーション/モーション/密度)が「どれくらい強く
  仕上げるか」を決める — この2軸は分離されているので、構造を固定したままトーンだけ変えたり、
  その逆をしたりも自由だ。
- **証拠** — 31種すべてが即座に閲覧可能な静的デモ(`macrostructures/demos/*.html`)とSVG
  ダイアグラム(`macrostructures/thumbnails/`)を備えている — `gallery/index.html` を
  ダブルクリックすればサーバーなしでそのままカードグリッドを眺められる。
  `scripts/lint-designkit.mjs` がJSON・デモ・ダイアグラム・ギャラリーデータの4箇所のid整合性
  (31/31/31/31)と外部依存0を機械的に検証する(`npm test`)。`taste` スキル自体は数か月間
  実際のUI作業に繰り返し使われながら磨かれたメソドロジーだ — WCAGコントラストゲート、
  アクセシビリティゲート、レイアウト堅牢性ゲートがすべて生成時点で自動適用される。この
  カタログのデザインコンセプトは、実際に運用中のQAダッシュボードサービスに適用され検証済みだ。

---

## 何が入っているか

| 構成要素 | 場所 | できること |
|---|---|---|
| `taste` スキル | `skills/taste/SKILL.md` | プレミアムなフロントエンドUIの生成/監査/リデザイン。React/Next.js + Tailwind CSS専用。ダイヤル3軸(VAR/MOT/DEN)の自動推論 + `--macro`による構造骨格の指定 + WCAG/アクセシビリティ/レイアウトゲート + 自己採点4基準 |
| 構造骨格31種 | `macrostructures/` | `macrostructures.md`(説明文書) + `macrostructures.json`(構造化データ) + `demos/*.html`(実物デモ31個) + `thumbnails/ms-*.svg`(ダイアグラム31個) |
| 静的ギャラリー | `gallery/index.html` | 31種を検索・タグフィルター・並べ替えで一覧でき、カードをクリックすると説明/避けるべき場面/デモ/`/taste --macro=<id>` スニペットを表示する無依存の静的ページ。`file://` で直接開いても、GitHub Pagesにデプロイしても同じように動作する |
| 使用ガイド | `docs/usage-guide.md` | インストール → ギャラリーで骨格を選択 → スニペット実行 → 採点確認までの1セッションウォークスルー + 架空のランディングページ実践例 |
| 整合性検証 | `scripts/lint-designkit.mjs` | id整合・外部依存0・内部専用の痕跡残存0を機械的に検証する(`npm test`) + 自己検証(seeded-defect self-test)を含む |

---

## 強みと限界

### 一緒に使うと良い組み合わせ

各行は「実運用で検証済み」(実際にこう組み合わせて使っている根拠があるもの)と「推奨(理論上)」
(まだ実例はないが試す価値があるもの)を区別する。漠然とした羅列ではなく実測に基づく根拠を残す —
仮定と実測が食い違った点も隠さない。

| 連携先 | 関係 | 区分 |
|---|---|---|
| woozi-design-kit 内部(macrostructures → taste) | 骨格を先に選択 → `--macro` ダイヤルで生成。骨格を指定すると、生成→採点→再作業ループの失敗軸(構造の見誤り)が1つ減る — 再作業理由が「構造が合っていない」から「トーンが合っていない」に絞られる | **実運用で検証済み** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) の `deep-review` | tasteが生成したUIを完成後、全体の文脈で再検討する(UIが対象の場合に限る条件付き10番目の軸)。tasteの自己採点(生成時点、単一コンポーネント単位)とは違い、複数回のtaste呼び出しで組み立てられたページ全体のトーンの一貫性を捉える | **実運用で検証済み** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) の `predeploy` | デプロイ前10軸監査のうちレスポンシブ/アクセシビリティ/UX軸がtasteの成果物にもそのまま適用される既存ゲート | **実運用で検証済み** |
| [`woozi-claude-guards`](https://github.com/SpaceWJK/woozi-claude-guards) の `regression-grep-guard` / `simplicity-check` | ファイルEdit/Writeフックとしてグローバルに適用 — tasteがコンポーネントpropsを変更したり、REDESIGNの範囲が過度に広がったりした際に自動警告する | **実運用で検証済み** |
| [`woozi-brain`](https://github.com/SpaceWJK/woozi-brain) | UIの好みに関するフィードバックを経験として蓄積し、次の生成に自動反映する学習ループ(原理レベル)。別途MCPサーバーのインストールが前提なので「原理は実運用で検証済み、連携自体はユーザー次第」 | **実運用で検証済み(原理レベル)** |
| [`woozi-agent-qa`](https://github.com/SpaceWJK/woozi-agent-qa) | フロントエンドエージェントがtasteをどれだけうまく活用できているかをexamフレームで検証する | **推奨(理論上)** — tasteを対象とした実際のexam実施事例はまだ確認されていない |

#### 成果物タイプ別のレビュー担当 — editorial-auditの位置づけの訂正

このリポジトリが扱うもの(構造骨格 + ダイヤルでコンセプトを適用すること)は、`taste` が作る
すべてのReact/Tailwind成果物に当てはまる — 「Reactアプリはレビュー対象から外れる」という意味
ではない。分かれるのは**デザインコンセプト・骨格の適用範囲ではなく、完成物の視覚品質をどの
ツールでレビューするか**だ:

| 成果物タイプ | レビュー担当 |
|---|---|
| React/Tailwind UI(tasteで生成したコンポーネント・ページ) | `taste` 自身のauditモード(AI Tells + Golden Rulesの自動検出) + [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) の `deep-review`(UIが対象の場合限定の10番目の軸、完成後に全体の文脈で再検討) |
| 文書型HTML(スライドデック・レポート・ガイド) | [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) の `editorial-audit` — スキル自身の本文に「Reactアプリのコンポーネント生成/監査はtasteの担当、このスキルは文書型HTML専用」という境界が明記されている |

つまりeditorial-auditが「外れる」のではなく、**tasteが作る成果物(Reactアプリ)のレビューは
そもそもその役割ではなかった**というだけだ。Reactコンポーネントを文書型HTMLのレビュー基準で
再検討したり、スライドデックをtasteで監査したりすれば、どちらも設計意図の範囲を外れる —
成果物タイプに合った行をそのまま辿ればよい。

### 限界(正直に)

- **色/ムードのプリセットシステムは含まれていない。** `macrostructures.md` は「テーマ: ダーク
  ミニマル」のような例を使い、このリポジトリなしでも理解できるよう一般化してあるが、実際の
  色トークン・ムードプリセットカタログはこのリポジトリの出所である環境に別途存在し、ライセンス
  が不明確なため収録していない。`taste` はこうしたプリセットがなくても、プロンプトのキーワードに
  基づくダイヤル自動推論だけで完全に動作する。
- **[StyleSeed](https://github.com/bitjaru/styleseed) 連携は任意だ。** 別のMITオープンソース
  デザインエンジンで、あればGolden Rulesを追加で参照し、なければ警告を1行出した上で基本の
  AI Tellsルールのみ適用する — このリポジトリにはベンダリングしていない(再配布権限がない)。
  `skills/taste/SKILL.md` のPHASE 0参照。
- **静的ギャラリーには構造骨格タブのみがある。** 元の環境のギャラリーには色/ムードプリセット
  グリッドとダイヤルスタジオタブもあったが、その2つのタブはライセンス不明のアセットと結びついて
  いるため、今回の公開では意図的に除外した — 骨格をそのまま見せることに限定している。
- **エージェント名は例示だ。** `taste` の本文に登場する `web-frontend` のようなサブエージェント
  呼び出しは、このスキルを作った環境のカスタムエージェントを指す — このリポジトリはその
  エージェント定義を含まない。Claude Codeのデフォルトエージェントに置き換えるか、自分で設計する
  必要がある。

---

## テスト

```bash
npm test
# または直接:
node scripts/lint-designkit.mjs
```

`scripts/lint-designkit.mjs` は外部依存0(Node組み込みモジュールのみ)で:

1. `macrostructures.json` ↔ `macrostructures/demos/*.html` ↔ `macrostructures/thumbnails/ms-*.svg`
   ↔ `gallery/gallery-data.js` の4箇所のid集合が正確に一致するか確認(31個すべて)
2. デモ・ダイアグラム・ギャラリーファイルに外部URLがないか確認(SVGの `xmlns` 名前空間宣言は
   ホワイトリスト処理)
3. リポジトリ全体に残った専用の痕跡(「まだ消し切れていない」という印)がないか確認する。2層
   構造: (a) 組み込み — 組織名と無関係な汎用マーカー3種(正確な文字列はスクリプトの
   `BUILTIN_FORBIDDEN_PATTERNS` 参照)のみ基本検査する。この公開リポジトリ自体には特定の
   組織名・チケット体系は一切含まれていない。
   (b) 拡張 — リポジトリのルートに `lint.tokens.json`(任意、`.gitignore` 登録済み)があれば
   自動で追加読み込みする。このファイルに各自の組織のプロジェクトコードネーム・内部チケットID
   体系・内部ユーザー名などを登録すると、そのフォークでのみ追加検査される — 形式は
   `lint.tokens.example.json` を参照
4. **自己検証(self-test)** — 上記3つの検査ロジック自体が欠陥を実際に検出できるか、6種類の
   欠陥(id不一致/外部URLの検出漏れ/xmlns誤検知/組み込みマーカーの漏出/CRLF回避/組織別拡張
   パターンのコンパイル・マッチング/不正な正規表現の安全処理)をメモリ上のフィクスチャに注入して
   全て検出されるか確認する。CRLFでチェックアウトされたファイルでも検出が維持されるか別途検証
   する(Windows `core.autocrlf=true` 環境対応、`.gitattributes` 参照)

---

## 互換性

| 項目 | 要件 |
|---|---|
| Node.js | 14.18+(組み込みモジュールのみ使用、`npm install` 不要 — lint実行にのみ必要) |
| ギャラリー(`gallery/`) | 純粋なHTML/CSS/JS、ビルドツール不要。ブラウザさえあれば `file://` で直接開ける |
| Claude Code | スキルfrontmatter(`name`/`description`)標準形式 — 別途バージョン制約なし |
| 対象スタック(taste成果物) | React / Next.js + Tailwind CSS(v3/v4自動検出) |
| OS | スクリプト・デモ・ギャラリーすべてクロスプラットフォーム(パス区切り文字ハードコードなし)、CRLF/LF両方でlint通過確認 |

---

## Provenance — これはどこから来たのか

| 構成要素 | 分類 | 原本 | ライセンス | 我々の改造の要約 |
|---|---|---|---|---|
| `taste`(UI生成スキル) | ②forked-hardened | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | 3軸ダイヤル(VAR/MOT/DEN)の自動推論、構造骨格(`--macro`)の統合、variants代替案 + 自動採点、WCAG/アクセシビリティ/レイアウト堅牢性ゲートを多数新設 — 詳細: [`skills/taste/ATTRIBUTION.md`](skills/taste/ATTRIBUTION.md) |
| `macrostructures`(構造骨格31種) | ②forked-hardened | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | 原本21種の日本語再記述 + 自社設計10種の増補(計31種) + SVGダイアグラム31個・デモHTML31個の新規制作 + tasteとの直交統合フレームワーク — 詳細: [`macrostructures/ATTRIBUTION.md`](macrostructures/ATTRIBUTION.md) |

両構成要素とも、原文のライセンス(MIT)表記をそれぞれの `ATTRIBUTION.md` に維持している。
macrostructuresの実務アプリ系デモのうち1つ(`data-table-workspace.html`)は、このリポジトリを
準備する過程で見つかった実運用モックデータを、すべて架空の値に書き換えた — レイアウトの文法
自体は原本のままだ。

---

## 標準構成

- `LICENSE` — MIT
- `skills/taste/ATTRIBUTION.md`、`macrostructures/ATTRIBUTION.md` — 原本ライセンス表記2種
- `CONTRIBUTING.md` — PR前チェックリスト、新規骨格追加手順
- `.gitattributes` — `eol=lf` 強制(Windows `autocrlf=true` 環境防御)
- `.gitignore` — `lint.tokens.json`(組織別lint拡張ファイル)を含む
- `lint.tokens.example.json` — `lint.tokens.json` の作成形式の例(各自の組織名・チケット体系は
  このファイルを複製して登録し、原本の例示ファイルはコミットのまま維持する)
- `package.json` — `npm test` = lintスクリプト
- `docs/GLOSSARY.md` — このリポジトリ全体で使われる用語(macrostructure、ダイヤル3軸、
  Provenanceバケットなど)の定義
- `docs/usage-guide.md` — インストールから実践例までのウォークスルー

---

## ライセンス

MIT — 詳細は [`LICENSE`](LICENSE) を参照。

<div align="center">

**構造をまず決め、トーンを後から纏う、正直に改造されたデザインキット**

</div>
