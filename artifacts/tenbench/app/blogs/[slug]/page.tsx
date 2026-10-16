import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { articles } from '../../../components/blog-data';

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) return { title: 'Story not found' };
  return { title: `${article.title} | The 10Bench Journal`, description: article.excerpt, openGraph: { title: article.title, description: article.excerpt, type: 'article' } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return <main>
    <div className="container article">
      <div className="article-top"><Link className="text-link" href="/blogs"><ArrowLeft size={15} /> Back to the journal</Link><div className="blog-meta" style={{ marginTop: 27 }}><span>{article.category}</span><span>{article.date}</span></div><h1 className="display">{article.title}</h1><p className="article-intro">{article.intro}</p></div>
      <div className="article-image image-frame"><img src={article.image} alt={article.alt} /></div>
      <article className="article-body">
        <p>{article.intro}</p>
        {article.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
      </article>
      <div style={{ borderTop: '1px solid var(--line)', padding: '32px 0 75px', marginTop: 45 }}><Link className="text-link" href="/blogs">More from the journal <ArrowRight size={15} /></Link></div>
    </div>
  </main>;
}
