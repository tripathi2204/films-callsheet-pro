import { Users, Plus, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TimeInput from "@/components/ui/time-input";

interface TalentItem {
  id: string;
  castId: string;
  name: string;
  role: string;
  makeup: string;
  callTime: string;
  contact: string;
  swf: string;
}

interface Props {
  talent: TalentItem[];
  updateTalent: (talent: TalentItem[]) => void;
}

const swfOptions = [
  { value: "SW", label: "SW - Start Work" },
  { value: "W", label: "W - Work" },
  { value: "WF", label: "WF - Work Finish" },
  { value: "H", label: "H - Hold" },
  { value: "WD", label: "WD - Work Drop" },
  { value: "PW", label: "PW - Pickup Work" },
  { value: "SWF", label: "SWF - Start Work Finish" }
];

const TalentSection = ({ talent, updateTalent }: Props) => {
  // Add default empty talent if none exist
  React.useEffect(() => {
    if (talent.length === 0) {
      addTalent();
    }
  }, []);

  const addTalent = () => {
    const newTalent: TalentItem = {
      id: Date.now().toString(),
      castId: '',
      name: '',
      role: '',
      makeup: '',
      callTime: '',
      contact: '',
      swf: 'W'
    };
    updateTalent([...talent, newTalent]);
  };

  const updateItem = (id: string, field: keyof TalentItem, value: string) => {
    const updated = talent.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateTalent(updated);
  };

  const removeItem = (id: string) => {
    updateTalent(talent.filter(item => item.id !== id));
  };

  return (
    <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Talent</h2>
        </div>
        <Button size="sm" variant="outline" onClick={addTalent}>
          <Plus className="h-4 w-4 mr-1" />
          Add Talent
        </Button>
      </div>

      {talent.length === 0 ? (
        <div className="text-center py-8 text-[hsl(var(--label-text))]">
          <p>No talent added yet. Click "Add Talent" to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-[hsl(var(--label-text))] pb-2 border-b border-[hsl(var(--sheet-border))]">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Makeup</div>
            <div className="col-span-2">Call Time</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-1">SWF</div>
          </div>

          {/* Talent Items */}
          {talent.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <Input
                placeholder="ID"
                value={item.castId}
                onChange={(e) => updateItem(item.id, 'castId', e.target.value)}
                className="col-span-1 h-8 text-xs"
              />
              <Input
                placeholder="Name"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                className="col-span-2 h-8 text-xs"
              />
              <Input
                placeholder="Role"
                value={item.role}
                onChange={(e) => updateItem(item.id, 'role', e.target.value)}
                className="col-span-2 h-8 text-xs"
              />
              <div className="col-span-2">
                <TimeInput value={item.makeup} onChange={(v) => updateItem(item.id, 'makeup', v)} />
              </div>
              <div className="col-span-2">
                <TimeInput value={item.callTime} onChange={(v) => updateItem(item.id, 'callTime', v)} />
              </div>
              <Input
                placeholder="Contact"
                value={item.contact}
                onChange={(e) => updateItem(item.id, 'contact', e.target.value)}
                className="col-span-2 h-8 text-xs"
              />
              <div className="col-span-1 flex gap-1">
                <Select value={item.swf} onValueChange={(v) => updateItem(item.id, 'swf', v)}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {swfOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default TalentSection;
