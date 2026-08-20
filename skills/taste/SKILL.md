---
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, Agent, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__preview_list, mcp__Claude_Browser__read_page, mcp__Claude_Browser__computer, mcp__Claude_Browser__javascript_tool]
description: "프리미엄 프론트엔드 UI 생성/감사/리디자인. AI 티 나는 패턴을 제거하고 에이전시급 결과물 생성. React/Next.js + Tailwind CSS 전용. styleseed 통합 + 시각 iterate + variants 대안 시안 + 자동 채점."
argument-hint: "[설명] | audit | redesign [파일] | variants [설명] --count=2. 다이얼 수동: --var=8 --mot=6 --den=4"
disable-model-invocation: false
---

# /taste - 프리미엄 프론트엔드 UI 엔진

**철학**: AI가 만든 티를 완전히 제거하고, $150k 에이전시급 프론트엔드를 생성한다.

**대상 스택**: React / Next.js + Tailwind CSS (v3/v4 자동 감지)

---

## 모드 판별

| 입력 | 모드 | 동작 |
|------|------|------|
| `/taste [설명]` | **create** | 새 UI 컴포넌트/페이지 생성 |
| `/taste audit` | **audit** | 프로젝트 전체 AI Tells + Golden Rules 자동 탐지 + 리포트 |
| `/taste redesign [파일]` | **redesign** | 특정 컴포넌트를 프리미엄으로 리디자인 |
| `/taste variants [설명] --count=N` | **variants** | 동일 프롬프트 다이얼 축 셔플로 N개 시안 순차 생성 + 자가 채점 비교 (default 2, max 3) |

**yt-designer 위임 요청 수신 처리**: `## /taste 위임 요청` 섹션이 포함된 마크다운 입력을 받으면, 해당 섹션에서 `프롬프트` / `추천 다이얼(VAR/MOT/DEN)` / `필수 요소` / `변형 필요 수`를 파싱. `변형 필요 수 ≥ 2` → `variants` 모드 자동, `= 1` → `create` 모드. `/taste` 실행 결과를 요청서 원본 파일 하단에 `## /taste 결과` 섹션으로 append.

**web-frontend 채점 실패 블록 시 처리**: 자가 채점이 max 2회 재작업에도 < 7 → web-frontend 에이전트는 SKILL.md의 `AskUserQuestion` 경로 그대로 사용자에게 재작업 여부/승인 질의. 사용자 "그대로 승인" 시 점수 기록 + 경고 태그 붙여 보고. 사용자 미응답 시 구현 보류 상태로 보고(에이전트 팀에 자동 롤백 없음 — 기존 Step 6 이슈 수정 사이클이 책임).

---

## 다이얼 시스템 (3축 제어)

### 기본값: 자동 추론

사용자 프롬프트의 맥락 키워드로 다이얼을 자동 결정한다:

| 키워드/맥락 | VAR | MOT | DEN | 설명 |
|-------------|-----|-----|-----|------|
| 대시보드, 관리자, admin | 4 | 5 | 7 | 데이터 밀집, 정돈된 레이아웃 |
| 랜딩, 포트폴리오, 에이전시 | 8 | 7 | 3 | 비대칭, 넓은 여백, 임팩트 |
| 럭셔리, 프리미엄, 브랜드 | 7 | 8 | 2 | 시네마틱 모션, 아트 갤러리 밀도 |
| 미니멀, 클린, 기업 | 3 | 4 | 3 | 예측 가능, 정적, 깔끔 |
| 쇼케이스, 실험적, Awwwards | 9 | 9 | 5 | 최대 비대칭, 최대 모션 |
| 쇼핑, 이커머스, 상품 | 5 | 6 | 6 | 중간 레이아웃, 적당한 밀도 |
| 키워드 없음 (기본) | 8 | 6 | 4 | 범용 프리미엄 |

### 수동 오버라이드

프롬프트 끝에 `--var=N --mot=N --den=N` (1~10) 으로 개별 지정 가능.
- `/taste 대시보드 --mot=8` → 대시보드 프리셋에서 모션만 8로 오버라이드
- `/taste 랜딩 페이지 --var=3 --den=7` → 대칭적이고 밀집된 랜딩

### 다이얼 해석 규칙

**DESIGN_VARIANCE (레이아웃 비대칭도)**:
- 1~3: 12열 대칭 그리드, 완벽 정렬, `justify-center` 기본
- 4~7: 요소 겹침(`-mt-8`), 혼합 비율(4:3+16:9), 좌측 정렬 헤더
- 8~10: 매서너리, `grid-template-columns: 2fr 1fr 1fr`, 거대 여백(`pl-[20vw]`)

**MOTION_INTENSITY (애니메이션 강도)**:
- 1~3: 움직임 없음. CSS `:hover`/`:active` 상태만
- 4~7: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`, 순차 fade-in, `will-change: transform`
- 8~10: 스크롤 패럴랙스, Framer Motion 스프링, 자기장 버튼. `window.addEventListener('scroll')` 절대 금지
  - **패럴랙스 필수 패턴** (ref 연결 누락 시 silently fail → 반드시 명시):
    ```tsx
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [0, -200])
    // <motion.div ref={ref} style={{ y }}>
    ```
  - **자기장 버튼 필수 패턴**:
    ```tsx
    const x = useMotionValue(0); const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 150, damping: 15 })
    const springY = useSpring(y, { stiffness: 150, damping: 15 })
    // onMouseMove: delta = cursor - center → x.set(delta.x * 0.3)
    ```
  - **IntersectionObserver 금지** → `whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}` 사용
  - **스태거 필수**: `variants={{ container: { staggerChildren: 0.1 } }}`

**VISUAL_DENSITY (콘텐츠 밀도)**:
- 1~3: 아트 갤러리. 섹션 간격 `py-24`~`py-40`, 거대 여백
- 4~7: 일반 웹앱 간격
- 8~10: 조종석 모드. 최소 패딩, 카드 대신 `border-t`/`divide-y`, 숫자는 `font-mono` 필수

**모바일 오버라이드 (VAR 4~10)**: `md:` 이상의 비대칭 레이아웃은 `< 768px`에서 반드시 `w-full`, `px-4`, `py-8` 단일 컬럼으로 폴백.

---

## PHASE 0: 프로젝트 자동 스캔 (모든 모드 공통)

모든 모드 실행 전 자동으로 수행:

```
1. package.json → 스택/라이브러리 버전 감지
   - React 버전, Next.js 여부, Tailwind v3/v4 판별
   - framer-motion, @phosphor-icons/react, @radix-ui/react-icons 설치 여부
   - shadcn/ui 사용 여부

2. tailwind.config.* → 테마 커스터마이징 확인
   - 색상 팔레트, 폰트, 브레이크포인트

3. tsconfig.json / jsconfig.json → 경로 alias

4. 라이브러리 최신 API 확인 (필요 시): WebSearch/WebFetch로 tailwindcss·framer-motion(MOT > 3일 때) 감지 버전의 공식 문서 확인 (Context7 MCP는 미설치로 2026-08-04 제거)

5. design-rules/ 로드 (선택적 연동 — [StyleSeed](https://github.com/bitjaru/styleseed), 별도 MIT 오픈소스 프로젝트. 이 저장소엔 미수록, 미설치여도 이 스킬은 완전히 동작한다):
   - 프로젝트 루트(package.json 가장 가까운 상위) 기준 `design-rules/` 디렉토리 탐색
   - 있으면: CLAUDE.md / DESIGN-LANGUAGE.md / .cursorrules 경로를 컨텍스트에 표기
     → StyleSeed의 Golden Rules + design rules 참조 가능
   - 부분 존재(일부 파일만): 있는 파일만 참조 + 누락 파일 경고 1줄
   - 없음: "design-rules 미설치 — 기본 AI Tells만 적용" 경고 1줄. 실행은 계속

6. 스타일 프리셋 카탈로그 로드 (선택적 — 색/무드 프리셋 시스템, 이 저장소엔 미수록. 없어도 기본 다이얼로 정상 동작):
   - `design-rules/style-presets/index.json` 존재 확인
   - 있으면: 프리셋 id/name/category/accent/dial 요약을 컨텍스트에 주입 (개별 JSON은 `--style=<id>` 호출 시에만 Read)
   - 없음: "프리셋 카탈로그 미설치 — 기본 다이얼 사용" 경고 1줄. 실행은 계속
```

**Tailwind 버전 잠금**: package.json에서 감지한 버전을 엄수. v4 프로젝트에 v3 문법 금지, 그 반대도 금지.
**T4 설정 가드**: Tailwind v4는 `postcss.config.js`에 `tailwindcss` 플러그인 대신 `@tailwindcss/postcss` 또는 Vite 플러그인 사용.

---

## 디자인 채점 루브릭 (자동 적용)

CREATE / REDESIGN / VARIANTS 모드에서 생성 직후 자동 채점. 평균 < 7 시 재작업 트리거.

### 4기준 채점 (1~10 점)

| 기준 | 가중치 | 채점 내용 |
|------|--------|----------|
| **Design quality** | 0.30 | 일관된 분위기/정체성, 색상/타이포/레이아웃 조화 |
| **Originality** | 0.30 | AI 생성 징후 감점 (보라 그래디언트+흰 카드, 과도한 그림자, 템플릿 레이아웃) |
| **Craft** | 0.20 | 간격 일관성, 대비 비율, 반응형 정확도 |
| **Functionality** | 0.20 | 주요 액션 접근성, 정보 위계 명확성 |

### 종합 점수 공식
```
종합 = 0.30*DQ + 0.30*OR + 0.20*CR + 0.20*FN
```

### 재작업 임계값
| 종합 점수 | 판정 | 행동 |
|----------|------|------|
| ≥ 8.5 | 우수 | 통과 + "우수" 태그 |
| 7.0 ~ 8.4 | 통과 | 그대로 출력 |
| < 7.0 | 재작업 | 감점 사유 구체화 → 자동 수정 → 재채점 (`max_iterations=2`) |
| 2회 재작업 후에도 < 7.0 | 블록 | "수동 검토 필요" + 사용자에게 AskUserQuestion |

### MOT ≥ 8 Animation Gate (4기준 채점 이전 pass/fail 선행 게이트)

MOT≥8로 생성된 컴포넌트는 **4기준 채점 전에** 아래 게이트 통과 필수:

```
1. javascript_tool: window.scrollTo(0, 500)
   → getComputedStyle(scrollTarget).transform 값 측정
   → 초기값과 다르면 PASS / 동일하면 FAIL (패럴랙스 미동작)

2. javascript_tool: 자기장 버튼 존재 시
   → getBoundingClientRect() 후 mousemove 이벤트 dispatch
   → transform delta ≠ 0 확인

FAIL 처리:
- 재생성 1회 (실패 원인 코드 패턴 명시 후)
- 2회 연속 FAIL → "Animation Gate 실패 — MOT를 낮추거나 수동 구현 필요" 경고 + skip
- SPA 라우터 등 javascript_tool 실패 시: "동작 검증 불가 (환경 제한)" 로그 후 skip (fail-open)
```

### WCAG 대비 게이트 (CREATE/REDESIGN/VARIANTS — 4기준 채점 이전 선행 게이트)

모든 생성 컴포넌트는 **4기준 채점 전에** 대비율 게이트 통과 필수:

```
javascript_tool 실행 (JS):
  // opacity 합성 후 실효색으로 대비율 계산
  // 핵심: text-white/40 실효색 #666 → 어두운 배경 대비율 미달
  // 수정(v1.3): getComputedStyle은 rgba 알파를 합성하지 않음 → 직접 compositing 필요
  const violations = []
  const els = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, label, button, li')
  // alpha(a) < 0.9이면 semi-transparent → traversal skip (opaque white로 오인 방지)
  const isSemiTransparent = c => {
    const n = c.replace(/\s/g,'')
    if (n === 'rgba(0,0,0,0)') return true
    const m = n.match(/rgba\(\d+,\d+,\d+,([\d.]+)\)/)
    return m !== null && parseFloat(m[1]) < 0.9
  }
  // rgba fg를 opaque bg에 합성하여 실효 rgb 반환
  const compositeOnBg = (fgStr, bgStr) => {
    const fn = fgStr.replace(/\s/g,'')
    const fm = fn.match(/rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)/)
    if (!fm) return fgStr
    const a = fm[4] !== undefined ? parseFloat(fm[4]) : 1
    if (a >= 1) return fgStr
    const bm = bgStr.replace(/\s/g,'').match(/rgba?\((\d+),(\d+),(\d+)/)
    if (!bm) return fgStr
    return `rgb(${Math.round(a*+fm[1]+(1-a)*+bm[1])},${Math.round(a*+fm[2]+(1-a)*+bm[2])},${Math.round(a*+fm[3]+(1-a)*+bm[3])})`
  }
  const toLuminance = c => {
    const m = c.replace(/\s/g,'').match(/rgba?\((\d+),(\d+),(\d+)/)
    if (!m) return null
    const [r, g, b] = [+m[1]/255, +m[2]/255, +m[3]/255].map(v =>
      v <= 0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4))
    return 0.2126*r + 0.7152*g + 0.0722*b
  }
  const contrast = (fg, bg) => {
    const [L1, L2] = [toLuminance(fg), toLuminance(bg)]
    if (L1 === null || L2 === null) return null
    const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]
    return (hi + 0.05) / (lo + 0.05)
  }
  els.forEach(el => {
    const s = getComputedStyle(el)
    // traversal: alpha<0.9 배경 skip → 실질적 불투명 배경까지 올라감
    let bg = 'rgba(0,0,0,0)', node = el
    while (node && isSemiTransparent(bg)) {
      bg = getComputedStyle(node).backgroundColor; node = node.parentElement
    }
    if (isSemiTransparent(bg)) bg = 'rgb(255,255,255)'  // fallback: body 상위 없으면 white
    // fg rgba 합성
    const effectiveFg = compositeOnBg(s.color, bg)
    const ratio = contrast(effectiveFg, bg)
    if (ratio === null) return
    const fontSize = parseFloat(s.fontSize)
    const isLarge = fontSize >= 24 || (fontSize >= 18.67 && parseInt(s.fontWeight) >= 700)
    const threshold = isLarge ? 3.0 : 4.5
    if (ratio < threshold)
      violations.push({ tag: el.tagName, ratio: ratio.toFixed(2), threshold, preview: el.textContent.trim().slice(0,25) })
  })
  return JSON.stringify(violations.slice(0, 10))

FAIL 처리:
- violations.length > 0 → 위반 목록 출력 + 재생성 1회
  수정 방향: opacity/40 → opacity/80+, 또는 텍스트색을 white로 올리고 배경을 어둡게
- 2회 연속 FAIL → "WCAG Gate 실패 — 텍스트 대비 수동 조정 필요" 경고 + skip

javascript_tool 실패 시 코드 레벨 Grep 대체:
  grep -n "text-\w\+/[1-4][0-9]\?\b\|opacity-[1-4][0-9]\b" → 발견 시 🟡 WARN 출력
  (실효 합성 대비율 계산 불가 → 사용자 수동 확인 권고)
```

**WCAG AA 기준**: 본문 텍스트 ≥ 4.5:1 / 대형 텍스트(24px 이상, 또는 18.67px+ bold) ≥ 3:1

### 접근성 게이트 확장

WCAG 대비 게이트와 별개로, 아래 접근성 요건도 CREATE/REDESIGN/VARIANTS 생성 시 함께 확인한다:

- **모션 접근성**: 모든 스크롤 패럴랙스/스프링/자동 애니메이션에 `prefers-reduced-motion: reduce` 폴백 제공 (미충족 시 정적 상태로 즉시 전환)
- **장식 요소 스크린리더 격리**: 장식용 SVG/canvas/CSS 아트(파티클 배경, 지오메트릭 패턴 등)는 `aria-hidden="true"` 처리, 정보 전달용 그래픽만 `aria-label` 부여
- **자동회전 콘텐츠 정지 (WCAG 2.2.2)**: 캐러셀/키네틱 마키 등 자동 재생 콘텐츠는 hover 또는 키보드 포커스 시 즉시 정지
- **버튼 표면 대비**: 버튼 텍스트색은 배경색과 동일 색 금지, 컬러 표면(악센트 배경) 위 텍스트는 별도 대비 확인, 다크 섹션에서는 텍스트 색상 스왑 고려

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

### Preview 없는 환경
Claude Browser MCP 접근 실패 시: **코드 레벨 채점만** 수행 (AI Tells grep + Golden Rules 체크리스트). 시각 기반 채점은 스킵하고 그 사유를 출력에 명시.

---

## 시각 iterate 루프 (CREATE / REDESIGN 완료 후)

### 4-tier dev server URL 탐지 (범용)
```
1) pm2 list 실행 → 활성 프로세스 중 포트 있는 것 탐색
2) 없으면: .claude/launch.json 파싱 (runtimeArgs의 --port 또는 port 필드)
3) 없으면: package.json scripts.dev|start|preview 에서 --port=N 정규식 추출
4) 없으면: 후보 포트 순회 시도 (3000 → 5173 → 5174 → 5175 → 8080, HTTP 200 체크)
5) 전부 실패 → "시각 iterate 스킵 (dev server 감지 실패)" + 코드 채점만 수행
```

### 실행 순서
```
1. URL 탐지 (위 4-tier)
2. mcp__Claude_Browser__preview_start → read_page → computer(action: screenshot)
3. 스크린샷 경로 + 자가 채점 (4기준) 출력
3-1. Hero fold 체크: 1280×800 랩탑 뷰포트 스크린샷에서 Hero 핵심 요소(헤드라인+CTA)가 스크롤 없이 화면 안에 들어오는지 확인 (미충족 시 감점 사유에 포함)
4. 종합 < 7 → 원인 분석 + 수정 → 재시도
   (로그 형식: "재작업 사이클 N/2 — {감점 기준} 재조정 중")
   최대 2회까지. 2회 후에도 < 7이면 "수동 검토 필요" + AskUserQuestion
5. 최종 스크린샷 경로 사용자에게 제시
```

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

### javascript_tool 사용 가이드 (보안)

`mcp__Claude_Browser__javascript_tool`은 페이지 컨텍스트에서 JS 실행 권한을 가진다.
- **허용**: DOM 읽기(`document.querySelector(...).textContent`), 스타일 조회(`getComputedStyle`), 페이지 상태 확인
- **금지**: DOM 쓰기/이벤트 디스패치/전역 변수 조작. 시안 수정은 반드시 소스 파일 Edit으로 수행 (eval의 DOM 변경은 reload 시 유실)
- **보안**: 외부 입력을 eval 인자에 문자열 보간 금지. 의심 시 read_page로 대체

### Graceful Fallback 3종
| 실패 유형 | 동작 |
|----------|------|
| dev server 감지 실패 | "시각 iterate 스킵" + 코드 채점만 |
| preview_start 실패 (연결) | "Claude Browser MCP 연결 실패 — 수동 확인 필요" |
| 렌더 타임아웃 (>30s) | "렌더 타임아웃 — 코드 복잡도 재검토" |

---

## VARIANTS 모드 (대안 시안 병렬 생성)

### 호출
```
/taste variants [설명] --count=N  (default 2, max 3)
```

### 다이얼 축 셔플 (범용 clamp 적용)
```
base = 프롬프트 키워드 추론 (기존 로직)
clamp(v) = max(1, min(10, v))

variant[1] = base (보수안)
variant[2] = { VAR=clamp(base.VAR-3), MOT=clamp(base.MOT-2), DEN=base.DEN }
            (또는 사용자 맥락에 맞게 중립 방향으로)
variant[3] = { VAR=clamp(base.VAR+3), MOT=clamp(base.MOT+3),
              DEN=clamp(10 - base.DEN + 1) }  (실험안: 밀도 반전)
```

### 순차 실행 (병렬 아님 — Claude Browser MCP 단일 인스턴스 가정)
```
for n in 1..N:
  1) 코드 생성 → process.cwd() + '/.taste-variants/v{n}-{timestamp}.tsx'
  2) Claude Browser MCP 렌더 + 스크린샷
  3) 자가 채점 (4기준)
  4) 비교 표에 행 추가

사용자 선택 → 선택된 variant만 지정 경로로 이동, 나머지 파일 삭제 (.taste-variants/ 비움)
```

### 비교 표 출력 예
```
Variant  VAR  MOT  DEN  DQ  OR  CR  FN  종합  스크린샷
─────────────────────────────────────────────────────
v1 보수  8    6    4    8   7   8   8   7.7   .taste-variants/v1-*.png
v2 중립  5    4    4    7   8   7   7   7.3   .taste-variants/v2-*.png
v3 실험  10   9    7    7   9   6   6   7.3   .taste-variants/v3-*.png
```

### --count 파싱 규칙
정규식 `/--count=(\d+)/`. 매치 없음 → default 2. 3 초과 → 3으로 클램핑 + 경고 1줄.

### --style=<id> 인자
- 단일: `/taste "대시보드" --style=c-minimal`
- 혼합: `/taste "랜딩" --style=c-minimal,d-glass`
- 정규식: `/--style=([a-z]+-[a-z0-9-]+(?:,[a-z]+-[a-z0-9-]+)*)/`
- **전체 id 형식만 허용** (예: `c-minimal` OK / `minimal` 거부 + 경고)
- 적용 방식: 해당 프리셋의 `dial` / `tokens` / `typography.families` 를 기본값으로 사용
- 혼합 규칙: **첫 프리셋 dominant** (tokens + layout + dial). **이후는 typography.families만 병합** (중복 제거)
- 프리셋 없음: 경고 1줄 출력 + 기본 다이얼로 진행 (graceful fallback)
- 참조: `design-rules/style-presets/<id>.json` (별도 색/무드 프리셋 시스템, 이 저장소엔 미수록 — Read tool로 필요 시 각자 프로젝트 자산 참조)

### --macro=<id> 인자 (페이지 골격 지정)
- 사용: `/taste "제품 소개" --macro=stat-led`
- 적용 방식: `../macrostructures/macrostructures.md`(이 저장소 동봉, `macrostructures/` 디렉토리 참조)에서 해당 id 항목을 **선독**하고 그 골격(섹션 구성·배치 원칙)을 페이지 구조의 기본 뼈대로 사용. `--style`(토큰/무드)과 직교 — 골격은 macro, 표피는 style
- id는 kebab-case 슬러그 (31종: bento-grid, long-document, marquee-hero, stat-led, workbench, conversational-faq, manifesto, photographic, quote-led, specimen, catalogue, letter, index-first, narrative-workflow, split-studio, feature-stack, type-specimen, portfolio-grid, map-diagram, ecosystem-index, component-playground, dashboard-shell, data-table-workspace, kanban-board, commerce-showcase, storefront-grid, docs-portal, settings-console, chat-workspace, auth-onboarding, pricing-compare)
- 미존재 id: 경고 1줄 + macro 없이 진행 (graceful fallback)
- 실물 데모: `../macrostructures/demos/<id>.html` (정적 갤러리 `gallery/index.html`에서 카드 클릭으로 연결)

### 인자 파싱 일반
`/taste` 뒤 모든 argument에서 `--var=N`, `--mot=N`, `--den=N`, `--count=N`, `--style=<id>[,<id>...]`, `--macro=<id>` 추출. 매치 전 나머지 텍스트가 설명.

---

## StyleSeed 11 Golden Rules 통합

[StyleSeed](https://github.com/bitjaru/styleseed)(`design-rules/CLAUDE.md`, 선택적 연동 — §PHASE 0 참조) 발췌 핵심 규칙. 기존 AI Tells 금지 목록과 **중복 시 한 번만 적용**.

| # | Golden Rule | 기존 AI Tells와 관계 |
|---|-------------|-------------------|
| 1 | 모든 콘텐츠는 카드 안에 — 페이지 배경에 직접 배치 금지 | 신규 |
| 2 | 악센트 컬러(--brand) 단 1개 — 나머지는 그레이스케일 | 기존 규칙 2와 동일 |
| 3 | 순수 흑색 #000 금지 — 스킨 정의 darkest(~#2A2A2A) | 기존 AI Tells와 동일 |
| 4 | 숫자 2:1 단위 — 48px 숫자 + 24px 단위 | 신규 |
| 5 | `space-y-6` 섹션 간격 · `mx-6` 단일 카드 · `px-6` 그리드 | 신규 |
| 6 | 같은 섹션 타입 연속 반복 금지 — 시각적 리듬 생성 | 신규 |
| 7 | 카드 그림자 ≤ 8% opacity — 보이면 너무 강함 | 기존 규칙 4와 통합 |
| 8 | 터치 타겟 ≥ 44×44px — 작은 탭 영역 금지 | 신규 |
| 9 | 시맨틱 토큰만 사용(`text-brand`, `bg-card`) — hex 하드코딩 금지 | 신규 |
| 10 | 폰트 크기 "Font Size by Context" 표에서만 — 추측 금지 | 기존 규칙 1과 보완 |
| 11 | 페이지 생성 후 `/ss-review` 검증 — 본 스킬에선 Pre-flight + 자동 채점으로 대체 | 본 스킬 고유 |

**상세 규칙 참조**: 작업 중 의심 시 `Read` tool로 `design-rules/CLAUDE.md` 또는 `design-rules/DESIGN-LANGUAGE.md` 조회. 전체 로드 금지(컨텍스트 폭증).

---

## 컨셉별 래퍼런스 카탈로그 + 다이얼 제안

CREATE/REDESIGN/VARIANTS 시 컨셉 키워드 감지 → 아래 카탈로그에서 매핑 → **레퍼런스 1개 앵커 + 다이얼 제안** 출력.

**핵심 원칙**: URL 나열은 효과 없음. 반드시 "이 레퍼런스의 X·Y·Z 디테일을 가져와 변주하라"는 구체적 추출 단계 수행.

| 카테고리 | 감지 키워드 | 추천 레퍼런스 사이트 | 추천 다이얼 VAR/MOT/DEN | 핵심 추출 포인트 |
|---------|-----------|------------------|----------------------|----------------|
| **다크 미니멀** | dark, 검정, noir, 블랙, monochrome | astrodither.robertborghesi.is · linear.app · vercel.com | 6 / 6 / 4 | 도트/노이즈 그리드 배경, 모노스페이스 레이블, 단일 네온 악센트 |
| **사이버펑크/게임** | cyber, neon, 게임, glitch, pixel, 픽셀 | astrodither.robertborghesi.is · awwwards.com/sites/?award=sotd | 8 / 9 / 5 | 스캔라인 오버레이, hue-rotate 애니메이션, 코너 레이블 |
| **럭셔리/하이엔드** | luxury, 럭셔리, premium, 명품, haute, 고급 | loropiana.com · jacquemus.com · bottegaveneta.com | 7 / 8 / 2 | 극단적 여백, 세리프 헤드라인, 느린 커튼 전환 |
| **SaaS 대시보드** | dashboard, admin, 대시보드, 관리자, analytics | linear.app · retool.com · planetscale.com | 4 / 5 / 7 | Bento 카드 그리드, 숫자 대형 디스플레이, border-t 구분선 |
| **에이전시/포트폴리오** | agency, 에이전시, portfolio, 포트폴리오, creative | basement.studio · resend.com · lusion.co | 9 / 8 / 3 | 비대칭 타이포그래피, 풀스크린 이미지 그리드, 마우스 parallax |
| **테크/스타트업** | tech, startup, 스타트업, SaaS, product | stripe.com · clerk.com · supabase.com | 6 / 6 / 5 | 그래디언트 없는 플랫 색상, 코드 스니펫 쇼케이스, 정직한 간격 |
| **미니멀/클린** | minimal, clean, 미니멀, 클린, simple | notion.so · culturedcode.com/things · linear.app/method | 3 / 3 / 3 | 타이포그래피 위계만으로 구조화, 색상 최대 1개, 큰 여백 |
| **인터랙티브/실험적** | experimental, interactive, 실험적, WebGL, 3D | bruno-simon.com · activetheory.net · lab.hakim.se | 10 / 10 / 4 | WebGL/Canvas 배경, 스크롤텔링, 물리 인터랙션 |
| **이커머스/상품** | shop, store, 쇼핑, product, 상품, ecommerce | allbirds.com · aesop.com · ssense.com | 5 / 6 / 6 | 제품 중심 레이아웃, hover zoom, 미니멀 네비 |
| **뉴브루탈리즘** | brutalist, 브루탈, bold, raw, editorial | gumroad.com · mschf.com · poolsuite.net | 8 / 5 / 6 | 굵은 border 1px solid black, 원색, 기울어진 레이아웃, 시스템 폰트 |
| **글래스/미래적** | glass, glassmorphism, 글래스, 미래적, futuristic | apple.com/vision-pro · microsoft.com/en-us/windows | 6 / 7 / 4 | backdrop-blur + border-white/10, inset 상단 반사광, 다층 레이어 |

### 다이얼 제안 출력 형식 (0단계 이후 1단계 대체)

레퍼런스 카탈로그 매핑 성공 시 아래 형식으로 출력 (기존 `🎛️ VAR=N MOT=N DEN=N` 1줄 대체):

```
🎛️ 다이얼 제안
  VAR=8  ← 에이전시 컨셉 → 비대칭 레이아웃 + 요소 겹침
  MOT=8  ← 스크롤 패럴랙스 + hover 물리감 (WebGL 제외)
  DEN=3  ← 넓은 여백 → 에이전시급 임팩트 (카드 컨테이너 최소화)

🔗 앵커 레퍼런스: basement.studio
추출 디테일 (구현에 직접 반영):
  1. 어두운 배경 위 거대 클램프 타이포: font-size: clamp(4rem, 12vw, 12rem); font-weight: 900
  2. 마우스 parallax: onMouseMove → transform: translate(x*0.05, y*0.05)
  3. 프로젝트 카드: aspect-ratio: 4/3 + hover: scale(1.03) + duration-500

⚠️ 이미지 미첨부 시 — 위 3개 디테일을 구현에 직접 반영 (이미지 앵커링 대체)
```

키워드 미매핑 시: 기존 자동 추론 다이얼 + "레퍼런스 카탈로그 매핑 없음" 1줄 표기.

---

## CREATE 모드: 프리미엄 UI 생성

### 실행 순서

**0단계: 컨셉 분석 + 레퍼런스 앵커링 (VAR≥5 또는 MOT≥5 시 의무)**

```
① 컨셉 키워드 추출 → 위 "컨셉별 래퍼런스 카탈로그"에서 카테고리 매핑
② 카탈로그 매핑 성공 → "다이얼 제안 출력 형식"으로 VAR/MOT/DEN + 앵커 레퍼런스 + 추출 디테일 3개 출력
③ 이미지 첨부 시: 카탈로그 레퍼런스 대신 첨부 이미지를 앵커로 사용 (이미지 우선)
```

- 이미지 3장+ 첨부 시: PHASE 0 스캔 시 이미지 컨텍스트 활용 → AI 티 제거 핵심
- 이미지 1~2장: "1장은 따라 그리기, 3장이어야 방향 설정 가능" 안내
- 이미지 미첨부 + 카탈로그 매핑 성공: 추출 디테일 3개를 이미지 대체로 구현에 직접 반영
- 이미지 미첨부 + 카탈로그 매핑 실패: "레퍼런스 없음 — AI 기본 패턴 출력 가능성 있음" 경고

**1단계: 다이얼 결정**
- 0단계 카탈로그 매핑 결과 우선 → 없으면 프롬프트 키워드 자동 추론
- `--var/--mot/--den` 수동 오버라이드 적용 (카탈로그 제안보다 우선)
- 출력: "다이얼 제안 출력 형식" (VAR/MOT/DEN 이유 + 앵커 레퍼런스 포함)

**2단계: 의존성 확인**
- 필요 패키지가 package.json에 없으면 **코드 작성 전에** 설치 명령 출력
- `npm install` / `pnpm add` 명령을 먼저 실행하거나 사용자에게 안내

**3단계: 코드 생성**
- 디자인 엔지니어링 규칙 (섹션 하단) 전체 적용
- AI Tells 금지 목록 사전 검증
- Pre-flight 체크리스트 통과 후에만 출력

**4단계: 자동 검증**
- 생성된 코드를 AI Tells 금지 패턴으로 Grep 스캔
- 위반 발견 시 자동 수정 후 재출력

---

## AUDIT 모드: AI Tells 자동 탐지

### 실행 순서

**1단계: 스캔 범위 결정**
```bash
# 프론트엔드 소스 파일 탐색
glob: "src/**/*.{tsx,jsx,ts,js,css}"
glob: "app/**/*.{tsx,jsx,ts,js,css}"
glob: "components/**/*.{tsx,jsx,ts,js,css}"
glob: "pages/**/*.{tsx,jsx,ts,js,css}"
```

**2단계: 자동 탐지 규칙** (Grep 기반 병렬 실행)

| 카테고리 | 패턴 | 심각도 | 설명 |
|----------|------|--------|------|
| 폰트 | `Inter` | 🔴 | AI 기본 폰트 |
| 색상 | `#000000\|#000[^0-9a-fA-F]` | 🔴 | 순수 흑색 금지 → zinc-950 사용 |
| 색상 | `purple.*gradient\|violet.*glow` | 🟡 | AI 보라색/네온 미학 |
| 레이아웃 | `grid-cols-3` (피처 섹션 맥락) | 🟡 | 3열 카드 레이아웃 |
| 레이아웃 | `h-screen` | 🔴 | iOS Safari 뷰포트 버그 → `min-h-[100dvh]` |
| 레이아웃 | `w-\[calc\(` | 🟡 | Flex 퍼센트 수학 → CSS Grid 사용 |
| 그림자 | `shadow-md\|shadow-lg\|shadow-xl` (기본) | 🟡 | 기본 그림자 → 틴트 그림자 사용 |
| 모션 | `ease-in-out\|ease-linear` | 🟡 | 기본 이징 → 커스텀 cubic-bezier |
| 모션 | `animate-.*top\|animate-.*left\|animate-.*width\|animate-.*height` | 🔴 | GPU-unsafe 애니메이션 |
| z-index | `z-50\|z-\[9999\]\|z-\[999\]` | 🟡 | z-index 남용 |
| 아이콘 | `from ['"]lucide-react['"]` | 🟡 | 두꺼운 기본 아이콘 → Phosphor/Radix 권장 |
| 콘텐츠 | `John Doe\|Jane Doe\|Acme\|Lorem ipsum` | 🟡 | 제너릭 플레이스홀더 |
| 이미지 | `unsplash\.com` | 🔴 | 깨지는 URL → picsum.photos 사용 |
| 이모지 | 코드/마크업 내 이모지 문자 | 🔴 | 이모지 금지 → 아이콘 컴포넌트 사용 |

**3단계: 리포트 출력**

```
=== /taste audit 결과 ===
스캔: N개 파일

[🔴 Critical] 3건
  src/components/Hero.tsx L14: h-screen 사용 → min-h-[100dvh]로 교체 필요
  src/components/Card.tsx L8: #000000 → zinc-950 또는 slate-950
  src/app/layout.tsx L3: Inter 폰트 → Geist, Outfit, Satoshi 권장

[🟡 Warning] 5건
  src/components/Features.tsx L22: grid-cols-3 카드 → 비대칭 그리드 또는 Bento
  ...

총 결과: 3 Critical / 5 Warning
자동 수정 가능: 2건 (실행하시겠습니까?)
```

---

## REDESIGN 모드: 기존 컴포넌트 프리미엄화

### 실행 순서

**1단계: 대상 파일 읽기**
- 지정된 파일/컴포넌트를 Read로 완독

**2단계: 7-카테고리 감사**

| # | 카테고리 | 검사 항목 |
|---|----------|----------|
| 1 | 타이포그래피 | 폰트 선택, 크기 계층, tracking, leading, max-w 제한 |
| 2 | 색상 | 팔레트 일관성, 채도 < 80%, AI 보라색 사용 여부 |
| 3 | 레이아웃 | 대칭 편향, 센터 바이어스, 그리드 구조 |
| 4 | 그림자/재질 | 기본 shadow 사용, 카드 남용, 틴트 그림자 여부 |
| 5 | 인터랙션 | hover/active/loading/empty/error 상태 구현 여부 |
| 6 | 모션 | 이징 품질, 스프링 물리, 스태거 애니메이션 |
| 7 | 콘텐츠 | 플레이스홀더 품질, 이모지, 제너릭 네이밍 |

**3단계: 리디자인 실행**
- 감사 결과 기반으로 프리미엄 버전 생성
- 기존 기능 100% 보존, 디자인만 업그레이드
- 변경 전/후 차이점 요약 제시

---

## 디자인 엔지니어링 규칙 (핵심 엔진)

### 규칙 1: 타이포그래피

- **헤드라인**: `text-4xl md:text-6xl tracking-tighter leading-none`
- **금지 폰트**: Inter — 프리미엄 대체: `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`
- **기술 UI 규칙**: 대시보드/소프트웨어 UI에서 Serif 폰트 사용 **절대 금지**. `Geist` + `Geist Mono` 또는 `Satoshi` + `JetBrains Mono` 조합 사용
- **본문**: `text-base text-gray-600 leading-relaxed max-w-[65ch]`

### 규칙 2: 색상 캘리브레이션

- 악센트 컬러 **최대 1개**, 채도 < 80%
- **AI 보라/파랑 금지**: 보라색 버튼 글로우, 네온 그라데이션 사용 금지
- 뉴트럴 베이스(Zinc/Slate) + 고대비 단일 악센트(Emerald, Electric Blue, Deep Rose)
- 프로젝트 내 **한 팔레트 일관 유지** — warm/cool gray 혼용 금지

### 규칙 3: 레이아웃 다양화

- **VAR > 4일 때**: 센터 정렬 Hero/H1 **금지** → Split Screen(50/50), 좌측 텍스트/우측 에셋, 비대칭 여백
- **3열 균등 카드 레이아웃 금지** → 2열 지그재그, 비대칭 그리드, 수평 스크롤 사용
- **Flex 퍼센트 수학 금지**: `w-[calc(33%-1rem)]` → CSS Grid `grid grid-cols-1 md:grid-cols-3 gap-6`

### 규칙 4: 그림자와 카드

- **DEN > 7일 때**: 범용 카드 컨테이너 **금지** → `border-t`, `divide-y`, 네거티브 스페이스로 그룹핑
- 카드는 **고도(elevation)가 계층을 전달할 때만** 사용
- 그림자 사용 시 배경 색조에 맞춰 **틴트** 적용

### 규칙 5: 인터랙티브 상태 (필수 구현)

- **로딩**: 레이아웃 크기 매칭 스켈레톤 로더 (원형 스피너 금지)
- **빈 상태**: 데이터 투입 방법을 안내하는 아름다운 빈 상태
- **에러**: 인라인 에러 리포팅 (폼 등)
- **촉각 피드백**: `:active`에서 `-translate-y-[1px]` 또는 `scale-[0.98]`

### 규칙 6: 폼 패턴

- Label은 input **위에** 배치
- 에러 텍스트는 input **아래**
- 표준 `gap-2` 간격

---

## 크리에이티브 무기고 (고급 UI 패턴)

다이얼 값에 따라 자동 선택. 일반적 UI 대신 이 패턴들을 우선 적용:

### 네비게이션
- **Mac OS Dock 확대**: 아이콘이 hover 시 유동적으로 확대
- **자기장 버튼**: 커서 방향으로 물리적 당김 (MOT > 5 필수, `useMotionValue` 사용)
- **Dynamic Island**: 상태/알림을 표시하는 변형 가능한 필 모양 UI
- **플로팅 네비바**: 상단 고정이 아닌 `mt-6 mx-auto w-max rounded-full` 부유 글래스 필
- **워드마크+링크5개+버튼 기본 패턴 탈피**: AI 기본 네비 구조 대신 세그먼티드 컨트롤, 커맨드 팔레트(⌘K) 트리거, 수직 사이드 네비, 메가메뉴 드롭다운 등 컨텍스트에 맞는 대안 선택
- **sticky 오프셋 규율**: 페이지 nav가 sticky일 때 보조 sticky 요소(플로팅 네비바 등)는 `top: var(--banner-height)`로 오프셋 지정 — 배너/공지 바와 겹침 방지

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

### 풋터
- **4열 링크 그리드 기본값 탈피**: 뉴스레터 CTA 통합형, 미니멀 단일 라인(로고+저작권+소셜 아이콘), 사이트맵 아코디언(모바일), 대형 워드마크 sign-off 등 컨텍스트에 맞는 대안 선택 (docs/hub 페이지의 다열 링크 그리드는 예외적으로 허용)

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

### 레이아웃
- **Bento Grid**: 비대칭 타일 기반 그룹핑 (Apple Control Center 스타일)
- **매서너리**: 고정 행높이 없는 엇갈린 그리드 (Pinterest)
- **Split Screen Scroll**: 화면 양쪽이 반대 방향으로 슬라이드
- **커튼 리빌**: Hero가 스크롤 시 가운데서 갈라지며 열림

### 카드 & 컨테이너
- **Parallax Tilt Card**: 마우스 좌표 추적 3D 기울기
- **Spotlight Border Card**: 커서 아래 동적 발광 테두리
- **Double-Bezel (이중 구조)**: 외부 껍질(`bg-black/5 ring-1 ring-black/5 p-1.5 rounded-[2rem]`) + 내부 핵심(`rounded-[calc(2rem-0.375rem)]` 동심원 곡선)
- **글래스모피즘 패널**: `backdrop-blur` + `border-white/10` + `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` 물리적 굴절 시뮬레이션

### 스크롤 애니메이션
- **Sticky Scroll Stack**: 카드가 상단에 고정되며 물리적으로 쌓임
- **수평 스크롤 하이잭**: 수직 스크롤을 수평 갤러리 패닝으로 변환
- **줌 패럴랙스**: 배경 이미지가 스크롤에 따라 확대/축소

### 마이크로 인터랙션
- **파티클 폭발 버튼**: CTA 성공 시 파티클로 산산이 흩어짐
- **스켈레톤 시머**: 플레이스홀더 박스 위로 이동하는 빛 반사
- **방향 감지 Hover**: 마우스가 진입한 정확한 방향에서 fill이 들어옴

### 타이포그래피
- **키네틱 마키**: 스크롤에 따라 방향/속도가 변하는 무한 텍스트 밴드
- **텍스트 마스크 리빌**: 거대 타이포그래피가 비디오 배경의 투명 창 역할
- **텍스트 스크램블**: Matrix 스타일 문자 디코딩 효과

---

## 성능 가드레일 (반드시 준수)

| 규칙 | 금지 | 대체 |
|------|------|------|
| GPU-safe 애니메이션 | `top`, `left`, `width`, `height` 애니메이트 | `transform`, `opacity`만 사용 |
| blur 제약 | 스크롤 컨테이너에 `backdrop-blur` | 고정/sticky 요소에만 적용 |
| 노이즈/그레인 | 스크롤 컨테이너에 부착 | `fixed inset-0 z-50 pointer-events-none`에만 |
| z-index 규율 | `z-50`, `z-[9999]` 남발 | 시스템 레이어(nav, modal, overlay)에만 |
| RSC 안전 | Server Component에서 전역 상태 | 인터랙티브 요소는 `'use client'` 격리 |
| 무한 루프 격리 | 부모 컴포넌트에서 퍼페추얼 애니메이션 | `React.memo`로 격리된 Client Component |
| Framer/GSAP 혼용 금지 | 같은 컴포넌트 트리에 혼용 | Framer: UI/Bento, GSAP: 스크롤텔링/Canvas 전용 |
| `will-change` | 남용 | 실제 애니메이션 중인 요소에만 |

---

## 레이아웃 견고성 게이트 (반드시 준수)

실무에서 자주 발생하는 CSS 오버플로/줄바꿈 버그를 생성 시점에 차단한다.

| 규칙 | 금지 | 대체 |
|------|------|------|
| 가로스크롤 방지 | 320~1920px 전 구간에서 좌우 스크롤 발생 | 최상위 컨테이너에 `overflow-x-clip`(Tailwind) 또는 `overflow-x: clip` 적용 |
| 그리드 트랙 오버플로 | 이미지 포함 그리드 트랙에 `1fr` 사용 (콘텐츠가 트랙을 밀어냄) | `minmax(0,1fr)`로 트랙 정의 |
| 헤더 줄바꿈 파괴 | 긴 영단어/URL/한국어 조사 결합이 디스플레이 헤더 레이아웃을 깨뜨림 | 헤딩 요소에 `overflow-wrap: anywhere; min-width: 0` 적용 |

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

---

## AI Tells 금지 목록 (완전판)

위반 시 생성 코드가 **자동 거부**됨:

### 비주얼 & CSS
- ❌ 네온/외부 글로우 (`box-shadow` 기본 글로우)
- ❌ 순수 흑색 `#000000` → Off-Black, Zinc-950, Charcoal
- ❌ 과포화 악센트 → 뉴트럴과 조화되도록 탈채도
- ❌ 그라데이션 텍스트 대형 헤더 과다 사용
- ❌ 커스텀 마우스 커서 (성능/접근성 파괴)
- ❌ 애니메이션 메시/라바램프 그라데이션 배경 — AI 슬랍 신호

(2026-08-13, 내부 리뷰 판정 — adopt-hallmark 충돌 해소)

### 타이포그래피
- ❌ Inter, Roboto, Arial, Open Sans, Helvetica
- ❌ 과대 H1 (hierarchy는 weight/color로 통제, 크기만으로 X)
- ❌ 대시보드에 Serif 폰트
- ❌ 폰트 패밀리 4종 이상 혼용 → display+body+outlier 1개까지 최대 3종 상한
- ❌ outlier(장식용) 폰트를 페이지 내 3슬롯 이상 사용 → 2슬롯 이하로 제한
- ❌ 헤딩/디스플레이 타입에 이탤릭 사용 → 이탤릭은 본문 강조에만 허용

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

### 레이아웃
- ❌ 3열 균등 카드 피처 섹션
- ❌ `h-screen` → `min-h-[100dvh]`
- ❌ 센터 정렬 Hero (VAR > 4일 때)
- ❌ 상단 끝까지 붙은 sticky 네비바 (부유 글래스 필 권장)

### 모션 남용
- ❌ `transition: all` 축약 사용 → 속성 개별 지정 (`transition: transform 0.3s, opacity 0.3s`)
- ❌ 서로 무관한 요소에 동일한 `hover:scale-105` 반복 적용 → 요소별 의미에 맞는 개별 인터랙션
- ❌ 한 요소에 translate+scale+shadow hover 효과 동시 적용 → 요소당 hover 효과 1개로 제한

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

### 콘텐츠
- ❌ "John Doe", "Sarah Chan", "Jack Su" → 창의적 실감 있는 이름
- ❌ SVG 계란형 아바타 → 스타일링된 플레이스홀더 또는 사진
- ❌ 근거 없는 지표·수치 삽입 금지 — 실서비스 UI의 수치는 반드시 실데이터 바인딩만 허용. 예외: 명시적 목업/데모 산출물에 한해 플레이스홀더 수치 허용하되 목업임을 코드 주석으로 표기
- ❌ "Acme", "Nexus", "SmartFlow" → 프리미엄 맥락적 브랜드명
- ❌ "Elevate", "Seamless", "Unleash", "Next-Gen" → 구체적 동사 사용
- ❌ Lorem ipsum

(2026-08-13, 내부 리뷰 판정 — adopt-hallmark 충돌 해소)

### 외부 리소스
- ❌ Unsplash URL (깨짐) → `https://picsum.photos/seed/{random}/800/600`
- ❌ shadcn/ui 기본 상태 → 반드시 radii/colors/shadows 커스터마이징
- ❌ 이모지 (코드, 마크업, 텍스트 콘텐츠, alt 텍스트 모두) → Phosphor/Radix 아이콘

---

## Bento 2.0 패러다임 (SaaS 대시보드 전용)

DEN ≥ 6인 대시보드/피처 섹션 생성 시 자동 적용:

**미학**: `#f9fafb` 배경, 순백 카드(`#ffffff`) + `border-slate-200/50` 1px, `rounded-[2.5rem]`, 디퓨전 그림자
**타이포**: `Geist` / `Satoshi` / `Cabinet Grotesk`, `tracking-tight`
**패딩**: 카드 내부 `p-8` 또는 `p-10`

### 5가지 카드 아키타입 (자동 선택)

1. **지능형 리스트**: `layoutId`로 자동 재정렬되는 수직 스택 (AI 우선순위 시뮬레이션)
2. **커맨드 입력**: 다단계 타이프라이터 효과 + 블링킹 커서 + 시머 로딩
3. **라이브 상태**: "호흡하는" 상태 인디케이터 + 오버슈트 스프링 뱃지
4. **와이드 데이터 스트림**: `x: ["0%", "-100%"]` 무한 캐러셀
5. **포커스 모드**: 문서 뷰 + 스태거 하이라이트 + 플로팅 툴바

**필수**: 모든 카드에 무한 루프 마이크로 인터랙션 (Pulse/Typewriter/Float/Shimmer). `React.memo`로 격리.

---

## Pre-flight 체크리스트 (출력 전 최종 검증)

코드를 사용자에게 전달하기 전, 아래 항목을 모두 확인:

- [ ] 전역 상태가 적절히 사용됨 (deep prop-drilling 회피 목적)
- [ ] 모바일 단일 컬럼 폴백 보장 (`w-full`, `px-4`, `max-w-7xl mx-auto`)
- [ ] `min-h-[100dvh]` 사용 (h-screen 아님)
- [ ] `useEffect` 애니메이션에 cleanup 함수 존재
- [ ] loading/empty/error 상태 구현됨
- [ ] DEN > 7에서 불필요한 카드 제거됨
- [ ] 퍼페추얼 애니메이션이 격리된 Client Component에 존재
- [ ] AI Tells 금지 목록 위반 0건
- [ ] 모든 필요 패키지가 package.json에 존재하거나 설치 명령 제시됨
- [ ] Tailwind 버전 잠금 준수 (v3/v4 문법 혼용 없음)
- [ ] 자동 채점 종합 ≥ 7.0 (CREATE/REDESIGN/VARIANTS 모드)
- [ ] design-rules 로드 시 11 Golden Rules 위반 0건 (또는 미설치 경고 기록)
- [ ] 시각 iterate 1회 이상 수행 (dev server 감지 가능한 경우)
- [ ] **WCAG 대비 게이트 통과** — javascript_tool opacity 합성 실효색 기준 본문 ≥ 4.5:1 / 대형 ≥ 3:1
  (실패 시 재생성, preview 불가 시 Grep으로 `text-*/[1-4][0-9]` 패턴 경고)
- [ ] **컨셉별 래퍼런스 카탈로그 매핑 시도** — VAR≥5 또는 MOT≥5 시 앵커 레퍼런스 + 추출 디테일 3개 출력
- [ ] **접근성 게이트 확장 통과** — prefers-reduced-motion 폴백 / 장식 요소 aria-hidden / 자동회전 콘텐츠 hover·focus 정지 / 버튼 표면 대비
- [ ] **레이아웃 견고성 게이트 통과** — 320~1920px 가로스크롤 없음 / 이미지 그리드 `minmax(0,1fr)` / 헤더 `overflow-wrap:anywhere`
- [ ] **클릭 가능 텍스트 2줄 줄바꿈 금지** — 버튼/네비/CTA 텍스트가 어떤 뷰포트에서도 1줄 유지되는지 확인

(2026-08-13 hallmark slop-test 게이트 선별 흡수 — adopt-hallmark)

---

**버전**: 1.2.0 [WCAG 대비 게이트 + 컨셉별 래퍼런스 카탈로그 + 다이얼 제안 형식 고도화]
**원본 참조**: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT) — 상세 고지·델타 목록은 `ATTRIBUTION.md` 참조.
**구조 골격(--macro) 참조**: 이 저장소 동봉 `../macrostructures/`(31종 구조 골격 카탈로그 — `docs/usage-guide.md` 및 `gallery/index.html` 참고).
