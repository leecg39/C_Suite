import { supabase } from '@/lib/supabase';

// 타입 정의
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  department: string | null;
  avatar_url: string | null;
  is_active: boolean;
  last_login_at: string | null;
}

export interface Agent {
  id: string;
  agent_type: string;
  name: string;
  description: string | null;
  capabilities: string[];
  is_active: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  status: string;
  started_at: string;
  updated_at: string;
  agents?: string[];
  hasReport?: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  agent_id: string | null;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata: Record<string, unknown> | null;
  confidence_score: number | null;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  conversation_id: string | null;
  title: string;
  report_type: string;
  status: string;
  generated_at: string;
}

// 메트릭 데이터 타입
export interface MetricsData {
  kpi: {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }[];
  revenue: {
    month: string;
    revenue: number;
    target: number;
  }[];
  department: {
    name: string;
    performance: number;
    target: number;
  }[];
}

// API 함수들

// 사용자 관련
export const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as User;
};

export const updateUserLastLogin = async (userId: string) => {
  const { error } = await supabase
    .from('users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw error;
};

// 에이전트 관련
export const getAgents = async () => {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data as Agent[];
};

export const getAgentByType = async (agentType: string) => {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('agent_type', agentType)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data as Agent;
};

// 대화 관련
export const getConversations = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Conversation[];
};

export const getConversationById = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', conversationId)
    .single();

  if (error) throw error;
  return data as Conversation;
};

export const createConversation = async (userId: string, title: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: userId,
      title,
      status: 'active',
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Conversation;
};

export const updateConversation = async (conversationId: string, updates: Partial<Conversation>) => {
  const { data, error } = await supabase
    .from('conversations')
    .update(updates)
    .eq('id', conversationId)
    .select()
    .single();

  if (error) throw error;
  return data as Conversation;
};

// 메시지 관련
export const getMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Message[];
};

export const createMessage = async (message: Omit<Message, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      ...message,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Message;
};

// 보고서 관련
export const getReports = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', userId)
    .order('generated_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Report[];
};

export const getReportById = async (reportId: string) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single();

  if (error) throw error;
  return data as Report[];
};

export const createReport = async (userId: string, reportData: Omit<Report, 'id' | 'user_id' | 'generated_at' | 'created_at' | 'updated_at'>) => {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('reports')
    .insert({
      ...reportData,
      user_id: userId,
      generated_at: now,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Report;
};

// 메트릭 관련 (Dashboard 데이터)
export const getDashboardMetrics = async (timeFilter: 'week' | 'month' | 'quarter' | 'year', departmentFilter: string) => {
  // 실제 API 호출 시뮬레이션 - 나중에 실제 백엔드 엔드포인트로 교체 필요
  // 현재는 정적 데이터 반환
  const mockData: MetricsData = {
    kpi: [],
    revenue: [],
    department: [],
  };

  return mockData;
};

// 구독 (Real-time)
export const subscribeToMessages = (conversationId: string, callback: (message: Message) => void) => {
  return supabase
    .channel(`messages:${conversationId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`,
    }, (payload) => {
      callback(payload.new as Message);
    })
    .subscribe();
};

export const subscribeToConversations = (userId: string, callback: (conversation: Conversation) => void) => {
  return supabase
    .channel(`conversations:${userId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'conversations',
      filter: `user_id=eq.${userId}`,
    }, (payload) => {
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        callback(payload.new as Conversation);
      }
    })
    .subscribe();
};
