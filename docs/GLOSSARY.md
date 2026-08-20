# Glossary

이 저장소 전반에서 쓰이는 용어 정의.

- **macrostructure (매크로스트럭처, 구조 골격)** — "페이지 전체가 어떤 형태로 짜이는가"를
  지정하는 구조 문법 축. `macrostructures/macrostructures.md`에 31종이 정의되어 있고,
  각각 `demos/<id>.html`(실물 데모)와 `thumbnails/ms-<id>.svg`(다이어그램)를 짝으로 가진다.

- **다이얼 3축 (VAR / MOT / DEN)** — `taste` 스킬이 생성물의 강도를 제어하는 세 축.
  **VAR**(DESIGN_VARIANCE, 레이아웃 비대칭도) · **MOT**(MOTION_INTENSITY, 애니메이션 강도) ·
  **DEN**(VISUAL_DENSITY, 콘텐츠 밀도). 각 축은 1~10 스케일이며 프롬프트 키워드로 자동
  추론되거나 `--var=N --mot=N --den=N`으로 수동 지정한다.

- **골격 × 프리셋 × 다이얼, 세 축의 직교 관계** — `macrostructure`(구조: 몸의 골격을 어떤
  모양으로 짤지) · 색/무드 프리셋(표피: 어떤 옷을 입힐지, 이 저장소엔 미수록) ·
  다이얼(강도: 얼마나 강하게 입힐지)은 서로 독립적으로 조합 가능한 세 축이다. 하나만
  지정해도, 셋을 다 지정해도 동작한다.

- **`--macro=<id>` 인자** — `taste` 스킬 호출 시 구조 골격을 지정하는 인자. 예:
  `/taste "제품 소개" --macro=stat-led`. 미존재 id를 넣으면 경고 1줄과 함께 macro 없이
  진행한다(graceful fallback) — 스킬 자체가 멈추지 않는다.

- **Provenance 버킷 (① original / ② forked-hardened / ③ external-as-is / ④ 기원 미상)** —
  README의 "Provenance" 절에서 쓰는 4분류. 처음부터 자체 설계했는지, 외부 공개 저장소를
  가져와 대폭 개조했는지, 거의 그대로 쓰지만 재배포는 안 하는지, 기원을 확인하지 못했는지를
  숨기지 않고 표기하는 방식. 이 저장소의 두 구성 요소(`taste`, `macrostructures`)는 모두
  ②forked-hardened다 — 상세 델타는 각 `ATTRIBUTION.md` 참고.

- **AI Tells (AI 티)** — `taste audit` 모드가 자동 탐지하는, "AI가 만들었다는 티가 나는"
  코드/디자인 패턴의 총칭(순수 흑색, Inter 폰트, 3열 균등 카드, 보라색 그라데이션 등).
  `taste`의 핵심 철학은 이 패턴들을 제거하는 것이다.

- **자가 채점 4기준 (Design quality / Originality / Craft / Functionality)** — `taste`가
  CREATE/REDESIGN/VARIANTS 모드에서 생성 직후 자동으로 매기는 점수. 종합 점수가 7.0
  미만이면 최대 2회까지 자동 재작업 루프가 돈다. 완전히 자동화된 판정이 아니라, "충분하다"는
  판단을 산출물(점수 + 재작업 로그)로 대체하는 장치다.

- **선택적 연동 (graceful degradation)** — `design-rules/`(StyleSeed)나 색/무드 프리셋
  시스템처럼, 있으면 참조하고 없으면 경고 1줄과 함께 기본값으로 계속 진행하는 연동 방식.
  이 저장소가 "clone 한 번으로 완전히 동작"하는 이유는 모든 외부 연동이 이 방식으로
  설계되어 있기 때문이다.
