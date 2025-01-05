import FooterSection from "../_components/about/footer";
import { PinContainer } from "@/components/ui/3d-pin";
import { FaDiscord } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const SUPPORTS = [
  {
    name: "Discord",
    icon: FaDiscord,
    link: "https://discord.com/invite/phGmRdw6ku",
  },
  {
    name: "Telegram",
    icon: FaTelegramPlane,
    link: "https://t.me/dexifier",
  },
]

export default function SupportPage() {
  return (
    <main className="relative min-h-screen">
      <div className="flex flex-1 min-h-[calc(100vh-232px)] justify-center items-center flex-col md:flex-row gap-[5rem] pt-36">
        {SUPPORTS.map((support, index) => (
          <PinContainer
            key={index}
            title={support.link}
            href={support.link}
            containerClassName="w-[16rem] h-[20rem]"
          >
            <div className="flex basis-full flex-col p-4 sm:basis-1/2 w-[16rem] h-[20rem]">
              <span className="font-semibold text-2xl text-slate-100 text-center pt-4" style={{ wordSpacing: '0.3rem' }}>
                Support us on {support.name}
              </span>
              <support.icon className="m-auto size-24 text-slate-100/70" />
            </div>
          </PinContainer>
        ))}
      </div>
      <FooterSection />
    </main>
  );
}