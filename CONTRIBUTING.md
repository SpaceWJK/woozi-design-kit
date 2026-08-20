# Contributing

woozi-design-kit에 기여를 고려해주셔서 감사합니다.

## 이 저장소가 무엇인지 (그리고 무엇이 아닌지)

이 저장소는 두 가지로 구성된다: `skills/taste/`(Claude Code 스킬 1개)와
`macrostructures/`(구조 골격 31종 카탈로그 — 설명 문서 + JSON + 데모 HTML + SVG
다이어그램), 그리고 그 둘을 눈으로 탐색하는 `gallery/`(정적 HTML/CSS/JS, 빌드 도구 없음).
애플리케이션 코드는 `scripts/lint-designkit.mjs`(무결성 검증 스크립트) 하나뿐이다.

## PR을 올리기 전에

1. **push 전에 lint를 실행한다:**
   ```bash
   npm test
   # 또는 직접:
   node scripts/lint-designkit.mjs
   ```
   이 스크립트는 (a) `macrostructures.json` ↔ `demos/*.html` ↔ `thumbnails/ms-*.svg` ↔
   `gallery/gallery-data.js` 네 곳의 id 집합이 정확히 일치하는지, (b) 데모/갤러리 파일에
   외부 URL이 없는지(SVG `xmlns` 네임스페이스는 예외), (c) 사내 프로젝트 코드네임·내부
   티켓ID 체계·태스크 라벨 같은 내부 전용 흔적이 남아있지 않은지 확인한다. 같은 실행에
   자체 검증(self-test)도 포함되어 있다 — 4가지 결함을 메모리 픽스처에 주입해 검사 로직
   자체가 그것들을 실제로 잡아내는지 확인한다. 이 둘 중 하나라도 깨는 PR은 머지되지 않는다.

2. **새 구조 골격을 추가하는 경우** (`macrostructures/`에 32번째 항목 등을 제안):
   - `macrostructures.md`에 기존 항목과 동일한 형식(명칭/설명/적합 용도/피할 때)으로 추가
   - `macrostructures.json`에 대응 항목 추가 (`id`/`name_ko`/`name_en`/`description`/
     `use_tags`/`avoid_when`/`svg`)
   - `demos/<id>.html` 신규 제작 — **외부 URL 참조 금지**(인라인 CSS/SVG/바닐라 JS만),
     Web Fonts CDN도 금지(시스템 폰트 스택 사용)
   - `thumbnails/ms-<id>.svg` 신규 제작 — 같은 자립성 원칙 적용
   - `gallery/gallery-data.js`를 `macrostructures.json`과 동일한 내용으로 재생성 (수동
     동기화 — 두 파일이 어긋나면 `npm test`가 즉시 잡아낸다)
   - 실무 목업 데이터가 포함된 데모라면(예: 티켓 트래커, CRM 등) **반드시 가상 데이터만
     사용** — 실제 회사/제품/사람 이름, 특정 조직의 내부 ID 체계를 연상시키는 패턴 금지

3. **`skills/taste/SKILL.md`를 수정하는 경우**: 원본([Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill))
   대비 이 저장소가 추가한 기능(다이얼 3축, `--macro` 통합, 품질 게이트 등)의 변경이라면
   `ATTRIBUTION.md`의 "우리 쪽 개선 델타" 목록도 함께 갱신한다 — 이 표가 부정확해지면
   provenance 전체의 신뢰도가 흔들린다.

4. **`gallery/`를 수정하는 경우**: `fetch()`를 쓰지 않는다 — `file://`로 직접 열었을 때
   CORS로 로컬 JSON 요청이 막히기 때문에, 데이터는 `gallery-data.js`의 전역 변수로 인라인
   제공하는 현재 방식을 유지한다. 모든 경로는 상대 경로여야 한다(GitHub Pages 같은 서브패스
   배포 환경 호환). 외부 CDN(폰트·아이콘·스크립트)을 새로 추가하지 않는다.

5. **Provenance 변경**: 외부 공개 저장소에서 상당 부분을 가져온 새 구성 요소를 제안하는
   경우, 루트 README의 Provenance 표에 올바른 분류(①original/②forked-hardened/
   ③external-as-is)와 함께 링크·라이선스를 추가한다 — 파생 산출물을 자작으로 포장하지
   않는다.

## 스코프에 대한 우려 신고

이 패키지는 원본 사내 환경에서 쓰이던 다른 스킬·프리셋(예: 색/무드 프리셋 49종, StyleSeed
전체 엔진)을 의도적으로 포함하지 않는다. 이 저장소에서 그런 것이 실수로 새어 들어온 흔적
(실제 이름, 실제 경로, 실제 데이터셋, 이제는 운영하지 않는 내부 도구에 대한 마치 살아있는
것처럼 쓰인 참조)을 발견하면, 스코프/누수 우려임을 제목에 명시해 이슈를 열어주면 우선
분류하겠다.

## 코드 스타일

- 스킬/문서 콘텐츠는 전부 마크다운, 검증 스크립트는 Node 1개(`scripts/lint-designkit.mjs`,
  ESM, 내장 모듈만 사용) — 새 런타임 의존성은 사전 논의 없이 추가하지 않는다.
- 데모 HTML은 인라인 CSS + 바닐라 JS만 사용한다 — 빌드 도구, 프레임워크, 외부 라이브러리를
  추가하지 않는다(이 자립성 자체가 "npm install 없이 clone만으로 동작"이라는 가치의 근거).
