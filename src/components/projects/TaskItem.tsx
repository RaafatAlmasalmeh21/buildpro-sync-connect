
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Check, X, Calendar, User } from "lucide-react";
import { Task } from "@/types/project-hierarchy";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "todo":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: task.name,
    description: task.description || "",
    status: task.status,
    assignee: task.assignee || "",
    dueDate: task.dueDate || "",
  });

  const handleSave = () => {
    onUpdate({
      ...task,
      ...editForm,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: task.name,
      description: task.description || "",
      status: task.status,
      assignee: task.assignee || "",
      dueDate: task.dueDate || "",
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <Input
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Task name"
          />
          <Textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="Task description"
            rows={2}
          />
          <div className="grid grid-cols-3 gap-2">
            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Task["status"] })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Input
              value={editForm.assignee}
              onChange={(e) => setEditForm({ ...editForm, assignee: e.target.value })}
              placeholder="Assignee"
            />
            <Input
              type="date"
              value={editForm.dueDate}
              onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
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
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 group hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {task.name}
          </h5>
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {task.description}
            </p>
          )}
          <div className="flex items-center space-x-3 mt-2">
            <Badge className={getStatusColor(task.status)} variant="secondary">
              {task.status.replace("-", " ")}
            </Badge>
            {task.assignee && (
              <div className="flex items-center text-xs text-gray-500">
                <User className="h-3 w-3 mr-1" />
                {task.assignee}
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
