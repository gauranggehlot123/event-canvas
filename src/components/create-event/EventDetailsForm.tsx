import { useRecoilState } from 'recoil';
import { eventAtom } from '@/state/eventState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimePicker } from '@/components/ui/time-picker';
import { Calendar as CalendarIcon, MapPin, Phone, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const EventDetailsForm = () => {
  const [event, setEvent] = useRecoilState(eventAtom);

  const updateField = <K extends keyof typeof event>(field: K, value: typeof event[K]) => {
    setEvent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-5">
      {/* Phone Number - First field per Figma */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone number to save draft</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={event.phoneNumber}
            onChange={(e) => updateField('phoneNumber', e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* Event Name - Styled as heading per Figma */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Name your event</h3>
        <Input
          id="title"
          placeholder="Give your event a name"
          value={event.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="bg-background/50"
          maxLength={100}
        />
      </div>

      {/* Date & Time Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Date Picker */}
        <div className="space-y-2">
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background/50",
                  !event.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {event.date ? format(event.date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={event.date || undefined}
                onSelect={(date) => updateField('date', date || null)}
                initialFocus
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Input */}
        <div className="space-y-2">
          <Label>Time *</Label>
          <TimePicker
            value={event.time}
            onChange={(time) => updateField('time', time)}
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            placeholder="Where's it happening?"
            value={event.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="pl-10 bg-background/50"
            maxLength={200}
          />
        </div>
      </div>

      {/* Cost per person */}
      <div className="space-y-2">
        <Label htmlFor="costPerPerson">Cost per person</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="costPerPerson"
            type="text"
            placeholder="0.00"
            value={event.costPerPerson}
            onChange={(e) => updateField('costPerPerson', e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* Description (optional) */}
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Tell people what your event is about..."
          value={event.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="bg-background/50 min-h-[80px] resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">
          {event.description.length}/500
        </p>
      </div>
    </div>
  );
};
