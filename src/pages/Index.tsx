import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Letshang</h1>
        <p className="text-xl text-muted-foreground mb-8">Create and share amazing events</p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/create-event">
            <Plus className="h-5 w-5" />
            Create Event
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
