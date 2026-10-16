import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <main className="not-found"><div><span className="eyebrow">Wrong turn</span><h1 className="display">Not this way.</h1><p style={{ color: 'var(--muted)', marginBottom: 25 }}>We couldn’t find that page. Let’s get you back to a good place.</p><Link href="/" className="button"><ArrowLeft size={15} /> Back to 10Bench</Link></div></main>;
}
