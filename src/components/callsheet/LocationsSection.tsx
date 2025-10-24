import { MapPin, Plus, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LocationItem {
  id: string;
  number: string;
  setLocation: string;
  parking: string;
  nearestHospital: string;
}

interface Props {
  locations: LocationItem[];
  updateLocations: (locations: LocationItem[]) => void;
}

const LocationsSection = ({ locations, updateLocations }: Props) => {
  // Add default empty location if none exist
  React.useEffect(() => {
    if (locations.length === 0) {
      addLocation();
    }
  }, []);

  const addLocation = () => {
    const newLocation: LocationItem = {
      id: Date.now().toString(),
      number: (locations.filter(l => l.id !== 'default').length + 1).toString(),
      setLocation: '',
      parking: '',
      nearestHospital: ''
    };
    updateLocations([...locations.filter(l => l.id !== 'default'), newLocation]);
  };

  const updateItem = (id: string, field: keyof LocationItem, value: string) => {
    const updated = locations.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateLocations(updated);
  };

  const removeItem = (id: string) => {
    updateLocations(locations.filter(item => item.id !== id));
  };

  // Create default empty row
  if (locations.length === 0) {
    locations = [{
      id: 'default',
      number: '1',
      setLocation: '',
      parking: '',
      nearestHospital: ''
    }];
  }

  return (
    <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Locations</h2>
        </div>
        <Button size="sm" variant="outline" onClick={addLocation} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-1" />
          Add Location
        </Button>
      </div>

      <div className="space-y-2">
        {/* Header Row - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-semibold text-[hsl(var(--label-text))] pb-2 border-b border-[hsl(var(--sheet-border))]">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Set Location</div>
          <div className="col-span-3">Parking & Notes</div>
          <div className="col-span-4">Nearest Hospital</div>
        </div>

        {/* Location Items */}
        {locations.map(item => (
          <div key={item.id}>
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-12 gap-2 items-center">
              <Input
                placeholder="#"
                value={item.number}
                onChange={(e) => updateItem(item.id, 'number', e.target.value)}
                className="col-span-1 h-8 text-xs"
              />
              <Input
                placeholder="Set Location Address"
                value={item.setLocation}
                onChange={(e) => updateItem(item.id, 'setLocation', e.target.value)}
                className="col-span-4 h-8 text-xs"
              />
              <Input
                placeholder="Parking & Notes"
                value={item.parking}
                onChange={(e) => updateItem(item.id, 'parking', e.target.value)}
                className="col-span-3 h-8 text-xs"
              />
              <Input
                placeholder="Nearest Hospital"
                value={item.nearestHospital}
                onChange={(e) => updateItem(item.id, 'nearestHospital', e.target.value)}
                className="col-span-3 h-8 text-xs"
              />
              <div className="col-span-1">
                {item.id !== 'default' && (
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden border border-[hsl(var(--sheet-border))] rounded p-3 space-y-2">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Input
                  placeholder="#"
                  value={item.number}
                  onChange={(e) => updateItem(item.id, 'number', e.target.value)}
                  className="w-16 h-8 text-xs"
                />
                {item.id !== 'default' && (
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-[hsl(var(--label-text))] mb-1 block">Set Location</label>
                  <Input
                    placeholder="Set Location Address"
                    value={item.setLocation}
                    onChange={(e) => updateItem(item.id, 'setLocation', e.target.value)}
                    className="h-8 text-xs w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--label-text))] mb-1 block">Parking & Notes</label>
                  <Input
                    placeholder="Parking & Notes"
                    value={item.parking}
                    onChange={(e) => updateItem(item.id, 'parking', e.target.value)}
                    className="h-8 text-xs w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--label-text))] mb-1 block">Nearest Hospital</label>
                  <Input
                    placeholder="Nearest Hospital"
                    value={item.nearestHospital}
                    onChange={(e) => updateItem(item.id, 'nearestHospital', e.target.value)}
                    className="h-8 text-xs w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {locations.filter(l => l.id !== 'default').length === 0 && (
          <div className="text-center py-4 text-[hsl(var(--label-text))] text-sm">
            No locations added yet. Click "Add Location" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsSection;
