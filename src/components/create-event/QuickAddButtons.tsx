import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modulesAtom, EventModule } from '@/state/eventState';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Users, Image, Link2, ChevronDown, ChevronUp } from 'lucide-react';

const quickAddOptions = [
  {
    type: 'capacity' as const,
    label: 'Capacity',
    icon: Users,
    config: { maxCapacity: 0 },
  },
  {
    type: 'gallery' as const,
    label: 'Photo gallery',
    icon: Image,
    config: { images: [] },
  },
  {
    type: 'links' as const,
    label: 'Links',
    icon: Link2,
    config: { links: [] },
  },
];

const moreOptions = [
  {
    type: 'rsvp' as const,
    label: 'RSVP',
    icon: Users,
    config: { fields: ['name', 'email'] },
  },
  {
    type: 'poll' as const,
    label: 'Poll',
    icon: Users,
    config: { question: '', options: [] },
  },
];

export const QuickAddButtons = () => {
  const [modules, setModules] = useRecoilState(modulesAtom);
  const [showMore, setShowMore] = useState(false);

  const addModule = (type: EventModule['type'], config: Record<string, unknown>) => {
    // Check if module type already exists
    const exists = modules.some(m => m.type === type);
    if (exists) {
      toast({
        title: "Module already added",
        description: `You can edit it in the modules section`,
      });
      return;
    }

    const newModule: EventModule = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      config,
      order: modules.length,
    };

    setModules(prev => [...prev, newModule]);
    toast({
      title: "Module added!",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been added to your event`,
    });
  };

  const isAdded = (type: EventModule['type']) => modules.some(m => m.type === type);

  const allOptions = showMore ? [...quickAddOptions, ...moreOptions] : quickAddOptions;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {allOptions.map(({ type, label, icon: Icon, config }) => (
          <Button
            key={type}
            variant={isAdded(type) ? "secondary" : "outline"}
            size="sm"
            onClick={() => addModule(type, config)}
            disabled={isAdded(type)}
            className="gap-2"
          >
            <span className="text-primary">+</span>
            <Icon className="h-4 w-4" />
            {label}
            {isAdded(type) && <span className="text-xs">(Added)</span>}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMore(!showMore)}
          className="gap-1 text-muted-foreground"
        >
          {showMore ? (
            <>
              Show less
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
