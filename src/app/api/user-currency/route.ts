import { NextResponse } from "next/server";
import countryToCurrency from "country-to-currency";

export async function GET() {
  try {
    const res = await fetch("https://ipwho.is/", {
      cache: "no-store",
    });

    const data = await res.json();

    const countryCode = data?.country_code || "IN";
    const currency = countryToCurrency[countryCode] || "INR";

    return NextResponse.json({
      countryCode,
      currency,
    });
  } catch (error) {
    return NextResponse.json({
      countryCode: "IN",
      currency: "INR",
    });
  }
}
