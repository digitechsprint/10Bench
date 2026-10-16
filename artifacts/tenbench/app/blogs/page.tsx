import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/site-shell';
import { articles } from '../../components/blog-data';

export const metadata: Metadata = {
  title: 'The 10Bench Journal | Notes on better workdays',
  description: 'Ideas and observations from 10Bench on workspace, focus, working together, and making a more human workday.',
};

export default function BlogsPage() {
  const [featured, ...stories] = articles;
  return <main>
    <section className="page-hero journal-hero"><div className="container"><span className="eyebrow">The 10Bench journal</span><h1 className="display">A few thoughts<br />on <span className="editorial">working well.</span></h1><p>Notes on focus, fresh perspectives, useful spaces, and the small things that shape a workday.</p><div className="journal-hero-note">FIELD NOTES <span>—</span> WORK, SPACE & THE IN-BETWEEN</div></div></section>
    <section className="section-pad journal-section"><div className="container">
      <div className="journal-heading"><span className="eyebrow">From the journal</span><span>{String(articles.length).padStart(2, '0')} notes to explore</span></div>
      {featured && <Reveal className="journal-featured">
        <Link href={`/blogs/${featured.slug}`} aria-label={`Read ${featured.title}`} className="journal-featured-image"><img src={featured.image} alt={featured.alt} /></Link>
        <div className="journal-featured-copy"><div className="blog-meta"><span>{featured.category}</span><span>{featured.date}</span></div><span className="journal-feature-label">A GOOD PLACE TO BEGIN</span><h2 className="display"><Link href={`/blogs/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link className="text-link" href={`/blogs/${featured.slug}`}>Read the story <ArrowRight size={15} /></Link></div>
      </Reveal>}
      <div className="journal-list-heading"><span className="eyebrow">More to read</span><span>Ideas for a more human workday</span></div>
      <div className="journal-list">{stories.map((article, index) => <article className="journal-story" key={article.slug}>
        <span className="journal-story-number">0{index + 2}</span>
        <Link href={`/blogs/${article.slug}`} className="journal-story-image" aria-label={`Read ${article.title}`}><img src={article.image} alt={article.alt} /></Link>
        <div className="journal-story-copy"><div className="blog-meta"><span>{article.category}</span><span>{article.date}</span></div><h2><Link href={`/blogs/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="text-link" href={`/blogs/${article.slug}`}>Read the story <ArrowRight size={15} /></Link></div>
      </article>)}</div>
    </div></section>
    <section className="cta-band"><div className="container cta-inner"><h2 className="display">A good idea starts with a little room.</h2><Link href="/contact" className="button">Find your space <ArrowRight size={16} /></Link></div></section>
  </main>;
}
