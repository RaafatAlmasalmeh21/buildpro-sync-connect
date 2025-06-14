
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, X, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ProjectsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  startDateFrom: Date | undefined;
  startDateTo: Date | undefined;
  onStartDateFromChange: (date: Date | undefined) => void;
  onStartDateToChange: (date: Date | undefined) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export const ProjectsFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  startDateFrom,
  startDateTo,
  onStartDateFromChange,
  onStartDateToChange,
  onClearFilters,
  activeFiltersCount,
}: ProjectsFiltersProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="planned">Planned</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range */}
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full lg:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDateFrom ? format(startDateFrom, "MMM dd") : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDateFrom}
                onSelect={onStartDateFromChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full lg:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDateTo ? format(startDateTo, "MMM dd") : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDateTo}
                onSelect={onStartDateToChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={onClearFilters} className="lg:w-auto">
            <X className="mr-2 h-4 w-4" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
};
