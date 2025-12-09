import { useRecoilValue } from 'recoil';
import { modulesAtom, EventModule } from '@/state/eventState';
import { Users, BarChart3, FileText, UserPlus, Image, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const moduleIcons: Record<EventModule['type'], React.ComponentType<{ className?: string }>> = {
  capacity: Users,
  gallery: Image,
  links: Link2,
  rsvp: Users,
  poll: BarChart3,
  text: FileText,
  cohost: UserPlus,
};

const moduleLabels: Record<EventModule['type'], string> = {
  capacity: 'Capacity',
  gallery: 'Photo Gallery',
  links: 'Links',
  rsvp: 'RSVP Form',
  poll: 'Poll',
  text: 'Text Block',
  cohost: 'Co-Host',
};

export const ModulePreview = () => {
  const modules = useRecoilValue(modulesAtom);

  if (modules.length === 0) return null;

  return (
    <div className="space-y-2 pt-3 border-t border-border/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Added Modules
      </p>
      <div className="flex flex-wrap gap-2">
        {modules.map((module) => {
          const Icon = moduleIcons[module.type];
          return (
            <div
              key={module.id}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
                "bg-primary/10 border border-primary/20"
              )}
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                {moduleLabels[module.type]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
