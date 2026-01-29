import HeroSection from "@/components/HeroSection";
import AboutBentoSection from "@/components/AboutBentoSection";
import ShowcaseSplitSection from "@/components/ShowcaseSplitSection";
import PlatformSection from "@/components/PlatformSection";
import ApproachSection from "@/components/ApproachSection";
import GovernanceSection from "@/components/GovernanceSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutBentoSection />
      <ShowcaseSplitSection />
      <PlatformSection />
      <ApproachSection />
      <GovernanceSection />

      {/* Footer + scroll-to-top */}
      <FooterSection />
    </main>
  );
}
