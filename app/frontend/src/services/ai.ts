/**
 * AI Service for LLM API Integration
 * Supports OpenAI GPT-4 and compatible APIs
 */

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
}

export interface StreamChunk {
  content: string;
  done: boolean;
}

/**
 * AI Service Class
 */
class AIService {
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseURL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1';
    this.model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo-preview';
  }

  /**
   * Check if API is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get system prompt for an agent type
   */
  private getSystemPrompt(agentType: string): string {
    const prompts: Record<string, string> = {
      'CFO': `You are a CFO (Chief Financial Officer) AI agent specialized in financial analysis, budget planning, and cost optimization.
      You provide professional financial insights with:
      - Data-driven analysis and recommendations
      - Risk assessment and mitigation strategies
      - KPI tracking and financial forecasting
      - Investment opportunity evaluation

      Respond in a professional, concise manner suitable for C-level executives.`,

      'CTO': `You are a CTO (Chief Technology Officer) AI agent specialized in technology strategy and innovation.
      You provide expert technical guidance on:
      - Technology stack decisions and architecture
      - Digital transformation roadmaps
      - R&D investment strategies
      - Emerging technology trends and adoption

      Respond in a technical yet accessible manner suitable for C-level executives.`,

      'CMO': `You are a CMO (Chief Marketing Officer) AI agent specialized in marketing strategy and brand management.
      You provide strategic marketing insights on:
      - Campaign performance analysis
      - Brand positioning and messaging
      - Market research and competitive analysis
      - Customer acquisition and retention strategies

      Respond in a creative, data-driven manner suitable for C-level executives.`,

      'COO': `You are a COO (Chief Operating Officer) AI agent specialized in operational excellence and process optimization.
      You provide operational expertise on:
      - Workflow optimization and automation
      - Resource allocation and efficiency
      - Supply chain and logistics management
      - Quality control and continuous improvement

      Respond in a practical, action-oriented manner suitable for C-level executives.`,

      'CHRO': `You are a CHRO (Chief Human Resources Officer) AI agent specialized in human capital and organizational development.
      You provide HR leadership on:
      - Talent acquisition and retention strategies
      - Organizational culture and employee engagement
      - Performance management and development
      - Compensation and benefits optimization

      Respond in an empathetic, strategic manner suitable for C-level executives.`
    };

    return prompts[agentType] || `You are a helpful AI assistant for C-level executives. Provide professional, concise, and actionable insights.`;
  }

  /**
   * Send chat completion request
   */
  async chat(
    messages: Message[],
    agentType: string = 'CFO',
    onChunk?: (chunk: string) => void
  ): Promise<AIResponse> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
    }

    // Add system prompt based on agent type
    const systemPrompt = this.getSystemPrompt(agentType);
    const messagesWithSystem: Message[] = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    try {
      if (onChunk) {
        // Streaming request
        return await this.streamChat(messagesWithSystem, onChunk);
      } else {
        // Non-streaming request
        return await this.completeChat(messagesWithSystem);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  /**
   * Non-streaming chat completion
   */
  private async completeChat(messages: Message[]): Promise<AIResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    const choice = data.choices[0];

    return {
      content: choice.message.content,
      usage: data.usage,
      model: data.model,
    };
  }

  /**
   * Streaming chat completion
   */
  private async streamChat(
    messages: Message[],
    onChunk: (chunk: string) => void
  ): Promise<AIResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let fullContent = '';
    let totalTokens = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          if (data === '[DONE]') {
            break;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content;

            if (content) {
              fullContent += content;
              onChunk(content);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

    return {
      content: fullContent,
      model: this.model,
    };
  }

  /**
   * Get conversation title from first message
   */
  async generateTitle(firstMessage: string): Promise<string> {
    try {
      const response = await this.chat([
        {
          role: 'user',
          content: `Generate a short, concise title (max 50 characters) for this conversation: "${firstMessage}". Respond with ONLY the title, no quotes or extra text.`,
        }
      ]);

      return response.content.slice(0, 50).replace(/['"]/g, '');
    } catch {
      return firstMessage.slice(0, 50);
    }
  }
}

// Export singleton instance
export const aiService = new AIService();

// Export types
export type { AIService };
