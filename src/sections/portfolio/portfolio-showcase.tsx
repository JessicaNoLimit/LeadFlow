import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function PortfolioShowcase() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ImagePlaceholder label="Editorial Portraits" className="xl:row-span-2" />
          <ImagePlaceholder label="Quiet Motion" aspect="landscape" />
          <ImagePlaceholder label="Destination Light" aspect="landscape" />
          <ImagePlaceholder label="Studio Texture" />
          <ImagePlaceholder label="Private Celebration" aspect="landscape" />
          <ImagePlaceholder label="Modern Legacy" />
        </div>
      </Container>
    </section>
  );
}
