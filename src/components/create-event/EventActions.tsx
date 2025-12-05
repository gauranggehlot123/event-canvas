import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { eventAtom, modulesAtom, isFormValidSelector } from '@/state/eventState';
import { mockApi } from '@/state/mockApi';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye, Rocket, Loader2, CheckCircle2, Copy } from 'lucide-react';

export const EventActions = () => {
  const navigate = useNavigate();
  const event = useRecoilValue(eventAtom);
  const modules = useRecoilValue(modulesAtom);
  const isFormValid = useRecoilValue(isFormValidSelector);
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handlePreview = () => {
    // For now, just show a toast - in production this would open a full preview
    toast({
      title: "Preview Mode",
      description: "Full preview would open in a new tab",
    });
  };

  const handleGoLive = async () => {
    if (!isFormValid) {
      toast({
        title: "Missing required fields",
        description: "Please fill in title, date, time, and location",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    
    try {
      const result = await mockApi.publishEvent(event, modules);
      setPublishedUrl(result.publicUrl);
      setShowSuccessDialog(true);
      toast({
        title: "Event Published!",
        description: "Your event is now live",
      });
    } catch (error) {
      toast({
        title: "Publishing failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl);
      toast({
        title: "Link copied!",
        description: "Share it with your guests",
      });
    }
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="flex-1 gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          
          <Button
            onClick={handleGoLive}
            disabled={isPublishing}
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {isPublishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Rocket className="h-4 w-4" />
            )}
            {isPublishing ? 'Publishing...' : 'Go Live'}
          </Button>
        </div>
        
        {!isFormValid && (
          <p className="text-xs text-muted-foreground text-center">
            Fill in required fields to publish
          </p>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center">Event Published!</DialogTitle>
            <DialogDescription className="text-center">
              Your event is now live and ready to share
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <code className="flex-1 text-sm truncate">{publishedUrl}</code>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
              View Event
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/');
              }}
              className="w-full"
            >
              Back to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
