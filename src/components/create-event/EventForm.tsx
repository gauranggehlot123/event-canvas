import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EventDetailsForm } from './EventDetailsForm';
import { FlyerUpload } from './FlyerUpload';
import { BackgroundUpload } from './BackgroundUpload';
import { QuickAddButtons } from './QuickAddButtons';
import { CustomizeTrigger } from './CustomizeTrigger';
import { ModuleList } from './ModuleList';
import { EventActions } from './EventActions';

export const EventForm = () => {
  return (
    <div className="space-y-4">
      <Card className="border-border/30 bg-card/40 backdrop-blur-xl shadow-xl shadow-primary/5 p-6 space-y-6">
        <EventDetailsForm />
        
        <Separator className="bg-border/40" />
        
        <FlyerUpload />
        
        <Separator className="bg-border/40" />
        
        <BackgroundUpload />
        
        <Separator className="bg-border/40" />
        
        <QuickAddButtons />
        
        <Separator className="bg-border/40" />
        
        <CustomizeTrigger />
        
        {/* Module list with drag/drop */}
        <ModuleList />
        
        <Separator className="bg-border/40" />
        
        {/* Actions */}
        <EventActions />
      </Card>
    </div>
  );
};
