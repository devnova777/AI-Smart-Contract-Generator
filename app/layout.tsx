import "./globals.css";
import type { ReactNode } from "react";
export const metadata = {
  title: "AI Smart Contract Generator",
  description: "Generate smart contract templates (Cardano, Solidity) with AI-like prompts"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

