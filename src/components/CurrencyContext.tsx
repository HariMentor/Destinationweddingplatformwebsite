"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "INR" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
  convertPrice: (inrAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

// Conversion rates (1 INR = X EUR)
// These are approximate rates for the wedding service pricing
const CONVERSION_RATES = {
  INR_TO_EUR: 0.011, // Approximately 1 INR = 0.011 EUR (90 INR = 1 EUR)
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  // Load currency preference from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("wedzway_currency") as Currency;
    if (savedCurrency === "INR" || savedCurrency === "EUR") {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("wedzway_currency", newCurrency);
  };

  const convertPrice = (inrAmount: number): number => {
    if (currency === "INR") {
      return inrAmount;
    }
    // Convert INR to EUR
    return Math.round(inrAmount * CONVERSION_RATES.INR_TO_EUR);
  };

  const formatPrice = (amount: number): string => {
    const convertedAmount = convertPrice(amount);
    
    if (currency === "INR") {
      // Indian numbering system with commas
      return `₹${convertedAmount.toLocaleString("en-IN")}`;
    } else {
      // European numbering system
      return `€${convertedAmount.toLocaleString("en-EU")}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, convertPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
