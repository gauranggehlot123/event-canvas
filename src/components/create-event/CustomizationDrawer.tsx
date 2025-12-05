import { useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { modulesAtom, EventModule } from '@/state/eventState';
import { toast } from '@/hooks/use-toast';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Users,
  BarChart3,
  FileText,
  UserPlus,
  Image,
  MessageSquare,
  Check,
  Palette,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleOption {
  type: EventModule['type'];
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultConfig: Record<string, unknown>;
}

const moduleOptions: ModuleOption[] = [
  {
    type: 'rsvp',
    label: 'RSVP Form',
    description: 'Collect guest responses and manage attendance',
    icon: Users,
    defaultConfig: { fields: ['name', 'email'], maxCapacity: null },
  },
  {
    type: 'poll',
    label: 'Poll',
    description: 'Ask questions and gather opinions from attendees',
    icon: BarChart3,
    defaultConfig: { question: '', options: [] },
  },
  {
    type: 'text',
    label: 'Text Block',
    description: 'Add custom text, details, or instructions',
    icon: FileText,
    defaultConfig: { content: '' },
  },
  {
    type: 'cohost',
    label: 'Co-Host',
    description: 'Invite others to help manage your event',
    icon: UserPlus,
    defaultConfig: { email: '' },
  },
];

interface CustomizationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomizationDrawer = ({ open, onOpenChange }: CustomizationDrawerProps) => {
  const [modules, setModules] = useRecoilState(modulesAtom);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return moduleOptions;
    const query = searchQuery.toLowerCase();
    return moduleOptions.filter(
      (m) =>
        m.label.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const isModuleAdded = (type: EventModule['type']) =>
    modules.some((m) => m.type === type);

  const toggleModule = (option: ModuleOption) => {
    const exists = isModuleAdded(option.type);

    if (exists) {
      setModules((prev) => prev.filter((m) => m.type !== option.type));
      toast({
        title: `${option.label} removed`,
        description: 'Module has been removed from your event',
      });
    } else {
      const newModule: EventModule = {
        id: Math.random().toString(36).substring(2, 9),
        type: option.type,
        config: option.defaultConfig,
        order: modules.length,
      };
      setModules((prev) => [...prev, newModule]);
      toast({
        title: `${option.label} added!`,
        description: 'Module has been added to your event',
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Customize Your Event
          </DrawerTitle>
          <DrawerDescription>
            Add features and personalize your event page
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4 mt-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Module Grid */}
              <div className="grid gap-3">
                {filteredModules.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No modules match your search
                  </p>
                ) : (
                  filteredModules.map((option) => {
                    const added = isModuleAdded(option.type);
                    return (
                      <button
                        key={option.type}
                        onClick={() => toggleModule(option)}
                        className={cn(
                          'relative flex items-start gap-4 p-4 rounded-xl border text-left transition-all',
                          added
                            ? 'border-primary bg-primary/5'
                            : 'border-border/60 bg-card hover:border-primary/50 hover:bg-muted/50'
                        )}
                      >
                        <div
                          className={cn(
                            'shrink-0 p-2.5 rounded-lg',
                            added ? 'bg-primary/10' : 'bg-muted'
                          )}
                        >
                          <option.icon
                            className={cn(
                              'h-5 w-5',
                              added ? 'text-primary' : 'text-muted-foreground'
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">
                              {option.label}
                            </h4>
                            {added && (
                              <Badge variant="secondary" className="text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Added
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Selected count */}
              {modules.length > 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  {modules.length} module{modules.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </TabsContent>

            <TabsContent value="theme" className="space-y-4 mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Theme customization coming soon</p>
                <p className="text-xs mt-1">
                  Customize fonts, colors, and layouts
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
