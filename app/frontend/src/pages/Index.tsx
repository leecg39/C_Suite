import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Code, Megaphone, Settings, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AgentAvatar } from '@/components/AgentAvatar';
import { useEffect, useState } from 'react';

export default function Index() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const agents = [
    {
      id: 'cfo' as const,
      name: 'CFO 에이전트',
      role: '재무 전략 자문',
      description: '재무 계획, 현금 흐름 관리, 투자 전략을 분석하고 데이터 기반 인사이트를 제공합니다.',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      questions: ['현금 흐름 최적화 방안', '투자 ROI 분석', '비용 절감 전략']
    },
    {
      id: 'cto' as const,
      name: 'CTO 에이전트',
      role: '기술 혁신 자문',
      description: '기술 전략, 디지털 전환, IT 인프라를 검토하고 혁신적인 솔루션을 제안합니다.',
      icon: Code,
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      questions: ['디지털 전환 로드맵', '기술 스택 최적화', '보안 강화 방안']
    },
    {
      id: 'cmo' as const,
      name: 'CMO 에이전트',
      role: '마케팅 전략 자문',
      description: '브랜드 전략, 마케팅 캠페인, 고객 인사이트를 분석하고 성장 전략을 수립합니다.',
      icon: Megaphone,
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      questions: ['브랜드 포지셔닝', '캠페인 성과 분석', '고객 세그먼트 전략']
    },
    {
      id: 'coo' as const,
      name: 'COO 에이전트',
      role: '운영 효율화 자문',
      description: '운영 프로세스, 공급망 관리, 품질 관리를 최적화하고 생산성을 향상시킵니다.',
      icon: Settings,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      questions: ['프로세스 최적화', '공급망 효율화', '품질 관리 개선']
    },
    {
      id: 'chro' as const,
      name: 'CHRO 에이전트',
      role: '인사 전략 자문',
      description: '인재 채용, 조직 문화, 직원 참여도를 분석하고 조직 발전 방안을 제시합니다.',
      icon: Users,
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      questions: ['인재 확보 전략', '조직 문화 개선', '리더십 개발']
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-xl border-b border-[#D2D2D7] dark:border-[#3A3A3C] transition-all duration-300"
        style={{ 
          boxShadow: scrollY > 0 ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
        }}
      >
        <div className="container-apple">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">대표님 AI</div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button 
                onClick={() => navigate('/login')}
                className="text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#0071E3] transition-colors duration-200 text-sm"
              >
                로그인
              </button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="btn-apple-primary"
              >
                시작하기
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-apple pt-32 pb-20 text-center perspective-1000">
        <div className="container-apple">
          <div className="space-y-6 opacity-0 animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight">
              대표님을 위한<br />AI 경영 자문
            </h1>
            <p className="text-xl md:text-2xl text-[#6E6E73] dark:text-[#98989D] max-w-2xl mx-auto leading-relaxed">
              5명의 C레벨 AI 에이전트가 24/7 전략적 인사이트를 제공합니다.<br />
              소크라테스식 질문으로 더 깊은 통찰을 얻으세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="btn-apple-primary text-lg px-8 py-4 min-h-[52px] animate-scale-in animate-delay-300"
              >
                무료로 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                className="btn-apple-secondary text-lg px-8 py-4 min-h-[52px] animate-scale-in animate-delay-400"
              >
                더 알아보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="section-apple bg-[#F5F5F7] dark:bg-[#1C1C1E] transition-colors duration-300">
        <div className="container-apple">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up animate-delay-200">
            <h2 className="text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4">
              전문 에이전트
            </h2>
            <p className="text-xl text-[#6E6E73] dark:text-[#98989D]">
              각 분야의 전문가가 귀사의 성장을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className="card-apple opacity-0 animate-fade-in-up cursor-pointer transform-3d"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="agent-avatar-apple">
                    <AgentAvatar agentId={agent.id} size="lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                      {agent.name}
                    </h3>
                    <p className="text-base text-[#0071E3] font-medium mb-3">
                      {agent.role}
                    </p>
                    <p className="text-base text-[#6E6E73] dark:text-[#98989D] leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {agent.questions.map((q, i) => (
                      <span key={i} className="badge-apple bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#6E6E73] dark:text-[#98989D]">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-apple">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4">
              왜 대표님 AI인가
            </h2>
            <p className="text-xl text-[#6E6E73] dark:text-[#98989D]">
              전략적 의사결정을 위한 완벽한 도구
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: TrendingUp, title: '즉각적인 인사이트', desc: '24/7 언제든지 전문가 수준의 자문을 받고 빠른 의사결정을 내리세요.' },
              { icon: Code, title: '소크라테스식 대화', desc: '질문을 통해 더 깊은 통찰을 얻고 전략적 사고를 확장하세요.' },
              { icon: Users, title: '멀티 에이전트 협업', desc: '복합적인 문제에 대해 여러 전문가의 통합된 관점을 확인하세요.' }
            ].map((feature, i) => (
              <div key={i} className="text-center space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 bg-[#0071E3] bg-opacity-10 dark:bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto transform transition-transform duration-300 hover:scale-110">
                  <feature.icon className="h-8 w-8 text-[#0071E3]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {feature.title}
                </h3>
                <p className="text-base text-[#6E6E73] dark:text-[#98989D] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-apple bg-[#F5F5F7] dark:bg-[#1C1C1E] transition-colors duration-300">
        <div className="container-apple text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-[#6E6E73] dark:text-[#98989D] leading-relaxed">
              30일 무료 체험으로 대표님 AI의 강력한 기능을 경험해보세요.<br />
              신용카드 등록 없이 바로 시작할 수 있습니다.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="btn-apple-primary text-lg px-10 py-4 min-h-[52px]"
            >
              무료 체험 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-apple border-t border-[#D2D2D7] dark:border-[#3A3A3C]">
        <div className="container-apple">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#6E6E73] dark:text-[#98989D]">
            <div className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">대표님 AI</div>
            <div className="flex gap-8">
              <a href="#" className="link-apple">개인정보처리방침</a>
              <a href="#" className="link-apple">이용약관</a>
              <a href="#" className="link-apple">문의하기</a>
            </div>
            <div>© 2026 대표님 AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}