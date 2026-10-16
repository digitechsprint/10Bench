import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImageReveal, Magnetic, Reveal, SplitText } from '../../components/motion';
import { articles } from '../../components/blog-data';

export const metadata: Metadata = {
  title: 'The 10Bench Journal | Notes on better workdays',
  description: 'Ideas and observations from 10Bench on workspace, focus, working together, and making a more human workday.',
};

export default function BlogsPage() {
  const [featured, ...stories] = articles;
  return <main>
    <section className="page-hero journal-hero"><div className="container">
      <Reveal y={16}><span className="eyebrow">The 10Bench journal</span></Reveal>
      <SplitText as="h1" className="display" delay={0.1}>A few thoughts<br />on <span className="editorial">working well.</span></SplitText>
      <Reveal delay={0.45}><p>Notes on focus, fresh perspectives, useful spaces, and the small things that shape a workday.</p><div className="journal-hero-note">FIELD NOTES <span>—</span> WORK, SPACE & THE IN-BETWEEN</div></Reveal>
    </div></section>
    <section className="section-pad journal-section"><div className="container">
      <Reveal className="journal-heading"><span className="eyebrow">From the journal</span><span>{String(articles.length).padStart(2, '0')} notes to explore</span></Reveal>
      {featured && <Reveal className="journal-featured">
        <Link href={`/blogs/${featured.slug}`} aria-label={`Read ${featured.title}`} className="journal-featured-image"><ImageReveal className="img-fill" src={featured.image} alt={featured.alt} cursor="Read" /></Link>
        <div className="journal-featured-copy"><div className="blog-meta"><span>{featured.category}</span><span>{featured.date}</span></div><span className="journal-feature-label">A GOOD PLACE TO BEGIN</span><h2 className="display"><Link href={`/blogs/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link className="text-link" href={`/blogs/${featured.slug}`}>Read the story <ArrowRight size={15} /></Link></div>
      </Reveal>}
      <Reveal className="journal-list-heading"><span className="eyebrow">More to read</span><span>Ideas for a more human workday</span></Reveal>
      <div className="journal-list">{stories.map((article, index) => <Reveal key={article.slug} delay={index * 0.08}><article className="journal-story">
        <span className="journal-story-number">0{index + 2}</span>
        <Link href={`/blogs/${article.slug}`} className="journal-story-image" aria-label={`Read ${article.title}`}><ImageReveal className="img-fill" src={article.image} alt={article.alt} cursor="Read" /></Link>
        <div className="journal-story-copy"><div className="blog-meta"><span>{article.category}</span><span>{article.date}</span></div><h2><Link href={`/blogs/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="text-link" href={`/blogs/${article.slug}`}>Read the story <ArrowRight size={15} /></Link></div>
      </article></Reveal>)}</div>
    </div></section>
    <section className="cta-band"><div className="cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="container cta-inner">
      <SplitText className="display">A good idea starts with a little room.</SplitText>
      <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Find your space <ArrowRight size={16} /></Link></Magnetic></Reveal>
    </div></section>
  </main>;
}
