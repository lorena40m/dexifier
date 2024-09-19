import { TokenBalance } from "@/redux_slice/slice/browserSlice/walletSlice";
import { InstallObjects } from "@rango-dev/wallets-shared";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { tree } from "next/dist/build/templates/app-page";
import { BlockchainMeta } from "rango-types";
import { updateFilterChain, updateFilterEmptyWallet, updateFilterSmallBalance, updateFilterUnsupportedToken, updateFilterWallet } from "@/redux_slice/slice/browserSlice/filterSlice";
import { useAppSelector } from "@/redux_slice/provider";

// Define wallet interface based on ConnectedWallet
interface WalletOption {
  balances: TokenBalance[] | null;
  address: string;
  chain: string;
  explorerUrl: string | null;
  walletType: string;
  selected: boolean;
  loading: boolean;
  error: boolean;
  title: string;
  image: string | null;
  link: string | InstallObjects | null; // Allow both string and InstallObjects
}

interface WalletSelectorProps {
  walletOptions: WalletOption[];
}

// Define the BlockchainOption interface above
interface BlockchainSelectorProps {
  blockchainOptions: BlockchainMeta[];
}

interface HideFilterSelectorrProps {
  filterOptions: string[]
}


export const WalletSelector: React.FC<WalletSelectorProps> = ({ walletOptions }) => {
  const dispatch = useDispatch();
  const [selectedWallets, setSelectedWallets] = useState<WalletOption[]>(walletOptions.map((wallet) => ({ ...wallet, selected: true })))
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close dropdown if click outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to toggle a wallet's selected status
  const toggleWallet = (walletType: string) => {
    const updatedWallets = selectedWallets.map((wallet, i) =>
      wallet.walletType === walletType ? { ...wallet, selected: !wallet.selected } : wallet
    );
    const tempfilterWalletList = updatedWallets.filter((updatedWallet) => updatedWallet.selected).map((wallet) => wallet.walletType)
    setSelectedWallets(updatedWallets);
    dispatch(updateFilterWallet({ filterWalletList: tempfilterWalletList }));
  };

  // Filtered wallets based on the search term
  const filteredWallets = selectedWallets.filter(wallet =>
    wallet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get selected wallet data
  const getSelectedWallets = () => {
    return selectedWallets.filter(wallet => wallet.selected);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        className="bg-[#13F187] text-white py-2 px-4 rounded-lg w-full text-left flex items-center justify-between hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
        {getSelectedWallets().length > 0 ? (
          <div className="flex items-center justify-between">
            {getSelectedWallets().map((wallet, index) => (
              <div key={index} style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 40 }}>
                <Image
                  src={wallet.image || ""}
                  alt="button-icon"
                  width={25}
                  height={25}
                  style={{ translate: `${1 + 0.6 * index * 25}px` }} // slightly increase size
                />
              </div>
            ))}

          </div>
        ) : (
          "No Wallets"
        )}
        <span className="ml-2">
          {getSelectedWallets().length > 0 && <span >{getSelectedWallets().length} / {walletOptions.length} wallets</span>}
          <span>{isOpen ? "▲" : "▼"}</span></span>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute z-40 bg-primary-dark border border-gray-300 mt-2 rounded-lg shadow-lg w-[350px]">
          <div className="px-4 py-1 text-gray-500 border-b">Your Wallets</div>

          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search wallets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border rounded-lg text-border focus:outline-none focus:ring-2 focus:ring-[#13F187]"
            />
          </div>

          {/* Wallets list */}
          <div className="p-2 max-h-60 overflow-y-auto">
            {filteredWallets.map((wallet, index) => (
              <button onClick={() => toggleWallet(wallet.walletType)} key={wallet.walletType}
                className="flex w-full items-center justify-between mb-2 p-1 px-2 rounded-lg hover:opacity-80 hover:bg-[#087140]">
                <div className="flex items-center">
                  <Image src={wallet.image ?? ""} alt={wallet.title} width={25} height={25} className="h-6 w-6 mr-3" />
                  <span>{wallet.title}</span>
                </div>
                <input
                  type="checkbox"
                  checked={wallet.selected}
                  className="form-checkbox h-5 w-5 text-[#13F187]"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export const BlockchainSelector: React.FC<BlockchainSelectorProps> = ({ blockchainOptions }) => {
  const dispatch = useDispatch();
  const [selectedBlockchains, setSelectedBlockchains] = useState<BlockchainMeta[]>(blockchainOptions);
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close dropdown if click outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to toggle a blockchain's selected status
  const toggleBlockchain = (displayName: string) => {
    const updatedBlockchains = selectedBlockchains.map((blockchain, i) =>
      blockchain.displayName === displayName ? { ...blockchain, enabled: !blockchain.enabled } : blockchain
    );
    const filterChainList = updatedBlockchains.filter((updatedBlockchain) => updatedBlockchain.enabled).map((chain) => chain.name)
    setSelectedBlockchains(updatedBlockchains);
    dispatch(updateFilterChain({ filterChainList: filterChainList }));
  };

  // Filtered blockchains based on the search term
  const filteredBlockchains = selectedBlockchains.filter(blockchain =>
    blockchain.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get selected blockchain data
  const getSelectedBlockchains = () => {
    return selectedBlockchains.filter(blockchain => blockchain.enabled);
  };

  const totalSelect = (isAllSelect: boolean) => {
    const updatedBlockchains = blockchainOptions.map((blockchain, i) =>
      ({ ...blockchain, enabled: isAllSelect })
    );
    const filterChainList = updatedBlockchains.filter((updatedBlockchain) => updatedBlockchain.enabled).map((chain) => chain.name)
    setSelectedBlockchains(updatedBlockchains);
    dispatch(updateFilterChain({ filterChainList: filterChainList }));
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        className="bg-[#13F187] text-white py-2 px-4 rounded-lg w-full text-left flex items-center justify-between hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
        {getSelectedBlockchains().length > 0 ? (
          <div className="flex items-center">
            {(getSelectedBlockchains().length > 2 ? getSelectedBlockchains().slice(0, 2) : getSelectedBlockchains()).map((blockchain, index) => (
              <div key={index} style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 40 }}>
                <Image
                  src={blockchain.logo || ""}
                  alt="button-icon"
                  width={25}
                  height={25}
                  style={{ translate: `${1 + 0.6 * index * 25}px` }} // slightly increase size
                />
              </div>
            ))}
            <span></span>
          </div>
        ) : (
          "No Blockchains"
        )}
        <span className="ml-2">
          {getSelectedBlockchains().length > 0 && <span >{getSelectedBlockchains().length} / {blockchainOptions.length} chains</span>}
          {isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute right-0 z-40 bg-primary-dark border border-gray-300 mt-2 rounded-lg shadow-lg w-[350px]">
          <div className="px-4 py-2 text-gray-500 border-b flex justify-between">
            <span>Your Blockchains</span>
            <span className="text-white">
              {getSelectedBlockchains().length !== blockchainOptions.length ?
                <button onClick={() => totalSelect(true)}>Sellect All</button> :
                <button onClick={() => totalSelect(false)}>Delete All</button>
              }
            </span>
          </div>


          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search Blockchains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border rounded-lg text-border focus:outline-none focus:ring-2 focus:ring-[#13F187]"
            />
          </div>

          {/* Blockchain list */}
          <div className="p-2 max-h-60 overflow-y-auto">
            {filteredBlockchains.map((blockchain, index) => (
              <button onClick={() => toggleBlockchain(blockchain.displayName)} key={blockchain.chainId || index}
                className="flex w-full items-center justify-between p-1 px-2 rounded-lg mb-2 hover:opacity-80 hover:bg-[#087140]">
                <div className="flex items-center">
                  <Image src={blockchain.logo} alt={blockchain.displayName} width={25} height={25} className="h-6 w-6 mr-3" />
                  <span>{blockchain.displayName}</span>
                </div>
                <input
                  type="checkbox"
                  checked={blockchain.enabled}
                  className="form-checkbox h-5 w-5 text-[#13F187]"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export const HideFilterSelector: React.FC<HideFilterSelectorrProps> = ({ filterOptions }) => {
  const dispatch = useDispatch();
  const { isHideSmallBalance, isHideEmptyWallet, isHideUnsupportedToken } = useAppSelector((state) => state.filter);
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close dropdown if click outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelector = (index: number) => {
    if (index === 0) {
      dispatch(updateFilterSmallBalance({ isHideSmallBalance: !isHideSmallBalance }));
    } else if (index === 1) {
      dispatch(updateFilterEmptyWallet({ isHideEmptyWallet: !isHideEmptyWallet }));
    } else if (index === 2) {
      dispatch(updateFilterUnsupportedToken({ isHideUnsupportedToken: !isHideUnsupportedToken }));
    }
  }

  const getStatus = (index: number) => {
    if (index === 0) {
      return isHideSmallBalance
    } else if (index === 1) {
      return isHideEmptyWallet
    } else if (index === 2) {
      return isHideUnsupportedToken
    } else {
      console.log("error while select filter");
      return
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        className="bg-[#13F187] text-white py-2 px-4 rounded-lg w-full text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
        <span className="bg-primary">...</span>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute right-0 z-40 bg-primary-dark border border-gray-300 mt-2 rounded-lg shadow-lg w-[255px]">
          <div className="px-4 py-2 text-gray-500 border-b flex justify-between">
            <span>More</span>
          </div>

          {/* Blockchain list */}
          <div className="p-2 max-h-60 overflow-y-auto">
            {filterOptions.map((filterText, index) => (
              <button onClick={() => toggleSelector(index)} key={filterText || index}
                className="flex w-full gap-1 items-center mb-2 p-1 px-2 rounded-lg hover:bg-[#087140] hover:opacity-80">

                <input
                  type="checkbox"
                  checked={getStatus(index)}
                  className="form-checkbox h-5 w-5 text-[#13F187]"
                />
                <div className="flex items-center">
                  <span>{filterText}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
