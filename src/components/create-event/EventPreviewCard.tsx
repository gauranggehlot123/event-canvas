import { useRecoilValue } from 'recoil';
import { eventAtom } from '@/state/eventState';
import { Calendar, MapPin, Clock, ImageIcon, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const EventPreviewCard = () => {
  const event = useRecoilValue(eventAtom);

  const hasAnyContent = event.title || event.date || event.location || event.flyerUrl;
  const isComplete = event.title && event.date && event.time && event.location;

  return (
    <div className="sticky top-24 h-fit">
      {/* Card container with gradient border effect */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/50 via-accent/30 to-primary/20">
        <div 
          className={cn(
            "relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-xl transition-all duration-500",
            event.backgroundUrl && "bg-cover bg-center"
          )}
          style={{
            backgroundImage: event.backgroundUrl 
              ? `url(${event.backgroundUrl})`
              : undefined
          }}
        >
          {/* Overlay for readability when background is set */}
          {event.backgroundUrl && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          )}
          
          <div className="relative p-5">
            {/* Flyer preview */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl mb-4 shadow-lg">
              {event.flyerUrl ? (
                <img 
                  src={event.flyerUrl} 
                  alt="Event flyer" 
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-border/30">
                  <div className="rounded-full bg-muted/50 p-4">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      No flyer yet
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Upload an image to preview
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Event details */}
            <div className="space-y-3">
              {/* Title */}
              <h2 className={cn(
                "text-xl font-bold transition-colors duration-300",
                event.title ? "text-foreground" : "text-muted-foreground/50"
              )}>
                {event.title || 'Your Event Title'}
              </h2>
              
              {/* Date & Time */}
              <div className={cn(
                "flex items-center gap-2 text-sm transition-all duration-300",
                (event.date || event.time) ? "text-foreground/80" : "text-muted-foreground/40"
              )}>
                <Calendar className="h-4 w-4 text-primary shrink-0" />
                <span>
                  {event.date ? format(event.date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                </span>
              </div>
              
              {/* Time (separate row for better visibility) */}
              <div className={cn(
                "flex items-center gap-2 text-sm transition-all duration-300",
                event.time ? "text-foreground/80" : "text-muted-foreground/40"
              )}>
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>{event.time || 'Set a time'}</span>
              </div>
              
              {/* Location */}
              <div className={cn(
                "flex items-center gap-2 text-sm transition-all duration-300",
                event.location ? "text-foreground/80" : "text-muted-foreground/40"
              )}>
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="line-clamp-2">
                  {event.location || 'Add a location'}
                </span>
              </div>

              {/* Description preview */}
              {event.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 pt-2 border-t border-border/30">
                  {event.description}
                </p>
              )}
            </div>

            {/* Empty state message */}
            {!hasAnyContent && (
              <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-xs">
                    Start filling in the details to see your event come to life
                  </p>
                </div>
              </div>
            )}

            {/* Completion indicator */}
            {hasAnyContent && !isComplete && (
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary">
                  Keep going! Add more details to complete your event.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <p className="text-xs font-medium text-muted-foreground">
          Live Preview
        </p>
      </div>
    </div>
  );
};
