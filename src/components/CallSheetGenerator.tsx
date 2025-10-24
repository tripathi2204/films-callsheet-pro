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
import CallSheetPrintLayout from "./callsheet/CallSheetPrintLayout";

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
  maxTemp?: string;
  minTemp?: string;
  tempUnit?: string;
  sunrise?: string;
  sunset?: string;
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
    generalCrewCall: "8:00 AM",
    productionNotes: "",
    productionLogo: "",
    productionAddress: "",
    crewContacts: [
      { position: "Producer", name: "John Smith", phone: "(555) 555-5555" }
    ],
    shootDate: new Date().toISOString().split('T')[0],
    callTimes: [
      { name: "Crew Call", time: "8:00 AM" }
    ],
    maxTemp: "",
    minTemp: "",
    tempUnit: "F",
    sunrise: "",
    sunset: "",
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
    // Update document title before printing
    const originalTitle = document.title;
    const movieName = callSheetData.movieName || 'YOUR MOVIE NAME';
    const shootDay = callSheetData.shootDay || '1';
    document.title = `${movieName} Shoot Day ${shootDay}`;
    
    window.print();
    
    // Restore original title after a short delay
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
    
    toast.success("Opening print dialog...");
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
      {/* Call Sheet - Editable Version (Hidden on Print) */}
      <div className="bg-[hsl(var(--sheet-bg))] border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6 md:p-8 shadow-lg print:hidden">
        <CallSheetHeader 
          data={callSheetData}
          updateData={updateCallSheetData}
        />

        <div className="mt-8 space-y-8">
          <ScheduleSection 
            schedule={callSheetData.schedule}
            updateSchedule={(schedule) => updateCallSheetData('schedule', schedule)}
            talent={callSheetData.talent}
            locations={callSheetData.locations}
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
            talent={callSheetData.talent}
            locations={callSheetData.locations}
          />

          <RadioChannelsSection 
            channels={callSheetData.radioChannels}
            updateChannels={(channels) => updateCallSheetData('radioChannels', channels)}
          />
        </div>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="mt-8 flex flex-col items-center gap-4 print:hidden">
        <Button onClick={handleExportPDF} variant="default" className="gap-2" size="lg">
          <FileDown className="h-4 w-4" />
          Export PDF
        </Button>
        <p className="text-sm text-center text-muted-foreground max-w-2xl px-4">
          NOTE: For best export quality, please use this app on a desktop or in desktop view on your mobile device. 
          Also, choose 'Save as PDF' as your printer from the Destination menu.
          <br />
          <strong>IMPORTANT:</strong> To remove date/time headers and URL footers, uncheck "Headers and footers" in your browser's print settings.
        </p>
      </div>

      {/* Print Layout */}
      <CallSheetPrintLayout data={callSheetData} />
    </div>
  );
};

export default CallSheetGenerator;
