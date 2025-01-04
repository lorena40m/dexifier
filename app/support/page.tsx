import FooterSection from "../_components/about/footer";
import FollowUsSection from "../_components/support/follow-us-section";
import JoinCommunitySection from "../_components/support/join-community-section";
import FormSection from "../_components/support/form-section";

export default function SupportPage() {
  return (
    <main className="z-1">
      <div
        className={`min-h-[80vh] container mx-auto mb-[7.9375rem] pt-36 md:pt-44 lg:pt-52 xl:pt-[15.4375rem] px-4 flex flex-col lg:flex-row gap-7`}
      >
        <div className="lg:w-8/12">
          <FormSection />
        </div>

        <div className="lg:w-4/12 flex flex-col sm:flex-row lg:flex-col gap-[1.5625rem] justify-center">
          <FollowUsSection />
          <JoinCommunitySection />
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
