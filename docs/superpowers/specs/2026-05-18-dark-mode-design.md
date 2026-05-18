# 다크모드 지원 설계

- **작성일**: 2026-05-18
- **대상**: sylvesterkwon.github.io (Gatsby 5 블로그)
- **상태**: Approved → 구현 대기

## 1. 목표

OS 설정(`prefers-color-scheme: dark`)을 따라 블로그가 자동으로 다크모드로 전환되도록 한다. 토글 UI는 제공하지 않는다.

## 2. 의사결정 요약

| 항목 | 선택 |
|---|---|
| 전환 방식 | OS 설정 자동 감지만 (수동 토글 없음, localStorage 없음) |
| 컬러 톤 | 소프트 다크 (진한 차콜 배경 + 회백색 텍스트) |
| Prism 코드 테마 | 다크모드일 때 Tomorrow 테마로 전환 |
| 링크/액센트 | `#58a6ff` (GitHub Dark 계열 밝은 파랑) |
| 댓글 (Utterances) | `preferred-color-scheme` (자동 전환) |

## 3. 아키텍처

**핵심 원칙: 순수 CSS, JS 상태 없음.**

- 토글 UI가 없으므로 React 상태/Context/localStorage가 전혀 필요 없음
- `@media (prefers-color-scheme: dark) { :root { ... } }` 안에서 CSS custom properties만 override
- 컴포넌트 코드는 거의 변경되지 않음 (utterances 한 줄 제외)
- 순수 CSS라서 FOUC 없음 (브라우저가 첫 렌더링부터 올바른 색으로 그림)
- 시스템 테마가 바뀌면 새로고침 없이 즉시 반영

## 4. 변경 파일

총 5개 파일이 변경된다.

### 4.1 `src/style.css`

기존 `:root`에 `--color-bg`, `--color-bg-code-inline` 토큰을 추가하고, 그 아래에 다크모드용 미디어 쿼리 블록을 추가한다.

```css
:root {
  /* ... 기존 토큰 ... */
  --color-bg: #ffffff;
  --color-bg-code-inline: rgba(0, 0, 0, 0.05);
  /* ... 기존 --color-* 그대로 ... */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1c1f24;
    --color-primary: #58a6ff;
    --color-text: #c9d1d9;
    --color-text-light: #8b949e;
    --color-heading: #e6edf3;
    --color-heading-black: #f0f6fc;
    --color-accent: #30363d;
    --color-bg-code-inline: rgba(110, 118, 129, 0.4);
  }
}
```

추가로 `body` 셀렉터에 `background: var(--color-bg);` 한 줄을 더한다.

### 4.2 `src/prism-dark.css` (신규)

`node_modules/prismjs/themes/prism-tomorrow.css`의 내용을 그대로 복사한 뒤 전체를 `@media (prefers-color-scheme: dark) { ... }`로 감싼다. (Tomorrow 테마는 MIT 라이선스)

```css
@media (prefers-color-scheme: dark) {
  code[class*="language-"],
  pre[class*="language-"] {
    color: #ccc;
    /* ... (Tomorrow 테마 규칙) ... */
  }
  pre[class*="language-"] { background: #2d2d2d; }
  .token.comment { color: #999; }
  /* ... 토큰 규칙들 ... */
}
```

라이트모드에서는 `prism.css` 기본 테마가 그대로 적용되고, 다크모드에서만 cascade로 Tomorrow 규칙이 덮어쓴다.

### 4.3 `gatsby-browser.js`

`prism.css` import 바로 다음 줄에 새 파일 import 추가.

```js
import "prismjs/themes/prism.css"
import "./src/prism-dark.css"   // 추가
```

순서가 중요하다 (Tomorrow가 prism 기본 테마 뒤에 와야 cascade로 override됨).

### 4.4 `src/components/comment.js`

Utterances 댓글 위젯의 theme 속성 한 줄 변경.

```js
// before
theme: "github-light",
// after
theme: "preferred-color-scheme",
```

Utterances가 네이티브로 지원하는 옵션이라 추가 로직 불필요.

### 4.5 `gatsby-ssr.js`

`<meta name="color-scheme" content="light dark">` 추가.

```js
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    <meta key="color-scheme" name="color-scheme" content="light dark" />,
  ])
}
```

브라우저가 다크모드 지원을 인지하면:
- 폼 요소·스크롤바·기본 input UI가 다크 톤으로 자동 적용
- 페이지 로딩 시 흰 배경 깜빡임 방지

## 5. 변경하지 않는 것

- **Katex** (수식): `currentColor`를 사용해 본문 색을 따라가므로 자동 적용됨
- **프로필 이미지**: 원형 크롭이라 다크 배경에서도 무난. 이슈가 보이면 별도 처리
- **컴포넌트 구조** (`Layout`, `Bio`, `Seo`, 페이지/템플릿): 손대지 않음
- **빌드 설정** (`gatsby-config.js`, `gatsby-node.js`): 손대지 않음

## 6. 테스트 / 검증 방법

1. `npm run develop` 실행 후 OS 다크모드 토글하면서 다음 페이지 확인:
   - 홈 (`/`) — Bio, post list
   - 블로그 글 페이지 — 본문, 코드 블록, 인용구, 링크, hr, 수식(있는 경우), Utterances 댓글
   - 404 페이지
2. 라이트 ↔ 다크 전환 시 깜빡임 없고 모든 요소가 자연스럽게 보이는지
3. 코드 블록의 token 색이 다크 배경에서 가독성 OK인지
4. 링크 색(`#58a6ff`)이 본문 회백색과 충분히 구분되는지

## 7. 비범위 (Out of scope)

- 수동 토글 버튼 / 사용자 선택 저장
- 별도 다크 컬러 팔레트(워밍, 클래식 등) 옵션
- 컴포넌트 리팩토링, 디자인 시스템 도입
- 이미지/아이콘의 다크모드 변형

## 8. 후속 조정 가능성

CSS 변수 값은 실제 렌더링 후 미세 조정 가능. 변수 이름과 적용 위치는 본 설계대로 가고, 색상 값만 필요시 튜닝한다.
