import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TimeInput = ({ value, onChange, className }: TimeInputProps) => {
  // Parse the value (format: "HH:MM AM/PM")
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hours: '', minutes: '', period: 'AM' };
    
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
      return {
        hours: match[1],
        minutes: match[2],
        period: match[3].toUpperCase()
      };
    }
    return { hours: '', minutes: '', period: 'AM' };
  };

  const { hours, minutes, period } = parseTime(value);

  const updateTime = (newHours: string, newMinutes: string, newPeriod: string) => {
    if (newHours && newMinutes) {
      onChange(`${newHours}:${newMinutes} ${newPeriod}`);
    } else if (!newHours && !newMinutes) {
      onChange('');
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      const num = parseInt(val);
      if (num > 12) val = '12';
      if (num < 1 && val.length > 1) val = '01';
    }
    updateTime(val, minutes, period);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
      const num = parseInt(val);
      if (num > 59) val = '59';
    }
    if (val.length > 2) val = val.slice(0, 2);
    updateTime(hours, val, period);
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    updateTime(hours, minutes, newPeriod);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Input
        type="text"
        placeholder="HH"
        value={hours}
        onChange={handleHoursChange}
        className="w-10 h-8 text-xs text-center p-1"
        maxLength={2}
      />
      <span className="text-xs">:</span>
      <Input
        type="text"
        placeholder="MM"
        value={minutes}
        onChange={handleMinutesChange}
        className="w-10 h-8 text-xs text-center p-1"
        maxLength={2}
      />
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={togglePeriod}
        className="h-8 px-2 text-xs"
      >
        {period || 'AM'}
      </Button>
    </div>
  );
};

export default TimeInput;
