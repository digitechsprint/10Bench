import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { articles } from '../../../components/blog-data';
import { ImageReveal, Reveal, SplitText } from '../../../components/motion';
import { JsonLd } from '../../../components/json-ld';
import { absoluteUrl, breadcrumbSchema } from '../../../lib/seo';
import { getSeo } from '../../../lib/settings';

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) return { title: 'Story not found' };
  const path = `/blogs/${article.slug}/`;
  const image = absoluteUrl(await getSeo(), article.image);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: article.title, description: article.excerpt, url: path, images: [{ url: image, width: 1280, height: 720, alt: article.alt }] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  const path = `/blogs/${article.slug}/`;
  const seo = await getSeo();
  return <main>
    <JsonLd data={[
      breadcrumbSchema(seo, [{ name: 'Journal', path: '/blogs/' }, { name: article.title, path }]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: absoluteUrl(seo, article.image),
        url: absoluteUrl(seo, path),
        mainEntityOfPage: absoluteUrl(seo, path),
        articleSection: article.category,
        author: { '@type': 'Organization', name: seo.business.name, url: absoluteUrl(seo, '/') },
        publisher: { '@id': absoluteUrl(seo, '/#business') },
      },
    ]} />
    <div className="container article">
      <div className="article-top">
        <Reveal y={12}><Link className="text-link" href="/blogs"><ArrowLeft size={15} /> Back to the journal</Link><div className="blog-meta" style={{ marginTop: 27 }}><span>{article.category}</span><span>{article.date}</span></div></Reveal>
        <SplitText as="h1" className="display" delay={0.1}>{article.title}</SplitText>
        <Reveal delay={0.4}><p className="article-intro">{article.intro}</p></Reveal>
      </div>
      <ImageReveal className="article-image" src={article.image} alt={article.alt} cursor="" />
      <article className="article-body">
        <Reveal><p className="article-lead">{article.intro}</p></Reveal>
        {article.sections.map(([heading, text]) => <Reveal key={heading}><section><h2>{heading}</h2><p>{text}</p></section></Reveal>)}
      </article>
      <div className="article-foot"><Link className="text-link" href="/blogs">More from the journal <ArrowRight size={15} /></Link></div>
    </div>
  </main>;
}
