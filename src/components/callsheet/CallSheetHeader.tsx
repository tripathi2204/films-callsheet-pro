import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Upload, CalendarIcon, Sun } from "lucide-react";
import { CallSheetData } from "../CallSheetGenerator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props {
  data: CallSheetData;
  updateData: (field: keyof CallSheetData, value: any) => void;
}

const crewPositions = ["Producer", "Director", "UPM", "Director of Photography", "Other"];
const additionalCallTypes = ["Shooting Call", "Breakfast", "Lunch", "2nd Meal", "Est. Wrap", "Other"];

const CallSheetHeader = ({ data, updateData }: Props) => {
  const [isAmPm, setIsAmPm] = useState(true);
  const [logoPreview, setLogoPreview] = useState<string>(data.productionLogo);

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
    const newContact = { position: "Producer", name: "", phone: "" };
    updateData('crewContacts', [...data.crewContacts, newContact]);
  };

  const updateCrewContact = (index: number, field: string, value: string) => {
    const updated = [...data.crewContacts];
    updated[index] = { ...updated[index], [field]: value };
    updateData('crewContacts', updated);
  };

  const removeCrewContact = (index: number) => {
    const updated = data.crewContacts.filter((_, i) => i !== index);
    updateData('crewContacts', updated);
  };

  const addCallTime = () => {
    const newCallTime = { name: "Shooting Call", time: "9:00 am" };
    updateData('callTimes', [...data.callTimes, newCallTime]);
  };

  const updateCallTime = (index: number, field: string, value: string) => {
    const updated = [...data.callTimes];
    updated[index] = { ...updated[index], [field]: value };
    updateData('callTimes', updated);
  };

  const removeCallTime = (index: number) => {
    const updated = data.callTimes.filter((_, i) => i !== index);
    updateData('callTimes', updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-4 h-40 flex items-center justify-center bg-[hsl(var(--sheet-header-bg))] relative overflow-hidden">
          {logoPreview ? (
            <img src={logoPreview} alt="Production Logo" className="max-h-full max-w-full object-contain" />
          ) : (
            <label className="cursor-pointer text-center text-sm text-[hsl(var(--label-text))]">
              <Upload className="h-8 w-8 mx-auto mb-2" />
              <span>Production Company Logo</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            </label>
          )}
          {logoPreview && (
            <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/50 flex items-center justify-center transition-opacity">
              <Upload className="h-8 w-8 text-white" />
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            </label>
          )}
        </div>

        <Textarea
          placeholder="Production Office Address..."
          value={data.productionAddress}
          onChange={(e) => updateData('productionAddress', e.target.value)}
          className="min-h-[80px] text-sm"
        />

        <div className="space-y-2">
          {data.crewContacts.map((contact, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1 space-y-1">
                <Select
                  value={contact.position}
                  onValueChange={(value) => updateCrewContact(index, 'position', value)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {crewPositions.map(pos => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) => updateCrewContact(index, 'name', e.target.value)}
                  className="h-8 text-xs"
                />
                <Input
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={(e) => updateCrewContact(index, 'phone', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mt-1"
                onClick={() => removeCrewContact(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={addCrewContact}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Crew Contact
          </Button>
        </div>
      </div>

      {/* Center Column */}
      <div className="space-y-4 text-center">
        <Input
          value={data.movieName}
          onChange={(e) => updateData('movieName', e.target.value)}
          className="text-2xl font-bold text-center border-0 border-b-2 rounded-none focus-visible:ring-0"
        />

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-[hsl(var(--label-text))]">Shoot Day</span>
          <Input
            type="number"
            value={data.shootDay}
            onChange={(e) => updateData('shootDay', e.target.value)}
            className="w-20 text-center h-8"
          />
        </div>

        <div className="text-sm font-semibold text-[hsl(var(--label-text))]">
          General Crew Call
        </div>

        <div className="flex items-center justify-center gap-2">
          <Input
            type="time"
            value={data.generalCrewCall}
            onChange={(e) => updateData('generalCrewCall', e.target.value)}
            className="w-32 text-center h-10"
          />
          <Select value={isAmPm ? "am" : "pm"} onValueChange={(v) => setIsAmPm(v === "am")}>
            <SelectTrigger className="w-20 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="am">AM</SelectItem>
              <SelectItem value="pm">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea
          placeholder="Production Notes..."
          value={data.productionNotes}
          onChange={(e) => updateData('productionNotes', e.target.value)}
          className="min-h-[100px] text-sm"
        />
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.shootDate ? format(new Date(data.shootDate), "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.shootDate ? new Date(data.shootDate) : undefined}
              onSelect={(date) => date && updateData('shootDate', date.toISOString().split('T')[0])}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-4 bg-[hsl(var(--sheet-header-bg))]">
          <div className="flex items-center justify-center mb-3">
            <Sun className="h-8 w-8 text-orange-500" />
          </div>
          <div className="text-center text-sm space-y-1">
            <div className="font-semibold">84° / 65°</div>
            <div className="text-xs text-[hsl(var(--label-text))]">Sunrise: 6:30am | Sunset: 5:00pm</div>
            <div className="text-xs text-[hsl(var(--label-text))]">Precipitation: 50%</div>
          </div>
          <div className="text-xs text-center mt-3 text-[hsl(var(--label-text))] italic">
            Weather details auto-update once you enter a shooting location
          </div>
        </div>

        <div className="space-y-2">
          {data.callTimes.map((callTime, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="flex-1 space-y-1">
                {callTime.name === "Crew Call" ? (
                  <div className="text-sm font-semibold px-2 py-1">Crew Call:</div>
                ) : (
                  <Select
                    value={callTime.name}
                    onValueChange={(value) => updateCallTime(index, 'name', value)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {additionalCallTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Input
                  type="time"
                  value={callTime.time.split(' ')[0]}
                  onChange={(e) => updateCallTime(index, 'time', e.target.value + ' am')}
                  className="h-8 text-xs"
                />
              </div>
              {callTime.name !== "Crew Call" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeCallTime(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={addCallTime}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Call Time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallSheetHeader;
