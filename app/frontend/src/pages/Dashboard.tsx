import { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AgentAvatar } from '@/components/AgentAvatar';

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const agents = [
    {
      id: 'cfo' as const,
      name: 'CFO',
      role: '재무 전략',
      icon: TrendingUp,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      id: 'cto' as const,
      name: 'CTO',
      role: '기술 혁신',
      icon: Code,
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 'cmo' as const,
      name: 'CMO',
      role: '마케팅 전략',
      icon: Megaphone,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'coo' as const,
      name: 'COO',
      role: '운영 효율화',
      icon: Settings,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'chro' as const,
      name: 'CHRO',
      role: '인사 전략',
      icon: Users,
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const recentConversations = [
    { id: 1, title: '신제품 출시 전략 검토', time: '2시간 전', agents: ['CFO', 'CMO', 'CTO'], hasReport: true },
    { id: 2, title: 'Q4 재무 실적 분석', time: '어제', agents: ['CFO'], hasReport: false },
    { id: 3, title: '조직 문화 개선 방안', time: '3일 전', agents: ['CHRO', 'COO'], hasReport: false },
    { id: 4, title: '디지털 전환 로드맵', time: '1주일 전', agents: ['CTO', 'COO'], hasReport: false }
  ];

  const handleSend = () => {
    if (message.trim()) {
      setIsTyping(true);
      console.log('Sending message:', message);
      setMessage('');
      
      // Simulate typing animation
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
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
            {recentConversations.map((conv) => (
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
                    <p className="text-xs text-[#6E6E73] dark:text-[#98989D] mt-1">{conv.time}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1">
                        {conv.agents.map((agent, i) => (
                          <span key={i} className="badge-apple bg-white dark:bg-[#2C2C2E] text-[#6E6E73] dark:text-[#98989D] text-xs">
                            {agent}
                          </span>
                        ))}
                      </div>
                      {conv.hasReport && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/reports/1');
                          }}
                          className="ml-auto p-1 hover:bg-[#0071E3] hover:bg-opacity-10 rounded transition-colors"
                        >
                          <FileText className="h-4 w-4 text-[#0071E3]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
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

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-apple">
          <div className="container-apple py-12">
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
                {agents.map((agent, index) => (
                  <button
                    key={agent.id}
                    className="card-apple p-6 text-center space-y-3 hover:scale-105 opacity-0 animate-scale-in"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="mx-auto transform transition-transform duration-300 hover:scale-110">
                      <AgentAvatar agentId={agent.id} size="md" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{agent.name}</p>
                      <p className="text-xs text-[#6E6E73] dark:text-[#98989D] mt-1">{agent.role}</p>
                    </div>
                  </button>
                ))}
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