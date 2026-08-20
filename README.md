한국어 | [English](README.en.md) | [日本語](README.ja.md) | [中文](README.zh.md)

# woozi-design-kit

> **[종류: 디자인 킷] — 구조 골격 31종 카탈로그 + AI티 없는 UI 생성 스킬**

**Claude Code 스킬 + 디자인 골격 카탈로그** — 구조 골격 31종을 눈으로 고르고, taste 스킬로
AI티 없는 UI를 생성한다.

[빠른 시작](#빠른-시작) • [AI에게 맡기기](#-ai에게-맡기기) • [왜 이 도구인가](#왜-이-도구인가) • [무엇이 들어있는지](#무엇이-들어있는지) • [강점과 한계](#강점과-한계) • [Provenance](#provenance--무엇이-어디서-왔는가) • [호환성](#호환성)

---

## 빠른 시작

1. `skills/taste/`를 프로젝트의 `.claude/skills/`에 복사한다.
2. `gallery/index.html`을 더블클릭해서 연다 (서버 불필요).
3. 마음에 드는 구조 골격 카드를 클릭해 `/taste --macro=<id>` 스니펫을 복사한다.
4. 프로젝트에서 `/taste "원하는 설명" --macro=<id>`를 실행한다.

전체 워크스루와 가상 랜딩 페이지 실전 예제는 [`docs/usage-guide.md`](docs/usage-guide.md)에
있다.

---

## 🤖 AI에게 맡기기

수동 설치가 번거롭다면, 아래 프롬프트를 Claude Code 등 AI 코딩 도구에 그대로 붙여넣으세요. AI가
설치부터 사용법 안내까지 대신합니다.

```text
https://github.com/SpaceWJK/woozi-design-kit 저장소를 설치하고 사용법을 알려줘.

1. 저장소를 clone하고 README.md를 읽어 이 도구의 목적과 구조를 파악해.
2. npm test로 7개 테스트가 통과하는지 검증하고, gallery/index.html을 브라우저로 열어 카드
   31개가 정상 표시되는지 확인해.
3. 내 환경에 맞게 스킬/프리셋 참조 설정(skills/taste/를 .claude/skills/에 복사, macrostructures
   참조 경로 확인)을 해줘. 적용 전에 무엇을 어디에 설치/변경하는지 먼저 보여주고 내 승인을
   받아.
4. 설치가 끝나면: 핵심 기능별 사용법, 활성화/비활성화 방법, 문제 발생 시 롤백 방법을 요약해서
   알려줘.
5. 실패하는 단계가 있으면 에러 원문과 원인, 해결 방법을 설명해줘.
```

---

## 왜 이 도구인가

- **문제** — AI가 만든 UI는 다 비슷하게 생겼다. 보라색 그라데이션 카드, 3열 균등 그리드,
  센터 정렬 히어로 — 색이나 폰트를 바꿔도 "AI가 만든 티"는 남는다. 원인은 색/폰트(표피)가
  아니라 **구조 문법**(페이지가 어떤 형태로 짜이는가)이 아예 없다는 데 있다. 다이얼로 강도를
  조절하는 생성 스킬은 있어도, "이 페이지는 벤토 그리드로 짤지, 스탯 리드로 짤지"를 정하는
  어휘 자체가 빠져 있으면 매번 같은 기본 레이아웃으로 수렴한다.
- **해법** — 구조 골격 31종을 정의한 카탈로그(`macrostructures/`)와, 그 골격을 `--macro=<id>`
  인자로 직접 소비하는 생성 스킬(`skills/taste/`)을 한 저장소에 묶었다. 골격이 "몸의 형태를
  어떻게 짤지", 다이얼(VAR/MOT/DEN — 변주/모션/밀도)이 "얼마나 강하게 입힐지"를 정한다 —
  두 축이 분리되어 있어서, 구조를 고정한 채 톤만 바꾸거나 그 반대도 자유롭다.
- **증거** — 31종 전부 즉시 열람 가능한 정적 데모(`macrostructures/demos/*.html`)와 SVG
  다이어그램(`macrostructures/thumbnails/`)을 갖추고 있다 — `gallery/index.html`을
  더블클릭하면 서버 없이 바로 카드 그리드로 훑어볼 수 있다. `scripts/lint-designkit.mjs`가
  JSON·데모·다이어그램·갤러리 데이터 4곳의 id 정합(31/31/31/31)과 외부 의존 0을 기계적으로
  검증한다(`npm test`). `taste` 스킬 자체는 수개월간 실제 UI 작업에 반복적으로 쓰이며
  다듬어진 방법론이다 — WCAG 대비 게이트, 접근성 게이트, 레이아웃 견고성 게이트가 전부
  생성 시점에 자동 적용된다. 이 카탈로그의 디자인 컨셉은 실제 운영 중인 QA 대시보드 서비스에
  적용되어 검증된 바 있다.

---

## 무엇이 들어있는지

| 구성 요소 | 위치 | 하는 일 |
|---|---|---|
| `taste` 스킬 | `skills/taste/SKILL.md` | 프리미엄 프론트엔드 UI 생성/감사/리디자인. React/Next.js + Tailwind CSS 전용. 다이얼 3축(VAR/MOT/DEN) 자동 추론 + `--macro`로 구조 골격 지정 + WCAG/접근성/레이아웃 게이트 + 자가 채점 4기준 |
| 구조 골격 31종 | `macrostructures/` | `macrostructures.md`(설명 문서) + `macrostructures.json`(구조화 데이터) + `demos/*.html`(실물 데모 31개) + `thumbnails/ms-*.svg`(다이어그램 31개) |
| 정적 갤러리 | `gallery/index.html` | 31종을 검색·태그 필터·정렬로 훑어보고, 카드 클릭 시 설명/피할 때/데모/`/taste --macro=<id>` 스니펫을 보여주는 무의존 정적 페이지. `file://`로 직접 열어도, GitHub Pages에 배포해도 동일하게 동작 |
| 사용 가이드 | `docs/usage-guide.md` | 설치 → 갤러리에서 골격 선택 → 스니펫 실행 → 채점 확인까지 한 세션 워크스루 + 가상 랜딩 페이지 실전 예제 |
| 무결성 검증 | `scripts/lint-designkit.mjs` | id 정합·외부 의존 0·내부 전용 흔적 잔존 0을 기계적으로 검증(`npm test`) + 자체 검증(seeded-defect self-test) 포함 |

---

## 강점과 한계

### 함께 쓰면 좋은 조합

각 행은 "실사용 검증"(실제로 이렇게 조합해 쓰고 있다는 근거가 있는 것)과 "권장(이론)"(아직
실사례는 없지만 조합해볼 만한 것)을 구분한다. 막연한 나열이 아니라 실측 근거를 남긴다 —
가정과 실측이 갈린 지점도 숨기지 않는다.

| 연계 대상 | 관계 | 구분 |
|---|---|---|
| woozi-design-kit 내부 (macrostructures → taste) | 골격 먼저 선택 → `--macro` 다이얼 생성. 골격 지정 시 생성-채점 재작업 루프의 실패 축(구조 오판)이 하나 줄어든다 — 재작업 사유가 "구조가 안 맞음"에서 "톤이 안 맞음"으로 좁혀진다 | **실사용 검증** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)의 `deep-review` | taste가 생성한 UI를 완성 후 전체 맥락에서 재검토(UI 있는 대상만 조건부 10번째 축). taste의 자체 채점(생성 시점, 단일 컴포넌트 단위)과 달리, 여러 taste 호출로 조립된 페이지 전체의 톤 일관성을 잡는다 | **실사용 검증** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)의 `predeploy` | 배포 전 10축 감사 중 반응형/접근성/UX 축이 taste 산출물에도 그대로 적용되는 기존 게이트 | **실사용 검증** |
| [`woozi-claude-guards`](https://github.com/SpaceWJK/woozi-claude-guards)의 `regression-grep-guard` / `simplicity-check` | 파일 Edit/Write 훅으로 전역 적용 — taste가 컴포넌트 props를 바꾸거나 REDESIGN 범위가 과도하게 커질 때 자동 경고 | **실사용 검증** |
| [`woozi-brain`](https://github.com/SpaceWJK/woozi-brain) | UI 선호 피드백을 경험으로 축적해 다음 생성에 자동 반영하는 학습 루프(원리 차원). 별도 MCP 서버 설치가 전제이므로 "원리는 실사용 검증, 연동 자체는 사용자 책임" | **실사용 검증(원리 차원)** |
| [`woozi-agent-qa`](https://github.com/SpaceWJK/woozi-agent-qa) | 프론트엔드 에이전트가 taste를 얼마나 잘 활용하는지 exam 프레임으로 검증 | **권장(이론)** — 아직 taste 대상 실제 exam 시행 사례는 확인되지 않음 |

#### 산출물 유형별 검수 담당 — editorial-audit의 위치 정정

이 저장소가 다루는 것(구조 골격 + 다이얼로 컨셉을 적용하는 것)은 `taste`가 만드는 모든
React/Tailwind 산출물에 해당한다 — "React 앱은 검수 대상에서 빠진다"는 뜻이 아니다. 갈리는
지점은 **디자인 컨셉·골격의 적용 범위가 아니라, 완성물의 비주얼 품질을 어떤 도구로 검수하는가**다:

| 산출물 유형 | 검수 담당 |
|---|---|
| React/Tailwind UI (taste로 생성한 컴포넌트·페이지) | `taste` 자체 audit 모드(AI Tells + Golden Rules 자동 탐지) + [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)의 `deep-review`(UI 있는 대상 한정 10번째 축, 완성 후 전체 맥락 재검토) |
| 문서형 HTML(슬라이드 덱·보고서·가이드) | [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)의 `editorial-audit` — 자기 스킬 본문에 "React 앱 컴포넌트 생성/감사는 taste 담당, 이 스킬은 문서형 HTML 전용"이라는 경계를 명시하고 있다 |

즉 editorial-audit이 "빠지는" 것이 아니라, **taste가 만드는 산출물(React 앱)의 검수는 원래
그 역할이 아니었던 것**이다. React 컴포넌트를 문서형 HTML 검수 기준으로 재검토하거나,
슬라이드 덱을 taste로 감사하면 둘 다 설계 의도를 벗어난다 — 산출물 유형에 맞는 열을
그대로 따르면 된다.

### 한계 (정직하게)

- **색/무드 프리셋 시스템은 포함하지 않는다.** `macrostructures.md`가 "테마: 다크 미니멀"
  같은 예시로 이 저장소 없이도 이해되도록 일반화했지만, 실제 색 토큰·무드 프리셋 카탈로그는
  이 저장소가 나온 환경에 별도로 존재하며 라이선스가 불명확해 수록하지 않았다. `taste`는
  이런 프리셋 없이도 프롬프트 키워드 기반 다이얼 자동 추론으로 완전히 동작한다.
- **[StyleSeed](https://github.com/bitjaru/styleseed) 연동은 선택 사항이다.** 별도의 MIT
  오픈소스 디자인 엔진으로, 있으면 Golden Rules를 추가로 참조하고 없으면 경고 1줄 후 기본
  AI Tells 규칙만 적용한다 — 이 저장소엔 벤더링하지 않는다(재배포 권한이 없다).
  `skills/taste/SKILL.md`의 PHASE 0 참고.
- **정적 갤러리는 구조 골격 탭 하나만 있다.** 원래 환경의 갤러리는 색/무드 프리셋 그리드와
  다이얼 스튜디오 탭도 있었지만, 그 두 탭은 라이선스 미상 자산과 결합되어 있어 이번
  공개에서 의도적으로 제외했다 — 골격을 있는 그대로 보여주는 것에 한정한다.
- **에이전트명은 예시다.** `taste` 본문에 등장하는 `web-frontend` 같은 서브에이전트 호출은
  이 스킬을 만든 환경의 커스텀 에이전트를 가리킨다 — 이 저장소는 그 에이전트 정의를
  포함하지 않는다. Claude Code의 기본 에이전트로 대체하거나 직접 설계해야 한다.

---

## 테스트

```bash
npm test
# 또는 직접:
node scripts/lint-designkit.mjs
```

`scripts/lint-designkit.mjs`는 외부 의존성 0(Node 내장 모듈만)으로:

1. `macrostructures.json` ↔ `macrostructures/demos/*.html` ↔ `macrostructures/thumbnails/ms-*.svg`
   ↔ `gallery/gallery-data.js` 네 곳의 id 집합이 정확히 일치하는지 확인 (31개 전부)
2. 데모·다이어그램·갤러리 파일에 외부 URL이 없는지 확인 (SVG `xmlns` 네임스페이스 선언은
   화이트리스트 처리)
3. 저장소 전체에 남은 전용 흔적("아직 다 못 지웠다"는 표식)이 없는지 확인. 2층 구조:
   (a) 내장 — 조직명과 무관한 범용 마커 3종(정확한 문자열은 스크립트의
   `BUILTIN_FORBIDDEN_PATTERNS` 참고)만 기본 검사한다. 이 공개 저장소 자체에는 특정
   조직명·티켓 체계가 전혀 들어있지 않다.
   (b) 확장 — 저장소 루트에 `lint.tokens.json`(선택, `.gitignore` 등록됨)이 있으면 자동으로
   추가 로드한다. 이 파일에 각자 조직의 프로젝트 코드네임·내부 티켓ID 체계·내부 사용자명
   등을 등록하면 그 포크에서만 추가 검사된다 — 형식은 `lint.tokens.example.json` 참고
4. **자기 검증(self-test)** — 위 세 검사 로직 자체가 결함을 실제로 잡아내는지, 6가지 결함
   (id 불일치/외부 URL 누락 탐지/xmlns 오탐/내장 마커 누출/CRLF 우회/조직별 확장 패턴 컴파일·
   매칭/잘못된 정규식 안전 처리)을 메모리상 픽스처에 주입해 전부 탐지되는지 확인. CRLF로
   체크아웃된 파일에서도 탐지가 유지되는지 별도 검증(Windows `core.autocrlf=true` 환경 대응,
   `.gitattributes` 참고)

---

## 호환성

| 항목 | 요구사항 |
|---|---|
| Node.js | 14.18+ (내장 모듈만 사용, `npm install` 불필요 — lint 실행에만 필요) |
| 갤러리(`gallery/`) | 순수 HTML/CSS/JS, 빌드 도구 불필요. 브라우저만 있으면 `file://`로 직접 열림 |
| Claude Code | 스킬 frontmatter(`name`/`description`) 표준 형식 — 별도 버전 제약 없음 |
| 대상 스택(taste 산출물) | React / Next.js + Tailwind CSS (v3/v4 자동 감지) |
| OS | 스크립트·데모·갤러리 전부 크로스플랫폼(경로 구분자 하드코딩 없음), CRLF/LF 양쪽에서 lint 통과 확인 |

---

## Provenance — 무엇이 어디서 왔는가

| 구성 요소 | 분류 | 원본 | 라이선스 | 우리 개조 요약 |
|---|---|---|---|---|
| `taste` (UI 생성 스킬) | ② forked-hardened | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | 3축 다이얼(VAR/MOT/DEN) 자동 추론, 구조 골격(`--macro`) 통합, variants 대안 시안 + 자동 채점, WCAG/접근성/레이아웃 견고성 게이트 다수 신설 — 상세: [`skills/taste/ATTRIBUTION.md`](skills/taste/ATTRIBUTION.md) |
| `macrostructures` (구조 골격 31종) | ② forked-hardened | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | 원본 21종의 한국어 재서술 + 자체 설계 10종 증보(총 31종) + SVG 다이어그램 31개·데모 HTML 31개 신규 제작 + taste와의 직교 통합 프레임워크 — 상세: [`macrostructures/ATTRIBUTION.md`](macrostructures/ATTRIBUTION.md) |

두 구성 요소 모두 원문 라이선스(MIT) 고지를 각 `ATTRIBUTION.md`에 유지한다. macrostructures의
실무 앱 계열 데모 중 하나(`data-table-workspace.html`)는 이 저장소를 준비하며 발견된 실사용
목업 데이터를 전부 가상값으로 재작성했다 — 레이아웃 문법 자체는 원본 그대로다.

---

## 표준 구성

- `LICENSE` — MIT
- `skills/taste/ATTRIBUTION.md`, `macrostructures/ATTRIBUTION.md` — 원본 라이선스 고지 2종
- `CONTRIBUTING.md` — PR 전 체크리스트, 신규 골격 추가 절차
- `.gitattributes` — `eol=lf` 강제(Windows `autocrlf=true` 환경 방어)
- `.gitignore` — `lint.tokens.json`(조직별 lint 확장 파일) 포함
- `lint.tokens.example.json` — `lint.tokens.json` 작성 형식 예시 (각자 조직명·티켓 체계는
  이 파일을 복사해 등록, 원본 예시 파일은 커밋 유지)
- `package.json` — `npm test` = lint 스크립트
- `docs/GLOSSARY.md` — 이 저장소 전반에 쓰이는 용어(macrostructure, 다이얼 3축, Provenance
  버킷 등) 정의
- `docs/usage-guide.md` — 설치부터 실전 예제까지 워크스루

---

## 라이선스

MIT — 상세는 [`LICENSE`](LICENSE) 참고.

<div align="center">

**구조부터 정하고 톤을 입히는, 정직하게 개조된 디자인 킷**

</div>
