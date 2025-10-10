import { Calendar, Plus, X, Flag, Truck, ChevronUp, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TimeInput from "@/components/ui/time-input";
import PagesInput from "@/components/ui/pages-input";
import AutocompleteInput from "@/components/ui/autocomplete-input";

interface ScheduleItem {
  id: string;
  type: 'scene' | 'banner' | 'company-move';
  time?: string;
  sceneNo?: string;
  description?: string;
  dn?: string;
  cast?: string;
  location?: string;
  pages?: string;
  bannerText?: string;
}

interface Props {
  schedule: ScheduleItem[];
  updateSchedule: (schedule: ScheduleItem[]) => void;
  talent?: Array<{ name: string; role: string }>;
  locations?: Array<{ number: string; setLocation: string }>;
}

const ScheduleSection = ({ schedule, updateSchedule, talent = [], locations = [] }: Props) => {
  const castOptions = talent.map(t => `${t.name} - ${t.role}`).filter(Boolean);
  const locationOptions = locations.map(l => `${l.number}: ${l.setLocation}`).filter(Boolean);

  // Add default empty scene if schedule is empty
  React.useEffect(() => {
    if (schedule.length === 0) {
      addItem('scene');
    }
  }, []);
  const addItem = (type: 'scene' | 'banner' | 'company-move') => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      type,
      ...(type === 'scene' && {
        time: '',
        sceneNo: '',
        description: '',
        dn: 'Day',
        cast: '',
        location: '',
        pages: ''
      }),
      ...(type === 'banner' && { bannerText: '' }),
      ...(type === 'company-move' && { time: '' })
    };
    updateSchedule([...schedule, newItem]);
  };

  const updateItem = (id: string, field: string, value: string) => {
    const updated = schedule.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateSchedule(updated);
  };

  const removeItem = (id: string) => {
    updateSchedule(schedule.filter(item => item.id !== id));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const index = schedule.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === schedule.length - 1)
    ) {
      return;
    }

    const newSchedule = [...schedule];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newSchedule[index], newSchedule[swapIndex]] = [newSchedule[swapIndex], newSchedule[index]];
    updateSchedule(newSchedule);
  };

  const totalPages = schedule
    .filter(item => item.type === 'scene' && item.pages)
    .reduce((sum, item) => {
      const pages = item.pages || '';
      // Parse "X Y/8" format
      const match = pages.match(/^(\d+)?\s*(\d+\/8)?$/);
      if (match) {
        const whole = parseInt(match[1] || '0');
        const fraction = match[2] ? eval(match[2]) : 0;
        return sum + whole + fraction;
      }
      return sum;
    }, 0);

  return (
    <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Schedule</h2>
          <span className="text-sm text-[hsl(var(--label-text))]">
            Total Pages: {totalPages.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addItem('scene')}>
            <Plus className="h-4 w-4 mr-1" />
            Scene
          </Button>
          <Button size="sm" variant="outline" onClick={() => addItem('banner')}>
            <Flag className="h-4 w-4 mr-1" />
            Banner
          </Button>
          <Button size="sm" variant="outline" onClick={() => addItem('company-move')}>
            <Truck className="h-4 w-4 mr-1" />
            Company Move
          </Button>
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className="text-center py-8 text-[hsl(var(--label-text))]">
          <p>No schedule items yet. Click the buttons above to add scenes, banners, or company moves.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-[hsl(var(--label-text))] pb-2 border-b border-[hsl(var(--sheet-border))]">
            <div className="col-span-1">Move</div>
            <div className="col-span-1">Time</div>
            <div className="col-span-1">Scene No.</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1">D/N</div>
            <div className="col-span-2">Cast</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-1">Pages</div>
          </div>

          {/* Schedule Items */}
          {schedule.map((item, index) => (
            <div key={item.id}>
              {item.type === 'banner' && (
                <div className="bg-[hsl(var(--sheet-header-bg))] p-2 rounded flex items-center gap-2">
                  <Flag className="h-4 w-4 text-primary" />
                  <TimeInput
                    value={item.time || ''}
                    onChange={(v) => updateItem(item.id, 'time', v)}
                    className="w-32 h-8"
                  />
                  <Input
                    placeholder="Banner text..."
                    value={item.bannerText}
                    onChange={(e) => updateItem(item.id, 'bannerText', e.target.value)}
                    className="flex-1 h-8"
                  />
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => moveItem(item.id, 'up')}>↑</Button>
                    <Button size="sm" variant="ghost" onClick={() => moveItem(item.id, 'down')}>↓</Button>
                    <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}><X className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}

              {item.type === 'company-move' && (
                <div className="bg-[hsl(var(--sheet-header-bg))] p-2 rounded flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Company Move at</span>
                  <TimeInput
                    value={item.time || ''}
                    onChange={(v) => updateItem(item.id, 'time', v)}
                    className="w-32 h-8"
                  />
                  <div className="flex gap-1 ml-auto">
                    <Button size="sm" variant="ghost" onClick={() => moveItem(item.id, 'up')}>↑</Button>
                    <Button size="sm" variant="ghost" onClick={() => moveItem(item.id, 'down')}>↓</Button>
                    <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}><X className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}

              {item.type === 'scene' && (
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 flex items-center gap-1">
                    <div className="flex flex-col">
                      <Button size="sm" variant="ghost" className="h-4 p-0" onClick={() => moveItem(item.id, 'up')}>↑</Button>
                      <Button size="sm" variant="ghost" className="h-4 p-0" onClick={() => moveItem(item.id, 'down')}>↓</Button>
                    </div>
                  </div>
                  <TimeInput
                    value={item.time || ''}
                    onChange={(v) => updateItem(item.id, 'time', v)}
                    className="col-span-1 h-8 text-xs"
                  />
                  <Input
                    placeholder="Scene"
                    value={item.sceneNo}
                    onChange={(e) => updateItem(item.id, 'sceneNo', e.target.value)}
                    className="col-span-1 h-8 text-xs"
                  />
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="col-span-3 h-8 text-xs"
                  />
                  <Select value={item.dn} onValueChange={(v) => updateItem(item.id, 'dn', v)}>
                    <SelectTrigger className="col-span-1 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day">Day</SelectItem>
                      <SelectItem value="Night">Night</SelectItem>
                      <SelectItem value="Morning">Morning</SelectItem>
                      <SelectItem value="Evening">Evening</SelectItem>
                    </SelectContent>
                  </Select>
                  <AutocompleteInput
                    value={item.cast || ''}
                    onChange={(v) => updateItem(item.id, 'cast', v)}
                    options={castOptions}
                    placeholder="Cast"
                    className="col-span-2 h-8 text-xs"
                  />
                  <AutocompleteInput
                    value={item.location || ''}
                    onChange={(v) => updateItem(item.id, 'location', v)}
                    options={locationOptions}
                    placeholder="Location"
                    className="col-span-2 h-8 text-xs"
                  />
                  <div className="col-span-1 flex gap-1">
                    <PagesInput
                      value={item.pages || ''}
                      onChange={(v) => updateItem(item.id, 'pages', v)}
                      className="h-8 text-xs w-16"
                    />
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
