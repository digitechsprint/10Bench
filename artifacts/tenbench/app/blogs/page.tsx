import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { articles } from '../../components/blog-data';

export const metadata: Metadata = {
  title: 'The 10Bench Journal | Notes on better workdays',
  description: 'Ideas and observations from 10Bench on workspace, focus, working together, and making a more human workday.',
};

export default function BlogsPage() {
  return <main>
    <section className="page-hero"><div className="container"><span className="eyebrow">The 10Bench journal</span><h1 className="display">A few thoughts<br />on <span className="editorial">working well.</span></h1><p>Notes on focus, fresh perspectives, useful spaces, and the small things that shape a workday.</p></div></section>
    <section className="section-pad"><div className="container blog-grid">{articles.map(article => <article className="blog-card" key={article.slug}>
      <Link href={`/blogs/${article.slug}`} aria-label={`Read ${article.title}`} className="blog-card-photo"><img src={article.image} alt={article.alt} /></Link>
      <div className="blog-card-body"><div className="blog-meta"><span>{article.category}</span><span>{article.date}</span></div><h2><Link href={`/blogs/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="text-link" href={`/blogs/${article.slug}`}>Read the story <ArrowRight size={15} /></Link></div>
    </article>)}</div></section>
    <section className="cta-band"><div className="container cta-inner"><h2 className="display">A good idea starts with a little room.</h2><Link href="/contact" className="button">Find your space <ArrowRight size={16} /></Link></div></section>
  </main>;
}
