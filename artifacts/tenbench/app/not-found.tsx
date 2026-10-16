import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Reveal, SplitText } from '../components/motion';

export default function NotFound() {
  return <main className="not-found"><span className="not-found-mark" aria-hidden="true">404</span><div>
    <Reveal y={12}><span className="eyebrow">Wrong turn</span></Reveal>
    <SplitText as="h1" className="display">Not this way.</SplitText>
    <Reveal delay={0.3}><p style={{ color: 'var(--muted)', marginBottom: 25 }}>We couldn’t find that page. Let’s get you back to a good place.</p><Link href="/" className="button"><ArrowLeft size={15} /> Back to 10Bench</Link></Reveal>
  </div></main>;
}
