import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

const AutocompleteInput = ({ value, onChange, options, placeholder, className }: AutocompleteInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    // Get the text after the last comma for autocomplete
    const lastCommaIndex = inputValue.lastIndexOf(',');
    const currentEntry = lastCommaIndex >= 0 
      ? inputValue.substring(lastCommaIndex + 1).trim() 
      : inputValue.trim();
    
    const filtered = options.filter(option =>
      option.toLowerCase().includes(currentEntry.toLowerCase())
    );
    setFilteredOptions(filtered);
    setIsOpen(currentEntry.length > 0 && filtered.length > 0);
  };

  const handleOptionClick = (option: string) => {
    // Handle comma-separated values
    const lastCommaIndex = value.lastIndexOf(',');
    let newValue: string;
    
    if (lastCommaIndex >= 0) {
      // Replace the text after the last comma with the selected option
      newValue = value.substring(0, lastCommaIndex + 1) + ' ' + option;
    } else {
      newValue = option;
    }
    
    onChange(newValue);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (value) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredOptions(options);
      setIsOpen(true);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={className}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 cursor-pointer hover:bg-accent text-sm"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
