import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Mail, Link2, Save } from "lucide-react";
import { toast } from "sonner";
import CallSheetHeader from "./callsheet/CallSheetHeader";
import ScheduleSection from "./callsheet/ScheduleSection";
import TalentSection from "./callsheet/TalentSection";
import LocationsSection from "./callsheet/LocationsSection";
import DepartmentNotesSection from "./callsheet/DepartmentNotesSection";
import AdvanceScheduleSection from "./callsheet/AdvanceScheduleSection";
import RadioChannelsSection from "./callsheet/RadioChannelsSection";

export interface CallSheetData {
  movieName: string;
  shootDay: string;
  generalCrewCall: string;
  productionNotes: string;
  productionLogo: string;
  productionAddress: string;
  crewContacts: Array<{
    position: string;
    name: string;
    phone: string;
  }>;
  shootDate: string;
  callTimes: Array<{
    name: string;
    time: string;
  }>;
  schedule: Array<any>;
  talent: Array<any>;
  locations: Array<any>;
  departmentNotes: Array<any>;
  advanceSchedule: Array<any>;
  radioChannels: Array<any>;
}

const CallSheetGenerator = () => {
  const [callSheetData, setCallSheetData] = useState<CallSheetData>({
    movieName: "YOUR MOVIE NAME",
    shootDay: "1",
    generalCrewCall: "8:00",
    productionNotes: "",
    productionLogo: "",
    productionAddress: "",
    crewContacts: [
      { position: "Producer", name: "John Smith", phone: "(555) 555-5555" },
      { position: "Director", name: "John Smith", phone: "(555) 555-5555" }
    ],
    shootDate: new Date().toISOString().split('T')[0],
    callTimes: [
      { name: "Crew Call", time: "8:00 am" }
    ],
    schedule: [],
    talent: [],
    locations: [],
    departmentNotes: [],
    advanceSchedule: [],
    radioChannels: []
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('callSheetData');
    if (savedData) {
      try {
        setCallSheetData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading saved data:", e);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('callSheetData', JSON.stringify(callSheetData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [callSheetData]);

  const updateCallSheetData = (field: keyof CallSheetData, value: any) => {
    setCallSheetData(prev => ({ ...prev, [field]: value }));
  };

  const handleExportPDF = () => {
    toast.success("PDF export will be available soon!");
  };

  const handleEmail = () => {
    toast.success("Email feature will be available soon!");
  };

  const handleGenerateLink = () => {
    toast.success("Shareable link feature will be available soon!");
  };

  const handleSave = () => {
    localStorage.setItem('callSheetData', JSON.stringify(callSheetData));
    toast.success("Call sheet saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-4 justify-end print:hidden">
        <Button onClick={handleSave} variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button onClick={handleExportPDF} variant="default" className="gap-2">
          <FileDown className="h-4 w-4" />
          Export PDF
        </Button>
        <Button onClick={handleEmail} variant="default" className="gap-2">
          <Mail className="h-4 w-4" />
          Email
        </Button>
        <Button onClick={handleGenerateLink} variant="default" className="gap-2">
          <Link2 className="h-4 w-4" />
          Generate Link
        </Button>
      </div>

      {/* Call Sheet */}
      <div className="bg-[hsl(var(--sheet-bg))] border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6 md:p-8 shadow-lg">
        <CallSheetHeader 
          data={callSheetData}
          updateData={updateCallSheetData}
        />

        <div className="mt-8 space-y-8">
          <ScheduleSection 
            schedule={callSheetData.schedule}
            updateSchedule={(schedule) => updateCallSheetData('schedule', schedule)}
          />

          <TalentSection 
            talent={callSheetData.talent}
            updateTalent={(talent) => updateCallSheetData('talent', talent)}
          />

          <LocationsSection 
            locations={callSheetData.locations}
            updateLocations={(locations) => updateCallSheetData('locations', locations)}
          />

          <DepartmentNotesSection 
            notes={callSheetData.departmentNotes}
            updateNotes={(notes) => updateCallSheetData('departmentNotes', notes)}
          />

          <AdvanceScheduleSection 
            schedule={callSheetData.advanceSchedule}
            updateSchedule={(schedule) => updateCallSheetData('advanceSchedule', schedule)}
          />

          <RadioChannelsSection 
            channels={callSheetData.radioChannels}
            updateChannels={(channels) => updateCallSheetData('radioChannels', channels)}
          />
        </div>
      </div>
    </div>
  );
};

export default CallSheetGenerator;
