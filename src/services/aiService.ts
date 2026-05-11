import { 
  type ContentIdeas, 
  type AudienceSegment, 
  type CampaignAnalytics, 
  type ABTestResult, 
  type Slogan,
  type CompetitorAnalysis,
  type BlogArticle 
} from "../types";

export async function generateContentIdeas(businessDescription: string): Promise<ContentIdeas> {
  const response = await fetch('/api/ai/content-ideas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessDescription })
  });
  if (!response.ok) throw new Error('Failed to generate content ideas');
  return response.json();
}

export async function generateAudienceSegments(userData: string): Promise<AudienceSegment[]> {
  const response = await fetch('/api/ai/audience-segments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userData })
  });
  if (!response.ok) throw new Error('Failed to generate audience segments');
  return response.json();
}

export async function generateCampaignAnalytics(campaignData: string): Promise<CampaignAnalytics> {
  const response = await fetch('/api/ai/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ campaignData })
  });
  if (!response.ok) throw new Error('Failed to generate analytics');
  return response.json();
}

export async function compareCreatives(versionA: string, versionB: string, targetAudience: string): Promise<ABTestResult> {
  const response = await fetch('/api/ai/ab-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ versionA, versionB, targetAudience })
  });
  if (!response.ok) throw new Error('Failed to perform A/B test');
  return response.json();
}

export async function generateSlogan(description: string): Promise<Slogan[]> {
  const response = await fetch('/api/ai/slogan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description })
  });
  if (!response.ok) throw new Error('Failed to generate slogans');
  return response.json();
}

export async function generateBlogArticle(topic: string, keywords: string): Promise<BlogArticle> {
  const response = await fetch('/api/ai/blog-article', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, keywords })
  });
  if (!response.ok) throw new Error('Failed to generate blog article');
  return response.json();
}

export async function generateCompetitorAnalysis(businessDescription: string, competitorUrls: string): Promise<CompetitorAnalysis> {
  const response = await fetch('/api/ai/competitor-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessDescription, competitorUrls })
  });
  if (!response.ok) throw new Error('Failed to generate competitor analysis');
  return response.json();
}

export type { ContentIdeas, AudienceSegment, CampaignAnalytics, ABTestResult, Slogan, CompetitorAnalysis, BlogArticle };
