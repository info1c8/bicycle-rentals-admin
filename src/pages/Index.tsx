
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/home/hero-section";
import FeaturedBikes from "@/components/home/featured-bikes";
import HowItWorks from "@/components/home/how-it-works";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedBikes />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
