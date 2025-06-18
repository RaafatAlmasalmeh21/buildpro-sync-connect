
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddEquipmentDialogProps {
  onAddEquipment: (equipment: {
    name: string;
    assetTag: string;
    type: string;
    status: string;
    location: string;
    nextService: string;
    condition: string;
  }) => void;
}

export const AddEquipmentDialog = ({ onAddEquipment }: AddEquipmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    assetTag: "",
    type: "",
    status: "available",
    location: "",
    nextService: "",
    condition: "good",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEquipment(formData);
    setFormData({
      name: "",
      assetTag: "",
      type: "",
      status: "available",
      location: "",
      nextService: "",
      condition: "good",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Equipment Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Excavator CAT 320"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assetTag">Asset Tag</Label>
            <Input
              id="assetTag"
              value={formData.assetTag}
              onChange={(e) => setFormData({ ...formData, assetTag: e.target.value })}
              placeholder="e.g., EQ-005"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Equipment Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="e.g., Heavy Machinery"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in_service">In Service</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Equipment Yard"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nextService">Next Service Date</Label>
            <Input
              id="nextService"
              type="date"
              value={formData.nextService}
              onChange={(e) => setFormData({ ...formData, nextService: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Equipment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
