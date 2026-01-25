"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Save,
  Users,
  Tag,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

interface CalendarAvailability {
  id: string;
  date: string;
  status: "available" | "booked" | "blocked" | "holiday";
  note?: string;
  clientName?: string;
  eventType?: string;
}

interface PlannerCalendarViewProps {
  calendarData: CalendarAvailability[];
  onUpdate: (data: CalendarAvailability[]) => void;
}

export function PlannerCalendarView({ calendarData, onUpdate }: PlannerCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<CalendarAvailability | null>(null);
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [isRepeatMode, setIsRepeatMode] = useState(false);
  const [repeatDays, setRepeatDays] = useState<number[]>([]); // 0 = Sunday, 1 = Monday, etc.
  
  const [formData, setFormData] = useState({
    date: "",
    status: "available" as "available" | "booked" | "blocked" | "holiday",
    note: "",
    clientName: "",
    eventType: "",
  });

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  // Get status for a specific date
  const getDateStatus = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarData.find(item => item.date === dateStr);
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const existing = getDateStatus(day);

    if (existing) {
      setEditingItem(existing);
      setFormData({
        date: existing.date,
        status: existing.status,
        note: existing.note || "",
        clientName: existing.clientName || "",
        eventType: existing.eventType || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        date: dateStr,
        status: "available",
        note: "",
        clientName: "",
        eventType: "",
      });
    }

    setSelectedDate(dateStr);
    setShowDialog(true);
    setIsRangeMode(false);
  };

  // Handle add availability button
  const handleAddAvailability = () => {
    setEditingItem(null);
    setSelectedDate(null);
    setFormData({
      date: "",
      status: "available",
      note: "",
      clientName: "",
      eventType: "",
    });
    setIsRangeMode(false);
    setIsRepeatMode(false);
    setRepeatDays([]);
    setRangeStart("");
    setRangeEnd("");
    setShowDialog(true);
  };

  // Save entry
  const handleSave = () => {
    if (isRepeatMode) {
      // Handle recurring days
      if (!rangeStart || !rangeEnd) {
        toast.error("Please select both start and end dates for repeat period");
        return;
      }

      if (repeatDays.length === 0) {
        toast.error("Please select at least one day of the week");
        return;
      }

      const start = new Date(rangeStart);
      const end = new Date(rangeEnd);

      if (start > end) {
        toast.error("Start date must be before end date");
        return;
      }

      // Generate entries for specific days of the week in the range
      const newEntries: CalendarAvailability[] = [];
      const currentDateIter = new Date(start);

      while (currentDateIter <= end) {
        const dayOfWeek = currentDateIter.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Check if this day of week is selected
        if (repeatDays.includes(dayOfWeek)) {
          const dateStr = currentDateIter.toISOString().split('T')[0];
          const existingIndex = calendarData.findIndex(item => item.date === dateStr);
          
          if (existingIndex === -1) {
            newEntries.push({
              id: `${Date.now()}-${dateStr}-${Math.random()}`,
              date: dateStr,
              status: formData.status,
              note: formData.note,
              clientName: formData.clientName,
              eventType: formData.eventType,
            });
          }
        }

        currentDateIter.setDate(currentDateIter.getDate() + 1);
      }

      if (newEntries.length > 0) {
        onUpdate([...calendarData, ...newEntries]);
        toast.success(`${newEntries.length} recurring days added to calendar!`);
      } else {
        toast.info("All matching days already have entries");
      }
    } else if (isRangeMode) {
      // Handle date range
      if (!rangeStart || !rangeEnd) {
        toast.error("Please select both start and end dates");
        return;
      }

      const start = new Date(rangeStart);
      const end = new Date(rangeEnd);

      if (start > end) {
        toast.error("Start date must be before end date");
        return;
      }

      // Generate entries for each day in the range
      const newEntries: CalendarAvailability[] = [];
      const currentDateIter = new Date(start);

      while (currentDateIter <= end) {
        const dateStr = currentDateIter.toISOString().split('T')[0];
        // Check if date already exists
        const existingIndex = calendarData.findIndex(item => item.date === dateStr);
        
        if (existingIndex === -1) {
          newEntries.push({
            id: `${Date.now()}-${dateStr}`,
            date: dateStr,
            status: formData.status,
            note: formData.note,
            clientName: formData.clientName,
            eventType: formData.eventType,
          });
        }

        currentDateIter.setDate(currentDateIter.getDate() + 1);
      }

      if (newEntries.length > 0) {
        onUpdate([...calendarData, ...newEntries]);
        toast.success(`${newEntries.length} days added to calendar!`);
      } else {
        toast.info("All dates in range already have entries");
      }
    } else {
      // Handle single date
      if (!formData.date) {
        toast.error("Please select a date");
        return;
      }

      if (editingItem) {
        // Update existing entry
        onUpdate(calendarData.map(item =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        ));
        toast.success("Calendar entry updated!");
      } else {
        // Add new entry
        const existingIndex = calendarData.findIndex(item => item.date === formData.date);
        
        if (existingIndex !== -1) {
          // Update existing entry for this date
          onUpdate(calendarData.map(item =>
            item.date === formData.date ? { ...item, ...formData } : item
          ));
          toast.success("Calendar entry updated!");
        } else {
          // Add new entry
          const newEntry: CalendarAvailability = {
            id: Date.now().toString(),
            ...formData,
          };
          onUpdate([...calendarData, newEntry]);
          toast.success("Calendar entry added!");
        }
      }
    }

    setShowDialog(false);
  };

  // Delete entry
  const handleDelete = () => {
    if (editingItem) {
      onUpdate(calendarData.filter(item => item.id !== editingItem.id));
      toast.success("Calendar entry deleted!");
      setShowDialog(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "booked": return "bg-blue-500";
      case "blocked": return "bg-gray-500";
      case "holiday": return "bg-purple-500";
      default: return "bg-gray-200";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-50 hover:bg-green-100 border-green-200";
      case "booked": return "bg-blue-50 hover:bg-blue-100 border-blue-200";
      case "blocked": return "bg-gray-50 hover:bg-gray-100 border-gray-200";
      case "holiday": return "bg-purple-50 hover:bg-purple-100 border-purple-200";
      default: return "bg-white hover:bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle2 className="size-3" />;
      case "booked": return <Calendar className="size-3" />;
      case "blocked": return <XCircle className="size-3" />;
      case "holiday": return <Sparkles className="size-3" />;
      default: return <AlertCircle className="size-3" />;
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Calendar</h2>
            <p className="text-muted-foreground">Manage your booking availability and schedule</p>
          </div>
          <Button onClick={handleAddAvailability} className="bg-[#02542D] hover:bg-[#023a20] gap-2">
            <Plus className="size-4" />
            Add Availability
          </Button>
        </div>

        {/* Calendar Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="size-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Available</span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {calendarData.filter(d => d.status === "available").length}
            </p>
          </Card>
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="size-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Booked</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {calendarData.filter(d => d.status === "booked").length}
            </p>
          </Card>
          <Card className="p-4 bg-gray-50 border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="size-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Blocked</span>
            </div>
            <p className="text-2xl font-bold text-gray-700">
              {calendarData.filter(d => d.status === "blocked").length}
            </p>
          </Card>
          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="size-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Holidays</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {calendarData.filter(d => d.status === "holiday").length}
            </p>
          </Card>
        </div>

        <Separator className="my-6" />

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateStatus = getDateStatus(day);
            const isToday = new Date().getDate() === day && 
                           new Date().getMonth() === month && 
                           new Date().getFullYear() === year;

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`aspect-square p-2 rounded-lg border-2 transition-all relative ${
                  dateStatus 
                    ? getStatusBgColor(dateStatus.status)
                    : "bg-white hover:bg-gray-50 border-gray-200"
                } ${isToday ? "ring-2 ring-[#DF6951] ring-offset-2" : ""}`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-sm font-medium ${isToday ? "text-[#DF6951]" : ""}`}>
                    {day}
                  </span>
                  {dateStatus && (
                    <div className={`mt-1 size-2 rounded-full ${getStatusColor(dateStatus.status)}`} />
                  )}
                </div>
                {dateStatus && dateStatus.clientName && (
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="text-[8px] truncate text-center">{dateStatus.clientName}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-gray-500" />
            <span className="text-sm text-muted-foreground">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-purple-500" />
            <span className="text-sm text-muted-foreground">Holiday</span>
          </div>
        </div>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Calendar Entry" : "Add Availability"}
            </DialogTitle>
            <DialogDescription>
              {isRangeMode ? "Set availability for a date range" : "Set your availability for a specific date"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Toggle Range Mode */}
            {!editingItem && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rangeMode"
                  checked={isRangeMode}
                  onChange={(e) => setIsRangeMode(e.target.checked)}
                  className="size-4 rounded"
                />
                <Label htmlFor="rangeMode" className="cursor-pointer">
                  Add date range
                </Label>
              </div>
            )}

            {/* Toggle Repeat Mode */}
            {!editingItem && isRangeMode && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="repeatMode"
                  checked={isRepeatMode}
                  onChange={(e) => {
                    setIsRepeatMode(e.target.checked);
                    if (!e.target.checked) {
                      setRepeatDays([]);
                    }
                  }}
                  className="size-4 rounded"
                />
                <Label htmlFor="repeatMode" className="cursor-pointer">
                  Repeat on specific days of the week
                </Label>
              </div>
            )}

            {/* Day of Week Selection */}
            {isRepeatMode && (
              <div>
                <Label className="mb-2 block">Select Days to Repeat</Label>
                <div className="grid grid-cols-7 gap-2">
                  {[
                    { day: 0, label: 'Sun' },
                    { day: 1, label: 'Mon' },
                    { day: 2, label: 'Tue' },
                    { day: 3, label: 'Wed' },
                    { day: 4, label: 'Thu' },
                    { day: 5, label: 'Fri' },
                    { day: 6, label: 'Sat' }
                  ].map(({ day, label }) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        if (repeatDays.includes(day)) {
                          setRepeatDays(repeatDays.filter(d => d !== day));
                        } else {
                          setRepeatDays([...repeatDays, day]);
                        }
                      }}
                      className={`p-2 rounded-md border-2 text-sm font-medium transition-all ${
                        repeatDays.includes(day)
                          ? 'bg-[#02542D] text-white border-[#02542D]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#02542D]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {repeatDays.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {repeatDays.map(d => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d]).join(', ')}
                  </p>
                )}
              </div>
            )}

            {/* Date Selection */}
            {isRangeMode ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={!!editingItem}
                />
              </div>
            )}

            {/* Status Selection */}
            <div>
              <Label>Status</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="blocked">Blocked</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>

            {/* Booking Details (only for booked status) */}
            {formData.status === "booked" && (
              <>
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label>Event Type</Label>
                  <Input
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    placeholder="e.g., Consultation, Venue Tour"
                  />
                </div>
              </>
            )}

            {/* Note */}
            <div>
              <Label>Note (Optional)</Label>
              <Textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Add any notes"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1 bg-[#02542D] hover:bg-[#023a20]">
                <Save className="size-4 mr-2" />
                {editingItem ? "Update" : "Save"} Entry
              </Button>
              {editingItem && (
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}