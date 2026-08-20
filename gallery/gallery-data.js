window.MACROSTRUCTURES_DATA = {
  "source": "macrostructures.md (파생물 — 원본 우선)",
  "total": 31,
  "macrostructures": [
    {
      "id": "bento-grid",
      "name_ko": "벤토 그리드",
      "name_en": "Bento Grid",
      "description": "크기가 들쭉날쭉한 8~15개 블록(1×1~2×2 스팬 혼합)을 비정형 그리드에 배치해, 균일함이 아니라 크기 차이 자체로 리듬을 만드는 구조. 헤어라인 구분선 없이 12~24px 간격만으로 블록을 나눈다.",
      "use_tags": [
        "랜딩 페이지",
        "기능 소개 섹션",
        "대시보드"
      ],
      "avoid_when": "메시지가 단 하나로 수렴해야 하는 페이지 (→ Marquee Hero, Stat-Led가 낫다)",
      "svg": "thumbnails/ms-bento-grid.svg"
    },
    {
      "id": "long-document",
      "name_ko": "롱 다큐먼트",
      "name_en": "Long Document",
      "description": "마케팅용 구획 나누기 없이, 연속된 산문 안에 인라인 섹션 제목만 박아 넣는 구조. 제품을 광고가 아니라 한 편의 글처럼 읽게 만든다.",
      "use_tags": [
        "창업자 소개글",
        "브랜드 철학 문서",
        "심층 제품 설명"
      ],
      "avoid_when": "짧고 스캔하기 쉬운 마케팅 페이지가 필요할 때",
      "svg": "thumbnails/ms-long-document.svg"
    },
    {
      "id": "marquee-hero",
      "name_ko": "마퀴 히어로",
      "name_en": "Marquee Hero",
      "description": "\"히어로가 곧 페이지\"인 구조 — 뷰포트 전체를 채우는 단 하나의 굵은 선언 또는 비주얼이 첫 화면의 전부다. 스크롤 없이도 메시지가 완결된다.",
      "use_tags": [
        "캠페인 티저",
        "단일 메시지 랜딩",
        "이벤트 페이지"
      ],
      "avoid_when": "여러 콘텐츠를 동시에 보여줘야 하는 정보 밀도 높은 페이지",
      "svg": "thumbnails/ms-marquee-hero.svg"
    },
    {
      "id": "stat-led",
      "name_ko": "스탯 리드",
      "name_en": "Stat-Led",
      "description": "거대한 숫자 하나가 서사의 중심이 되고, 나머지 콘텐츠는 그 숫자를 뒷받침하거나 맥락을 붙이는 역할만 한다. 숫자는 반드시 설명 문구와 함께 등장해야 하며, 방어할 수 있는 진짜 지표가 없다면 사용하지 않는다.",
      "use_tags": [
        "B2B/엔터프라이즈 성과 페이지",
        "펀드레이징",
        "임팩트 리포트"
      ],
      "avoid_when": "방어할 수 있는 진짜 지표가 없을 때 (가짜 큰 숫자는 숫자가 없는 것보다 나쁘다)",
      "svg": "thumbnails/ms-stat-led.svg"
    },
    {
      "id": "workbench",
      "name_ko": "워크벤치",
      "name_en": "Workbench",
      "description": "프레임에 담긴 제품 스크린샷이 주 콘텐츠이고, 카피는 최소화된 채 \"사용법을 안내하는 투어\"처럼 구성된다. 마케팅보다 사용성 증명에 가깝다.",
      "use_tags": [
        "제품 데모",
        "SaaS 기능 페이지",
        "온보딩 가이드"
      ],
      "avoid_when": "제품 스크린샷이 없거나 시각적으로 보여줄 UI가 빈약할 때",
      "svg": "thumbnails/ms-workbench.svg"
    },
    {
      "id": "conversational-faq",
      "name_ko": "대화형 FAQ",
      "name_en": "Conversational FAQ",
      "description": "굵은 질문과 짧은 답변을 짝지어, 아코디언으로 접고 펼치는 정직한 인터뷰 톤을 낸다.",
      "use_tags": [
        "지원 문서",
        "FAQ 섹션",
        "요금제 페이지 하단"
      ],
      "avoid_when": "질문-답변 구조가 아닌 서술형 콘텐츠일 때",
      "svg": "thumbnails/ms-conversational-faq.svg"
    },
    {
      "id": "manifesto",
      "name_ko": "매니페스토",
      "name_en": "Manifesto",
      "description": "논쟁적인 대형 타이포(회전된 굵은 헤드라인, -2°~-4° 기울임)로 \"무엇을 사야 하는지\"보다 \"무엇을 믿어야 하는지\"를 먼저 선언하는 구조. 이미지는 거의 없거나 흑백 한 장뿐.",
      "use_tags": [
        "브랜드 리포지셔닝 발표",
        "사명 선언",
        "스튜디오 신념 페이지"
      ],
      "avoid_when": "즉각적인 구매/가입이 목표인 트랜잭셔널 페이지",
      "svg": "thumbnails/ms-manifesto.svg"
    },
    {
      "id": "photographic",
      "name_ko": "포토그래픽",
      "name_en": "Photographic",
      "description": "각 폴드마다 하나의 대형 이미지가 지배하고, 텍스트는 작은 주석 역할만 한다.",
      "use_tags": [
        "브랜드 무드 소개",
        "비주얼 중심 포트폴리오",
        "감성적 랜딩"
      ],
      "avoid_when": "고품질 이미지 자산이 부족할 때",
      "svg": "thumbnails/ms-photographic.svg"
    },
    {
      "id": "quote-led",
      "name_ko": "쿼트 리드",
      "name_en": "Quote-Led",
      "description": "인용문과 출처 표기로 문을 열어, \"빌려온 신뢰\"를 히어로 요소로 쓰는 구조.",
      "use_tags": [
        "고객 후기 중심 페이지",
        "소셜 프루프 섹션",
        "테스티모니얼 랜딩"
      ],
      "avoid_when": "신뢰할 만한 인용/출처가 없을 때",
      "svg": "thumbnails/ms-quote-led.svg"
    },
    {
      "id": "specimen",
      "name_ko": "스페시먼",
      "name_en": "Specimen",
      "description": "좌측 여백에 번호 라벨(\"01 — HELLO.\" 식)을 두고, 대형 세리프 디스플레이와 비대칭 컬럼, 헤어라인 룰, 타이포그래피 전용 CTA(화살표만, 박스 없음)로 구성되는 에디토리얼 구조.",
      "use_tags": [
        "타입 파운드리",
        "저널/에디토리얼 홈페이지",
        "스페시먼 시트"
      ],
      "avoid_when": "에디토리얼/저널/파운드리 맥락이 명시되지 않은 막연한 브리프의 기본 선택지로 사용할 때",
      "svg": "thumbnails/ms-specimen.svg"
    },
    {
      "id": "catalogue",
      "name_ko": "카탈로그",
      "name_en": "Catalogue",
      "description": "동일 항목의 변주들을 균일한 그리드로 나열하는, 시각적 인벤토리 인덱스에 가까운 구조.",
      "use_tags": [
        "제품 목록 페이지",
        "아카이브",
        "작품 갤러리"
      ],
      "avoid_when": "항목 수가 너무 적어 그리드가 휑해 보일 때",
      "svg": "thumbnails/ms-catalogue.svg"
    },
    {
      "id": "letter",
      "name_ko": "레터",
      "name_en": "Letter",
      "description": "1인칭 시점의 친밀한 편지글 구조. \"친애하는 ○○에게\" 식 인사로 열고, 첫 화면 안에는 버튼을 두지 않는다.",
      "use_tags": [
        "창업자 레터",
        "뉴스레터 랜딩",
        "개인 브랜드 소개"
      ],
      "avoid_when": "즉각적인 전환(CTA)이 최우선 목표일 때",
      "svg": "thumbnails/ms-letter.svg"
    },
    {
      "id": "index-first",
      "name_ko": "인덱스 퍼스트",
      "name_en": "Index-First",
      "description": "페이지 자체가 링크 목록이 되어, 순수 내비게이션을 디자인으로 삼는 구조.",
      "use_tags": [
        "허브 페이지",
        "아카이브 인덱스",
        "사이트맵형 랜딩"
      ],
      "avoid_when": "콘텐츠가 링크 목록보다 비주얼 스토리텔링이 필요한 경우",
      "svg": "thumbnails/ms-index-first.svg"
    },
    {
      "id": "narrative-workflow",
      "name_ko": "내러티브 워크플로우",
      "name_en": "Narrative Workflow",
      "description": "번호 매긴 단계들이 시간 순서에 따른 사용 스토리를 프로세스 타임라인처럼 풀어낸다.",
      "use_tags": [
        "온보딩 플로우",
        "이용 방법 섹션",
        "프로세스 설명 페이지"
      ],
      "avoid_when": "단계가 3단계 미만이거나 순서가 중요하지 않을 때",
      "svg": "thumbnails/ms-narrative-workflow.svg"
    },
    {
      "id": "split-studio",
      "name_ko": "스플릿 스튜디오",
      "name_en": "Split Studio",
      "description": "화면을 둘로 나누는 딥티크(diptych) 레이아웃이 매 블록마다 반복되며, 분할 방향이 페이지를 내려갈수록 좌우로 교대한다.",
      "use_tags": [
        "스튜디오/에이전시 소개",
        "비교(Before/After) 레이아웃",
        "포트폴리오"
      ],
      "avoid_when": "비교하거나 대비시킬 두 대상이 없을 때",
      "svg": "thumbnails/ms-split-studio.svg"
    },
    {
      "id": "feature-stack",
      "name_ko": "피처 스택",
      "name_en": "Feature Stack",
      "description": "좌측은 스크롤에 고정(sticky)된 텍스트 패널, 우측은 스크롤에 연동되어 스크린샷이 영화적 시퀀스로 순환하는 패널로 구성.",
      "use_tags": [
        "기능 소개 페이지",
        "제품 스토리텔링",
        "스크롤형 데모"
      ],
      "avoid_when": "스크린샷 시퀀스로 보여줄 기능 단계가 부족할 때",
      "svg": "thumbnails/ms-feature-stack.svg"
    },
    {
      "id": "type-specimen",
      "name_ko": "타입 스페시먼",
      "name_en": "Type Specimen",
      "description": "서체 그 자체를 디자인의 주인공으로 세우는 구조. 커스텀 타이포그래피로 브랜드 정체성을 증명해야 하는 파운드리 홈페이지에 적합.",
      "use_tags": [
        "타입 파운드리",
        "브랜드 아이덴티티 쇼케이스"
      ],
      "avoid_when": "커스텀 타이포그래피 자산이 없을 때",
      "svg": "thumbnails/ms-type-specimen.svg"
    },
    {
      "id": "portfolio-grid",
      "name_ko": "포트폴리오 그리드",
      "name_en": "Portfolio Grid",
      "description": "필터링 가능한 프로젝트 카드 나열. 작업물 자체가 곧 제품인 스튜디오/디자이너용 구조.",
      "use_tags": [
        "포트폴리오 사이트",
        "스튜디오 작업물 아카이브",
        "필터형 갤러리"
      ],
      "avoid_when": "작업물 수가 적어 필터링이 무의미할 때",
      "svg": "thumbnails/ms-portfolio-grid.svg"
    },
    {
      "id": "map-diagram",
      "name_ko": "맵/다이어그램",
      "name_en": "Map / Diagram",
      "description": "플로우차트, 평면도, 네트워크 그래프처럼 정보를 선형 서술이 아니라 공간적 배치로 조직하는 구조. 섹션 구분 없이 하나의 통합된 다이어그램이 본문 전체를 대신한다.",
      "use_tags": [
        "시스템 개요",
        "아키텍처 설명",
        "조직도/프로세스맵"
      ],
      "avoid_when": "순차적 설명이 더 적합한 콘텐츠를 억지로 공간화할 때",
      "svg": "thumbnails/ms-map-diagram.svg"
    },
    {
      "id": "ecosystem-index",
      "name_ko": "에코시스템 인덱스",
      "name_en": "Ecosystem Index",
      "description": "추천/최신/카테고리별/사람별 등 여러 발견 경로를 동시에 제공해, \"발견하는 재미\"와 브라우징 자체의 가치를 강조하는 구조.",
      "use_tags": [
        "마켓플레이스 홈",
        "커뮤니티 허브",
        "콘텐츠 디렉토리"
      ],
      "avoid_when": "발견 경로가 하나뿐인 단순한 콘텐츠일 때",
      "svg": "thumbnails/ms-ecosystem-index.svg"
    },
    {
      "id": "component-playground",
      "name_ko": "컴포넌트 플레이그라운드",
      "name_en": "Component Playground",
      "description": "코드와 미리보기가 나란히 배치된 인터랙티브 블록이 주 콘텐츠. 복사-붙여넣기로 바로 쓸 수 있는 구현 방법을 보여주는 데 초점.",
      "use_tags": [
        "개발자 문서",
        "컴포넌트 라이브러리",
        "디자인 시스템 문서"
      ],
      "avoid_when": "코드 예시를 보여줄 필요가 없는 일반 마케팅 페이지일 때",
      "svg": "thumbnails/ms-component-playground.svg"
    },
    {
      "id": "dashboard-shell",
      "name_ko": "대시보드 셸",
      "name_en": "Dashboard Shell",
      "description": "좌측 고정 사이드바(내비게이션)와 상단 톱바(검색/프로필)가 프레임을 이루고, 그 안쪽에 KPI·차트 위젯이 카드 그리드로 배치되는 구조. 사이드바와 톱바는 스크롤에 고정되고 위젯 영역만 콘텐츠에 따라 늘어난다.",
      "use_tags": [
        "분석 대시보드",
        "관리자 콘솔",
        "SaaS 백오피스 홈"
      ],
      "avoid_when": "단일 메시지에 집중해야 하는 랜딩 페이지 (→ Marquee Hero, Stat-Led가 낫다)",
      "svg": "thumbnails/ms-dashboard-shell.svg"
    },
    {
      "id": "data-table-workspace",
      "name_ko": "데이터 테이블 워크스페이스",
      "name_en": "Data Table Workspace",
      "description": "상단 필터/검색 바 아래 넓게 펼쳐진 대형 데이터 테이블이 주 콘텐츠이고, 행을 클릭하면 우측에서 상세 드로어가 슬라이드로 열리는 구조. 목록과 상세를 한 화면에서 오가야 하는 백오피스 작업에 최적화되어 있다.",
      "use_tags": [
        "백오피스 리스트 관리",
        "CRM",
        "이슈/티켓 트래커"
      ],
      "avoid_when": "항목 수가 적어 테이블 스캐폴딩(헤더/정렬/페이지네이션)이 과할 때",
      "svg": "thumbnails/ms-data-table-workspace.svg"
    },
    {
      "id": "kanban-board",
      "name_ko": "칸반 보드",
      "name_en": "Kanban Board",
      "description": "가로로 나열된 상태 컬럼(3~5개, 컬럼마다 헤더+카운트)과 그 안에 세로로 쌓인 드래그 가능한 카드로 구성되는 구조. 카드의 위치(어느 컬럼의 몇 번째)가 곧 상태를 의미한다.",
      "use_tags": [
        "업무/이슈 관리 보드",
        "프로젝트 진행 현황",
        "워크플로우 시각화"
      ],
      "avoid_when": "상태 전이 개념이 없는 콘텐츠 (단순 목록이면 Data Table Workspace가 낫다)",
      "svg": "thumbnails/ms-kanban-board.svg"
    },
    {
      "id": "commerce-showcase",
      "name_ko": "커머스 쇼케이스",
      "name_en": "Commerce Showcase",
      "description": "좌측 대형 이미지 갤러리(메인 이미지+썸네일)와 우측 구매 패널(가격·옵션·CTA)이 2컬럼으로 짝을 이루는 구조. 단일 상품에 집중해 구매 결정을 끌어내는 것이 목적이다.",
      "use_tags": [
        "제품 상세 페이지",
        "단일 SKU 랜딩",
        "크라우드펀딩 상품 페이지"
      ],
      "avoid_when": "여러 상품을 동시에 나열/비교해야 하는 목록형 페이지 (→ Storefront Grid가 낫다)",
      "svg": "thumbnails/ms-commerce-showcase.svg"
    },
    {
      "id": "storefront-grid",
      "name_ko": "스토어프론트 그리드",
      "name_en": "Storefront Grid",
      "description": "좌측 고정 필터 사이드바(카테고리·가격·속성 체크박스)와 우측 상품 카드 균일 그리드로 구성되는 구조. 탐색(필터링)과 훑어보기(그리드)를 한 화면에서 동시에 지원한다.",
      "use_tags": [
        "커머스 카테고리 페이지",
        "검색 결과 목록",
        "마켓플레이스 리스팅"
      ],
      "avoid_when": "상품 수가 적어 필터 사이드바가 휑해 보일 때",
      "svg": "thumbnails/ms-storefront-grid.svg"
    },
    {
      "id": "docs-portal",
      "name_ko": "독스 포털",
      "name_en": "Docs Portal",
      "description": "좌측 접이식 내비게이션 트리, 중앙 본문(제목+단락+코드블록), 우측 \"이 페이지에서\" TOC로 이뤄진 3컬럼 구조. 깊은 위계의 문서를 잃지 않고 탐색하도록 설계된 정보 구조다.",
      "use_tags": [
        "기술 문서 사이트",
        "API 레퍼런스",
        "지식베이스"
      ],
      "avoid_when": "문서 위계가 얕아(1~2단계) 트리 내비게이션이 과할 때",
      "svg": "thumbnails/ms-docs-portal.svg"
    },
    {
      "id": "settings-console",
      "name_ko": "설정 콘솔",
      "name_en": "Settings Console",
      "description": "좌측 세로 섹션 내비(계정/보안/알림 등)와 우측에 세로로 쌓인 폼 그룹 스택(그룹마다 라벨+입력+저장 버튼)으로 구성되는 구조. 한 번에 한 섹션만 보여줘 설정 항목이 많아도 압도되지 않게 한다.",
      "use_tags": [
        "계정 설정",
        "관리자 환경설정",
        "프로필/조직 관리 페이지"
      ],
      "avoid_when": "설정 항목이 5개 미만으로 적어 섹션 내비 자체가 불필요할 때",
      "svg": "thumbnails/ms-settings-console.svg"
    },
    {
      "id": "chat-workspace",
      "name_ko": "챗 워크스페이스",
      "name_en": "Chat Workspace",
      "description": "좌측 대화 목록 패널(아바타+마지막 메시지 미리보기)과 우측 넓은 스레드 뷰(교대 배치 말풍선+하단 입력창)로 구성되는 구조. 여러 대화를 오가면서도 현재 스레드에 집중할 수 있게 한다.",
      "use_tags": [
        "메신저 UI",
        "AI 챗봇 인터페이스",
        "고객지원 채팅 콘솔"
      ],
      "avoid_when": "단일 대화만 존재해 목록 패널이 무의미할 때 (→ 전체 화면 스레드 뷰가 낫다)",
      "svg": "thumbnails/ms-chat-workspace.svg"
    },
    {
      "id": "auth-onboarding",
      "name_ko": "인증 온보딩",
      "name_en": "Auth Onboarding",
      "description": "화면 중앙에 고정폭 카드 하나만 떠 있고, 그 안에 스텝 인디케이터·폼 필드·주 CTA 버튼이 단일 컬럼으로 쌓이는 구조. 주의를 분산시키는 내비게이션이나 사이드바 없이 완료해야 할 단 하나의 동작에만 집중시킨다.",
      "use_tags": [
        "로그인/회원가입",
        "멀티스텝 온보딩",
        "비밀번호 재설정"
      ],
      "avoid_when": "여러 정보를 동시에 비교/탐색해야 하는 페이지",
      "svg": "thumbnails/ms-auth-onboarding.svg"
    },
    {
      "id": "pricing-compare",
      "name_ko": "프라이싱 비교",
      "name_en": "Pricing Compare",
      "description": "상단에 나열된 플랜 컬럼(가격 강조, 추천 플랜은 시각적으로 돌출)과 그 아래 기능 매트릭스(행=기능, 열=플랜), 하단 FAQ 아코디언으로 이어지는 구조. 플랜 간 차이를 스캔 한 번으로 비교하게 만드는 것이 목적이다.",
      "use_tags": [
        "요금제 페이지",
        "플랜 비교 랜딩",
        "구독 업그레이드 유도 페이지"
      ],
      "avoid_when": "플랜이 1개뿐이라 비교할 대상이 없을 때",
      "svg": "thumbnails/ms-pricing-compare.svg"
    }
  ]
};
