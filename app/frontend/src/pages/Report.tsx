import { useState, useEffect, useRef } from 'react';
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
  Check,
  Loader2,
  AlertCircle
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
import { useReport } from '@/services/queries';
import type { Report as ReportType } from '@/services/api';
import { generateMultiPagePDF } from '@/services/pdfExport';

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportContentRef = useRef<HTMLDivElement>(null);
  const { data: report, isLoading, error } = useReport(id || '');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!reportContentRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const metadata = report.metadata as any;
      const topic = metadata?.topic || 'report';
      const filename = `${topic.replace(/[^a-zA-Z0-9가-힣]/g, '_')}_보고서.pdf`;

      await generateMultiPagePDF(reportContentRef.current, {
        filename,
        quality: 0.95,
        scale: 2,
        format: 'a4',
        orientation: 'portrait',
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#0071E3] mx-auto" />
          <p className="text-[#6E6E73] dark:text-[#98989D]">보고서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !report) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            보고서를 찾을 수 없습니다
          </h2>
          <p className="text-[#6E6E73] dark:text-[#98989D]">
            보고서가 삭제되었거나 링크가 올바르지 않습니다.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="btn-apple-primary">
            대시보드로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // Extract metadata from report
  const metadata = report.metadata as any;
  const reportTopic = metadata?.topic || '분석 보고서';
  const agents = metadata?.agents || ['CFO', 'CTO', 'CMO', 'COO', 'CHRO'];
  const kpiData = metadata?.kpi || [];
  const executiveSummary = metadata?.executive_summary || '요약 정보가 없습니다.';
  const sections = metadata?.sections || [];
  const nextSteps = metadata?.next_steps || [];

  // Agent configuration for display
  const agentConfigMap: Record<string, { name: string; icon: any; color: string; analysis: string }> = {
    'CFO': { name: 'CFO', icon: TrendingUp, color: 'from-emerald-400 to-emerald-600', analysis: '재무 분석' },
    'CTO': { name: 'CTO', icon: Code, color: 'from-indigo-400 to-indigo-600', analysis: '기술 분석' },
    'CMO': { name: 'CMO', icon: Megaphone, color: 'from-orange-400 to-orange-600', analysis: '마케팅 분석' },
    'COO': { name: 'COO', icon: Settings, color: 'from-purple-400 to-purple-600', analysis: '운영 분석' },
    'CHRO': { name: 'CHRO', icon: Users, color: 'from-pink-400 to-pink-600', analysis: '인사 분석' },
  };

  // Sample chart data (would be dynamically generated)
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
                disabled={isGeneratingPDF}
                className="btn-apple-primary flex items-center gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    PDF 생성 중...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    PDF 다운로드
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Report Content */}
      <div className="section-apple">
        <div ref={reportContentRef} className="container-apple space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 opacity-0 animate-fade-in-up">
            <h1 className="text-6xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
              {reportTopic}
            </h1>
            <p className="text-xl text-[#6E6E73] dark:text-[#98989D]">
              생성일: {new Date(report.generated_at).toLocaleDateString('ko-KR')} | 참여 에이전트: {agents.join(', ')}
            </p>
          </div>

          {/* Executive Summary */}
          <section className="card-apple opacity-0 animate-fade-in-up animate-delay-200">
            <h2 className="text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-6">
              요약 (Executive Summary)
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-[#6E6E73] dark:text-[#98989D] leading-relaxed whitespace-pre-wrap">
                {executiveSummary}
              </p>

              {/* KPI Cards */}
              {kpiData.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {kpiData.map((kpi: any, i: number) => (
                    <div
                      key={i}
                      className="p-6 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl text-center opacity-0 animate-scale-in"
                      style={{ animationDelay: `${(i + 3) * 100}ms` }}
                    >
                      <p className="text-sm text-[#6E6E73] dark:text-[#98989D] mb-2">{kpi.metric}</p>
                      <p
                        className={`text-2xl font-bold ${
                          kpi.status === 'positive'
                            ? 'text-emerald-500'
                            : kpi.status === 'negative'
                            ? 'text-red-500'
                            : 'text-[#0071E3]'
                        }`}
                      >
                        {kpi.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Agent Sections */}
          {sections.map((section: any, index: number) => {
            const agentInfo = agentConfigMap[section.title.split(' ')[0]];
            if (!agentInfo) return null;
            const IconComponent = agentInfo.icon;

            return (
              <section
                key={index}
                className="card-apple opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="transform transition-transform duration-300 hover:scale-110">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agentInfo.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-base text-[#6E6E73] dark:text-[#98989D] leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>

                  {/* Charts for specific sections */}
                  {section.title.includes('CFO') && (
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

                  {section.title.includes('CMO') && (
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
                </div>
              </section>
            );
          })}

          {/* Next Steps */}
          {nextSteps.length > 0 && (
            <section className="card-apple bg-[#0071E3] text-white opacity-0 animate-fade-in-up animate-delay-600">
              <h2 className="text-4xl font-semibold mb-6">다음 단계</h2>
              <div className="space-y-4">
                {nextSteps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-white text-opacity-90">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
