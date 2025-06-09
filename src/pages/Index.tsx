import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/home/hero-section";
import FeaturedBikes from "@/components/home/featured-bikes";
import HowItWorks from "@/components/home/how-it-works";
import StatsSection from "@/components/home/stats-section";
import ServicesSection from "@/components/home/services-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import PricingSection from "@/components/home/pricing-section";
import LocationsSection from "@/components/home/locations-section";
import NewsSection from "@/components/home/news-section";
import PartnersSection from "@/components/home/partners-section";
import FAQSection from "@/components/home/faq-section";
import ContactSection from "@/components/home/contact-section";
import PromotionsSection from "@/components/home/promotions-section";
import SafetySection from "@/components/home/safety-section";
import RoutesSection from "@/components/home/routes-section";
import AppDownloadSection from "@/components/home/app-download-section";
import SocialProofSection from "@/components/home/social-proof-section";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeaturedBikes />
        <HowItWorks />
        <ServicesSection />
        <PromotionsSection />
        <PricingSection />
        <TestimonialsSection />
        <LocationsSection />
        <RoutesSection />
        <SafetySection />
        <NewsSection />
        <FAQSection />
        <PartnersSection />
        <SocialProofSection />
        <AppDownloadSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;