import BreadcrumbHero from "@/components/BreadcrumbHero";
import ContactSection from "@/components/contact/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbHero
        title="Contact"
        subtitle="Reach out for discussions on mining operations, exploration, beneficiation, commodity trading, and project development."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <ContactSection />

      <FooterSection />
    </main>
  );
}
