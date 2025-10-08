import { Calendar, Plus, X, GripVertical, Flag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

const ScheduleSection = ({ schedule, updateSchedule }: Props) => {
  const addItem = (type: 'scene' | 'banner' | 'company-move') => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      type,
      ...(type === 'scene' && {
        time: '',
        sceneNo: '',
        description: '',
        dn: 'D',
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
    .reduce((sum, item) => sum + parseFloat(item.pages || '0'), 0);

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
                  <GripVertical className="h-4 w-4 text-[hsl(var(--label-text))]" />
                  <Flag className="h-4 w-4 text-primary" />
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
                  <GripVertical className="h-4 w-4 text-[hsl(var(--label-text))]" />
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Company Move at</span>
                  <Input
                    type="time"
                    value={item.time}
                    onChange={(e) => updateItem(item.id, 'time', e.target.value)}
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
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="N">N</SelectItem>
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
