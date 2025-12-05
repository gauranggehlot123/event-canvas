import { atom, selector } from 'recoil';

// Types
export interface EventModule {
  id: string;
  type: 'rsvp' | 'poll' | 'text' | 'cohost';
  config: Record<string, unknown>;
  order: number;
}

export interface EventData {
  title: string;
  date: Date | null;
  time: string;
  location: string;
  description: string;
  flyerUrl: string | null;
  backgroundUrl: string | null;
}

// Atoms
export const eventAtom = atom<EventData>({
  key: 'eventAtom',
  default: {
    title: '',
    date: null,
    time: '',
    location: '',
    description: '',
    flyerUrl: null,
    backgroundUrl: null,
  },
});

export const modulesAtom = atom<EventModule[]>({
  key: 'modulesAtom',
  default: [],
});

export const currentStepAtom = atom<number>({
  key: 'currentStepAtom',
  default: 1,
});

// Selectors
export const isFormValidSelector = selector({
  key: 'isFormValidSelector',
  get: ({ get }) => {
    const event = get(eventAtom);
    return !!(
      event.title.trim() &&
      event.date &&
      event.time &&
      event.location.trim()
    );
  },
});

export const completionPercentageSelector = selector({
  key: 'completionPercentageSelector',
  get: ({ get }) => {
    const event = get(eventAtom);
    const modules = get(modulesAtom);
    
    let completed = 0;
    const total = 5;
    
    if (event.title.trim()) completed++;
    if (event.date && event.time) completed++;
    if (event.location.trim()) completed++;
    if (event.flyerUrl) completed++;
    if (modules.length > 0) completed++;
    
    return { completed, total };
  },
});
