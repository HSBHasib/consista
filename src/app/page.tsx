import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/Hero.section";
import { HowItWorksSection } from "@/components/landing/HowItWorks.section";
import { CoreFeaturesSection } from "@/components/landing/CoreFeatures.section";
import { ConsistencySection } from "@/components/landing/Consistency.section";
import { BehavioralInsightsSection } from "@/components/landing/BehavioralInsights.section";
import { TimeHorizonsSection } from "@/components/landing/TimeHorizons.section";
import { YearlyReportSection } from "@/components/landing/YearlyReport.section";
import { ProgressMilestoneSection } from "@/components/landing/ProgressMilestone.section";
import { Footer } from "@/components/layout/Footer.section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <CoreFeaturesSection />
        <ConsistencySection />
        <BehavioralInsightsSection />
        <TimeHorizonsSection />
        <YearlyReportSection />
        <ProgressMilestoneSection />
      </main>
      <Footer />
    </>
  );
}
