import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { eventAtom, modulesAtom } from '@/state/eventState';
import { mockApi } from '@/state/mockApi';
import { toast } from '@/hooks/use-toast';

const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export const useAutoSave = () => {
  const event = useRecoilValue(eventAtom);
  const modules = useRecoilValue(modulesAtom);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const initialLoadRef = useRef(true);

  useEffect(() => {
    // Skip auto-save on initial load
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      // Only save if there's meaningful content
      if (!event.title && !event.location && !event.flyerUrl && modules.length === 0) {
        return;
      }

      setIsSaving(true);
      try {
        await mockApi.saveDraft(event, modules);
        setLastSaved(new Date());
        // Silent save - no toast to avoid spam
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [event, modules]);

  // Manual save function
  const saveNow = async () => {
    setIsSaving(true);
    try {
      await mockApi.saveDraft(event, modules);
      setLastSaved(new Date());
      toast({
        title: "Draft saved",
        description: "Your changes have been saved",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return { lastSaved, isSaving, saveNow };
};
