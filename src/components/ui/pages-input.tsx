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

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Input
        type="text"
        placeholder="0"
        value={whole}
        onChange={handleWholeChange}
        className="w-12 h-8 text-xs text-center p-1"
      />
      <Select value={eighths} onValueChange={(v) => updateValue(whole, v)}>
        <SelectTrigger className="h-8 w-16 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">0/8</SelectItem>
          <SelectItem value="1">1/8</SelectItem>
          <SelectItem value="2">2/8</SelectItem>
          <SelectItem value="3">3/8</SelectItem>
          <SelectItem value="4">4/8</SelectItem>
          <SelectItem value="5">5/8</SelectItem>
          <SelectItem value="6">6/8</SelectItem>
          <SelectItem value="7">7/8</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PagesInput;
