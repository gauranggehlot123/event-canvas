import { useRecoilValue } from 'recoil';
import { eventAtom, modulesAtom } from '@/state/eventState';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  BarChart3, 
  FileText, 
  UserPlus, 
  Image,
  X,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventPreviewDialog = ({ open, onOpenChange }: EventPreviewDialogProps) => {
  const event = useRecoilValue(eventAtom);
  const modules = useRecoilValue(modulesAtom);

  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  const renderModule = (module: typeof modules[0]) => {
    const config = module.config as Record<string, unknown>;
    
    switch (module.type) {
      case 'rsvp':
        return (
          <Card className="border-border/30 bg-card/50 backdrop-blur-md p-4 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">RSVP</h3>
              {config.maxCapacity && (
                <Badge variant="secondary" className="ml-auto">
                  Max {String(config.maxCapacity)} guests
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Let us know if you can make it!</p>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <Check className="h-4 w-4" />
                I'll be there
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <X className="h-4 w-4" />
                Can't make it
              </Button>
            </div>
          </Card>
        );

      case 'poll':
        const question = (config.question as string) || 'What do you think?';
        const options = (config.options as string[]) || ['Option 1', 'Option 2'];
        return (
          <Card className="border-border/30 bg-card/50 backdrop-blur-md p-4 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Poll</h3>
            </div>
            <p className="font-medium">{question}</p>
            <div className="space-y-2">
              {options.map((option: string, idx: number) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  className="w-full justify-start text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        );

      case 'text':
        const content = (config.content as string) || 'Additional event information will appear here.';
        return (
          <Card className="border-border/30 bg-card/50 backdrop-blur-md p-4 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Information</h3>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {content}
            </p>
          </Card>
        );

      case 'cohost':
        const email = (config.email as string) || 'Co-host';
        return (
          <Card className="border-border/30 bg-card/50 backdrop-blur-md p-4 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Co-hosted by</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">{email}</span>
            </div>
          </Card>
        );

      case 'gallery':
        return (
          <Card className="border-border/30 bg-card/50 backdrop-blur-md p-4 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Photo Gallery</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center"
                >
                  <Image className="h-6 w-6 text-muted-foreground/50" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Photos will appear here after the event
            </p>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/30 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="animate-fade-in">
          <DialogTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            <Badge variant="secondary">Preview Mode</Badge>
            This is how guests will see your event
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Hero Section */}
          <div 
            className={cn(
              "relative rounded-xl overflow-hidden animate-fade-in",
              event.backgroundUrl ? "bg-cover bg-center" : "bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5"
            )}
            style={{
              backgroundImage: event.backgroundUrl ? `url(${event.backgroundUrl})` : undefined,
              animationDelay: '100ms',
              animationFillMode: 'both',
            }}
          >
            <div className="p-6 space-y-4 bg-gradient-to-t from-background/90 to-transparent">
              {/* Flyer */}
              {event.flyerUrl && (
                <div 
                  className="w-full max-w-xs mx-auto animate-scale-in"
                  style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                >
                  <img 
                    src={event.flyerUrl} 
                    alt="Event flyer" 
                    className="w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              )}

              {/* Event Title */}
              <h1 
                className="text-2xl md:text-3xl font-bold text-center animate-fade-in"
                style={{ animationDelay: '150ms', animationFillMode: 'both' }}
              >
                {event.title || 'Your Event Title'}
              </h1>

              {/* Event Details */}
              <div 
                className="flex flex-wrap justify-center gap-4 text-sm animate-fade-in"
                style={{ animationDelay: '200ms', animationFillMode: 'both' }}
              >
                {event.date && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                )}
                {event.time && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div 
              className="space-y-2 animate-fade-in"
              style={{ animationDelay: '250ms', animationFillMode: 'both' }}
            >
              <h2 className="font-semibold">About this event</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {/* Modules */}
          {sortedModules.length > 0 && (
            <>
              <Separator className="bg-border/40" />
              <div className="space-y-4">
                {sortedModules.map((module, index) => (
                  <div 
                    key={module.id}
                    className="animate-fade-in"
                    style={{ 
                      animationDelay: `${300 + index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {renderModule(module)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div 
          className="pt-4 border-t border-border/30 animate-fade-in"
          style={{ animationDelay: `${300 + sortedModules.length * 100}ms`, animationFillMode: 'both' }}
        >
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to Editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
