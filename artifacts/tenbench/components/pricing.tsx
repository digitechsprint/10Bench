import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { ImageReveal, Reveal } from './motion';
import { photos, type Photo } from './photos';
import { formatRupees, type SeoSettings } from '../lib/seo';

// A real photo for each plan: the shared lounge for seats, the glass cabins and cabin layout for cabins.
const planPhotos: Record<string, Photo> = {
  seat: photos.lounge,
  'cabin-compact': photos.cabinRow,
  'cabin-standard': photos.cabinsWide,
  'cabin-large': photos.glassCabins,
};
const fallbacks = [photos.lounge, photos.cabinRow, photos.cabinsWide, photos.glassCabins, photos.meeting];

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
