[한국어](README.md) | [English](README.en.md) | [日本語](README.ja.md) | 中文

# woozi-design-kit

> **[类型: 设计工具包] — 31种结构骨架目录 + 无AI感UI生成技能**

**Claude Code 技能 + 设计骨架目录** —— 用眼睛挑选31种结构骨架之一,再用 taste 技能生成
没有AI感的UI。

[快速开始](#快速开始) • [交给AI处理](#-交给ai处理) • [为什么选择这个工具](#为什么选择这个工具) • [里面有什么](#里面有什么) • [优势与局限](#优势与局限) • [Provenance](#provenance--这些内容来自哪里) • [兼容性](#兼容性)

---

## 快速开始

1. 把 `skills/taste/` 复制到项目的 `.claude/skills/` 中。
2. 双击打开 `gallery/index.html`(不需要服务器)。
3. 点击喜欢的结构骨架卡片,复制它的 `/taste --macro=<id>` 代码片段。
4. 在项目中执行 `/taste "想要的描述" --macro=<id>`。

完整的操作流程以及一个虚构落地页的实战示例,请见 [`docs/usage-guide.md`](docs/usage-guide.md)。

---

## 🤖 交给AI处理

如果觉得手动安装麻烦,把下面的提示词原样粘贴到 Claude Code 等AI编程工具中即可。AI会代替你完成
从安装到使用说明的全部工作。

```text
帮我安装 https://github.com/SpaceWJK/woozi-design-kit 这个仓库,并告诉我怎么用。

1. 克隆这个仓库,阅读 README.md,弄清楚这个工具的目的和结构。
2. 用 npm test 验证7个测试是否全部通过,再用浏览器打开 gallery/index.html,确认31张卡片
   是否正常显示。
3. 根据我的环境完成技能/预设的引用配置(把 skills/taste/ 复制到 .claude/skills/ 中,并确认
   macrostructures 的引用路径)。应用之前先告诉我具体会在哪里安装/修改什么内容,并征得我的
   同意。
4. 安装完成后:请总结每个核心功能的用法、如何启用/禁用,以及出问题时如何回滚。
5. 如果某个步骤失败,请解释原始错误信息、原因以及解决方法。
```

---

## 为什么选择这个工具

- **问题** —— AI生成的UI看起来都差不多。紫色渐变卡片、均分的三列网格、居中对齐的Hero区块 ——
  就算换掉颜色或字体,"这是AI做的"这种感觉还是挥之不去。原因不在于色彩/字体这类表层元素,而在于
  根本不存在**结构语法**(页面到底该以什么形态搭建)。就算有能调节强度的生成技能,如果连"这个
  页面该做成bento网格还是stat引导式布局"这种词汇本身都没有,每次生成都只会收敛到同一种默认布局。
- **解决方案** —— 这个仓库把定义了31种结构骨架的目录(`macrostructures/`)和一个通过
  `--macro=<id>` 参数直接消费这些骨架的生成技能(`skills/taste/`)打包在了一起。骨架决定
  "身体的形状要怎么搭",而调节参数(VAR/MOT/DEN —— 变化/动效/密度)决定"要以多强的力度去
  装饰"。这两个维度是相互独立的,所以既可以固定结构只调整基调,也可以反过来。
- **证据** —— 全部31种结构骨架都配有可即时查看的静态演示(`macrostructures/demos/*.html`)和
  SVG示意图(`macrostructures/thumbnails/`)—— 双击 `gallery/index.html` 就能在不需要服务器的
  情况下直接浏览卡片网格。`scripts/lint-designkit.mjs` 会机械化验证JSON、演示、示意图、画廊
  数据这4处的id是否一致(31/31/31/31),以及是否零外部依赖(`npm test`)。`taste` 技能本身是
  一套经过数月实际UI工作反复打磨出来的方法论 —— WCAG对比度关卡、无障碍关卡、布局稳健性关卡
  全部会在生成时自动应用。这个目录中的设计理念已经在一个正式运营中的QA仪表盘服务上得到过应用
  和验证。

---

## 里面有什么

| 组成部分 | 位置 | 做的事 |
|---|---|---|
| `taste` 技能 | `skills/taste/SKILL.md` | 高端前端UI的生成/审计/重新设计。仅限React/Next.js + Tailwind CSS。自动推断3轴调节参数(VAR/MOT/DEN) + 通过 `--macro` 指定结构骨架 + WCAG/无障碍/布局关卡 + 4项标准的自我评分 |
| 31种结构骨架 | `macrostructures/` | `macrostructures.md`(说明文档) + `macrostructures.json`(结构化数据) + `demos/*.html`(31个实物演示) + `thumbnails/ms-*.svg`(31张示意图) |
| 静态画廊 | `gallery/index.html` | 通过搜索、标签筛选、排序浏览全部31种;点击卡片会显示说明、应避免的场景、演示,以及可直接复制的 `/taste --macro=<id>` 代码片段。零依赖 —— 无论是通过 `file://` 直接打开,还是部署到GitHub Pages,效果都一样 |
| 使用指南 | `docs/usage-guide.md` | 从安装 → 在画廊中挑选骨架 → 执行代码片段 → 查看评分的单次会话完整流程,外加一个虚构落地页的实战示例 |
| 完整性校验 | `scripts/lint-designkit.mjs` | 机械化验证id一致性、零外部依赖、零内部专用痕迹残留(`npm test`),并包含自我验证(seeded-defect self-test) |

---

## 优势与局限

### 搭配使用效果好的组合

每一行都区分了"实战验证过"(有实际证据表明这样组合使用过)和"推荐(理论上)"(还没有真实案例,
但值得尝试)。这不是一份含糊的清单 —— 就连假设与实测结果出现分歧的地方,也照实标注出来。

| 搭配对象 | 关系 | 分类 |
|---|---|---|
| woozi-design-kit 内部(macrostructures → taste) | 先选骨架 → 再用 `--macro` 调节参数生成。固定结构之后,"生成→评分→返工"这个循环里就少了一个失败维度(结构判断错误)—— 返工的原因会从"结构不对"收窄为"基调不对" | **实战验证过** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) 的 `deep-review` | 在taste生成的UI完成之后,在完整上下文中重新审视它(仅当对象含UI时,作为附加的第10个维度)。与taste自身的评分(生成时刻、单个组件粒度)不同,这一步能捕捉由多次taste调用拼装而成的整页在基调上的漂移 | **实战验证过** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) 的 `predeploy` | 部署前10维度审计中的响应式/无障碍/UX维度,原样适用于taste的产出物,是一个无需额外接线的现成关卡 | **实战验证过** |
| [`woozi-claude-guards`](https://github.com/SpaceWJK/woozi-claude-guards) 的 `regression-grep-guard` / `simplicity-check` | 通过Edit/Write钩子全局生效 —— 当taste修改组件props,或REDESIGN的范围变得过大时会自动发出警告 | **实战验证过** |
| [`woozi-brain`](https://github.com/SpaceWJK/woozi-brain) | 把对UI偏好的反馈积累为经验,并自动反映到下一次生成中的学习循环(原理层面)。由于以另外安装MCP服务器为前提,所以"原理已经过实战验证,但集成本身要靠用户自己完成" | **实战验证过(仅限原理层面)** |
| [`woozi-agent-qa`](https://github.com/SpaceWJK/woozi-agent-qa) | 用它的exam框架来验证前端代理到底把taste用得有多好 | **推荐(理论上)** —— 目前尚未确认有针对taste的真实exam运行案例 |

#### 按产出物类型划分的审校负责 —— 纠正editorial-audit的定位

这个仓库所涉及的内容(通过结构骨架+调节参数来应用设计理念)覆盖了 `taste` 生成的每一份
React/Tailwind产出物 —— 这并不意味着"React应用被排除在审校范围之外"。真正的分界线不在于
**设计理念/骨架的应用范围**,而在于**由哪个工具来审校最终成品的视觉质量**:

| 产出物类型 | 审校负责方 |
|---|---|
| React/Tailwind UI(taste生成的组件/页面) | `taste` 自身的audit模式(自动检测AI Tells + Golden Rules) + [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) 的 `deep-review`(仅当对象含UI时的第10个维度,完成后在完整上下文中再审视) |
| 文档型HTML(幻灯片、报告、指南) | [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills) 的 `editorial-audit` —— 它自己的技能文件中明确写明了边界:"React应用组件的生成/审计归taste负责,这个技能只负责文档型HTML" |

换句话说,editorial-audit并不是"被排除"了,而是**审校taste生成的产出物(React应用)本来就
不属于它的职责**。把React组件按文档型HTML的审校标准去重新审视,或者用taste去审计一份幻灯片,
这两种做法都超出了各自的设计意图 —— 只需按产出物类型对应到相应的那一行即可。

### 局限(如实说明)

- **不包含配色/氛围预设系统。** `macrostructures.md` 用"主题:深色极简"之类的示例做了泛化
  处理,即便没有这个仓库缺失的预设系统也能独立理解,但实际的色彩令牌/氛围预设目录存在于这个
  仓库来源的另一个环境中,且许可证归属不明确,因此未收录进来。`taste` 即便没有这些预设,也能
  完全依靠基于提示词关键词的调节参数自动推断来正常运作。
- **[StyleSeed](https://github.com/bitjaru/styleseed) 集成是可选的。** 这是一个独立的MIT开源
  设计引擎,如果存在,`taste` 会额外参考它的Golden Rules;如果不存在,则打印一行警告后回退到
  自身基础的AI Tells规则 —— 本仓库并未随附这个引擎(没有再分发权限)。详见
  `skills/taste/SKILL.md` 的PHASE 0。
- **静态画廊只提供结构骨架这一个标签页。** 原始环境中的画廊还有配色/氛围预设网格以及调节参数
  工作室标签页,但这两个标签页都和许可证归属不明的素材绑在一起,因此在这次发布中被有意排除 ——
  这个画廊只限于原样展示骨架本身。
- **代理名称仅为示例。** `taste` 正文中出现的 `web-frontend` 之类的子代理调用,指的是制作这个
  技能的环境中使用的自定义代理 —— 本仓库不包含该代理的定义。请替换为Claude Code的默认代理,
  或者自行设计。

---

## 测试

```bash
npm test
# 或者直接运行:
node scripts/lint-designkit.mjs
```

`scripts/lint-designkit.mjs` 零外部依赖(仅使用Node内置模块),会:

1. 验证 `macrostructures.json` ↔ `macrostructures/demos/*.html` ↔
   `macrostructures/thumbnails/ms-*.svg` ↔ `gallery/gallery-data.js` 这4处的id集合是否完全一致
   (全部31个)
2. 验证演示、示意图、画廊文件中是否引用了外部URL(SVG的 `xmlns` 命名空间声明作为白名单处理)
3. 验证整个仓库中是否残留有"还没删干净"的专用痕迹标记。分为两层: (a) 内置 —— 仅基础检查
   与组织名无关的3种通用标记(确切字符串参见脚本中的 `BUILTIN_FORBIDDEN_PATTERNS`)——
   这个公开仓库本身完全不包含任何特定组织名或工单体系。
   (b) 扩展 —— 如果仓库根目录下存在 `lint.tokens.json`(可选,已加入 `.gitignore`),会
   自动额外加载。在这个文件中登记各自组织的项目代号、内部工单ID体系、内部用户名等信息后,
   只会在该分支上进行额外检查 —— 格式参见 `lint.tokens.example.json`
4. **自我验证(self-test)** —— 验证上述三项检查逻辑本身是否真的能检测出缺陷:向内存中的
   夹具注入6种缺陷(id不一致/漏检外部URL/xmlns误判/内置标记泄漏/CRLF规避/组织专属扩展模式的
   编译与匹配/非法正则表达式的安全处理),确认全部都能被检测到。同时单独验证在以CRLF方式检出
   的文件上,检测能力是否依然保持(针对Windows `core.autocrlf=true` 环境,参见 `.gitattributes`)

---

## 兼容性

| 项目 | 要求 |
|---|---|
| Node.js | 14.18+(仅使用内置模块,无需 `npm install` —— 只有运行lint时才需要) |
| 画廊(`gallery/`) | 纯HTML/CSS/JS,无需构建工具。只要有浏览器就能通过 `file://` 直接打开 |
| Claude Code | 技能frontmatter(`name`/`description`)标准格式 —— 无其他版本限制 |
| 目标技术栈(taste的产出物) | React / Next.js + Tailwind CSS(自动检测v3/v4) |
| OS | 脚本、演示、画廊均跨平台(未硬编码路径分隔符),已确认在CRLF/LF两种情况下lint均能通过 |

---

## Provenance — 这些内容来自哪里

| 组成部分 | 分类 | 原始出处 | 许可证 | 我们做的改动摘要 |
|---|---|---|---|---|
| `taste`(UI生成技能) | ②forked-hardened | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | 新增3轴调节参数(VAR/MOT/DEN)的自动推断、整合了结构骨架(`--macro`)、新增了variants候选方案+自动评分、新增了多项WCAG/无障碍/布局稳健性关卡 —— 详情见 [`skills/taste/ATTRIBUTION.md`](skills/taste/ATTRIBUTION.md) |
| `macrostructures`(31种结构骨架) | ②forked-hardened | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | 把原版21种改写成中文表述 + 自行新设计增补了10种(共31种) + 新制作了31张SVG示意图和31个演示HTML + 构建了与taste的正交集成框架 —— 详情见 [`macrostructures/ATTRIBUTION.md`](macrostructures/ATTRIBUTION.md) |

以上两个组成部分都在各自的 `ATTRIBUTION.md` 中保留了原始的许可证(MIT)声明。
macrostructures的实用应用类演示中有一个(`data-table-workspace.html`),其原本包含的、在
准备本仓库过程中发现的真实业务模拟数据,已全部改写为虚构数值 —— 但布局语法本身与原版一致。

---

## 标准目录结构

- `LICENSE` —— MIT
- `skills/taste/ATTRIBUTION.md`、`macrostructures/ATTRIBUTION.md` —— 两份原始许可证声明
- `CONTRIBUTING.md` —— PR前检查清单、新增骨架的操作流程
- `.gitattributes` —— 强制 `eol=lf`(防御Windows `autocrlf=true` 环境)
- `.gitignore` —— 包含 `lint.tokens.json`(组织专属的lint扩展文件)
- `lint.tokens.example.json` —— `lint.tokens.json` 的编写格式示例(各自的组织名/工单体系请
  复制这个文件后登记,原始示例文件本身继续保留在提交历史中)
- `package.json` —— `npm test` = lint脚本
- `docs/GLOSSARY.md` —— 本仓库全局使用的术语(macrostructure、调节参数3轴、Provenance分类
  等)定义
- `docs/usage-guide.md` —— 从安装到实战示例的完整流程

---

## 许可证

MIT —— 详情参见 [`LICENSE`](LICENSE)。

<div align="center">

**先定结构、后穿基调的诚实改造版设计工具包**

</div>
