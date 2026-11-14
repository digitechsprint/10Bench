import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { ImageReveal, Reveal } from './motion';
import { photos, type Photo } from './photos';
import { formatRupees, type SeoSettings } from '../lib/seo';

// A photo for each plan: seats show the open desks, cabins show the glass cabins and cabin rows.
const planPhotos: Record<string, Photo> = {
  seat: photos.openDesks,
  'cabin-compact': photos.cabinsBottom,
  'cabin-standard': photos.cabins,
  'cabin-large': photos.cabinsLeft,
};
const fallbacks = [photos.openDesks, photos.cabinsBottom, photos.cabins, photos.cabinsLeft, photos.lounge];

export function PricingCards({ pricing }: { pricing: SeoSettings['pricing'] }) {
  return <>
    <div className="price-grid">
      {pricing.plans.map((plan, index) => {
        const photo = planPhotos[plan.id] ?? fallbacks[index % fallbacks.length];
        return <Reveal key={plan.id} delay={index * 0.08} className={`price-card ${plan.badge ? 'is-featured' : ''}`}>
          <ImageReveal className="price-photo" src={photo.src} alt={photo.alt} crop={photo.crop} parallax={false} cursor="" delay={index * 0.08}>
            {plan.badge && <span className="price-badge">{plan.badge}</span>}
          </ImageReveal>
          <div className="price-body">
            <h3>{plan.name}</h3>
            <p className="price-amount"><strong>{formatRupees(plan.price)}</strong>{plan.plusGst && <span className="price-gst">+ GST</span>}</p>
            <span className="price-unit">{plan.unit}</span>
            {plan.description && <p className="price-desc">{plan.description}</p>}
            <ul>{plan.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
            {plan.detail && <span className="price-detail">{plan.detail}</span>}
            <Link href="/contact" className="price-cta">Enquire now <ArrowUpRight size={16} /></Link>
          </div>
        </Reveal>;
      })}
    </div>
    {pricing.note && <p className="price-note">{pricing.note}</p>}
  </>;
}
