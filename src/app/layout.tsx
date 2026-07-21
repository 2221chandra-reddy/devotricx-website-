import type { Metadata } from "next";
import { Orbitron, Poppins, Space_Grotesk } from "next/font/google";
import ClickHearts from "@/components/ClickHearts";
import MouseGlow from "@/components/MouseGlow";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DevotricX Technologies | Immersive Digital Experiences",
  description:
    "DevotricX Technologies Private Limited delivers premium 2D & 3D animation, VR & AR, web solutions, and e-learning from Hyderabad, India.",
  keywords: [
    "DevotricX",
    "2D Animation",
    "3D Animation",
    "VR",
    "AR",
    "Web Development",
    "e-Learning",
    "Hyderabad",
  ],
  openGraph: {
    title: "DevotricX Technologies",
    description:
      "Premium 2D & 3D animation, VR & AR, web solutions, and e-learning experiences.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevotricX Technologies",
    description:
      "Premium 2D & 3D animation, VR & AR, web solutions, and e-learning experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${poppins.variable} ${spaceGrotesk.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10001] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <MouseGlow />
          <ClickHearts />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
