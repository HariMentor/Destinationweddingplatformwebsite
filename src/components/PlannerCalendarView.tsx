"use client";

import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface CalendarAvailability {
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
  const toggleStatus = (id: string) => {
    const updated = calendarData.map((item) => {
      if (item.id !== id) return item;
      const next: CalendarAvailability = {
        ...item,
        status: item.status === "available" ? "booked" : "available",
      };
      return next;
    });
    onUpdate(updated);
  };

  return (
    <Card>
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>Calendar</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {calendarData.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{c.date}</div>
                <div style={{ fontSize: 12, color: "var(--muted, #666)" }}>{c.eventType || c.note || c.clientName || "-"}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge variant={c.status === "available" ? "outline" : "secondary"}>{c.status}</Badge>
                <Button size="sm" variant="ghost" onClick={() => toggleStatus(c.id)}>
                  {c.status === "available" ? "Mark Booked" : "Mark Available"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default PlannerCalendarView;
