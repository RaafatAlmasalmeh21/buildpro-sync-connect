
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskItem } from "./TaskItem";
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X 
} from "lucide-react";
import { Phase, Task } from "@/types/project-hierarchy";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PhaseItemProps {
  phase: Phase;
  onUpdate: (phase: Phase) => void;
  onDelete: (phaseId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "planned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "completed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const PhaseItem = ({ phase, onUpdate, onDelete }: PhaseItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: phase.name,
    description: phase.description || "",
    status: phase.status,
    startDate: phase.startDate || "",
    endDate: phase.endDate || "",
  });

  const handleSave = () => {
    onUpdate({
      ...phase,
      ...editForm,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: phase.name,
      description: phase.description || "",
      status: phase.status,
      startDate: phase.startDate || "",
      endDate: phase.endDate || "",
    });
    setIsEditing(false);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: "New Task",
      status: "todo",
      order: phase.tasks.length,
    };
    
    onUpdate({
      ...phase,
      tasks: [...phase.tasks, newTask],
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    onUpdate({
      ...phase,
      tasks: phase.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ),
    });
  };

  const handleDeleteTask = (taskId: string) => {
    onUpdate({
      ...phase,
      tasks: phase.tasks.filter(task => task.id !== taskId),
    });
  };

  if (isEditing) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="space-y-3">
          <Input
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Phase name"
          />
          <Textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="Phase description"
            rows={2}
          />
          <div className="grid grid-cols-3 gap-2">
            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Phase["status"] })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            >
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <Input
              type="date"
              value={editForm.startDate}
              onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
              placeholder="Start date"
            />
            <Input
              type="date"
              value={editForm.endDate}
              onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
              placeholder="End date"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {phase.name}
                  </h4>
                  <Badge className={getStatusColor(phase.status)} variant="secondary">
                    {phase.status}
                  </Badge>
                </div>
              </Button>
            </CollapsibleTrigger>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {phase.tasks.length} tasks
              </span>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(phase.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {phase.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 ml-6">
              {phase.description}
            </p>
          )}
          
          <div className="ml-6 mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {phase.progress}%
              </span>
            </div>
            <Progress value={phase.progress} className="h-1" />
          </div>
        </div>
        
        <CollapsibleContent>
          <div className="px-4 pb-4">
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Tasks
                </h5>
                <Button size="sm" variant="outline" onClick={handleAddTask}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Task
                </Button>
              </div>
              
              <div className="space-y-2">
                {phase.tasks
                  .sort((a, b) => a.order - b.order)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
              </div>
              
              {phase.tasks.length === 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
                  No tasks yet. Click "Add Task" to get started.
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
