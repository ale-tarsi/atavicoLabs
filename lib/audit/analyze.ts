import Anthropic from '@anthropic-ai/sdk';
import type { PageSpeedData, AiReport } from '@/types/audit';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function gradeFromScores(perf: number, seo: number, a11y: number): AiReport['overallGrade'] {
  const avg = (perf + seo + a11y) / 3;
  if (avg >= 90) return 'A';
  if (avg >= 75) return 'B';
  if (avg >= 60) return 'C';
  if (avg >= 45) return 'D';
  return 'F';
}

export async function analyzeWithClaude(
  url: string,
  pagespeed: PageSpeedData,
  locale: 'it' | 'en'
): Promise<AiReport> {
  const lang = locale === 'it' ? 'Italian' : 'English';

  const systemPrompt = `You are a senior web performance and SEO consultant at AtavicoLabs, an automation studio.
Analyze the provided Lighthouse/PageSpeed data and produce a structured JSON audit report in ${lang}.
Be direct, specific, and actionable. Avoid generic advice.
At the end, include a soft CTA suggesting the user talk to AtavicoLabs if they need help implementing fixes.`;

  const cwv = pagespeed.coreWebVitals;
  const userMessage = `
Analyze this website: ${url}

## Lighthouse Scores
- Performance: ${pagespeed.scores.performance}/100
- SEO: ${pagespeed.scores.seo}/100
- Accessibility: ${pagespeed.scores.accessibility}/100
- Best Practices: ${pagespeed.scores.bestPractices}/100

## Core Web Vitals (mobile)
- LCP (Largest Contentful Paint): ${cwv.lcp != null ? `${cwv.lcp}ms` : 'N/A'}
- CLS (Cumulative Layout Shift): ${cwv.cls ?? 'N/A'}
- FCP (First Contentful Paint): ${cwv.fcp != null ? `${cwv.fcp}ms` : 'N/A'}
- TTFB (Time to First Byte): ${cwv.ttfb != null ? `${cwv.ttfb}ms` : 'N/A'}
- TTI (Time to Interactive): ${cwv.tti != null ? `${cwv.tti}ms` : 'N/A'}
- TBT (Total Blocking Time): ${cwv.tbt != null ? `${cwv.tbt}ms` : 'N/A'}

## SEO Status
- Indexable: ${pagespeed.seoMeta.isIndexable}
- Has canonical: ${pagespeed.seoMeta.hasCanonical}
- Meta description: ${pagespeed.seoMeta.description ? 'present' : 'missing'}
- Images missing alt text: ${pagespeed.seoMeta.imagesMissingAlt}

## Top Failing Audits
${pagespeed.topIssues.slice(0, 8).map((i) => `- [${i.category}] ${i.title} (score: ${i.score ?? 'n/a'}): ${i.description}`).join('\n')}

Respond ONLY with valid JSON matching this TypeScript interface:
{
  summary: string;           // 2-3 sentence executive summary in ${lang}
  issues: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: 'performance' | 'seo' | 'accessibility' | 'best-practices';
    title: string;
    description: string;     // what the problem is
    recommendation: string;  // concrete fix
  }>;
  quickWins: string[];       // 3-5 easy wins the dev can do today
  cta: string;               // 1 sentence soft CTA mentioning AtavicoLabs
}
Return at most 8 issues total, prioritized by impact.`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: userMessage }],
    system: systemPrompt,
  });

  const raw = message.content[0].type === 'text' ? message.content[0].text : '';
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Claude returned no JSON');

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    summary: parsed.summary,
    overallGrade: gradeFromScores(
      pagespeed.scores.performance,
      pagespeed.scores.seo,
      pagespeed.scores.accessibility
    ),
    scores: {
      performance: pagespeed.scores.performance,
      seo: pagespeed.scores.seo,
      accessibility: pagespeed.scores.accessibility,
    },
    issues: parsed.issues ?? [],
    quickWins: parsed.quickWins ?? [],
    cta: parsed.cta ?? '',
  };
}
