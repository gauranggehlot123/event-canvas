import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useDropzone } from 'react-dropzone';
import { eventAtom } from '@/state/eventState';
import { toast } from '@/hooks/use-toast';
import { Image, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

export const BackgroundUpload = () => {
  const [event, setEvent] = useRecoilState(eventAtom);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        toast({
          title: "File too large",
          description: "Please upload an image under 5MB",
          variant: "destructive",
        });
      } else if (error.code === 'file-invalid-type') {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or WebP image",
          variant: "destructive",
        });
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setEvent(prev => ({ ...prev, backgroundUrl: url }));
      toast({
        title: "Background added!",
        description: "Your event preview has been updated",
      });
    }
  }, [setEvent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const removeBackground = () => {
    if (event.backgroundUrl) {
      URL.revokeObjectURL(event.backgroundUrl);
    }
    setEvent(prev => ({ ...prev, backgroundUrl: null }));
    toast({
      title: "Background removed",
      description: "The default gradient will be used",
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Image className="h-5 w-5 text-primary" />
        Background Image
        <span className="text-xs font-normal text-muted-foreground">(optional)</span>
      </h3>

      {event.backgroundUrl ? (
        <div className="relative group">
          <div className="h-24 w-full overflow-hidden rounded-xl border border-border/40">
            <img
              src={event.backgroundUrl}
              alt="Background preview"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              {...getRootProps()}
              className="gap-2"
            >
              <input {...getInputProps()} />
              <Upload className="h-4 w-4" />
              Replace
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={removeBackground}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200",
            "flex items-center justify-center gap-3 p-4",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <Upload className={cn(
            "h-5 w-5 transition-colors",
            isDragActive ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? "Drop image here" : "Add a custom background"}
          </p>
        </div>
      )}
    </div>
  );
};
