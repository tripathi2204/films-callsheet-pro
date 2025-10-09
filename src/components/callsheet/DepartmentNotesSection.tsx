import { FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AutocompleteInput from "@/components/ui/autocomplete-input";

interface DepartmentNote {
  id: string;
  department: string;
  notes: string;
}

interface Props {
  notes: DepartmentNote[];
  updateNotes: (notes: DepartmentNote[]) => void;
}

const DEPARTMENTS = [
  "Art",
  "Camera",
  "Craft Services",
  "Direction",
  "Electric",
  "Grip",
  "Hair & Makeup",
  "Health & Safety",
  "Location",
  "Production",
  "Props",
  "Set Dressing",
  "Sound",
  "Special Effects",
  "Stunts",
  "Transportation",
  "Visual Effects",
  "Wardrobe"
];

const DepartmentNotesSection = ({ notes, updateNotes }: Props) => {
  const addNote = () => {
    const newNote: DepartmentNote = {
      id: Date.now().toString(),
      department: '',
      notes: ''
    };
    updateNotes([...notes, newNote]);
  };

  const updateItem = (id: string, field: keyof DepartmentNote, value: string) => {
    const updated = notes.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateNotes(updated);
  };

  const removeItem = (id: string) => {
    updateNotes(notes.filter(item => item.id !== id));
  };

  return (
    <div className="border-2 border-[hsl(var(--sheet-border))] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Department Notes</h2>
        </div>
        <Button size="sm" variant="outline" onClick={addNote}>
          <Plus className="h-4 w-4 mr-1" />
          Add Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8 text-[hsl(var(--label-text))]">
          <p>No department notes yet. Click "Add Note" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
              <div className="col-span-3">
                <AutocompleteInput
                  value={item.department}
                  onChange={(v) => updateItem(item.id, 'department', v)}
                  options={DEPARTMENTS}
                  placeholder="Department"
                  className="h-8 text-xs"
                />
              </div>
              <Textarea
                placeholder="Notes..."
                value={item.notes}
                onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                className="col-span-8 min-h-[60px] text-xs"
              />
              <div className="col-span-1">
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

export default DepartmentNotesSection;
