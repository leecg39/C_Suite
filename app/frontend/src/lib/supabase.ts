import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 키를 가져옵니다
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          department: string | null;
          phone: string | null;
          avatar_url: string | null;
          is_active: boolean;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          role: string;
          department?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: string;
          department?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      agents: {
        Row: {
          id: string;
          agent_type: string;
          name: string;
          description: string | null;
          system_prompt: string;
          capabilities: Record<string, unknown>;
          configuration: Record<string, unknown>;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agent_type: string;
          name: string;
          description?: string | null;
          system_prompt: string;
          capabilities: Record<string, unknown>;
          configuration: Record<string, unknown>;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_type?: string;
          name?: string;
          description?: string | null;
          system_prompt?: string;
          capabilities?: Record<string, unknown>;
          configuration?: Record<string, unknown>;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          status: string;
          metadata: Record<string, unknown> | null;
          started_at: string;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          status?: string;
          metadata?: Record<string, unknown> | null;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          status?: string;
          metadata?: Record<string, unknown> | null;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          agent_id: string | null;
          role: string;
          content: string;
          metadata: Record<string, unknown> | null;
          confidence_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          agent_id?: string | null;
          role: string;
          content: string;
          metadata?: Record<string, unknown> | null;
          confidence_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          agent_id?: string | null;
          role?: string;
          content?: string;
          metadata?: Record<string, unknown> | null;
          confidence_score?: number | null;
          created_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          conversation_id: string | null;
          title: string;
          report_type: string;
          status: string;
          metadata: Record<string, unknown> | null;
          generated_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          conversation_id?: string | null;
          title: string;
          report_type: string;
          status?: string;
          metadata?: Record<string, unknown> | null;
          generated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          conversation_id?: string | null;
          title?: string;
          report_type?: string;
          status?: string;
          metadata?: Record<string, unknown> | null;
          generated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
