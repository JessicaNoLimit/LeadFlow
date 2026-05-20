import type { Metadata } from "next";
import "./globals.css";
import { ToastViewport } from "@/components/ui/toast-viewport";

export const metadata: Metadata = {
  title: "LeadFlow | Lorenzo Bellucci Studio",
  description:
    "Base frontend editorial para la web publica y el futuro CRM privado de Lorenzo Bellucci Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-ink text-ivory">
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
