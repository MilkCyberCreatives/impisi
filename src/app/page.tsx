import HeroSection from "@/components/HeroSection";
import AboutBentoSection from "@/components/AboutBentoSection";
import ShowcaseSplitSection from "@/components/ShowcaseSplitSection";
import PlatformSection from "@/components/PlatformSection";
import ApproachSection from "@/components/ApproachSection";
import GovernanceSection from "@/components/GovernanceSection";
import FooterSection from "@/components/FooterSection";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";

export const metadata = buildPageMetadata({
  title: "Integrated Mining, Beneficiation & Commodity Solutions",
  description:
    "A vertically integrated mining, mineral processing, and commodities group focused on development, operation, and optimisation of mining assets.",
  path: "/",
  keywords: [
    "integrated mining",
    "mineral processing",
    "beneficiation",
    "commodity solutions",
  ],
});

export default function Home() {
  return (
    <main className="-mt-[116px] sm:-mt-[124px]">
      <JsonLd
        data={buildWebPageSchema(
          "/",
          "Integrated Mining, Beneficiation & Commodity Solutions",
          "A vertically integrated mining, mineral processing, and commodities group focused on development, operation, and optimisation of mining assets."
        )}
      />
      <HeroSection />
      <AboutBentoSection />
      <ShowcaseSplitSection />
      <PlatformSection />
      <ApproachSection />
      <GovernanceSection />
      <FooterSection />
    </main>
  );
}
