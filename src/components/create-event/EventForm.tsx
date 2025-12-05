import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EventDetailsForm } from './EventDetailsForm';
import { FlyerUpload } from './FlyerUpload';
import { BackgroundUpload } from './BackgroundUpload';
import { QuickAddButtons } from './QuickAddButtons';

export const EventForm = () => {
  return (
    <Card className="border-border/40 bg-card/60 backdrop-blur-lg p-6 space-y-6">
      <EventDetailsForm />
      
      <Separator className="bg-border/40" />
      
      <FlyerUpload />
      
      <Separator className="bg-border/40" />
      
      <BackgroundUpload />
      
      <Separator className="bg-border/40" />
      
      <QuickAddButtons />
    </Card>
  );
};
