# Design System - 시니어 CEO용 (50-70대)
## C-Level AI Agent Service - UI/UX 디자인 가이드

**버전**: v2.0 (시니어 CEO 최적화)  
**작성일**: 2026-01-10  
**대상 사용자**: 50-70대 CEO 및 C레벨 임원

---

## 1. 디자인 철학 (Design Philosophy)

### 1.1 핵심 원칙

**명확성 우선 (Clarity First)**
- 큰 글꼴과 충분한 여백으로 가독성 극대화
- 명확한 시각적 계층 구조
- 한 번에 하나의 주요 작업에 집중

**밝고 편안한 환경 (Bright & Comfortable)**
- 밝은 배경색으로 눈의 피로 최소화
- 부드러운 색상 대비
- 자연광과 조화로운 색상 팔레트

**직관적 인터페이스 (Intuitive Interface)**
- 명확한 버튼 레이블 (한글)
- 예측 가능한 동작
- 최소한의 학습 곡선

**전문성과 신뢰감 (Professionalism & Trust)**
- 깔끔하고 정돈된 레이아웃
- 일관된 디자인 언어
- 기업용 애플리케이션 수준의 품질

---

## 2. 색상 시스템 (Color System)

### 2.1 Primary Colors (주요 색상)

```css
/* 밝은 파란색 - 신뢰감과 전문성 */
--primary-50: #EFF6FF;   /* 매우 밝은 배경 */
--primary-100: #DBEAFE;  /* 밝은 배경 */
--primary-200: #BFDBFE;  /* 호버 상태 */
--primary-300: #93C5FD;  /* 보조 요소 */
--primary-400: #60A5FA;  /* 액센트 */
--primary-500: #3B82F6;  /* 주요 버튼 */
--primary-600: #2563EB;  /* 버튼 호버 */
--primary-700: #1D4ED8;  /* 활성 상태 */
--primary-800: #1E40AF;  /* 진한 텍스트 */
```

### 2.2 Neutral Colors (중립 색상)

```css
/* 밝은 회색 톤 - 배경과 텍스트 */
--neutral-0: #FFFFFF;    /* 순백 배경 */
--neutral-50: #F9FAFB;   /* 매우 밝은 회색 */
--neutral-100: #F3F4F6;  /* 밝은 회색 배경 */
--neutral-200: #E5E7EB;  /* 구분선 */
--neutral-300: #D1D5DB;  /* 비활성 요소 */
--neutral-400: #9CA3AF;  /* 보조 텍스트 */
--neutral-500: #6B7280;  /* 일반 텍스트 */
--neutral-600: #4B5563;  /* 중요 텍스트 */
--neutral-700: #374151;  /* 제목 */
--neutral-800: #1F2937;  /* 주요 제목 */
--neutral-900: #111827;  /* 최고 대비 텍스트 */
```

### 2.3 Semantic Colors (의미 색상)

```css
/* 성공 - 밝은 초록 */
--success-50: #F0FDF4;
--success-100: #DCFCE7;
--success-500: #22C55E;  /* 주요 성공 색상 */
--success-600: #16A34A;

/* 경고 - 밝은 주황 */
--warning-50: #FFFBEB;
--warning-100: #FEF3C7;
--warning-500: #F59E0B;  /* 주요 경고 색상 */
--warning-600: #D97706;

/* 오류 - 밝은 빨강 */
--error-50: #FEF2F2;
--error-100: #FEE2E2;
--error-500: #EF4444;    /* 주요 오류 색상 */
--error-600: #DC2626;

/* 정보 - 밝은 파랑 */
--info-50: #EFF6FF;
--info-100: #DBEAFE;
--info-500: #3B82F6;     /* 주요 정보 색상 */
--info-600: #2563EB;
```

### 2.4 Agent-Specific Colors (에이전트별 색상)

```css
/* CFO - 밝은 초록 (재무 안정성) */
--agent-cfo-light: #D1FAE5;
--agent-cfo: #10B981;
--agent-cfo-dark: #059669;

/* CTO - 밝은 인디고 (기술 혁신) */
--agent-cto-light: #E0E7FF;
--agent-cto: #6366F1;
--agent-cto-dark: #4F46E5;

/* CMO - 밝은 주황 (마케팅 열정) */
--agent-cmo-light: #FED7AA;
--agent-cmo: #F59E0B;
--agent-cmo-dark: #D97706;

/* COO - 밝은 보라 (운영 효율성) */
--agent-coo-light: #E9D5FF;
--agent-coo: #A855F7;
--agent-coo-dark: #9333EA;

/* CHRO - 밝은 핑크 (인재 관리) */
--agent-chro-light: #FCE7F3;
--agent-chro: #EC4899;
--agent-chro-dark: #DB2777;
```

---

## 3. 타이포그래피 (Typography)

### 3.1 한글 폰트 (Korean Fonts)

**Primary Font: Pretendard (프리텐다드)**
- 한글 가독성이 뛰어난 모던 산세리프 폰트
- 다양한 굵기 지원 (400, 500, 600, 700)
- 웹폰트 CDN: https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css

**Fallback Fonts**
```css
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 
  'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 
  sans-serif;
```

### 3.2 타입 스케일 (Type Scale) - 시니어 CEO 최적화

```css
/* 매우 큰 제목 - 페이지 제목 */
--text-6xl: 48px;  /* line-height: 56px */
--text-5xl: 40px;  /* line-height: 48px */

/* 큰 제목 - 섹션 제목 */
--text-4xl: 32px;  /* line-height: 40px */
--text-3xl: 28px;  /* line-height: 36px */

/* 중간 제목 - 카드 제목 */
--text-2xl: 24px;  /* line-height: 32px */
--text-xl: 20px;   /* line-height: 28px */

/* 본문 - 일반 텍스트 */
--text-lg: 18px;   /* line-height: 28px */ (기본 크기)
--text-base: 16px; /* line-height: 24px */

/* 작은 텍스트 - 보조 정보 */
--text-sm: 14px;   /* line-height: 20px */
--text-xs: 12px;   /* line-height: 16px */
```

**폰트 굵기 (Font Weight)**
```css
--font-regular: 400;   /* 일반 텍스트 */
--font-medium: 500;    /* 강조 텍스트 */
--font-semibold: 600;  /* 제목 */
--font-bold: 700;      /* 주요 제목 */
```

**기본 설정**
- 본문 기본 크기: 18px (시니어 사용자 최적화)
- 최소 폰트 크기: 14px (작은 보조 텍스트)
- 줄 간격: 1.6 (가독성 향상)
- 자간: -0.01em (한글 최적화)

---

## 4. 간격 시스템 (Spacing System)

### 4.1 간격 토큰 (Spacing Tokens)

```css
/* 8px 기반 간격 시스템 (시니어용 확대) */
--space-1: 8px;    /* 0.5rem */
--space-2: 12px;   /* 0.75rem */
--space-3: 16px;   /* 1rem */
--space-4: 24px;   /* 1.5rem */
--space-5: 32px;   /* 2rem */
--space-6: 40px;   /* 2.5rem */
--space-7: 48px;   /* 3rem */
--space-8: 64px;   /* 4rem */
--space-9: 80px;   /* 5rem */
--space-10: 96px;  /* 6rem */
```

### 4.2 컴포넌트 간격 가이드

**버튼 패딩**
- 큰 버튼: 16px 24px (세로 가로)
- 중간 버튼: 12px 20px
- 작은 버튼: 8px 16px

**카드 패딩**
- 큰 카드: 32px
- 중간 카드: 24px
- 작은 카드: 16px

**섹션 간격**
- 페이지 섹션 간: 64px
- 카드 간: 24px
- 요소 간: 16px

---

## 5. UI 컴포넌트 (UI Components)

### 5.1 버튼 (Buttons)

#### Primary Button (주요 버튼)
```css
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  min-height: 56px;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button (보조 버튼)
```css
.btn-secondary {
  background: white;
  color: var(--primary-600);
  border: 2px solid var(--primary-500);
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  min-height: 56px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-600);
}
```

### 5.2 입력 필드 (Input Fields)

```css
.input-field {
  width: 100%;
  padding: 16px 20px;
  font-size: 18px;
  border: 2px solid var(--neutral-300);
  border-radius: 8px;
  background: white;
  color: var(--neutral-800);
  min-height: 56px;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.input-field::placeholder {
  color: var(--neutral-400);
  font-size: 16px;
}

/* 레이블 */
.input-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--neutral-700);
  margin-bottom: 8px;
}
```

### 5.3 카드 (Cards)

```css
.card {
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--neutral-800);
  margin-bottom: 12px;
}

.card-description {
  font-size: 16px;
  color: var(--neutral-600);
  line-height: 1.6;
}
```

### 5.4 에이전트 아바타 (Agent Avatar)

```css
.agent-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.agent-avatar.cfo {
  background: linear-gradient(135deg, var(--agent-cfo), var(--agent-cfo-dark));
}

.agent-avatar.cto {
  background: linear-gradient(135deg, var(--agent-cto), var(--agent-cto-dark));
}

/* 큰 아바타 (프로필용) */
.agent-avatar-lg {
  width: 96px;
  height: 96px;
  font-size: 40px;
}
```

### 5.5 배지 (Badges)

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  white-space: nowrap;
}

.badge-success {
  background: var(--success-100);
  color: var(--success-600);
}

.badge-warning {
  background: var(--warning-100);
  color: var(--warning-600);
}

.badge-error {
  background: var(--error-100);
  color: var(--error-600);
}
```

### 5.6 알림 (Alerts)

```css
.alert {
  padding: 20px 24px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.6;
  border-left: 4px solid;
}

.alert-info {
  background: var(--info-50);
  border-color: var(--info-500);
  color: var(--info-600);
}

.alert-success {
  background: var(--success-50);
  border-color: var(--success-500);
  color: var(--success-600);
}

.alert-warning {
  background: var(--warning-50);
  border-color: var(--warning-500);
  color: var(--warning-600);
}

.alert-error {
  background: var(--error-50);
  border-color: var(--error-500);
  color: var(--error-600);
}
```

---

## 6. 레이아웃 (Layout)

### 6.1 페이지 구조

```css
/* 전체 컨테이너 */
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
  background: var(--neutral-50);
  min-height: 100vh;
}

/* 헤더 */
.page-header {
  background: white;
  border-bottom: 1px solid var(--neutral-200);
  padding: 24px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 메인 콘텐츠 */
.page-content {
  padding: 40px 0;
}

/* 사이드바 */
.sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid var(--neutral-200);
  padding: 24px;
  min-height: 100vh;
}
```

### 6.2 그리드 시스템

```css
/* 2열 그리드 */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

/* 3열 그리드 */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* 반응형 그리드 */
@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

---

## 7. 아이콘 시스템 (Icon System)

### 7.1 아이콘 크기

```css
--icon-xs: 16px;   /* 작은 아이콘 */
--icon-sm: 20px;   /* 중간 아이콘 */
--icon-md: 24px;   /* 기본 아이콘 */
--icon-lg: 32px;   /* 큰 아이콘 */
--icon-xl: 40px;   /* 매우 큰 아이콘 */
```

### 7.2 아이콘 사용 가이드

- **Lucide React** 아이콘 라이브러리 사용
- 최소 크기: 24px (시니어 사용자 고려)
- 버튼 내 아이콘: 20-24px
- 네비게이션 아이콘: 24-32px
- 명확한 의미 전달을 위해 아이콘과 텍스트 함께 사용

---

## 8. 애니메이션 (Animation)

### 8.1 전환 효과 (Transitions)

```css
/* 기본 전환 */
.transition-default {
  transition: all 0.2s ease-in-out;
}

/* 느린 전환 (시니어 사용자 고려) */
.transition-slow {
  transition: all 0.3s ease-in-out;
}

/* 호버 효과 */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### 8.2 로딩 애니메이션

```css
/* 스피너 */
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--neutral-200);
  border-top-color: var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 9. 접근성 (Accessibility)

### 9.1 색상 대비

**WCAG 2.1 AA 준수**
- 일반 텍스트: 최소 4.5:1 대비
- 큰 텍스트 (18px 이상): 최소 3:1 대비
- UI 컴포넌트: 최소 3:1 대비

### 9.2 키보드 탐색

```css
/* 포커스 스타일 */
*:focus-visible {
  outline: 3px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* 버튼 포커스 */
button:focus-visible {
  outline: 3px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 9.3 스크린 리더 지원

```html
<!-- 숨겨진 텍스트 (스크린 리더용) -->
<span class="sr-only">자세한 설명</span>

<!-- ARIA 레이블 -->
<button aria-label="메시지 전송">전송</button>
```

---

## 10. 다크 모드 (Dark Mode) - 선택적

시니어 CEO는 밝은 모드를 선호하지만, 필요 시 다크 모드 제공:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1F2937;
    --bg-secondary: #111827;
    --text-primary: #F9FAFB;
    --text-secondary: #D1D5DB;
  }
}
```

---

## 11. 반응형 디자인 (Responsive Design)

### 11.1 브레이크포인트

```css
/* 모바일 */
@media (max-width: 640px) { }

/* 태블릿 */
@media (min-width: 641px) and (max-width: 1024px) { }

/* 데스크톱 */
@media (min-width: 1025px) { }

/* 큰 화면 */
@media (min-width: 1440px) { }
```

### 11.2 모바일 최적화

- 최소 터치 영역: 48x48px
- 충분한 간격: 최소 8px
- 큰 폰트: 최소 16px
- 단순화된 네비게이션

---

## 12. 실제 적용 예시

### 12.1 로그인 페이지

```html
<div class="login-container">
  <div class="login-card">
    <h1 class="login-title">C레벨 AI 어드바이저</h1>
    <p class="login-subtitle">안전하게 로그인하세요</p>
    
    <form class="login-form">
      <div class="form-group">
        <label class="input-label">이메일</label>
        <input 
          type="email" 
          class="input-field" 
          placeholder="이메일을 입력하세요"
        />
      </div>
      
      <div class="form-group">
        <label class="input-label">비밀번호</label>
        <input 
          type="password" 
          class="input-field" 
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      
      <button type="submit" class="btn-primary">
        로그인
      </button>
    </form>
  </div>
</div>
```

### 12.2 대시보드 헤더

```html
<header class="page-header">
  <div class="header-content">
    <h1 class="header-title">대시보드</h1>
    <div class="header-actions">
      <button class="btn-secondary">새 대화</button>
      <div class="user-menu">
        <span class="user-name">홍길동 CEO</span>
        <button class="btn-icon">
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  </div>
</header>
```

---

**문서 버전 관리**  
- v2.0 (2026-01-10): 50-70대 CEO 최적화 버전 작성
  - 밝은 색상 팔레트
  - 큰 폰트 크기 (18px 기본)
  - 한글 폰트 (Pretendard)
  - 충분한 간격과 여백
  - 명확한 시각적 계층