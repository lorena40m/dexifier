import Image from "next/image";
import React from "react";

const WalletSection = () => {
  const wallets = [
    { id: 1, name: "XDEFI" },
    { id: 2, name: "Metamask" },
    { id: 3, name: "Phantom" },
    { id: 4, name: "Keplr" },
    { id: 5, name: "Tronlink" },
    { id: 6, name: "Apptopia" },
    { id: 7, name: "Rango" },
    { id: 8, name: "Thor" },
    { id: 9, name: "Maya" },
    { id: 10, name: "1Inch" },
    { id: 11, name: "Across" },
  ];
  return (
    <section className="pt-[6.875rem] flex flex-col lg:flex-row gap-[9.5rem]">
      <div className="flex flex-col">
        <h1 className=" pb-10 lg:pb-[3.75rem] font-bold text-xl sm:text-3xl lg:text-[2.5rem] text-center lg:text-left leading-10 sm:leading-[3.5rem]">
          <span className="text-primary">Wallets</span> & Projects supported
        </h1>

        <Image
          src={"/assets/about-us/wallet.png"}
          width={431}
          height={357}
          alt="Wallet"
          className="self-center"
        />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 items-center justify-center gap-x-5 sm:gap-x-10 xl:gap-x-[4.375rem] gap-y-[2.1875rem] ">
        {wallets.map((wallet) => (
          <Image
            key={wallet.id}
            src={`/assets/about-us/wallet-icon-${wallet.id}.svg`}
            alt={wallet.name}
            width={156}
            height={120}
          />
        ))}

        <div className="text-primary font-medium text-base sm:text-2xl lg:text-3xl">
          Many More...
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
