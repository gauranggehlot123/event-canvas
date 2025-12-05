import { useAutoSave } from '@/hooks/useAutoSave';
import { Button } from '@/components/ui/button';
import { Cloud, CloudOff, Loader2, Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const AutoSaveIndicator = () => {
  const { lastSaved, isSaving, saveNow } = useAutoSave();

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {isSaving ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <Cloud className="h-3 w-3 text-primary" />
          <span>Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}</span>
        </>
      ) : (
        <>
          <CloudOff className="h-3 w-3" />
          <span>Not saved</span>
        </>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={saveNow}
        disabled={isSaving}
        className="h-6 px-2 text-xs"
      >
        <Save className="h-3 w-3 mr-1" />
        Save
      </Button>
    </div>
  );
};
