import { useRecoilValue } from 'recoil';
import { eventAtom } from '@/state/eventState';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const EventPreviewCard = () => {
  const event = useRecoilValue(eventAtom);

  const hasContent = event.title || event.date || event.location || event.flyerUrl;

  return (
    <div className="sticky top-24 h-fit">
      <div 
        className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-lg"
        style={{
          background: event.backgroundUrl 
            ? `url(${event.backgroundUrl}) center/cover`
            : undefined
        }}
      >
        {/* Overlay for readability when background is set */}
        {event.backgroundUrl && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        )}
        
        <div className="relative p-6">
          {/* Flyer preview */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted mb-4">
            {event.flyerUrl ? (
              <img 
                src={event.flyerUrl} 
                alt="Event flyer" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <span className="text-muted-foreground text-sm">
                  Upload a flyer
                </span>
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {event.title || 'Event Title'}
            </h2>
            
            {(event.date || event.time) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {event.date ? format(event.date, 'MMM d, yyyy') : 'Date'}
                </span>
                {event.time && (
                  <>
                    <Clock className="h-4 w-4 text-primary ml-2" />
                    <span>{event.time}</span>
                  </>
                )}
              </div>
            )}
            
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {!hasContent && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Fill in the details to see your event preview
            </p>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Live Preview
      </p>
    </div>
  );
};
