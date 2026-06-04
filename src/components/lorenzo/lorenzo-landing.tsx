import { LorenzoAbout } from "./lorenzo-about";
import { LorenzoContact } from "./lorenzo-contact";
import { LorenzoCta } from "./lorenzo-cta";
import { LorenzoFooter } from "./lorenzo-footer";
import { LorenzoHero } from "./lorenzo-hero";
import { LorenzoInteractions } from "./lorenzo-interactions";
import { LorenzoManifesto } from "./lorenzo-manifesto";
import { LorenzoNavigation } from "./lorenzo-navigation";
import { LorenzoPortfolio } from "./lorenzo-portfolio";
import { LorenzoProcess } from "./lorenzo-process";
import { LorenzoServices } from "./lorenzo-services";
import { LorenzoTestimonial } from "./lorenzo-testimonial";

export function LorenzoLanding() {
  return (
    <main className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] antialiased">
      <LorenzoInteractions />
      <LorenzoNavigation />
      <LorenzoHero />
      <LorenzoManifesto />
      <LorenzoServices />
      <LorenzoPortfolio />
      <LorenzoAbout />
      <LorenzoProcess />
      <LorenzoTestimonial />
      <LorenzoCta />
      <LorenzoContact />
      <LorenzoFooter />
    </main>
  );
}
