import { Martini } from './Martini';
import { Highball } from './Highball';
import { OldFashioned } from './OldFashioned';
import { Hurricane } from './Hurricane';
import { Coupe } from './Coupe';
import { Tiki } from './Tiki';
import { Shot } from './Shot';
import { Wine } from './Wine';
import type { ComponentType } from 'react';

export const placeholders: Record<string, ComponentType<{ className?: string }>> = {
  martini: Martini,
  highball: Highball,
  'old-fashioned': OldFashioned,
  hurricane: Hurricane,
  coupe: Coupe,
  tiki: Tiki,
  shot: Shot,
  wine: Wine,
};

export const placeholderKeys = Object.keys(placeholders);

export function getPlaceholderComponent(key: string) {
  return placeholders[key] || Martini;
}
