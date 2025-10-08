import { Radio, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RadioChannel {
  id: string;
  number: string;
  department: string;
}

interface Props {
  channels: RadioChannel[];
  updateChannels: (channels: RadioChannel[]) => void;
}

const RadioChannelsSection = ({ channels, updateChannels }: Props) => {
  const addChannel = () => {
    const newChannel: RadioChannel = {
      id: Date.now().toString(),
      number: (channels.length + 1).toString(),
      department: ''
    };
    updateChannels([...channels, newChannel]);
  };

  const updateItem = (id: string, field: keyof RadioChannel, value: string) => {
    const updated = channels.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateChannels(updated);
  };

  const removeItem = (id: string) => {
    updateChannels(channels.filter(item => item.id !== id));
  };

  return (
    <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Radio Channels</h2>
        </div>
        <Button size="sm" variant="outline" onClick={addChannel}>
          <Plus className="h-4 w-4 mr-1" />
          Add Channel
        </Button>
      </div>

      {channels.length === 0 ? (
        <div className="text-center py-8 text-[hsl(var(--label-text))]">
          <p>No radio channels yet. Click "Add Channel" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {channels.map(item => (
            <div key={item.id} className="flex items-center gap-2 border border-[hsl(var(--sheet-border))] rounded p-2">
              <Input
                placeholder="#"
                value={item.number}
                onChange={(e) => updateItem(item.id, 'number', e.target.value)}
                className="w-12 h-8 text-xs"
              />
              <Input
                placeholder="Department"
                value={item.department}
                onChange={(e) => updateItem(item.id, 'department', e.target.value)}
                className="flex-1 h-8 text-xs"
              />
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadioChannelsSection;
