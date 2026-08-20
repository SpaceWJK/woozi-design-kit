# ATTRIBUTION — 매크로스트럭처 31종 자산

> 적용 범위: `macrostructures/macrostructures.md`, `macrostructures/macrostructures.json`,
> `macrostructures/demos/*.html`(31개), `macrostructures/thumbnails/ms-*.svg`(31개) — 이 저장소의
> `macrostructures/` 디렉토리 전체가 대상이다. 이 패키지에 동봉된 `skills/taste/`(taste 스킬)는
> 별개 원본에서 파생된 자산이며 자체 `skills/taste/ATTRIBUTION.md`를 따른다.

## 1. 원본 출처

- **저장소**: [Nutlope/hallmark](https://github.com/Nutlope/hallmark)
- **원본 경로**: `skills/hallmark/references/macrostructures.md` + `macrostructures/01~21-*.md`
- **저작권자**: Hallmark contributors
- **라이선스**: MIT License
- **이식일**: 2026-08-13

```
MIT License

Copyright (c) 2026 Hallmark contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

(원문 확인: `https://raw.githubusercontent.com/Nutlope/hallmark/main/LICENSE`, 2026-08-18 대조)

## 2. 우리 쪽 개선 델타 (원본 대비 추가/확장)

원본은 21개 마크다운 파일(`01~21-*.md`)로 구성된 구조 어휘 설명 문서였다. 이 저장소에서 다음을 추가·확장했다:

1. **한국어 재서술** — 각 구조의 명칭·설명을 직역이 아니라 "UI 위임 브리프에서 바로 쓸 수 있는 용어"로 재작성(`macrostructures.md` 자기 선언, 원문 인용구는 참고용으로만 병기).
2. **21종 → 31종 확장/재분류** — `macrostructures.json`의 `total` 필드가 31이며, `demos/`(31개 HTML)·`thumbnails/ms-*.svg`(31개)도 31종 기준으로 제작됨. 원본 대비 정확히 몇 종이 순수 추가분이고 몇 종이 재분류인지는 원본 21개 파일명 전수 대조를 거치지 않아 **미확정**으로 남긴다.
3. **3축 직교 통합 프레임워크 신설** — macrostructure(골격) × 색/무드 프리셋(별도 시스템, 이 저장소엔 미수록) × taste 다이얼(VAR/MOT/DEN, 변주·모션·밀도)을 서로 자유롭게 조합 가능한 브리프 체계로 명시적으로 결합. 이 통합 설계는 원본에 없는 순수 추가 산출물.
4. **시각 자료 신규 제작** — 원본은 마크다운 설명뿐 시각 자료가 전혀 없었다. 이 저장소에서 SVG 다이어그램 31개(`thumbnails/ms-*.svg`)와 데모 HTML 31개(`demos/*.html` — bento-grid, catalogue, component-playground, dashboard-shell 등)를 신규 제작했다. `demos/data-table-workspace.html`은 실사용 목업 데이터(프로젝트명·티켓ID·담당자명)를 전부 가상값으로 교체해 재작성했다 — 레이아웃 문법 자체는 보존.

## 3. 파생 관계 선언

이 자산(§1 적용 범위에 명시한 파일들)은 [Nutlope/hallmark](https://github.com/Nutlope/hallmark)(MIT License)의 파생물이며, MIT 라이선스 조건(위 §1 원문 고지 유지)에 따라 재배포 가능하다.

## 4. 작성일

2026-08-18
