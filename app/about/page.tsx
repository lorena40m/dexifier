import ExchangeSection from "../_components/about/exchange";
import PrivacySection from "../_components/about/privacy";
import CustomerSection from "../_components/about/customer";
import SponsorSection from "../_components/about/sponsor";
import CommunitySection from "../_components/about/community";
import FooterSection from "../_components/about/footer";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <main className={cn(inter.className, "max-w-[90rem] mx-auto flex flex-col gap-16 px-5 md:px-10 lg:px-20 xl:px-[100px]")}>
      <ExchangeSection />
      <PrivacySection />
      <CustomerSection />
      <SponsorSection />
      <CommunitySection />
      <FooterSection />
    </main>
  );
}
