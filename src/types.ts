export interface ContentIdeas {
  blogPosts: { title: string; focus: string }[];
  socialMedia: { platform: string; content: string; focus: string }[];
  adCopy: { platform: string; copy: string; focus: string }[];
}

export interface AudienceSegment {
  name: string;
  characteristics: string;
  marketingStrategy: string;
}

export interface CampaignAnalytics {
  trends: string[];
  prediction: string;
  recommendations: string[];
}

export interface ABTestResult {
  winner: 'A' | 'B';
  versionA: { score: number; strengths: string[]; weaknesses: string[] };
  versionB: { score: number; strengths: string[]; weaknesses: string[] };
  rationale: string;
}

export interface CompetitorAnalysis {
  differentiators: string[];
  benchmarks: { metric: string; competitorAvg: string; targetGoal: string }[];
  entryPoints: string[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface ContentSummary {
  summary: string;
  keyTakeaways: string[];
  sentiment: string;
}
