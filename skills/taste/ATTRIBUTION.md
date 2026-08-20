# ATTRIBUTION — taste 스킬

## 1. 원본 출처

- **저장소**: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
- **저작권자**: Leonxlnx
- **라이선스**: MIT License

```
MIT License

Copyright (c) 2026 Leonxlnx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

(원문 확인: `https://github.com/Leonxlnx/taste-skill/blob/main/LICENSE`, 2026-08-18 대조)

## 2. 우리 쪽 개선 델타 (원본 대비 추가/확장)

원본은 "프리미엄 프론트엔드 UI 생성/감사" 컨셉의 단일 SKILL.md였다. 이 저장소(`skills/taste/SKILL.md`)에서 원본 컨셉 위에 다음을 추가·확장했다:

1. **3축 다이얼 시스템(VAR/MOT/DEN) 자동 추론** — 프롬프트 키워드(대시보드/랜딩/럭셔리/미니멀 등)를 변주(VAR)·모션(MOT)·밀도(DEN) 강도 값으로 매핑하는 규칙 신설.
2. **StyleSeed 엔진 통합** — `design-rules/`의 StyleSeed 디자인 엔진(별도 벤더 자산, `bitjaru/styleseed`)과 연동해 실제 컴포넌트를 이식하는 경로 추가.
3. **variants 대안 시안 + 자동 채점** — 복수 시안을 생성한 뒤 자동으로 스코어링하는 기능 확장.
4. **품질 게이트 다수 신설/확장** — WCAG 대비 게이트(실효색 기준 4.5:1/3:1), 컨셉별 레퍼런스 카탈로그 매핑, 접근성 게이트(prefers-reduced-motion 폴백/aria-hidden/hover·focus 정지), 레이아웃 견고성 게이트(320~1920px 가로스크롤 금지 등), 클릭 가능 텍스트 줄바꿈 금지 규칙.
5. **hallmark 프로젝트발 slop-test 게이트 선별 흡수** (2026-08-13, adopt-hallmark) — 별도 외부 자산(Nutlope/hallmark, macrostructures와 별개 흡수 경로) 검토 과정에서 채택한 AI-tell 탐지 항목 일부를 병합.

원문 전체를 라인 단위로 대조하지는 않았으므로, "원문을 얼마나 재작성했는지"의 정확한 비율은 확정하지 않는다 — 위 4개 항목은 이 저장소 SKILL.md 본문에 명시적으로 기록된, 원본에 없던 확장 기능만을 근거로 한다.

## 3. 파생 관계 선언

이 자산(`skills/taste/SKILL.md`)은 [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)(MIT License)의 파생물이며, MIT 라이선스 조건(위 §1 원문 고지 유지)에 따라 재배포 가능하다.

## 4. 작성일

2026-08-18
