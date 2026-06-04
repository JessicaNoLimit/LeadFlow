import type { Metadata } from "next";
import { LorenzoLanding } from "@/components/lorenzo/lorenzo-landing";

export const metadata: Metadata = {
  title: "Lorenzo Bellucci | Fotografia Editorial y de Lujo",
  description:
    "Landing editorial premium para Lorenzo Bellucci Studio, especializada en fotografia atemporal, retratos, bodas exclusivas y marca personal.",
};

export default function HomePage() {
  return <LorenzoLanding />;
}
