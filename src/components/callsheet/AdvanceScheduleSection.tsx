import { CalendarDays, Plus, X, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TimeInput from "@/components/ui/time-input";
import PagesInput from "@/components/ui/pages-input";

interface AdvanceScheduleItem {
  id: string;
  time: string;
  sceneNo: string;
  description: string;
  dn: string;
  cast: string;
  location: string;
  pages: string;
}

interface Props {
  schedule: AdvanceScheduleItem[];
  updateSchedule: (schedule: AdvanceScheduleItem[]) => void;
}

const AdvanceScheduleSection = ({ schedule, updateSchedule }: Props) => {
  const addItem = () => {
    const newItem: AdvanceScheduleItem = {
      id: Date.now().toString(),
      time: '',
      sceneNo: '',
      description: '',
      dn: 'Day',
      cast: '',
      location: '',
      pages: ''
    };
    updateSchedule([...schedule, newItem]);
  };

  const updateItem = (id: string, field: keyof AdvanceScheduleItem, value: string) => {
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

  return (
    <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Advance Schedule</h2>
        </div>
        <Button size="sm" variant="outline" onClick={addItem}>
          <Plus className="h-4 w-4 mr-1" />
          Add Scene
        </Button>
      </div>

      {schedule.length === 0 ? (
        <div className="text-center py-8 text-[hsl(var(--label-text))]">
          <p>No advance schedule items yet. Click "Add Scene" to get started.</p>
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
          {schedule.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-1 flex items-center gap-1">
                <GripVertical className="h-4 w-4 text-[hsl(var(--label-text))]" />
                <div className="flex flex-col">
                  <Button size="sm" variant="ghost" className="h-4 p-0" onClick={() => moveItem(item.id, 'up')}>↑</Button>
                  <Button size="sm" variant="ghost" className="h-4 p-0" onClick={() => moveItem(item.id, 'down')}>↓</Button>
                </div>
              </div>
              <Input
                type="time"
                placeholder="Time"
                value={item.time}
                onChange={(e) => updateItem(item.id, 'time', e.target.value)}
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
              <Input
                placeholder="Cast"
                value={item.cast}
                onChange={(e) => updateItem(item.id, 'cast', e.target.value)}
                className="col-span-2 h-8 text-xs"
              />
              <Input
                placeholder="Location"
                value={item.location}
                onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                className="col-span-2 h-8 text-xs"
              />
              <div className="col-span-1 flex gap-1">
                <Input
                  placeholder="Pages"
                  type="number"
                  step="0.125"
                  value={item.pages}
                  onChange={(e) => updateItem(item.id, 'pages', e.target.value)}
                  className="h-8 text-xs w-16"
                />
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvanceScheduleSection;
