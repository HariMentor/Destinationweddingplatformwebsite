import { Metadata } from "next";
import ConciergePageClient from "./ConciergePageClient";

export const metadata: Metadata = {
  title: "Concierge Service - Wedzway",
  description:
    "Your personal wedding team for managing every detail from selecting venues and planners, to handling budgets and guest experiences. Choose from Starter, Pro, or Elite membership tiers.",
};

export default function ConciergePage() {
  return <ConciergePageClient />;
}
