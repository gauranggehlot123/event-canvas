import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modulesAtom } from '@/state/eventState';
import { CustomizationDrawer } from './CustomizationDrawer';
import { Megaphone, Grid3X3, Users, Link, Image, ClipboardList, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { Icon: Megaphone, label: 'Announce' },
  { Icon: Grid3X3, label: 'Grid' },
  { Icon: Users, label: 'People' },
  { Icon: Link, label: 'Links' },
  { Icon: Image, label: 'Photos' },
  { Icon: ClipboardList, label: 'RSVP' },
];

export const CustomizeTrigger = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const modules = useRecoilValue(modulesAtom);

  return (
    <>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Customize your event your way</h3>
        
        <button
          onClick={() => setDrawerOpen(true)}
          className={cn(
            "w-full p-4 rounded-xl border border-border/60 bg-gradient-to-r from-primary/5 to-accent/5",
            "hover:border-primary/50 hover:from-primary/10 hover:to-accent/10",
            "transition-all duration-200 group"
          )}
        >
          <div className="flex items-center justify-between">
            {/* Icon row - 6 icons per Figma */}
            <div className="flex items-center gap-2">
              {icons.map(({ Icon, label }, index) => (
                <div
                  key={label}
                  className={cn(
                    "p-2 rounded-lg bg-muted/50 transition-transform duration-200",
                    "group-hover:scale-105"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              {modules.length > 0 && (
                <span className="text-sm text-primary font-medium">
                  {modules.length} added
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-3 text-left">
            Add RSVP forms, polls, text blocks, and more
          </p>
        </button>
      </div>

      <CustomizationDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};
