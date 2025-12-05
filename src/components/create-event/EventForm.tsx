import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EventDetailsForm } from './EventDetailsForm';
import { FlyerUpload } from './FlyerUpload';
import { BackgroundUpload } from './BackgroundUpload';
import { QuickAddButtons } from './QuickAddButtons';
import { CustomizeTrigger } from './CustomizeTrigger';
import { ModuleList } from './ModuleList';
import { EventActions } from './EventActions';
import { AutoSaveIndicator } from './AutoSaveIndicator';

export const EventForm = () => {
  return (
    <div className="space-y-4">
      {/* Auto-save indicator */}
      <div className="flex justify-end">
        <AutoSaveIndicator />
      </div>
      
      <Card className="border-border/40 bg-card/60 backdrop-blur-lg p-6 space-y-6">
        <EventDetailsForm />
        
        <Separator className="bg-border/40" />
        
        <FlyerUpload />
        
        <Separator className="bg-border/40" />
        
        <BackgroundUpload />
        
        <Separator className="bg-border/40" />
        
        <CustomizeTrigger />
        
        <Separator className="bg-border/40" />
        
        <QuickAddButtons />
        
        {/* Module list with drag/drop */}
        <ModuleList />
        
        <Separator className="bg-border/40" />
        
        {/* Actions */}
        <EventActions />
      </Card>
    </div>
  );
};
