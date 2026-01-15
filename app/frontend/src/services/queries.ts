import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import {
  getUser,
  getAgents,
  getAgentByType,
  getConversations,
  getConversationById,
  createConversation,
  updateConversation,
  getMessages,
  createMessage,
  getReports,
  getReportById,
  createReport,
  getDashboardMetrics,
  subscribeToMessages,
  subscribeToConversations,
} from './api';
import type { User, Agent, Conversation, Message, Report, MetricsData } from './api';

// Query Keys
export const queryKeys = {
  user: (userId: string) => ['user', userId] as const,
  agents: () => ['agents'] as const,
  agent: (type: string) => ['agent', type] as const,
  conversations: (userId: string) => ['conversations', userId] as const,
  conversation: (id: string) => ['conversation', id] as const,
  messages: (conversationId: string) => ['messages', conversationId] as const,
  reports: (userId: string) => ['reports', userId] as const,
  report: (id: string) => ['report', id] as const,
  metrics: (timeFilter: string, departmentFilter: string) => ['metrics', timeFilter, departmentFilter] as const,
};

// User Hooks
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};

// Agent Hooks
export const useAgents = () => {
  return useQuery({
    queryKey: queryKeys.agents(),
    queryFn: getAgents,
  });
};

export const useAgent = (agentType: string) => {
  return useQuery({
    queryKey: queryKeys.agent(agentType),
    queryFn: () => getAgentByType(agentType),
    enabled: !!agentType,
  });
};

// Conversation Hooks
export const useConversations = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.conversations(userId),
    queryFn: () => getConversations(userId),
    enabled: !!userId,
  });
};

export const useConversation = (conversationId: string) => {
  return useQuery({
    queryKey: queryKeys.conversation(conversationId),
    queryFn: () => getConversationById(conversationId),
    enabled: !!conversationId,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, title }: { userId: string; title: string }) =>
      createConversation(userId, title),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations(variables.userId) });
    },
  });
};

export const useUpdateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, updates }: { conversationId: string; updates: Partial<Conversation> }) =>
      updateConversation(conversationId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversation(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations(data.user_id) });
    },
  });
};

// Message Hooks
export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: queryKeys.messages(conversationId),
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: Omit<Message, 'id' | 'created_at'>) => createMessage(message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages(data.conversation_id) });
    },
  });
};

// Report Hooks
export const useReports = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.reports(userId),
    queryFn: () => getReports(userId),
    enabled: !!userId,
  });
};

export const useReport = (reportId: string) => {
  return useQuery({
    queryKey: queryKeys.report(reportId),
    queryFn: () => getReportById(reportId),
    enabled: !!reportId,
  });
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, reportData }: { userId: string; reportData: Omit<Report, 'id' | 'user_id' | 'generated_at' | 'created_at' | 'updated_at'> }) =>
      createReport(userId, reportData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports(variables.userId) });
    },
  });
};

// Metrics Hooks
export const useDashboardMetrics = (timeFilter: 'week' | 'month' | 'quarter' | 'year', departmentFilter: string) => {
  return useQuery({
    queryKey: queryKeys.metrics(timeFilter, departmentFilter),
    queryFn: () => getDashboardMetrics(timeFilter, departmentFilter),
  });
};

// Real-time Subscriptions
export const useMessagesSubscription = (conversationId: string, callback: (message: Message) => void) => {
  useEffect(() => {
    const subscription = subscribeToMessages(conversationId, callback);

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId, callback]);
};

export const useConversationsSubscription = (userId: string, callback: (conversation: Conversation) => void) => {
  useEffect(() => {
    const subscription = subscribeToConversations(userId, callback);

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, callback]);
};

// useEffect import가 필요함
import { useEffect } from 'react';
