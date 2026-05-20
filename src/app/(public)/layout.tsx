import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(215,198,168,0.16),_transparent_30%),linear-gradient(180deg,_rgba(255,250,242,0.03)_0%,_rgba(7,7,7,0)_18%,_rgba(7,7,7,0.55)_100%)]" />
      <SiteHeader />
      <main className="relative flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
