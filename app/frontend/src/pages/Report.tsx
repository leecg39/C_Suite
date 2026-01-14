import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Share2, 
  ArrowLeft,
  TrendingUp,
  Code,
  Megaphone,
  Settings,
  Users,
  Check
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AgentAvatar } from '@/components/AgentAvatar';

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    window.print();
  };

  // Sample data
  const financialData = [
    { month: '1월', revenue: 45, cost: 30, profit: 15 },
    { month: '2월', revenue: 52, cost: 32, profit: 20 },
    { month: '3월', revenue: 48, cost: 28, profit: 20 },
    { month: '4월', revenue: 61, cost: 35, profit: 26 },
    { month: '5월', revenue: 55, cost: 33, profit: 22 },
    { month: '6월', revenue: 67, cost: 38, profit: 29 }
  ];

  const marketShareData = [
    { name: '자사', value: 35, color: '#0071E3' },
    { name: '경쟁사 A', value: 28, color: '#10B981' },
    { name: '경쟁사 B', value: 22, color: '#F59E0B' },
    { name: '기타', value: 15, color: '#6B7280' }
  ];

  const kpiData = [
    { metric: '매출 성장률', value: '+15%', status: 'positive' },
    { metric: '고객 만족도', value: '4.5/5.0', status: 'positive' },
    { metric: '운영 효율성', value: '+12%', status: 'positive' },
    { metric: '직원 참여도', value: '78%', status: 'neutral' }
  ];

  const agents = [
    {
      id: 'cfo' as const,
      name: 'CFO',
      icon: TrendingUp,
      color: 'from-emerald-400 to-emerald-600',
      analysis: '재무 분석',
      summary: '2024년 상반기 매출은 전년 대비 15% 증가했으며, 순이익률은 23%를 기록했습니다. 현금 흐름은 안정적이며, 투자 여력이 충분합니다.',
      recommendations: [
        '운영 비용 최적화를 통해 순이익률을 25%까지 개선 가능',
        '신규 시장 진입을 위한 투자 예산 30억원 확보 권장',
        'R&D 투자 비율을 매출의 8%로 확대 제안'
      ]
    },
    {
      id: 'cto' as const,
      name: 'CTO',
      icon: Code,
      color: 'from-indigo-400 to-indigo-600',
      analysis: '기술 분석',
      summary: '현재 기술 스택은 안정적이나, 클라우드 네이티브 전환이 필요합니다. AI/ML 역량 강화를 위한 인프라 투자가 시급합니다.',
      recommendations: [
        'AWS/Azure 클라우드 마이그레이션 6개월 내 완료',
        'AI 개발팀 신규 채용 (ML 엔지니어 5명)',
        '레거시 시스템 현대화 프로젝트 착수'
      ]
    },
    {
      id: 'cmo' as const,
      name: 'CMO',
      icon: Megaphone,
      color: 'from-orange-400 to-orange-600',
      analysis: '마케팅 분석',
      summary: '브랜드 인지도가 전년 대비 28% 상승했으며, 디지털 마케팅 ROI는 320%를 기록했습니다. 고객 획득 비용은 안정적입니다.',
      recommendations: [
        '인플루언서 마케팅 예산 2배 확대',
        'SEO 최적화를 통한 유기적 트래픽 40% 증가 목표',
        '고객 리텐션 프로그램 강화 (로열티 프로그램 도입)'
      ]
    },
    {
      id: 'coo' as const,
      name: 'COO',
      icon: Settings,
      color: 'from-purple-400 to-purple-600',
      analysis: '운영 분석',
      summary: '생산성이 12% 향상되었으며, 공급망 효율성은 목표치를 달성했습니다. 프로세스 자동화를 통해 추가 개선 여지가 있습니다.',
      recommendations: [
        'RPA 도입으로 반복 업무 70% 자동화',
        '공급업체 다변화를 통한 리스크 분산',
        '품질 관리 시스템 ISO 9001 인증 획득'
      ]
    },
    {
      id: 'chro' as const,
      name: 'CHRO',
      icon: Users,
      color: 'from-pink-400 to-pink-600',
      analysis: '인사 분석',
      summary: '직원 참여도는 78%로 업계 평균을 상회하며, 이직률은 8%로 낮은 수준입니다. 리더십 파이프라인 강화가 필요합니다.',
      recommendations: [
        '하이 포텐셜 인재 육성 프로그램 신설',
        '원격 근무 정책 확대 (주 3일 재택)',
        '다양성 및 포용성(D&I) 이니셔티브 강화'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-xl border-b border-[#D2D2D7] dark:border-[#3A3A3C]">
        <div className="container-apple">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-[#1D1D1F] dark:text-[#F5F5F7]" />
              </Button>
              <h1 className="text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                보고서
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                onClick={handleShare}
                className="btn-apple-secondary flex items-center gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {copied ? '복사됨' : '공유'}
              </Button>
              <Button
                onClick={handleDownload}
                className="btn-apple-primary flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Report Content */}
      <div className="section-apple">
        <div className="container-apple space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 opacity-0 animate-fade-in-up">
            <h1 className="text-6xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              신제품 출시 전략 종합 분석
            </h1>
            <p className="text-xl text-[#6E6E73] dark:text-[#98989D]">
              생성일: 2026년 1월 10일 | 참여 에이전트: CFO, CTO, CMO, COO, CHRO
            </p>
          </div>

          {/* Executive Summary */}
          <section className="card-apple opacity-0 animate-fade-in-up animate-delay-200">
            <h2 className="text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">
              요약 (Executive Summary)
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-[#6E6E73] dark:text-[#98989D] leading-relaxed">
                신제품 출시 전략에 대한 종합 분석 결과, 시장 기회는 높으며 재무적 타당성도 양호한 것으로 평가됩니다. 
                기술 준비도는 중간 수준이나 6개월 내 개발 완료가 가능하며, 운영 실행 가능성은 높습니다.
              </p>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {kpiData.map((kpi, i) => (
                  <div
                    key={i}
                    className="p-6 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl text-center opacity-0 animate-scale-in"
                    style={{ animationDelay: `${(i + 3) * 100}ms` }}
                  >
                    <p className="text-sm text-[#6E6E73] dark:text-[#98989D] mb-2">{kpi.metric}</p>
                    <p className="text-2xl font-bold text-[#0071E3]">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0071E3] bg-opacity-10 dark:bg-opacity-20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
                  종합 권고
                </h3>
                <p className="text-base text-[#6E6E73] dark:text-[#98989D] leading-relaxed">
                  <strong className="text-[#0071E3]">진행 추천 (조건부)</strong> - 
                  시장 테스트 3개월, 기술 개발 즉시 착수, 운영 준비 2개월 후 본격 출시를 권장합니다.
                </p>
              </div>
            </div>
          </section>

          {/* Agent Sections */}
          {agents.map((agent, index) => (
            <section 
              key={agent.id} 
              className="card-apple opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="transform transition-transform duration-300 hover:scale-110">
                  <AgentAvatar agentId={agent.id} size="sm" />
                </div>
                <h2 className="text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {agent.analysis} ({agent.name})
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-base text-[#6E6E73] dark:text-[#98989D] leading-relaxed">
                  {agent.summary}
                </p>

                {/* Charts for CFO and CMO */}
                {agent.id === 'cfo' && (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D2D2D7" />
                        <XAxis dataKey="month" stroke="#6E6E73" />
                        <YAxis stroke="#6E6E73" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #D2D2D7',
                            borderRadius: '12px'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#0071E3" strokeWidth={2} name="매출" />
                        <Line type="monotone" dataKey="cost" stroke="#F59E0B" strokeWidth={2} name="비용" />
                        <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="이익" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {agent.id === 'cmo' && (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={marketShareData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name} ${value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {marketShareData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
                    주요 권고사항
                  </h4>
                  <ul className="space-y-2">
                    {agent.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-base text-[#6E6E73] dark:text-[#98989D]">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}

          {/* Next Steps */}
          <section className="card-apple bg-[#0071E3] text-white opacity-0 animate-fade-in-up animate-delay-600">
            <h2 className="text-4xl font-semibold mb-6">다음 단계</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">시장 테스트 (3개월)</h4>
                  <p className="text-white text-opacity-90">
                    타겟 고객 100명 대상 베타 테스트 진행 및 피드백 수집
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">기술 개발 착수 (즉시)</h4>
                  <p className="text-white text-opacity-90">
                    개발팀 구성 및 6개월 개발 일정 수립
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">운영 준비 (2개월)</h4>
                  <p className="text-white text-opacity-90">
                    공급망 구축, 품질 관리 프로세스 수립, 고객 지원 체계 마련
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}