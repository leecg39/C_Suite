/**
 * Report Generation Service
 * Generates comprehensive reports using AI from conversation data
 */

import { aiService } from './ai';
import type { Agent } from './api';

export interface ReportSection {
  type: 'executive_summary' | 'agent_analysis' | 'next_steps';
  title: string;
  content: string;
  visualization_data?: any;
  order_index: number;
}

export interface GeneratedReport {
  title: string;
  executive_summary: string;
  sections: ReportSection[];
  kpi: {
    metric: string;
    value: string;
    status: 'positive' | 'neutral' | 'negative';
  }[];
  next_steps: {
    title: string;
    description: string;
  }[];
}

export interface ReportGenerationOptions {
  conversationId?: string;
  topic: string;
  agents: string[];
  includeCharts?: boolean;
  detailLevel?: 'summary' | 'detailed' | 'comprehensive';
}

/**
 * Generate a comprehensive report using AI
 */
export async function generateReport(options: ReportGenerationOptions): Promise<GeneratedReport> {
  const {
    topic,
    agents,
    conversationId,
    includeCharts = true,
    detailLevel = 'detailed',
  } = options;

  // 1. Generate executive summary
  const executiveSummary = await aiService.chat([
    {
      role: 'system',
      content: 'You are an expert executive report writer. Create concise, impactful executive summaries for C-level executives.',
    },
    {
      role: 'user',
      content: `Create an executive summary for a report about: "${topic}"

The report involves insights from these C-level executives: ${agents.join(', ')}

Provide a 2-3 paragraph executive summary that:
- Clearly states the main findings
- Highlights key opportunities or concerns
- Provides an overall recommendation (Go/No-Go/Conditional)

Format: Professional business writing, suitable for CEO review.`,
    },
  ]);

  // 2. Generate KPIs
  const kpiPrompt = await aiService.chat([
    {
      role: 'system',
      content: 'You are a business analyst. Generate relevant KPIs for reports.',
    },
    {
      role: 'user',
      content: `Generate 4-5 key performance indicators (KPIs) for a report about: "${topic}"

For each KPI, provide:
- Metric name (in Korean)
- Current value (with percentage if applicable)
- Status: positive, neutral, or negative

Format as JSON array:
[
  {"metric": "매출 성장률", "value": "+15%", "status": "positive"},
  ...
]

Respond with ONLY the JSON array, no additional text.`,
    },
  ]);

  let kpi = [];
  try {
    const kpiMatch = kpiPrompt.content.match(/\[[\s\S]*\]/);
    if (kpiMatch) {
      kpi = JSON.parse(kpiMatch[0]);
    }
  } catch {
    // Fallback KPIs if parsing fails
    kpi = [
      { metric: '종합 점수', value: '85/100', status: 'positive' },
      { metric: '실행 가능성', value: '높음', status: 'positive' },
      { metric: '리스크 수준', value: '중간', status: 'neutral' },
      { metric: '기대 수익', value: '양호', status: 'positive' },
    ];
  }

  // 3. Generate agent analyses
  const sections: ReportSection[] = [];

  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];

    const agentAnalysis = await aiService.chat(
      [
        {
          role: 'system',
          content: getAgentSystemPrompt(agent),
        },
        {
          role: 'user',
          content: `Provide a detailed analysis for the topic: "${topic}"

Include:
1. Current situation assessment (2-3 sentences)
2. Key findings and data points
3. 3-5 specific, actionable recommendations
4. Risk factors or concerns

Format as structured text with clear sections.`,
        },
      ],
      agent,
      undefined // No streaming for report generation
    );

    sections.push({
      type: 'agent_analysis',
      title: `${agent} 분석`,
      content: agentAnalysis.content,
      order_index: i + 1,
    });
  }

  // 4. Generate next steps
  const nextStepsPrompt = await aiService.chat([
    {
      role: 'system',
      content: 'You are a strategic planning expert. Create actionable implementation plans.',
    },
    {
      role: 'user',
      content: `Based on the topic: "${topic}" and the analyses from ${agents.join(', ')}

Generate 3-4 concrete next steps with:
- Clear step number
- Actionable title
- Specific description (what to do, timeline, responsible party)

Format as JSON array:
[
  {"title": "시장 테스트 (3개월)", "description": "타겟 고객 100명 대상 베타 테스트 진행 및 피드백 수집"},
  ...
]

Respond with ONLY the JSON array, no additional text.`,
    },
  ]);

  let nextSteps = [];
  try {
    const nextStepsMatch = nextStepsPrompt.content.match(/\[[\s\S]*\]/);
    if (nextStepsMatch) {
      nextSteps = JSON.parse(nextStepsMatch[0]);
    }
  } catch {
    // Fallback next steps
    nextSteps = [
      {
        title: '1단계: 기획 (1개월)',
        description: '상세 기획서 작성 및 리소스 확보',
      },
      {
        title: '2단계: 실행 (3개월)',
        description: '핵심 기능 개발 및 시장 테스트',
      },
      {
        title: '3단계: 런칭 (1개월)',
        description: '본격 출시 및 마케팅 캠페인',
      },
    ];
  }

  return {
    title: `${topic} - 종합 분석 보고서`,
    executive_summary: executiveSummary.content,
    sections,
    kpi,
    next_steps: nextSteps,
  };
}

/**
 * Get system prompt for each agent type
 */
function getAgentSystemPrompt(agentType: string): string {
  const prompts: Record<string, string> = {
    CFO: `You are a CFO analyzing business proposals from a financial perspective.
Focus on: ROI, investment requirements, revenue projections, cost analysis, financial risks.
Provide specific numbers and financial metrics when possible.`,

    CTO: `You are a CTO analyzing proposals from a technology perspective.
Focus on: Technical feasibility, development timeline, architecture, scalability, technical risks.
Be specific about technologies, effort estimates, and implementation considerations.`,

    CMO: `You are a CMO analyzing proposals from a marketing perspective.
Focus on: Market opportunity, competitive landscape, customer needs, marketing strategy, brand impact.
Include market data, customer insights, and go-to-market considerations.`,

    COO: `You are a COO analyzing proposals from an operational perspective.
Focus on: Execution feasibility, operational requirements, process changes, resource allocation, implementation timeline.
Be practical about what it takes to make this work operationally.`,

    CHRO: `You are a CHRO analyzing proposals from an HR/organizational perspective.
Focus on: Organizational impact, talent requirements, training needs, cultural considerations, change management.
Consider the people and organization aspects of implementation.`,
  };

  return prompts[agentType] || 'You are a C-level executive providing strategic analysis.';
}

/**
 * Generate report title from topic
 */
export async function generateReportTitle(topic: string): Promise<string> {
  try {
    const response = await aiService.chat([
      {
        role: 'user',
        content: `Generate a concise, professional report title (max 50 characters) for: "${topic}"

Respond with ONLY the title, no quotes or extra text.`,
      },
    ]);

    return response.content.slice(0, 50);
  } catch {
    return topic.slice(0, 50);
  }
}

/**
 * Save report to database
 */
export async function saveReport(
  userId: string,
  conversationId: string | null,
  report: GeneratedReport,
  agentTypes: string[]
): Promise<{ id: string }> {
  // This would be implemented with the actual API call
  // For now, returning a mock response
  return {
    id: `report-${Date.now()}`,
  };
}
