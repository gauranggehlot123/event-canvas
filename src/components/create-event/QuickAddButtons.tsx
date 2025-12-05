import { useRecoilState } from 'recoil';
import { modulesAtom, EventModule } from '@/state/eventState';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link2, Users, UserPlus, Zap } from 'lucide-react';

const quickAddOptions = [
  {
    type: 'rsvp' as const,
    label: 'RSVP Form',
    icon: Users,
    config: { fields: ['name', 'email'] },
  },
  {
    type: 'cohost' as const,
    label: 'Add Co-Host',
    icon: UserPlus,
    config: { email: '' },
  },
  {
    type: 'text' as const,
    label: 'Invite Link',
    icon: Link2,
    config: { content: '' },
  },
];

export const QuickAddButtons = () => {
  const [modules, setModules] = useRecoilState(modulesAtom);

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

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Quick Add
      </h3>
      <div className="flex flex-wrap gap-2">
        {quickAddOptions.map(({ type, label, icon: Icon, config }) => (
          <Button
            key={type}
            variant={isAdded(type) ? "secondary" : "outline"}
            size="sm"
            onClick={() => addModule(type, config)}
            disabled={isAdded(type)}
            className="gap-2"
          >
            <Icon className="h-4 w-4" />
            {label}
            {isAdded(type) && <span className="text-xs">(Added)</span>}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Add features to your event page. Customize them in the drawer.
      </p>
    </div>
  );
};
