import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X, Upload, Sun } from "lucide-react";
import { CallSheetData } from "../CallSheetGenerator";
import AutocompleteInput from "@/components/ui/autocomplete-input";
import TimeInput from "@/components/ui/time-input";

interface Props {
  data: CallSheetData;
  updateData: (field: keyof CallSheetData, value: any) => void;
}

const CREW_POSITIONS = [
  "1st Assistant Director",
  "Director",
  "Director of Photography",
  "Producer",
  "UPM"
].sort();

const CallSheetHeader = ({ data, updateData }: Props) => {
  const [logoPreview, setLogoPreview] = useState<string>(data.productionLogo || '');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        updateData('productionLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCrewContact = () => {
    const newContact = { position: '', name: '', phone: '' };
    updateData('crewContacts', [...data.crewContacts, newContact]);
  };

  const updateCrewContact = (index: number, field: string, value: string) => {
    const updated = data.crewContacts.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    );
    updateData('crewContacts', updated);
  };

  const removeCrewContact = (index: number) => {
    updateData('crewContacts', data.crewContacts.filter((_, i) => i !== index));
  };

  const handleGeneralCrewCallChange = (value: string) => {
    updateData('generalCrewCall', value);
    // Also update the Crew Call time in callTimes
    const updatedCallTimes = data.callTimes.map(ct => 
      ct.name === 'Crew Call' ? { ...ct, time: value } : ct
    );
    updateData('callTimes', updatedCallTimes);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Section - Logo, Address, Crew */}
      <div className="space-y-4">
        <div className="border-2 border-dashed border-[hsl(var(--sheet-border))] rounded-lg p-4 text-center">
          {logoPreview ? (
            <div className="relative">
              <img src={logoPreview} alt="Production Logo" className="w-full h-32 object-contain" />
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute top-0 right-0"
                onClick={() => { setLogoPreview(''); updateData('productionLogo', ''); }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleLogoUpload}
              />
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Production Company Logo</p>
            </label>
          )}
        </div>

        <Input
          placeholder="Production Office Address..."
          value={data.productionAddress}
          onChange={(e) => updateData('productionAddress', e.target.value)}
          className="text-sm"
        />

        <div className="space-y-2">
          {data.crewContacts.map((contact, index) => (
            <div key={index} className="space-y-1 p-2 border border-[hsl(var(--sheet-border))] rounded">
              <AutocompleteInput
                value={contact.position}
                onChange={(v) => updateCrewContact(index, 'position', v)}
                options={CREW_POSITIONS}
                placeholder="Position"
                className="text-xs h-7"
              />
              <div className="flex gap-1">
                <Input
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) => updateCrewContact(index, 'name', e.target.value)}
                  className="text-xs h-7 flex-1"
                />
                <Input
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={(e) => updateCrewContact(index, 'phone', e.target.value)}
                  className="text-xs h-7 flex-1"
                />
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => removeCrewContact(index)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={addCrewContact} className="w-full">
            <Plus className="h-3 w-3 mr-1" />
            Add Crew Contact
          </Button>
        </div>
      </div>

      {/* Center Section - Movie Name, Shoot Day, Crew Call */}
      <div className="space-y-4 text-center">
        <Input
          value={data.movieName}
          onChange={(e) => updateData('movieName', e.target.value)}
          className="text-center text-4xl font-bold border-none shadow-none focus-visible:ring-0"
        />
        
        <div className="flex items-center justify-center gap-2">
          <label className="text-sm font-semibold">Shoot Day</label>
          <Input
            type="number"
            value={data.shootDay}
            onChange={(e) => updateData('shootDay', e.target.value)}
            className="w-16 h-8 text-center"
          />
        </div>

        <p className="text-sm font-semibold">General Crew Call</p>
        
        <div className="flex justify-center">
          <TimeInput
            value={data.generalCrewCall}
            onChange={handleGeneralCrewCallChange}
            className="scale-125"
          />
        </div>

        <Textarea
          placeholder="Production Notes..."
          value={data.productionNotes}
          onChange={(e) => updateData('productionNotes', e.target.value)}
          className="text-sm min-h-[80px]"
        />
      </div>

      {/* Right Section - Date, Weather, Call Times */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[hsl(var(--label-text))]">Date</label>
          <Input
            type="date"
            value={data.shootDate}
            onChange={(e) => updateData('shootDate', e.target.value)}
            className="text-sm"
          />
        </div>

        <div className="border border-[hsl(var(--sheet-border))] rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <h3 className="text-sm font-bold">Weather</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-[hsl(var(--label-text))]">Max Temp</label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  placeholder="85"
                  value={data.maxTemp || ''}
                  onChange={(e) => updateData('maxTemp', e.target.value)}
                  className="text-xs h-7"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs"
                  onClick={() => updateData('tempUnit', data.tempUnit === 'F' ? 'C' : 'F')}
                >
                  °{data.tempUnit || 'F'}
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs text-[hsl(var(--label-text))]">Min Temp</label>
              <Input
                type="number"
                placeholder="65"
                value={data.minTemp || ''}
                onChange={(e) => updateData('minTemp', e.target.value)}
                className="text-xs h-7"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-[hsl(var(--label-text))]">Sunrise</label>
            <TimeInput
              value={data.sunrise || ''}
              onChange={(v) => updateData('sunrise', v)}
            />
          </div>
          
          <div>
            <label className="text-xs text-[hsl(var(--label-text))]">Sunset</label>
            <TimeInput
              value={data.sunset || ''}
              onChange={(v) => updateData('sunset', v)}
            />
          </div>
        </div>

        <div className="border border-[hsl(var(--sheet-border))] rounded-lg p-3 space-y-2">
          <h3 className="text-sm font-bold mb-2">Call Times</h3>
          {data.callTimes.map((ct, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <span className="flex-1 font-medium">{ct.name}:</span>
              <TimeInput
                value={ct.time}
                onChange={(v) => {
                  const updated = data.callTimes.map((item, i) => 
                    i === index ? { ...item, time: v } : item
                  );
                  updateData('callTimes', updated);
                }}
              />
              {index !== 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => updateData('callTimes', data.callTimes.filter((_, i) => i !== index))}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          
          <select
            className="w-full text-xs border rounded p-1"
            onChange={(e) => {
              if (e.target.value) {
                updateData('callTimes', [...data.callTimes, { name: e.target.value, time: '' }]);
                e.target.value = '';
              }
            }}
          >
            <option value="">+ Add Call Time</option>
            <option value="Shooting Call">Shooting Call</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="2nd Meal">2nd Meal</option>
            <option value="Est. Wrap">Est. Wrap</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CallSheetHeader;
