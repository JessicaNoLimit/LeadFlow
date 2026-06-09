import type { Metadata } from "next";
import { DocumentationExperience } from "@/components/documentacion/documentation-experience";

export const metadata: Metadata = {
  title: "Documentacion | LeadFlow CRM",
  description:
    "Caso de estudio visual de LeadFlow CRM: arquitectura, flujo comercial, funcionalidades, uso de IA y capturas del proyecto.",
};

export default function DocumentacionPage() {
  return <DocumentationExperience />;
}
