"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

export interface ComparePackage {
  id: string;
  venueName: string;
  venueId: number;
  packageName: string;
  price: number;
  currency: string;
  guestCount: string;
  duration: string;
  image: string;
  inclusions: string[];
  highlights: string[];
  decorStyle?: string;
  venueType?: string;
}

interface PackageCompareContextType {
  comparePackages: ComparePackage[];
  addToCompare: (pkg: ComparePackage) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const PackageCompareContext = createContext<PackageCompareContextType | undefined>(undefined);

export function PackageCompareProvider({ children }: { children: React.ReactNode }) {
  const [comparePackages, setComparePackages] = useState<ComparePackage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wedzway-package-compare");
    if (stored) {
      try {
        setComparePackages(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse compare packages:", e);
      }
    }
  }, []);

  // Save to localStorage whenever comparePackages changes
  useEffect(() => {
    localStorage.setItem("wedzway-package-compare", JSON.stringify(comparePackages));
  }, [comparePackages]);

  const addToCompare = (pkg: ComparePackage) => {
    setComparePackages((prev) => {
      // Check if already in compare
      if (prev.some((p) => p.id === pkg.id)) {
        toast.info(`${pkg.packageName} is already in your compare list`);
        return prev;
      }

      // Limit to 4 packages
      if (prev.length >= 4) {
        toast.error("You can only compare up to 4 packages at once");
        return prev;
      }

      toast.success(`${pkg.packageName} added to compare`);
      return [...prev, pkg];
    });
  };

  const removeFromCompare = (id: string) => {
    setComparePackages((prev) => {
      const pkg = prev.find((p) => p.id === id);
      if (pkg) {
        toast.success(`${pkg.packageName} removed from compare`);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearCompare = () => {
    setComparePackages([]);
    toast.success("Compare list cleared");
  };

  const isInCompare = (id: string) => {
    return comparePackages.some((p) => p.id === id);
  };

  return (
    <PackageCompareContext.Provider
      value={{
        comparePackages,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </PackageCompareContext.Provider>
  );
}

export function usePackageCompare() {
  const context = useContext(PackageCompareContext);
  if (context === undefined) {
    throw new Error("usePackageCompare must be used within a PackageCompareProvider");
  }
  return context;
}
