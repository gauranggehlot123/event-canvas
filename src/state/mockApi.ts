import { EventData, EventModule } from './eventState';

// Utility functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock API - swap one import for real API
export const mockApi = {
  createEvent: async (event: EventData) => {
    await delay(500);
    return { ...event, id: generateId() };
  },

  uploadImage: async (file: File, type: 'flyer' | 'background') => {
    await delay(300);
    return { url: URL.createObjectURL(file), type };
  },

  addModule: async (type: EventModule['type'], config: Record<string, unknown> = {}) => {
    await delay(200);
    return {
      id: generateId(),
      type,
      config,
      order: Date.now(),
    } as EventModule;
  },

  deleteModule: async (moduleId: string) => {
    await delay(200);
    return { success: true, id: moduleId };
  },

  reorderModules: async (modules: EventModule[]) => {
    await delay(200);
    return modules;
  },

  saveDraft: async (event: EventData, modules: EventModule[]) => {
    await delay(300);
    return { event, modules, savedAt: new Date().toISOString() };
  },

  publishEvent: async (event: EventData, modules: EventModule[]) => {
    await delay(800);
    return { 
      event, 
      modules, 
      publishedAt: new Date().toISOString(),
      publicUrl: `https://letshang.app/event/${generateId()}`,
    };
  },
};
