import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Send,
  Menu,
  X,
  TrendingUp,
  Code,
  Megaphone,
  Settings,
  Users,
  Plus,
  MessageSquare,
  FileText,
  DollarSign,
  Target,
  Activity,
  TrendingDown,
  Filter,
  ChevronDown,
  Calendar,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AgentAvatar } from '@/components/AgentAvatar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { useAgents, useConversations, useCreateConversation, useCreateMessage } from '@/services/queries';
import type { Agent } from '@/services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Filter states
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | 'sales' | 'marketing' | 'dev' | 'operations' | 'hr'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // API queries - 실제 데이터 로드
  const { data: agents = [], isLoading: agentsLoading, error: agentsError } = useAgents();
  const { data: conversations = [], isLoading: conversationsLoading } = useConversations(currentUserId || '');
  const createConversation = useCreateConversation();
  const createMessage = useCreateMessage();

  // Mock user ID for development (실제로는 인증 후 가져와야 함)
  useEffect(() => {
    const mockUserId = localStorage.getItem('user_id') || '00000000-0000-0000-0000-000000000001';
    setCurrentUserId(mockUserId);
  }, []);

  // Agent 매핑
  const agentConfigMap: Record<string, { role: string; icon: any; color: string }> = {
    'CFO': { role: '재무 전략', icon: TrendingUp, color: 'from-emerald-400 to-emerald-600' },
    'CTO': { role: '기술 혁신', icon: Code, color: 'from-indigo-400 to-indigo-600' },
    'CMO': { role: '마케팅 전략', icon: Megaphone, color: 'from-orange-400 to-orange-600' },
    'COO': { role: '운영 효율화', icon: Settings, color: 'from-purple-400 to-purple-600' },
    'CHRO': { role: '인사 전략', icon: Users, color: 'from-pink-400 to-pink-600' },
  };

  // 에이전트 로딩 상태 처리
  if (agentsLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#0071E3] mx-auto" />
          <p className="text-[#6E6E73] dark:text-[#98989D]">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에이전트 에러 상태 처리
  if (agentsError) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-[#1D1D1F] dark:text-[#F5F5F7]">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-sm text-[#6E6E73] dark:text-[#98989D]">Supabase 연결을 확인해주세요.</p>
          <Button onClick={() => window.location.reload()} className="btn-apple-primary">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 대화 시간 형식화
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  // 전체 데이터셋
  const allRevenueData = {
    week: [
      { month: '월', revenue: 5.2, target: 5.5 },
      { month: '화', revenue: 4.8, target: 5.5 },
      { month: '수', revenue: 6.1, target: 5.5 },
      { month: '목', revenue: 5.7, target: 5.5 },
      { month: '금', revenue: 6.3, target: 6.0 },
      { month: '토', revenue: 3.8, target: 4.0 },
      { month: '일', revenue: 3.2, target: 3.5 },
    ],
    month: [
      { month: '1월', revenue: 18.2, target: 20 },
      { month: '2월', revenue: 19.5, target: 20 },
      { month: '3월', revenue: 21.8, target: 22 },
      { month: '4월', revenue: 20.3, target: 22 },
      { month: '5월', revenue: 23.1, target: 24 },
      { month: '6월', revenue: 24.5, target: 25 },
    ],
    quarter: [
      { month: 'Q1', revenue: 59.5, target: 62 },
      { month: 'Q2', revenue: 67.9, target: 71 },
      { month: 'Q3', revenue: 72.3, target: 75 },
      { month: 'Q4', revenue: 78.1, target: 80 },
    ],
    year: [
      { month: '2020', revenue: 210, target: 220 },
      { month: '2021', revenue: 245, target: 250 },
      { month: '2022', revenue: 278, target: 280 },
      { month: '2023', revenue: 298, target: 300 },
      { month: '2024', revenue: 325, target: 330 },
    ]
  };

  const allDepartmentData = {
    all: [
      { name: '영업', performance: 92, target: 100, id: 'sales' },
      { name: '마케팅', performance: 85, target: 100, id: 'marketing' },
      { name: '개발', performance: 88, target: 100, id: 'dev' },
      { name: '운영', performance: 78, target: 100, id: 'operations' },
      { name: '인사', performance: 82, target: 100, id: 'hr' },
    ],
    sales: [
      { name: '영업팀 A', performance: 95, target: 100 },
      { name: '영업팀 B', performance: 88, target: 100 },
      { name: '영업팀 C', performance: 92, target: 100 },
    ],
    marketing: [
      { name: '디지털 마케팅', performance: 90, target: 100 },
      { name: '브랜드 마케팅', performance: 82, target: 100 },
      { name: '이벤트 마케팅', performance: 78, target: 100 },
    ],
    dev: [
      { name: '프론트엔드', performance: 92, target: 100 },
      { name: '백엔드', performance: 88, target: 100 },
      { name: 'DevOps', performance: 85, target: 100 },
    ],
    operations: [
      { name: '고객 지원', performance: 80, target: 100 },
      { name: '물류', performance: 75, target: 100 },
      { name: '품질 관리', performance: 82, target: 100 },
    ],
    hr: [
      { name: '채용', performance: 85, target: 100 },
      { name: '교육', performance: 80, target: 100 },
      { name: '복지', performance: 88, target: 100 },
    ]
  };

  const allKpiData = {
    week: [
      { title: '주간 매출', value: '35.1억', change: '+8.2%', trend: 'up', icon: DollarSign, color: 'text-emerald-500' },
      { title: '목표 달성률', value: '95%', change: '+3.1%', trend: 'up', icon: Target, color: 'text-blue-500' },
      { title: '활성 프로젝트', value: '23', change: '+3', trend: 'up', icon: Activity, color: 'text-purple-500' },
      { title: '운영 비용', value: '2.1억', change: '-1.5%', trend: 'down', icon: TrendingDown, color: 'text-orange-500' }
    ],
    month: [
      { title: '월 매출', value: '24.5억', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-emerald-500' },
      { title: '목표 달성률', value: '87%', change: '+5.2%', trend: 'up', icon: Target, color: 'text-blue-500' },
      { title: '활성 프로젝트', value: '23', change: '+3', trend: 'up', icon: Activity, color: 'text-purple-500' },
      { title: '운영 비용', value: '8.2억', change: '-2.1%', trend: 'down', icon: TrendingDown, color: 'text-orange-500' }
    ],
    quarter: [
      { title: '분기 매출', value: '72.3억', change: '+6.5%', trend: 'up', icon: DollarSign, color: 'text-emerald-500' },
      { title: '목표 달성률', value: '96%', change: '+4.8%', trend: 'up', icon: Target, color: 'text-blue-500' },
      { title: '활성 프로젝트', value: '45', change: '+12', trend: 'up', icon: Activity, color: 'text-purple-500' },
      { title: '운영 비용', value: '24.5억', change: '+0.8%', trend: 'down', icon: TrendingDown, color: 'text-orange-500' }
    ],
    year: [
      { title: '연간 매출', value: '325억', change: '+9.1%', trend: 'up', icon: DollarSign, color: 'text-emerald-500' },
      { title: '목표 달성률', value: '98%', change: '+2.3%', trend: 'up', icon: Target, color: 'text-blue-500' },
      { title: '활성 프로젝트', value: '156', change: '+34', trend: 'up', icon: Activity, color: 'text-purple-500' },
      { title: '운영 비용', value: '98.2억', change: '-1.2%', trend: 'down', icon: TrendingDown, color: 'text-orange-500' }
    ]
  };

  // 필터링된 데이터 계산
  const filteredRevenueData = useMemo(() => allRevenueData[timeFilter], [timeFilter]);
  const filteredDepartmentData = useMemo(() => allDepartmentData[departmentFilter], [departmentFilter]);
  const filteredKpiData = useMemo(() => allKpiData[timeFilter], [timeFilter]);

  // 프로젝트 분포 데이터
  const projectDistribution = [
    { name: '진행중', value: 15, color: '#3b82f6' },
    { name: '기획중', value: 8, color: '#f59e0b' },
    { name: '완료', value: 32, color: '#10b981' },
    { name: '보류', value: 4, color: '#ef4444' },
  ];

  // 필터 옵션
  const timeFilterOptions = [
    { value: 'week' as const, label: '주간', icon: Calendar },
    { value: 'month' as const, label: '월간', icon: Calendar },
    { value: 'quarter' as const, label: '분기', icon: Calendar },
    { value: 'year' as const, label: '연간', icon: Calendar },
  ];

  const departmentFilterOptions = [
    { value: 'all' as const, label: '전체 보기' },
    { value: 'sales' as const, label: '영업' },
    { value: 'marketing' as const, label: '마케팅' },
    { value: 'dev' as const, label: '개발' },
    { value: 'operations' as const, label: '운영' },
    { value: 'hr' as const, label: '인사' },
  ];

  const handleSend = async () => {
    if (message.trim() && currentUserId) {
      setIsTyping(true);
      const userMessage = message;
      setMessage('');

      try {
        // 1. 새 대화 생성 (실제로는 기존 대화에 메시지 추가 로직이 필요할 수 있음)
        const conversation = await createConversation.mutateAsync({
          userId: currentUserId,
          title: userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : ''),
        });

        // 2. 사용자 메시지 저장
        await createMessage.mutateAsync({
          conversation_id: conversation.id,
          agent_id: null,
          role: 'user',
          content: userMessage,
          metadata: null,
          confidence_score: null,
        });

        // 3. AI 응답 시뮬레이션 (실제로는 AI API 호출)
        setTimeout(async () => {
          // AI 응답 메시지 저장
          await createMessage.mutateAsync({
            conversation_id: conversation.id,
            agent_id: agents[0]?.id || null,
            role: 'assistant',
            content: '이것은 AI의 샘플 응답입니다. 실제 API 연결 후 동적으로 생성될 예정입니다.',
            metadata: { model: 'gpt-4', tokens: 150 },
            confidence_score: 0.95,
          });

          setIsTyping(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to send message:', error);
        setIsTyping(false);
        setMessage(userMessage); // 실패 시 메시지 복원
      }
    }
  };

  return (
    <div className="h-screen bg-white dark:bg-black flex overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } bg-[#F5F5F7] dark:bg-[#1C1C1E] border-r border-[#D2D2D7] dark:border-[#3A3A3C] transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <div className="p-6 border-b border-[#D2D2D7] dark:border-[#3A3A3C]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">대표님 AI</h2>
            <Button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-white dark:hover:bg-[#2C2C2E] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#6E6E73] dark:text-[#98989D]" />
            </Button>
          </div>
          <Button className="btn-apple-primary w-full">
            <Plus className="mr-2 h-5 w-5" />
            새 대화
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-apple p-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#98989D] uppercase tracking-wider px-3 mb-3">
              최근 대화
            </h3>
            {conversationsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-[#6E6E73]" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-10 w-10 text-[#6E6E73] dark:text-[#98989D] mx-auto mb-2 opacity-50" />
                <p className="text-sm text-[#6E6E73] dark:text-[#98989D]">아직 대화가 없습니다</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#98989D] mt-1">새 대화를 시작해보세요</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full text-left p-3 rounded-xl hover:bg-white dark:hover:bg-[#2C2C2E] transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-[#6E6E73] dark:text-[#98989D] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] truncate group-hover:text-[#0071E3] transition-colors">
                        {conv.title}
                      </p>
                      <p className="text-xs text-[#6E6E73] dark:text-[#98989D] mt-1">{formatTime(conv.updated_at)}</p>
                      {conv.status === 'active' && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full">
                          진행중
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-[#D2D2D7] dark:border-[#3A3A3C] flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <Button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-[#6E6E73] dark:text-[#98989D]" />
              </Button>
            )}
            <h1 className="text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">대시보드</h1>

            {/* Filter Buttons */}
            <div className="hidden lg:flex items-center gap-2 ml-4">
              {/* Time Filter */}
              <div className="flex items-center gap-1 bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-lg p-1">
                {timeFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeFilter(option.value)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      timeFilter === option.value
                        ? 'bg-white dark:bg-[#2C2C2E] text-[#0071E3] shadow-sm'
                        : 'text-[#6E6E73] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Department Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    showFilters
                      ? 'bg-[#0071E3] text-white'
                      : 'bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#6E6E73] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  {departmentFilterOptions.find(opt => opt.value === departmentFilter)?.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {showFilters && (
                  <div className="absolute top-full left-0 mt-2 bg-white dark:bg-[#1C1C1E] rounded-lg shadow-lg border border-[#D2D2D7] dark:border-[#3A3A3C] py-1 min-w-[120px] z-50">
                    {departmentFilterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setDepartmentFilter(option.value);
                          setShowFilters(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                          departmentFilter === option.value
                            ? 'bg-[#0071E3] text-white'
                            : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={() => navigate('/reports/1')}
              className="btn-apple-secondary"
            >
              보고서 보기
            </Button>
          </div>
        </header>

        {/* Mobile Filters */}
        <div className="lg:hidden px-6 py-3 border-b border-[#D2D2D7] dark:border-[#3A3A3C] bg-white dark:bg-black">
          <div className="flex items-center gap-2 overflow-x-auto">
            {timeFilterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeFilter(option.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  timeFilter === option.value
                    ? 'bg-[#0071E3] text-white'
                    : 'bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#6E6E73] dark:text-[#98989D]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-apple">
          <div className="container-apple py-12">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {filteredKpiData.map((kpi, index) => (
                <div
                  key={index}
                  className="card-apple p-6 space-y-3 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                    <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-orange-500'}`}>
                      {kpi.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{kpi.value}</p>
                    <p className="text-sm text-[#6E6E73] dark:text-[#98989D]">{kpi.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="card-apple p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">매출 추이</h3>
                  <span className="text-xs text-[#6E6E73] dark:text-[#98989D]">
                    {timeFilterOptions.find(opt => opt.value === timeFilter)?.label}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={filteredRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="month" className="text-[#6E6E73] dark:text-[#98989D]" />
                    <YAxis className="text-[#6E6E73] dark:text-[#98989D]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="실제 매출"
                      dot={{ fill: '#10b981' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="목표"
                      dot={{ fill: '#94a3b8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Department Performance Chart */}
              <div className="card-apple p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">성과 분석</h3>
                  <span className="text-xs text-[#6E6E73] dark:text-[#98989D]">
                    {departmentFilterOptions.find(opt => opt.value === departmentFilter)?.label}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={filteredDepartmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="name" className="text-[#6E6E73] dark:text-[#98989D]" />
                    <YAxis className="text-[#6E6E73] dark:text-[#98989D]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="performance" fill="#3b82f6" name="성과 점수" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Project Distribution Chart */}
              <div className="card-apple p-6">
                <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4">프로젝트 분포</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={projectDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Stats */}
              <div className="card-apple p-6">
                <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4">요약 통계</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-lg">
                    <span className="text-sm text-[#6E6E73] dark:text-[#98989D]">총 프로젝트</span>
                    <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">59개</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-lg">
                    <span className="text-sm text-[#6E6E73] dark:text-[#98989D]">완료율</span>
                    <span className="font-semibold text-emerald-500">54%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-lg">
                    <span className="text-sm text-[#6E6E73] dark:text-[#98989D]">평균 성과</span>
                    <span className="font-semibold text-blue-500">85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-lg">
                    <span className="text-sm text-[#6E6E73] dark:text-[#98989D]">전월 대비</span>
                    <span className="font-semibold text-emerald-500">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome State */}
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <div className="space-y-4 opacity-0 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  안녕하세요, 대표님
                </h2>
                <p className="text-xl text-[#6E6E73] dark:text-[#98989D]">
                  오늘은 어떤 도움이 필요하신가요?
                </p>
              </div>

              {/* Agent Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-8">
                {agents.map((agent, index) => {
                  const config = agentConfigMap[agent.agent_type] || {
                    role: 'AI 에이전트',
                    icon: Activity,
                    color: 'from-gray-400 to-gray-600'
                  };
                  const IconComponent = config.icon;

                  return (
                    <button
                      key={agent.id}
                      className="card-apple p-6 text-center space-y-3 hover:scale-105 opacity-0 animate-scale-in"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      onClick={() => {
                        // 에이전트 선택 시 해당 에이전트와 대화 시작
                        setMessage(`${config.role} ${agent.agent_type}와 대화를 시작합니다.`);
                      }}
                    >
                      <div className="mx-auto transform transition-transform duration-300 hover:scale-110">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{agent.agent_type}</p>
                        <p className="text-xs text-[#6E6E73] dark:text-[#98989D] mt-1">{config.role}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Questions */}
              <div className="space-y-4 pt-8 opacity-0 animate-fade-in-up animate-delay-600">
                <p className="text-sm font-medium text-[#6E6E73] dark:text-[#98989D]">빠른 질문</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    '현금 흐름 최적화 방안은?',
                    '디지털 전환 로드맵 검토',
                    '마케팅 캠페인 성과 분석',
                    '조직 문화 개선 전략'
                  ].map((question, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(question)}
                      className="px-5 py-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E8E8ED] dark:hover:bg-[#3A3A3C] rounded-full text-sm text-[#1D1D1F] dark:text-[#F5F5F7] transition-all duration-300 hover:scale-105"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 justify-center opacity-0 animate-fade-in">
                  <div className="w-2 h-2 bg-[#0071E3] rounded-full animate-pulse-slow"></div>
                  <div className="w-2 h-2 bg-[#0071E3] rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#0071E3] rounded-full animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm text-[#6E6E73] dark:text-[#98989D] ml-2">AI가 답변을 작성하고 있습니다...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-[#D2D2D7] dark:border-[#3A3A3C] bg-white dark:bg-black">
          <div className="container-apple py-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="질문을 입력하세요..."
                  className="input-apple text-base py-4 min-h-[56px]"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!message.trim() || isTyping}
                className="btn-apple-primary px-6 py-4 min-h-[56px]"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#98989D] text-center mt-3">
              AI가 생성한 답변은 부정확할 수 있습니다. 중요한 결정은 전문가와 상담하세요.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}