// import { useEffect, useState } from "react";
// import countryToCurrency from "country-to-currency";

// export function useUserCurrency(sourceCurrency, amount) {
//   const [currency, setCurrency] = useState("INR");
//   const [convertedPrice, setConvertedPrice] = useState(0);

//   useEffect(() => {
//     async function detectCurrency() {
//       try {
//         // ------------------------------
//         // 1) Check cached location
//         // ------------------------------
//         let cachedLocation = sessionStorage.getItem("user-country-code");
//         let countryCode;

//         if (cachedLocation) {
//           countryCode = cachedLocation;
//         } else {
//           const locRes = await fetch("https://ipwho.is/");
//           const locData = await locRes.json();
//           countryCode = locData?.country_code || "IN";

//           sessionStorage.setItem("user-country-code", countryCode);
//         }

//         const userCurrency = countryToCurrency[countryCode] || "INR";
//         setCurrency(userCurrency);

//         // ------------------------------
//         // 2) Check cached exchange rates
//         // ------------------------------
//         const rateKey = `rate-${sourceCurrency}-${userCurrency}`;
//         let cachedRate = sessionStorage.getItem(rateKey);

//         let rate;

//         if (cachedRate) {
//           rate = parseFloat(cachedRate);
//         } else {
//           const ratesRes = await fetch(
//             `https://open.er-api.com/v6/latest/${sourceCurrency}`,
//           );
//           const rateData = await ratesRes.json();

//           rate = rateData.rates[userCurrency] || 1;

//           sessionStorage.setItem(rateKey, rate);
//         }

//         setConvertedPrice(amount * rate);
//       } catch (err) {
//         console.error("Currency detection failed", err);
//         setCurrency("INR");
//         setConvertedPrice(amount);
//       }
//     }

//     detectCurrency();
//   }, [sourceCurrency, amount]);

//   return { currency, convertedPrice };
// }

import { useEffect, useState } from "react";

export function useUserCurrency(sourceCurrency: string, amount: number) {
  const [currency, setCurrency] = useState("INR");
  const [convertedPrice, setConvertedPrice] = useState(amount);

  useEffect(() => {
    async function detectCurrency() {
      try {
        // ------------------------------
        // 1) Get user currency (SERVER)
        // ------------------------------
        let cachedCurrency = sessionStorage.getItem("user-currency");

        let userCurrency: string;

        if (cachedCurrency) {
          userCurrency = cachedCurrency;
        } else {
          const res = await fetch("/api/user-currency");
          const data = await res.json();

          userCurrency = data.currency || "INR";
          sessionStorage.setItem("user-currency", userCurrency);
        }

        setCurrency(userCurrency);

        // ------------------------------
        // 2) Exchange rate
        // ------------------------------
        const rateKey = `rate-${sourceCurrency}-${userCurrency}`;
        let cachedRate = sessionStorage.getItem(rateKey);

        let rate: number;

        if (cachedRate) {
          rate = parseFloat(cachedRate);
        } else {
          const ratesRes = await fetch(
            `https://open.er-api.com/v6/latest/${sourceCurrency}`,
          );
          const rateData = await ratesRes.json();

          rate = rateData?.rates?.[userCurrency] ?? 1;
          sessionStorage.setItem(rateKey, rate.toString());
        }

        setConvertedPrice(amount * rate);
      } catch (err) {
        console.error("Currency detection failed", err);
        setCurrency("INR");
        setConvertedPrice(amount);
      }
    }

    detectCurrency();
  }, [sourceCurrency, amount]);

  return { currency, convertedPrice };
}
