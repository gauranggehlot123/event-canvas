import { useRecoilValue } from 'recoil';
import { completionPercentageSelector } from '@/state/eventState';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Date & Time' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Media' },
  { id: 5, label: 'Customize' },
];

export const ProgressStepper = () => {
  const { completed, total } = useRecoilValue(completionPercentageSelector);

  return (
    <div className="w-full px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          {completed}/{total} completed
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round((completed / total) * 100)}%
        </span>
      </div>
      
      <div className="flex gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1">
            <div
              className={cn(
                'h-2 rounded-full transition-colors',
                index < completed
                  ? 'bg-primary'
                  : index === completed
                  ? 'bg-primary/40'
                  : 'bg-muted'
              )}
            />
            <span
              className={cn(
                'mt-1 block text-xs',
                index < completed
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
