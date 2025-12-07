import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TimePicker = ({ value, onChange, className }: TimePickerProps) => {
  const [open, setOpen] = React.useState(false);

  // Parse the current value (HH:mm format)
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hour: 12, minute: 0, period: 'PM' };
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return { hour: hour12, minute: minutes || 0, period };
  };

  const { hour, minute, period } = parseTime(value);

  const formatTime = (h: number, m: number, p: string) => {
    let hour24 = h;
    if (p === 'AM') {
      hour24 = h === 12 ? 0 : h;
    } else {
      hour24 = h === 12 ? 12 : h + 12;
    }
    return `${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const displayTime = value
    ? `${hour}:${minute.toString().padStart(2, '0')} ${period}`
    : 'Select time';

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];

  const handleHourChange = (h: number) => {
    onChange(formatTime(h, minute, period));
  };

  const handleMinuteChange = (m: number) => {
    onChange(formatTime(hour, m, period));
  };

  const handlePeriodChange = (p: string) => {
    onChange(formatTime(hour, minute, p));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-background/50",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {displayTime}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-popover/95 backdrop-blur-xl border-border/30 shadow-xl" 
        align="start"
      >
        <div className="flex divide-x divide-border/30">
          {/* Hours */}
          <ScrollArea className="h-48 w-16">
            <div className="p-2">
              {hours.map((h) => (
                <button
                  key={h}
                  onClick={() => handleHourChange(h)}
                  className={cn(
                    "w-full px-3 py-1.5 text-sm rounded-md transition-colors",
                    h === hour
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50 text-foreground"
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Minutes */}
          <ScrollArea className="h-48 w-16">
            <div className="p-2">
              {minutes.map((m) => (
                <button
                  key={m}
                  onClick={() => handleMinuteChange(m)}
                  className={cn(
                    "w-full px-3 py-1.5 text-sm rounded-md transition-colors",
                    m === minute
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50 text-foreground"
                  )}
                >
                  {m.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* AM/PM */}
          <div className="p-2 flex flex-col justify-center gap-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  p === period
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted/50 text-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
