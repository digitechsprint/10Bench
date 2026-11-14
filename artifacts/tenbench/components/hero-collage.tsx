import { ImageReveal } from './motion';
import type { Photo } from './photos';

/** Photo collage for page headers: one large photo and up to two smaller ones. */
export function HeroCollage({ main, side = [], caption }: { main: Photo; side?: Photo[]; caption?: string }) {
  return <div className={`hero-collage ${side.length ? '' : 'is-single'}`}>
    <ImageReveal className="hero-collage-main" src={main.src} alt={main.alt} crop={main.crop} delay={0.2} cursor="">
      {caption && <span className="hero-collage-caption">{caption}</span>}
    </ImageReveal>
    {side.slice(0, 2).map((photo, index) => <ImageReveal key={`${photo.src}-${index}`} className="hero-collage-side" src={photo.src} alt={photo.alt} crop={photo.crop} delay={0.35 + index * 0.12} parallax={false} cursor="" />)}
  </div>;
}
