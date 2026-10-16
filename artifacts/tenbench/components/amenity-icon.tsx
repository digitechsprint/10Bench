import { ConciergeBell, Coffee, MapPin, Presentation, Snowflake, Sofa, Wifi, Zap } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const icons = { wifi: Wifi, coffee: Coffee, presentation: Presentation, concierge: ConciergeBell, sofa: Sofa, zap: Zap, snowflake: Snowflake, map: MapPin };

export function AmenityIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? Sofa;
  return <Icon {...props} />;
}
