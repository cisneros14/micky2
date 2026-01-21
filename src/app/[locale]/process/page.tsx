"use client";

import { ProcessSection } from "@/components/process-section";
import CallToActionBanner from "@/components/CallToActionBanner";

export default function ProcessPage() {
  return (
    <main className="min-h-screen pt-20">
      <ProcessSection />
      <div className="py-12">
        <CallToActionBanner />
      </div>
    </main>
  );
}
