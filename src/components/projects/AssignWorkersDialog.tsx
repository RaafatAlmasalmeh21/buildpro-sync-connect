
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Worker {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  site: string;
  status: string;
  avatar: string;
}

interface AssignedWorker {
  id: number;
  name: string;
  role: string;
  assignedDate: string;
}

interface AssignWorkersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workers: AssignedWorker[]) => void;
  currentlyAssigned: AssignedWorker[];
  projectName: string;
}

// Sample workers data
const availableWorkers: Worker[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Site Manager",
    email: "john.smith@construction.com",
    phone: "(555) 123-4567",
    site: "Downtown Office Complex",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "Electrical Engineer",
    email: "sarah.wilson@construction.com",
    phone: "(555) 234-5678",
    site: "Residential Tower Phase 2",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Project Coordinator",
    email: "mike.johnson@construction.com",
    phone: "(555) 345-6789",
    site: "Hospital Extension",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Lisa Chen",
    role: "Safety Inspector",
    email: "lisa.chen@construction.com",
    phone: "(555) 456-7890",
    site: "Shopping Mall Renovation",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Foreman",
    email: "david.brown@construction.com",
    phone: "(555) 567-8901",
    site: "Bridge Maintenance",
    status: "active",
    avatar: "/placeholder.svg",
  },
];

export const AssignWorkersDialog = ({
  isOpen,
  onClose,
  onSave,
  currentlyAssigned,
  projectName,
}: AssignWorkersDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>(
    currentlyAssigned.map(w => w.id)
  );

  const filteredWorkers = availableWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWorkerToggle = (workerId: number) => {
    setSelectedWorkers(prev =>
      prev.includes(workerId)
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    );
  };

  const handleSave = () => {
    const assignedWorkers: AssignedWorker[] = selectedWorkers.map(workerId => {
      const worker = availableWorkers.find(w => w.id === workerId);
      const existingAssignment = currentlyAssigned.find(w => w.id === workerId);
      
      return {
        id: workerId,
        name: worker?.name || "",
        role: worker?.role || "",
        assignedDate: existingAssignment?.assignedDate || new Date().toISOString(),
      };
    });

    onSave(assignedWorkers);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Assign Workers to {projectName}</DialogTitle>
          <DialogDescription>
            Select workers to assign to this project. You can search by name or role.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected count */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedWorkers.length} worker{selectedWorkers.length !== 1 ? 's' : ''} selected
            </span>
            {selectedWorkers.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedWorkers([])}
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Workers list */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Checkbox
                  checked={selectedWorkers.includes(worker.id)}
                  onCheckedChange={() => handleWorkerToggle(worker.id)}
                />
                <Avatar className="h-10 w-10">
                  <img src={worker.avatar} alt={worker.name} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {worker.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {worker.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                    {worker.email}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge 
                    variant={worker.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {worker.status}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {worker.site}
                  </span>
                </div>
              </div>
            ))}
            
            {filteredWorkers.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No workers found matching your search.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Assign {selectedWorkers.length} Worker{selectedWorkers.length !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
