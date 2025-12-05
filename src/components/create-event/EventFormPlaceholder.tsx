import { Card } from '@/components/ui/card';

export const EventFormPlaceholder = () => {
  return (
    <Card className="border-border/40 bg-card/60 backdrop-blur-lg p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Event Details</h3>
          <p className="text-muted-foreground text-sm">
            Form controls will be added in Phase 3
          </p>
        </div>
        
        <div className="grid gap-4">
          {/* Placeholder inputs */}
          <div className="h-10 rounded-md bg-muted animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 rounded-md bg-muted animate-pulse" />
            <div className="h-10 rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-10 rounded-md bg-muted animate-pulse" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Upload Flyer</h3>
          <div className="h-32 rounded-xl border-2 border-dashed border-border bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">
              Drag & drop coming in Phase 3
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Add</h3>
          <div className="flex gap-2">
            <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
            <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
            <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  );
};
