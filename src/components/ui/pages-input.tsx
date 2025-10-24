import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PagesInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const PagesInput = ({ value, onChange, className }: PagesInputProps) => {
  // Parse value like "3 5/8" or "0 3/8" or "2"
  const parsePages = (val: string) => {
    if (!val) return { whole: '', eighths: '0' };
    
    const match = val.match(/^(\d+)\s*(\d)\/8$/);
    if (match) {
      return { whole: match[1], eighths: match[2] };
    }
    
    // Just a number
    const wholeMatch = val.match(/^(\d+)$/);
    if (wholeMatch) {
      return { whole: wholeMatch[1], eighths: '0' };
    }
    
    return { whole: '', eighths: '0' };
  };

  const { whole, eighths } = parsePages(value);

  const updateValue = (newWhole: string, newEighths: string) => {
    if (!newWhole && newEighths === '0') {
      onChange('');
      return;
    }
    
    const wholeNum = newWhole || '0';
    if (newEighths === '0') {
      onChange(wholeNum === '0' ? '' : wholeNum);
    } else {
      onChange(`${wholeNum} ${newEighths}/8`);
    }
  };

  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    updateValue(val, eighths);
  };

  const handleEighthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    const num = parseInt(val) || 0;
    if (num >= 0 && num <= 7) {
      updateValue(whole, num.toString());
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Input
        type="text"
        placeholder="0"
        value={whole}
        onChange={handleWholeChange}
        className="w-12 h-8 text-xs text-center p-1"
      />
      <Input
        type="text"
        placeholder="0/8"
        value={eighths === '0' ? '' : `${eighths}/8`}
        onChange={handleEighthsChange}
        className="w-12 h-8 text-xs text-center p-1"
      />
    </div>
  );
};

export default PagesInput;
