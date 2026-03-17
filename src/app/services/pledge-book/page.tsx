"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import BeforeAfterSection from "./components/BeforeAfterSection";
import TemplateShowcase from "./components/TemplateShowcase";
import PledgePreview from "./components/PledgePreview";
import FeaturesSection from "./components/FeaturesSection";

export default function PledgeBookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BeforeAfterSection />
      <TemplateShowcase />
      <PledgePreview />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
