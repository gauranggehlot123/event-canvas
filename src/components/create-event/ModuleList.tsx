import { useRecoilState } from 'recoil';
import { modulesAtom, EventModule } from '@/state/eventState';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  GripVertical, 
  Trash2, 
  Users, 
  BarChart3, 
  FileText, 
  UserPlus,
  Image,
  Link2,
  Plus,
  X
} from 'lucide-react';
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

interface ModuleConfigProps {
  module: EventModule;
  onUpdate: (config: Record<string, unknown>) => void;
}

const RSVPConfig = ({ module, onUpdate }: ModuleConfigProps) => {
  const config = module.config as { fields: string[]; maxCapacity: number | null };
  return (
    <div className="space-y-2">
      <Input
        type="number"
        placeholder="Max capacity (optional)"
        value={config.maxCapacity || ''}
        onChange={(e) => onUpdate({ ...config, maxCapacity: e.target.value ? parseInt(e.target.value) : null })}
        className="bg-background/50"
      />
      <p className="text-xs text-muted-foreground">Collects: Name, Email</p>
    </div>
  );
};

const PollConfig = ({ module, onUpdate }: ModuleConfigProps) => {
  const config = module.config as { question: string; options: string[] };
  
  const addOption = () => {
    onUpdate({ ...config, options: [...config.options, ''] });
  };
  
  const updateOption = (index: number, value: string) => {
    const newOptions = [...config.options];
    newOptions[index] = value;
    onUpdate({ ...config, options: newOptions });
  };
  
  const removeOption = (index: number) => {
    onUpdate({ ...config, options: config.options.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="Poll question"
        value={config.question}
        onChange={(e) => onUpdate({ ...config, question: e.target.value })}
        className="bg-background/50"
      />
      <div className="space-y-1">
        {config.options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className="bg-background/50"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(index)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addOption} className="gap-1">
        <Plus className="h-3 w-3" /> Add Option
      </Button>
    </div>
  );
};

const TextConfig = ({ module, onUpdate }: ModuleConfigProps) => {
  const config = module.config as { content: string };
  return (
    <Textarea
      placeholder="Enter your text content..."
      value={config.content}
      onChange={(e) => onUpdate({ content: e.target.value })}
      className="bg-background/50 min-h-[60px] resize-none"
    />
  );
};

const CohostConfig = ({ module, onUpdate }: ModuleConfigProps) => {
  const config = module.config as { email: string };
  return (
    <Input
      type="email"
      placeholder="Co-host email address"
      value={config.email}
      onChange={(e) => onUpdate({ email: e.target.value })}
      className="bg-background/50"
    />
  );
};

const ModuleConfigEditor = ({ module, onUpdate }: ModuleConfigProps) => {
  switch (module.type) {
    case 'rsvp':
      return <RSVPConfig module={module} onUpdate={onUpdate} />;
    case 'poll':
      return <PollConfig module={module} onUpdate={onUpdate} />;
    case 'text':
      return <TextConfig module={module} onUpdate={onUpdate} />;
    case 'cohost':
      return <CohostConfig module={module} onUpdate={onUpdate} />;
    default:
      return <p className="text-xs text-muted-foreground">No configuration available</p>;
  }
};

export const ModuleList = () => {
  const [modules, setModules] = useRecoilState(modulesAtom);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setModules(updatedItems);
    toast({
      title: "Modules reordered",
      description: "Your changes will be saved automatically",
    });
  };

  const deleteModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
    toast({
      title: "Module removed",
      description: "The module has been removed from your event",
    });
  };

  const updateModuleConfig = (id: string, config: Record<string, unknown>) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, config } : m))
    );
  };

  if (modules.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Event Modules</h3>
      <p className="text-sm text-muted-foreground">
        Drag to reorder • Click to configure
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                "space-y-2 rounded-lg p-1 transition-colors",
                snapshot.isDraggingOver && "bg-primary/5"
              )}
            >
              {modules.map((module, index) => {
                const Icon = moduleIcons[module.type];
                return (
                  <Draggable key={module.id} draggableId={module.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "border-border/30 bg-card/50 backdrop-blur-md shadow-lg shadow-primary/5 transition-all duration-300",
                          snapshot.isDragging && "shadow-xl ring-2 ring-primary/30 bg-card/70"
                        )}
                      >
                        <div className="p-3">
                          <div className="flex items-start gap-3">
                            {/* Drag handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="mt-1 p-1 rounded hover:bg-muted cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>

                            {/* Module icon */}
                            <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm">
                                  {moduleLabels[module.type]}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteModule(module.id)}
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                              <ModuleConfigEditor
                                module={module}
                                onUpdate={(config) => updateModuleConfig(module.id, config)}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
