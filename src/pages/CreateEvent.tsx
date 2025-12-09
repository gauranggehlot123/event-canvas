import { CreateEventHeader } from '@/components/create-event/CreateEventHeader';
import { EventPreviewCard } from '@/components/create-event/EventPreviewCard';
import { EventForm } from '@/components/create-event/EventForm';

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <CreateEventHeader />
      
      <main className="container px-4 py-6">
        {/* Two-column layout */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr,1.5fr]">
          {/* Left column: Event Preview */}
          <div className="order-2 lg:order-1">
            <EventPreviewCard />
          </div>
          
          {/* Right column: Form & Controls */}
          <div className="order-1 lg:order-2">
            <EventForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
