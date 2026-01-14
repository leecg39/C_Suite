# Coding Convention & AI Collaboration Guide
## C-Level AI Agent Service - 코딩 규칙 및 AI 협업 가이드

**버전**: v1.0  
**작성일**: 2026-01-10  
**프로젝트**: CEO를 위한 맞춤형 AI 에이전트 서비스

---

## 1. 핵심 원칙 (Core Principles)

### 1.1 신뢰하되, 검증하라 (Don't Trust, Verify)

AI 코딩 파트너는 강력한 도구이지만, **최종 코드의 소유권과 책임은 인간 개발자에게 있습니다**. 모든 AI 생성 코드는 다음 단계를 거쳐야 합니다:

1. **검토 (Review)**: 코드를 읽고 이해하기
2. **테스트 (Test)**: 실제로 실행하여 작동 확인
3. **검증 (Verify)**: 요구사항 및 인수 조건과 비교
4. **수정 (Refine)**: 필요 시 개선 및 최적화

### 1.2 점진적 개발 (Incremental Development)

큰 기능을 한 번에 구현하지 말고, **작은 단위로 분해하여 점진적으로 개발**합니다:

- 한 번에 하나의 컴포넌트 또는 함수
- 각 단계마다 테스트 및 검증
- 작동하는 코드를 유지하며 확장

### 1.3 명확한 의도 전달 (Clear Intent)

AI에게 작업을 요청할 때는 **무엇을 원하는지 명확히 표현**합니다:

- 구체적인 파일명 및 경로 명시
- 입력과 출력 예시 제공
- 제약 조건 및 요구사항 명시
- 기존 코드와의 관계 설명

---

## 2. 프로젝트 설정 및 기술 스택

### 2.1 권장 기술 스택

AI가 잘 학습한 **대중적인 기술 스택**을 사용하여 AI 생성 코드의 품질을 높입니다:

#### 프론트엔드
- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript (strict 모드)
- **스타일링**: Tailwind CSS + shadcn/ui
- **상태 관리**: Zustand 또는 React Query
- **아이콘**: Lucide React
- **차트**: Recharts

#### 백엔드
- **데이터베이스**: Supabase (PostgreSQL + Auth + Storage)
- **API**: Next.js API Routes 또는 Supabase Edge Functions
- **인증**: Supabase Auth
- **파일 저장**: Supabase Storage

#### AI/LLM
- **LLM API**: OpenAI GPT-4, Anthropic Claude, 또는 Google Gemini
- **벡터 검색**: Supabase Vector (pgvector)

#### 개발 도구
- **버전 관리**: Git + GitHub
- **패키지 관리자**: npm 또는 pnpm
- **린터**: ESLint
- **포맷터**: Prettier
- **테스트**: Jest + React Testing Library

### 2.2 프로젝트 구조

```
c-level-ai-agent/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 인증 관련 페이지
│   │   ├── (dashboard)/       # 대시보드 페이지
│   │   ├── api/               # API 라우트
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── components/            # React 컴포넌트
│   │   ├── ui/                # shadcn/ui 컴포넌트
│   │   ├── agents/            # 에이전트 관련 컴포넌트
│   │   ├── chat/              # 채팅 인터페이스
│   │   └── dashboard/         # 대시보드 컴포넌트
│   ├── lib/                   # 유틸리티 및 라이브러리
│   │   ├── supabase/          # Supabase 클라이언트
│   │   ├── openai/            # OpenAI 클라이언트
│   │   ├── agents/            # 에이전트 로직
│   │   ├── conversation/      # 대화 관리
│   │   └── utils/             # 공통 유틸리티
│   ├── types/                 # TypeScript 타입 정의
│   └── styles/                # 글로벌 스타일
├── public/                    # 정적 파일
├── supabase/                  # Supabase 설정 및 마이그레이션
│   ├── migrations/            # 데이터베이스 마이그레이션
│   └── seed.sql               # 시드 데이터
├── .env.local                 # 환경 변수 (Git 제외)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

### 2.3 Git 버전 관리

#### 커밋 메시지 규칙
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드 프로세스 또는 도구 변경

**예시**:
```
feat(chat): add message input component

- Create ChatInput component with text input and send button
- Add loading state and error handling
- Apply Design System styles

Refs: TASK-2.3
```

#### 브랜치 전략
- `main`: 프로덕션 배포 브랜치
- `develop`: 개발 브랜치
- `feature/<task-id>`: 기능 개발 브랜치
- `bugfix/<issue-id>`: 버그 수정 브랜치

---

## 3. 아키텍처 및 모듈성

### 3.1 시스템 뼈대 우선 (Skeleton First)

전체 시스템의 **뼈대를 먼저 구축**한 후 세부 기능을 채워나갑니다:

1. **프로젝트 구조 생성**: 폴더 및 파일 구조
2. **라우팅 설정**: 주요 페이지 및 경로
3. **데이터베이스 스키마**: 테이블 및 관계
4. **API 엔드포인트 스텁**: 빈 함수로 시작
5. **UI 컴포넌트 스켈레톤**: 기본 레이아웃만

### 3.2 작고 독립적인 모듈 (Small, Independent Modules)

기능을 **작고 독립적인 모듈**로 분해하여 AI가 작업을 더 쉽게 처리하도록 합니다:

- **단일 책임 원칙 (SRP)**: 각 모듈은 하나의 책임만
- **낮은 결합도 (Low Coupling)**: 모듈 간 의존성 최소화
- **높은 응집도 (High Cohesion)**: 관련 기능을 함께 그룹화

**좋은 예**:
```typescript
// src/lib/agents/query-analyzer.ts
export async function analyzeQuery(query: string): Promise<AnalysisResult> {
  // 질의 분석 로직만
}

// src/lib/agents/router.ts
export async function routeToAgent(analysis: AnalysisResult): Promise<Agent> {
  // 에이전트 라우팅 로직만
}
```

**나쁜 예**:
```typescript
// 모든 것을 하나의 함수에
export async function handleQuery(query: string) {
  // 분석, 라우팅, 응답 생성, 저장 등 모두 포함
}
```

### 3.3 타입 안정성 (Type Safety)

TypeScript의 **타입 시스템을 최대한 활용**하여 런타임 에러를 줄입니다:

```typescript
// src/types/agent.ts
export interface Agent {
  id: string;
  agent_type: 'CFO' | 'CTO' | 'CMO' | 'COO' | 'CHRO';
  name: string;
  system_prompt: string;
  capabilities: string[];
  configuration: {
    llm_model: string;
    temperature: number;
    max_tokens: number;
  };
}

export interface QueryAnalysisResult {
  primary_agent: Agent['agent_type'];
  confidence_score: number; // 0.0 ~ 1.0
  reasoning: string;
  requires_collaboration: boolean;
  collaborating_agents?: Agent['agent_type'][];
}
```

---

## 4. AI 소통 원칙 (프롬프트 엔지니어링)

### 4.1 하나의 채팅, 하나의 작업 (One Chat, One Task)

AI에게 **한 번에 하나의 명확한 작업**만 요청합니다:

**좋은 예**:
```
"src/components/chat/ChatInput.tsx 파일을 생성해주세요.
이 컴포넌트는 다음 기능을 포함해야 합니다:
- 텍스트 입력 필드 (Textarea)
- 전송 버튼
- 로딩 상태 표시
- Design System의 스타일 적용 (Tailwind CSS)

입력 예시:
- 사용자가 텍스트를 입력하고 Enter 키를 누르면 onSubmit 콜백 호출
- 전송 버튼 클릭 시에도 onSubmit 호출

Props:
- onSubmit: (message: string) => void
- isLoading: boolean
```

**나쁜 예**:
```
"채팅 인터페이스를 만들어주세요. 그리고 데이터베이스 연동도 하고, API도 만들어주세요."
```

### 4.2 명확한 컨텍스트 제공 (Clear Context)

AI에게 **관련 파일명, 타입, 기존 코드**를 명시합니다:

**좋은 예**:
```
"src/lib/agents/router.ts 파일에 routeToAgent 함수를 추가해주세요.
이 함수는 src/types/agent.ts에 정의된 QueryAnalysisResult를 입력으로 받고,
src/lib/supabase/client.ts의 supabase 클라이언트를 사용하여
agents 테이블에서 적절한 에이전트를 조회합니다.

반환 타입은 Agent | null입니다.
에이전트를 찾지 못하면 null을 반환합니다."
```

**나쁜 예**:
```
"에이전트 라우팅 함수를 만들어주세요."
```

### 4.3 기존 코드 재사용 지시 (Reuse Existing Code)

AI에게 **기존 코드를 재사용**하도록 명시합니다:

**좋은 예**:
```
"src/components/chat/Message.tsx 컴포넌트를 생성해주세요.
이 컴포넌트는 src/components/agents/AgentAvatar.tsx를 재사용하여
에이전트 아바타를 표시합니다.

또한 src/lib/utils/formatDate.ts의 formatDate 함수를 사용하여
타임스탬프를 포맷합니다."
```

### 4.4 예시 제공 (Provide Examples)

AI에게 **입력과 출력 예시**를 제공합니다:

**좋은 예**:
```
"src/lib/conversation/context-manager.ts에 extractEntities 함수를 추가해주세요.

입력 예시:
- message: "지난 분기 마케팅 ROI가 어땠나요?"

출력 예시:
{
  time_period: "지난 분기",
  department: "마케팅",
  metric: "ROI"
}

입력 예시 2:
- message: "안녕하세요"

출력 예시 2:
{}
```

### 4.5 단계별 검증 (Step-by-Step Verification)

AI가 코드를 생성한 후 **단계별로 검증**합니다:

1. **코드 검토**: 생성된 코드를 읽고 이해
2. **타입 체크**: `npm run type-check` 실행
3. **린트**: `npm run lint` 실행
4. **실행 테스트**: 실제로 실행하여 작동 확인
5. **인수 조건 확인**: TASKS 문서의 인수 조건과 비교

---

## 5. 코드 품질 및 보안

### 5.1 코드 스타일

#### TypeScript
```typescript
// 명명 규칙
const userName = 'John'; // camelCase for variables
function getUserData() {} // camelCase for functions
class UserService {} // PascalCase for classes
interface User {} // PascalCase for interfaces
type UserId = string; // PascalCase for types
const MAX_RETRIES = 3; // UPPER_SNAKE_CASE for constants

// 함수 선언
// 화살표 함수 사용 (간결한 경우)
const add = (a: number, b: number): number => a + b;

// 일반 함수 사용 (복잡한 경우)
function analyzeQuery(query: string): Promise<AnalysisResult> {
  // 복잡한 로직
}

// 타입 명시
const user: User = { id: '1', name: 'John' };
const users: User[] = [];

// Optional chaining 및 Nullish coalescing
const userName = user?.profile?.name ?? 'Unknown';

// 비동기 함수
async function fetchData(): Promise<Data> {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

#### React 컴포넌트
```typescript
// 함수형 컴포넌트 (화살표 함수)
export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        disabled={isLoading}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        전송
      </Button>
    </div>
  );
};

// Props 타입 정의
interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}
```

### 5.2 보안 체크리스트

#### 하드코딩된 비밀 정보 금지
```typescript
// ❌ 나쁜 예
const apiKey = 'sk-1234567890abcdef';

// ✅ 좋은 예
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set');
}
```

#### 모든 사용자 입력값 검증
```typescript
// ❌ 나쁜 예
export async function POST(req: Request) {
  const { query } = await req.json();
  const result = await analyzeQuery(query);
  return Response.json(result);
}

// ✅ 좋은 예
import { z } from 'zod';

const QuerySchema = z.object({
  query: z.string().min(1).max(1000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = QuerySchema.parse(body);
    const result = await analyzeQuery(query);
    return Response.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

#### API 엔드포인트 보안
```typescript
// Rate limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, '1 m'), // 분당 60 요청
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // 정상 처리
}

// 인증 확인
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // 인증된 사용자만 접근 가능
}
```

#### SQL Injection 방지
```typescript
// ❌ 나쁜 예 (절대 사용하지 말 것)
const { data } = await supabase
  .from('users')
  .select('*')
  .where(`email = '${userEmail}'`); // SQL Injection 취약

// ✅ 좋은 예 (Supabase 클라이언트 사용)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail); // 자동으로 이스케이프됨
```

#### XSS 방지
```typescript
// React는 기본적으로 XSS를 방지하지만, dangerouslySetInnerHTML 사용 시 주의

// ❌ 나쁜 예
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 좋은 예 (sanitize 라이브러리 사용)
import DOMPurify from 'isomorphic-dompurify';

<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />

// 또는 React의 기본 렌더링 사용
<div>{userInput}</div>
```

---

## 6. 테스트 및 디버깅

### 6.1 테스트 전략

#### 단위 테스트 (Unit Tests)
```typescript
// src/lib/agents/query-analyzer.test.ts
import { analyzeQuery } from './query-analyzer';

describe('analyzeQuery', () => {
  it('should identify CFO agent for financial queries', async () => {
    const result = await analyzeQuery('지난 분기 재무 현황은?');
    expect(result.primary_agent).toBe('CFO');
    expect(result.confidence_score).toBeGreaterThan(0.8);
  });

  it('should require collaboration for complex queries', async () => {
    const result = await analyzeQuery('신제품 출시 전략을 검토하고 싶습니다');
    expect(result.requires_collaboration).toBe(true);
    expect(result.collaborating_agents).toContain('CFO');
    expect(result.collaborating_agents).toContain('CMO');
  });
});
```

#### 통합 테스트 (Integration Tests)
```typescript
// src/app/api/chat/route.test.ts
import { POST } from './route';

describe('POST /api/chat', () => {
  it('should return agent response for valid query', async () => {
    const req = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ query: '재무 현황은?' }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('agent');
    expect(data).toHaveProperty('message');
  });

  it('should return 400 for invalid input', async () => {
    const req = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ query: '' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
```

### 6.2 디버깅 워크플로우

#### 1. 에러 발생 시
```typescript
// 에러 로깅
console.error('Error in analyzeQuery:', {
  query,
  error: error.message,
  stack: error.stack,
});

// Sentry로 에러 트래킹
import * as Sentry from '@sentry/nextjs';

Sentry.captureException(error, {
  tags: {
    function: 'analyzeQuery',
  },
  extra: {
    query,
  },
});
```

#### 2. AI에게 수정 요청
```
"src/lib/agents/query-analyzer.ts의 analyzeQuery 함수에서 다음 에러가 발생합니다:

Error: Cannot read property 'choices' of undefined
  at analyzeQuery (query-analyzer.ts:45)

전체 에러 스택:
[에러 스택 붙여넣기]

이 에러를 수정해주세요. OpenAI API 응답이 undefined일 수 있으므로
에러 처리를 추가해주세요."
```

#### 3. 로그 확인
```typescript
// 개발 환경에서만 상세 로그
if (process.env.NODE_ENV === 'development') {
  console.log('Query analysis:', {
    query,
    result,
    duration: Date.now() - startTime,
  });
}
```

---

## 7. 성능 최적화

### 7.1 프론트엔드 최적화

#### 코드 스플리팅
```typescript
// 동적 import로 큰 컴포넌트 로드
import dynamic from 'next/dynamic';

const ReportViewer = dynamic(() => import('@/components/reports/ReportViewer'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // 클라이언트에서만 렌더링
});
```

#### 이미지 최적화
```typescript
import Image from 'next/image';

<Image
  src="/agent-avatar.png"
  alt="Agent Avatar"
  width={48}
  height={48}
  priority // 중요한 이미지는 우선 로드
/>
```

#### 메모이제이션
```typescript
import { useMemo, useCallback } from 'react';

const ChatList: React.FC<ChatListProps> = ({ conversations }) => {
  // 비용이 큰 계산은 메모이제이션
  const sortedConversations = useMemo(() => {
    return conversations.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [conversations]);

  // 콜백 함수는 useCallback으로 메모이제이션
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      {sortedConversations.map((conv) => (
        <ConversationItem key={conv.id} onClick={() => handleClick(conv.id)} />
      ))}
    </div>
  );
};
```

### 7.2 백엔드 최적화

#### 데이터베이스 쿼리 최적화
```typescript
// ❌ N+1 쿼리 문제
const conversations = await supabase.from('conversations').select('*');
for (const conv of conversations) {
  const messages = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conv.id); // N번 쿼리
}

// ✅ JOIN으로 한 번에 조회
const { data } = await supabase
  .from('conversations')
  .select(`
    *,
    messages (*)
  `);
```

#### 캐싱
```typescript
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function getAgents(): Promise<Agent[]> {
  // 캐시 확인
  const cached = await redis.get('agents');
  if (cached) {
    return JSON.parse(cached as string);
  }

  // 데이터베이스 조회
  const { data } = await supabase.from('agents').select('*');

  // 캐시 저장 (1시간)
  await redis.set('agents', JSON.stringify(data), { ex: 3600 });

  return data;
}
```

---

## 8. 배포 및 모니터링

### 8.1 환경 변수 관리

```bash
# .env.local (로컬 개발)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-your-openai-key

# .env.production (프로덕션)
# Vercel 또는 호스팅 플랫폼의 환경 변수 설정 사용
```

### 8.2 모니터링

#### 에러 트래킹 (Sentry)
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

#### 성능 모니터링
```typescript
// 응답 시간 측정
const startTime = Date.now();
const result = await analyzeQuery(query);
const duration = Date.now() - startTime;

// 메트릭 전송 (예: Datadog)
if (duration > 3000) {
  console.warn('Slow query analysis:', { query, duration });
}
```

---

## 9. AI 협업 워크플로우

### 9.1 일반적인 개발 흐름

1. **요구사항 이해**
   - TASKS 문서의 해당 태스크 읽기
   - 인수 조건 확인
   - 참조 문서 검토 (PRD, TRD, User Flow 등)

2. **AI에게 작업 요청**
   - 명확한 프롬프트 작성
   - 파일명, 타입, 예시 제공
   - 제약 조건 명시

3. **코드 검토 및 테스트**
   - 생성된 코드 읽고 이해
   - 타입 체크 및 린트 실행
   - 실제로 실행하여 작동 확인

4. **인수 조건 검증**
   - TASKS 문서의 인수 조건과 비교
   - 모든 항목이 충족되는지 확인

5. **수정 및 개선**
   - 필요 시 AI에게 수정 요청
   - 또는 직접 수정

6. **커밋 및 푸시**
   - Git 커밋 메시지 작성
   - 브랜치에 푸시

### 9.2 AI 협업 팁

#### 효과적인 프롬프트 작성
```
[좋은 프롬프트 예시]

"src/components/agents/AgentAvatar.tsx 컴포넌트를 생성해주세요.

요구사항:
- Props: agentType ('CFO' | 'CTO' | 'CMO' | 'COO' | 'CHRO'), size (number, 기본값 48)
- Design System의 에이전트별 색상 사용 (src/styles/design-system.css 참조)
- 원형 아바타에 에이전트 타입의 첫 글자 표시 (예: CFO → C)
- Tailwind CSS 사용

예시:
<AgentAvatar agentType="CFO" size={48} />
→ 초록색 원형 아바타에 흰색 'C' 표시

Design System 색상:
- CFO: #10b981 (초록)
- CTO: #6366f1 (인디고)
- CMO: #f59e0b (주황)
- COO: #8b5cf6 (보라)
- CHRO: #ec4899 (핑크)"
```

#### 반복적 개선
```
[첫 번째 요청]
"ChatInput 컴포넌트를 만들어주세요."

[AI 응답 후 개선 요청]
"좋습니다. 이제 다음 기능을 추가해주세요:
1. Enter 키로 전송 (Shift+Enter는 줄바꿈)
2. 최대 길이 1000자 제한
3. 로딩 중일 때 입력 비활성화"

[추가 개선]
"완벽합니다. 마지막으로 접근성을 개선해주세요:
- aria-label 추가
- 키보드 탐색 지원
- 포커스 스타일 명확히"
```

---

## 10. 체크리스트

### 코드 작성 전
- [ ] TASKS 문서의 해당 태스크 읽기
- [ ] 인수 조건 이해
- [ ] 참조 문서 검토 (PRD, TRD, Design System 등)
- [ ] 기존 코드 파악 (재사용 가능한 컴포넌트, 유틸리티)

### 코드 작성 중
- [ ] TypeScript strict 모드 사용
- [ ] 명확한 타입 정의
- [ ] 에러 처리 구현
- [ ] 입력 검증
- [ ] 보안 고려 (비밀 정보, SQL Injection, XSS 등)

### 코드 작성 후
- [ ] 타입 체크 (`npm run type-check`)
- [ ] 린트 (`npm run lint`)
- [ ] 실제 실행 테스트
- [ ] 인수 조건 검증
- [ ] 단위 테스트 작성 (선택적)
- [ ] Git 커밋

### 배포 전
- [ ] 모든 환경 변수 설정 확인
- [ ] 프로덕션 빌드 테스트 (`npm run build`)
- [ ] 성능 테스트 (Lighthouse)
- [ ] 보안 스캔
- [ ] 문서 업데이트 (README, API 문서 등)

---

**문서 버전 관리**  
- v1.0 (2026-01-10): 초기 작성
- 다음 업데이트: 실제 개발 경험을 바탕으로 모범 사례 추가