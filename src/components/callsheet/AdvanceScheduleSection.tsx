import { CalendarDays, Plus, X, ChevronUp, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Advance Schedule</h2>
        </div>
        <Button size="sm" variant="outline" onClick={addItem} className="w-full sm:w-auto">
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
          {/* Header Row - Desktop Only */}
          <div className="hidden md:grid grid-cols-[40px_90px_60px_minmax(150px,1fr)_80px_120px_120px_100px_40px] gap-2 text-xs font-semibold text-[hsl(var(--label-text))] pb-2 border-b border-[hsl(var(--sheet-border))]">
            <div>Move</div>
            <div>Time</div>
            <div>Scene No.</div>
            <div>Description</div>
            <div>D/N</div>
            <div>Cast</div>
            <div>Location</div>
            <div>Pages</div>
            <div></div>
          </div>

          {/* Schedule Items */}
          {schedule.map(item => (
            <div key={item.id}>
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-[40px_90px_60px_minmax(150px,1fr)_80px_120px_120px_100px_40px] gap-2 items-center">
                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="ghost" className="h-5 w-8 p-0" onClick={() => moveItem(item.id, 'up')}>
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-5 w-8 p-0" onClick={() => moveItem(item.id, 'down')}>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
                <Input
                  type="text"
                  placeholder="6:00 AM"
                  value={item.time}
                  onChange={(e) => updateItem(item.id, 'time', e.target.value)}
                  className="h-8 text-xs"
                />
                <Input
                  placeholder="Scene"
                  value={item.sceneNo}
                  onChange={(e) => updateItem(item.id, 'sceneNo', e.target.value)}
                  className="h-8 text-xs"
                />
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="h-8 text-xs"
                />
                <Select value={item.dn} onValueChange={(v) => updateItem(item.id, 'dn', v)}>
                  <SelectTrigger className="h-8 text-xs">
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
                  className="h-8 text-xs"
                />
                <Input
                  placeholder="Location"
                  value={item.location}
                  onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                  className="h-8 text-xs"
                />
                <PagesInput
                  value={item.pages}
                  onChange={(v) => updateItem(item.id, 'pages', v)}
                  className="h-8 text-xs"
                />
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile View */}
              <div className="md:hidden border border-[hsl(var(--sheet-border))] rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => moveItem(item.id, 'up')}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => moveItem(item.id, 'down')}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-[hsl(var(--label-text))]">Time</label>
                    <Input
                      type="text"
                      placeholder="6:00 AM"
                      value={item.time}
                      onChange={(e) => updateItem(item.id, 'time', e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[hsl(var(--label-text))]">Scene No.</label>
                    <Input
                      placeholder="Scene"
                      value={item.sceneNo}
                      onChange={(e) => updateItem(item.id, 'sceneNo', e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--label-text))]">Description</label>
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-[hsl(var(--label-text))]">D/N</label>
                    <Select value={item.dn} onValueChange={(v) => updateItem(item.id, 'dn', v)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Day">Day</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-[hsl(var(--label-text))]">Pages</label>
                    <PagesInput
                      value={item.pages}
                      onChange={(v) => updateItem(item.id, 'pages', v)}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--label-text))]">Cast</label>
                  <Input
                    placeholder="Cast"
                    value={item.cast}
                    onChange={(e) => updateItem(item.id, 'cast', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--label-text))]">Location</label>
                  <Input
                    placeholder="Location"
                    value={item.location}
                    onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvanceScheduleSection;
