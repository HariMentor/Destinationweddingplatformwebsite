"use client";

import React, { createContext, useContext, useState, useEffect } from "react";


interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (amount: number, currency?: string) => string;
  convertPrice: (amount: number, sourceCurrency?: string) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);



export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>("INR");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load currency preference or detect from location on mount
  useEffect(() => {
    async function initializeCurrency() {
      try {
        // 1. Check for manual override
        const savedCurrency = localStorage.getItem("wedzway_currency");
        if (savedCurrency) {
          setCurrencyState(savedCurrency);
        } else {
          // 2. Check cached location
          let countryCode = sessionStorage.getItem("user-country-code");

          if (!countryCode) {
            try {
              const locRes = await fetch("https://ipwho.is/");
              const locData = await locRes.json();
              countryCode = locData?.country_code || "IN";
              sessionStorage.setItem("user-country-code", countryCode!);
            } catch (e) {
              console.error("Location detection failed", e);
              countryCode = "IN";
            }
          }

          // Dynamic import to avoid SSR issues with the library if any, 
          // but here we just use the imported object
          const countryToCurrency = (await import("country-to-currency")).default;
          const userCurrency = countryToCurrency[countryCode!] || "INR";
          setCurrencyState(userCurrency);
        }

        // 3. Fetch Exchange Rates (Base: INR)
        // We need rates to convert FROM source (usually INR) TO userCurrency
        // Ideally we fetch rates for the userCurrency based on INR
        // Or fetch all rates with base USD and convert. 
        // The previous hook fetched base=sourceCurrency. 
        // Let's assume most source prices are INR. 
        // But for flexibility, let's fetch rates relative to INR or generic.

        // Actually, the hook fetched `open.er-api.com/v6/latest/${sourceCurrency}`.
        // Since different products might have different source currencies, 
        // the Provider should probably fetch a standard set or fetch on demand.
        // However, to keep it simple and scalable for "INR" based products (standard for this app):

        const rateKey = `rates-base-INR`;
        let rates = sessionStorage.getItem(rateKey);

        if (rates) {
          setExchangeRates(JSON.parse(rates));
        } else {
          try {
            // Fetch rates with Base INR
            const ratesRes = await fetch(`https://open.er-api.com/v6/latest/INR`);
            const rateData = await ratesRes.json();
            setExchangeRates(rateData.rates);
            sessionStorage.setItem(rateKey, JSON.stringify(rateData.rates));
          } catch (e) {
            console.error("Rate fetching failed", e);
          }
        }

      } catch (error) {
        console.error("Currency initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeCurrency();
  }, []);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("wedzway_currency", newCurrency);
  };

  const convertPrice = (amount: number, sourceCurrency: string = "INR"): number => {
    if (sourceCurrency === currency) return amount;

    // If we have rates for Base INR.
    // Case 1: Source is INR, Target is UserCurrency.
    // Rate = exchangeRates[UserCurrency]

    if (sourceCurrency === "INR" && exchangeRates[currency]) {
      return amount * exchangeRates[currency];
    }

    // Case 2: Source is different. 
    // We might need more complex logic or just return amount if not supported yet.
    // For now, assuming most platform prices are INR.

    return amount;
  };

  const formatPrice = (amount: number, currencyCode: string = "INR"): string => {
    // Use standard Intl formatter
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode || "INR",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    }).format(amount);
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
