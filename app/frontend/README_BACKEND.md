# Backend API Setup Guide

## Supabase 백엔드 연결 가이드

이 프로젝트는 Supabase를 백엔드로 사용하여 데이터베이스, 인증, 실시간 구독 기능을 제공합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속하여 로그인합니다.
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - **Name**: C-Level Dashboard (또는 원하는 이름)
   - **Database Password**: 안전한 비밀번호 저장
   - **Region**: Korea (Seoul) 또는 가까운 지역 선택
4. 프로젝트 생성 대기 (약 2분 소요)

## 2. 환경 변수 설정

1. 생성된 프로젝트의 **Settings** > **API** 페이지로 이동
2. 다음 값을 복사하여 `.env` 파일에 입력:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. `app/frontend/.env` 파일에 위 값 붙여넣기

## 3. 데이터베이스 테이블 생성

Supabase SQL Editor에서 다음 SQL을 실행하여 테이블을 생성합니다:

### 3.1 USERS 테이블
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  department VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 3.2 AGENTS 테이블
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_type VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  system_prompt TEXT NOT NULL,
  capabilities JSONB NOT NULL,
  configuration JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agents_type ON agents(agent_type);

-- 초기 에이전트 데이터
INSERT INTO agents (agent_type, name, description, system_prompt, capabilities, configuration) VALUES
('CFO', '재무 담당 AI', '재무 분석 및 예산 관리', 'You are a CFO AI agent specialized in financial analysis.', '["financial_analysis", "budget_forecasting", "cost_optimization"]'::jsonb, '{"model": "gpt-4", "temperature": 0.3}'::jsonb),
('CTO', '기술 담당 AI', '기술 혁신 및 개발 전략', 'You are a CTO AI agent specialized in technology strategy.', '["tech_innovation", "development_strategy", "architecture"]'::jsonb, '{"model": "gpt-4", "temperature": 0.3}'::jsonb),
('CMO', '마케팅 담당 AI', '마케팅 전략 및 브랜드 관리', 'You are a CMO AI agent specialized in marketing strategy.', '["marketing_strategy", "brand_management", "campaign_analysis"]'::jsonb, '{"model": "gpt-4", "temperature": 0.3}'::jsonb),
('COO', '운영 담당 AI', '운영 효율화 및 프로세스 개선', 'You are a COO AI agent specialized in operations optimization.', '["operations_optimization", "process_improvement", "resource_management"]'::jsonb, '{"model": "gpt-4", "temperature": 0.3}'::jsonb),
('CHRO', '인사 담당 AI', '인사 전략 및 조직 문화', 'You are a CHRO AI agent specialized in HR strategy.', '["hr_strategy", "organizational_culture", "talent_management"]'::jsonb, '{"model": "gpt-4", "temperature": 0.3}'::jsonb);
```

### 3.3 CONVERSATIONS 테이블
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_started_at ON conversations(started_at DESC);
```

### 3.4 MESSAGES 테이블
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  confidence_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id, created_at);
CREATE INDEX idx_messages_agent_id ON messages(agent_id);
```

### 3.5 REPORTS 테이블
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  metadata JSONB,
  generated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_user_id ON reports(user_id, generated_at DESC);
CREATE INDEX idx_reports_type ON reports(report_type);
```

## 4. Row Level Security (RLS) 설정

```sql
-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users: 본인만 조회 가능
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Conversations: 본인의 대화만 조회 가능
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- Messages: 본인의 대화 메시지만 조회 가능
CREATE POLICY "Users can view messages in own conversations" ON messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in own conversations" ON messages
  FOR INSERT WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

-- Reports: 본인의 보고서만 조회 가능
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Agents: 모두 읽기 가능
CREATE POLICY "Everyone can view agents" ON agents
  FOR SELECT USING (is_active = true);
```

## 5. 실시간 기능 활성화

Supabase Dashboard에서:
1. **Database** > **Replication** 페이지로 이동
2. 다음 테이블의 실시간 기능 활성화:
   - `messages`
   - `conversations`

## 6. 개발 서버 재시작

```bash
# 환경 변수를 로드하기 위해 개발 서버 재시작
npm run dev
```

## API 사용 예시

```typescript
import { useAgents, useCreateConversation } from '@/services/queries';

// 에이전트 목록 조회
function MyComponent() {
  const { data: agents, isLoading } = useAgents();

  // 새 대화 생성
  const createConversation = useCreateConversation();

  const handleCreate = () => {
    createConversation.mutate({
      userId: 'user-uuid',
      title: '새 대화'
    });
  };
}
```

## 트러블슈팅

### 연결 오류
- `.env` 파일 값이 올바른지 확인
- Supabase 프로젝트가 일시 중지되지 않았는지 확인

### RLS 정책 오류
- SQL Editor에서 정책이 올바르게 생성되었는지 확인
- `SELECT * FROM pg_policies WHERE tablename = 'users';`로 정책 확인

### 실시간 구독 작동 안 함
- Replication 설정에서 테이블이 활성화되었는지 확인

## 추가 리소스

- [Supabase 문서](https://supabase.com/docs)
- [Supabase React Query 가이드](https://supabase.com/docs/guides/local-development)
- [데이터베이스 설계 문서](../../docs/database_design.md)
