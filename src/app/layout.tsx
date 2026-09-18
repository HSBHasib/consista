import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consista — Build Habits That Last a Lifetime",
  description:
    "Consista helps you track consistency, visualize progress, and unlock behavioral insights — turning daily actions into lasting growth.",
  keywords: [
    "habit tracker",
    "productivity",
    "consistency",
    "behavioral insights",
    "personal growth",
    "goal tracking",
  ],
  openGraph: {
    title: "Consista — Build Habits That Last a Lifetime",
    description:
      "Track consistency, visualize progress, and unlock behavioral insights.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
