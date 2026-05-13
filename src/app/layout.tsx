import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "LeadFlow | Lorenzo Bellucci Studio",
  description:
    "Base frontend editorial para la web pública y el futuro CRM privado de Lorenzo Bellucci Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-ink text-ivory">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(215,198,168,0.16),_transparent_30%),linear-gradient(180deg,_rgba(255,250,242,0.03)_0%,_rgba(7,7,7,0)_18%,_rgba(7,7,7,0.55)_100%)]" />
          <SiteHeader />
          <main className="relative flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
