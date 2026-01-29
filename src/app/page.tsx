import HeroSection from "@/components/HeroSection";
import AboutBentoSection from "@/components/AboutBentoSection";
import ShowcaseSplitSection from "@/components/ShowcaseSplitSection";
import PlatformSection from "@/components/PlatformSection";
import ApproachSection from "@/components/ApproachSection";
import GovernanceSection from "@/components/GovernanceSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="-mt-[116px] sm:-mt-[124px]">
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
