import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useDropzone } from 'react-dropzone';
import { eventAtom } from '@/state/eventState';
import { toast } from '@/hooks/use-toast';
import { ImagePlus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

export const FlyerUpload = () => {
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
      setEvent(prev => ({ ...prev, flyerUrl: url }));
      toast({
        title: "Flyer added!",
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

  const removeFlyer = () => {
    if (event.flyerUrl) {
      URL.revokeObjectURL(event.flyerUrl);
    }
    setEvent(prev => ({ ...prev, flyerUrl: null }));
    toast({
      title: "Flyer removed",
      description: "Upload a new image to update",
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <ImagePlus className="h-5 w-5 text-primary" />
        Event Flyer
      </h3>

      {event.flyerUrl ? (
        <div className="relative group">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/40">
            <img
              src={event.flyerUrl}
              alt="Event flyer preview"
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
              onClick={removeFlyer}
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
            "flex flex-col items-center justify-center gap-3 p-8",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <div className={cn(
            "rounded-full p-4 transition-colors",
            isDragActive ? "bg-primary/20" : "bg-muted"
          )}>
            <Upload className={cn(
              "h-8 w-8 transition-colors",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {isDragActive ? "Drop your image here" : "Drag & drop your flyer"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse • JPG, PNG, WebP up to 5MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
