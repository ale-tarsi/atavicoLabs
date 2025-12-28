import { getInsightBySlug } from '../../../constants/insights';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import InsightContent from './InsightContent';

interface InsightPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const article = getInsightBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: `${article.title} | AtavicoLabs Insights`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: ['AtavicoLabs'],
    },
  };
}

export default function InsightPage({ params }: InsightPageProps) {
  const article = getInsightBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return <InsightContent article={article} locale={params.locale} formattedDate={formattedDate} />;
}
