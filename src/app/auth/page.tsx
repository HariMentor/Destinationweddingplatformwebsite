import { Metadata } from "next";
import AuthPageClient from "./AuthPageClient";

export const metadata: Metadata = {
  title: "Login - Wedzway | Destination Wedding Planning Platform",
  description: "Login to your Wedzway account to plan your dream destination wedding. Secure OTP-based authentication with no password required.",
  keywords: "wedzway login, wedding planner login, destination wedding account, OTP login",
  openGraph: {
    title: "Login - Wedzway",
    description: "Login to your Wedzway account to plan your dream destination wedding.",
    type: "website",
  },
};

export default function AuthPageRoute() {
  return <AuthPageClient />;
}
