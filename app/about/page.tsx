import EasyAndInfiniteSection from "../_components/about/easy-and-infinite-section";
import PrivacySection from "../_components/about/privacy-section";
import CustomerSupportSection from "../_components/about/customer-support-section";
import WalletSection from "../_components/about/wallet-section";
import CommunitySection from "../_components/about/community-section";
import FooterSection from "../_components/about/footer-section";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <main className="relative z-1">
      <Image
        src={"/assets/about-us/glow.png"}
        alt="glow"
        width={100}
        height={100}
        className="w-[400px] h-[400px] z-[-1] top-0 left-0 absolute"
      ></Image>
      <div className={`${inter.className} px-5 md:px-10 lg:px-20 xl:px-[7rem]`}>
        <EasyAndInfiniteSection />
        <PrivacySection />
        <CustomerSupportSection />
        <WalletSection />
        <CommunitySection />
      </div>

      <FooterSection />
    </main>
  );
}
