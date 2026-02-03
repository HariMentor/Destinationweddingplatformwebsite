"use client";

import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  eventDate: string;
  status: string;
  total: number;
  lineItems?: QuoteLineItem[];
}

interface PlannerQuotesViewProps {
  // keep flexible — Dashboard passes nothing strict
}

export function PlannerQuotesView(_: PlannerQuotesViewProps) {
  const mockQuotes: Quote[] = [
    { id: "q1", quoteNumber: "Q-001", clientName: "Sarah & Michael", eventDate: "2026-06-15", status: "pending", total: 4200 },
    { id: "q2", quoteNumber: "Q-002", clientName: "Emma & James", eventDate: "2026-07-03", status: "sent", total: 7800 },
  ];

  return (
    <Card>
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>Quotes</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {mockQuotes.map((q) => (
            <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{q.quoteNumber} — {q.clientName}</div>
                <div style={{ fontSize: 12, color: "var(--muted, #666)" }}>{q.eventDate}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge variant={q.status === "sent" ? "secondary" : "outline"}>{q.status}</Badge>
                <Button size="sm" variant="ghost">View</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default PlannerQuotesView;
