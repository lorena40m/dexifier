import Image from 'next/image';
import { Swap } from '@/app/types/interface';
import { useWalletList } from '@/app/wallet/useWalletList';
import { useAppSelector } from '@/redux_slice/provider';
import { updateConfirmResponse, updateCustomAddress, updateSwapResponse, updateSwapStatus } from '@/redux_slice/slice/swapSlice';
import { ConnectedWallet, updateSelectedWallets } from '@/redux_slice/slice/walletSlice';
import { X } from 'lucide-react';
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { getAbbrAddress, getAmountFromString } from '@/app/utils/catch-data';
import { WalletType } from '@rango-dev/wallets-shared';
import { confirmRoute } from '@/app/api/rango-api';
import { BlockchainValidationStatus, ConfirmRouteRequest, ConfirmRouteResponse, WalletRequiredAssets } from 'rango-types/mainApi';
import CustomLoader from '../common/loader';
import { toastError } from '@/lib/utils';
import { Input } from '@/components/ui/input';
const customStyles = {
  overlay: {
    backgroundColor: '#000000cc',
    zIndex: '30'
  },
  content: {
    width: '560px',
    maxHeight: '80vh',
    top: '0',
    right: '0',
    transform: `translate(calc(50vw - 280px), 15vh)`,
  },
};
interface ConfirmModalProps {
  isConfirmModalOpen: boolean;
  closeConfirmModal: () => void;
  closeModalAndContinue: () => void;
}

interface singleConfirmWalletProps {
  chain: string;
  index: number;
}

interface ChainWalletProps {
  connectedWallet: ConnectedWallet;
  isSelected: boolean;
  chain: string;
}

export interface SelectedWalletListProps {
  [chain: WalletType]: ConnectedWallet | undefined;
}
const ConfirmModal: FC<ConfirmModalProps> = ({ isConfirmModalOpen, closeConfirmModal, closeModalAndContinue }) => {
  Modal.setAppElement('#root');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { list } = useWalletList({})
  const dispatch = useDispatch();
  const [requiredChain, setRequitedChain] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [confirmResponse, setConfirmResponse] = useState<BlockchainValidationStatus[]>()
  const [selectedWalletsList, setSelectedWalletsList] = useState<SelectedWalletListProps[]>([]);
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const { connectedWallets } = useAppSelector((state) => state.wallet);
  const { customAddress } = useAppSelector((state) => state.swap);
  const lastNumber = selectedRoute?.swaps.length;

  console.log("selectedWalletsList", selectedWalletsList);


  const isValidSelectedWalletList = (selectedWalletsList: SelectedWalletListProps[]) => {
    let isValid = true;
    for (let i = 0; i < selectedWalletsList.length; i++) {
      const selectedWalletList = selectedWalletsList[i];
      const keys = Object.keys(selectedWalletList);
      const key = keys[0];
      if (keys.length !== 1 || selectedWalletList === undefined || selectedWalletList[key] === undefined) {
        isValid = false;
        setConfirmResponse(undefined);
        toastError("error while confirm wallet");
        break
      }
    }
    return isValid;
  }

  const setCustomAddress = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCustomAddress({ customAddress: event.target.value }))
  }

  const confirmWallet = async () => {
    setLoading(true);
    try {
      const isValid = isValidSelectedWalletList(selectedWalletsList);
      if (!isValid) {
        setError(true);
        return;
      }

      const selectedWalletRequest = selectedWalletsList.map((selectedWalletList) => {
        const keys = Object.keys(selectedWalletList);
        const key = keys[0];
        return { [key]: selectedWalletList[key]?.address || "" };
      });

      const selectedWallets = selectedWalletRequest.reduce((acc, curr) => ({ ...acc, ...curr }), {});

      if (selectedWalletsList.length === 0 || selectedRoute?.requestId === undefined || selectedWallets === undefined) {
        return;
      }

      const requestData: ConfirmRouteRequest = {
        requestId: selectedRoute?.requestId,
        selectedWallets: selectedWallets,
        destination: customAddress || undefined
      };

      const selectedWalletObject = selectedWalletsList.map(obj => {
        const [key, value] = Object.entries(obj || [])[0];
        return {
          chain: value?.chain || "",
          address: value?.address || "",
          walletType: value?.walletType || ""
        };
      });

      dispatch(updateSelectedWallets({ selectedWallets: selectedWalletObject }))
      const response = await confirmRoute(requestData);
      setConfirmResponse(response.result?.validationStatus);
      if (response.ok) {
        dispatch(
          updateConfirmResponse({
            confirmResponse: response
          })
        );
      }
      setError(false);
    } catch (error) {
      console.error("Error confirming wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const findRequiredChain = () => {
      if (!selectedRoute) {
        return
      }
      const newFromChain = selectedRoute.swaps.map((swap) => (swap.from.blockchain)
      )
      const newFinalChain = [selectedRoute.swaps[selectedRoute.swaps.length - 1].to.blockchain];
      const tempRequireChain = Array.from(new Set(newFromChain.concat(newFinalChain)))

      setRequitedChain(tempRequireChain);
    }
    findRequiredChain()
  }, [selectedRoute])

  useEffect(() => {
    if (requiredChain.length !== 0) {
      const tempSelectedWallet = requiredChain.map((chain) => {
        const tempconnectedWallet = connectedWallets.find((connectedWallet) => {
          return (connectedWallet.chain === chain)
        })
        return ({ [chain]: tempconnectedWallet })
      })
      setSelectedWalletsList(tempSelectedWallet)
    }
  }, [requiredChain])

  useEffect(() => {
    if (selectedWalletsList.length > 0) {
      confirmWallet();
    }
  }, [selectedWalletsList, customAddress]);

  const SingleConfirmWallet: FC<singleConfirmWalletProps> = ({ chain, index }) => {
    const [validDatas, setValidDatas] = useState<WalletRequiredAssets[]>();
    const validWallet = connectedWallets.filter((connectedWallet) => {
      return (connectedWallet.chain === chain)
    })
    useEffect(() => {
      const validDatas = confirmResponse && confirmResponse.find((response) => {
        return (response.blockchain === chain)
      })?.wallets[0].requiredAssets
      setValidDatas(validDatas);
    }, [confirmResponse])

    return (
      <div key={`confirm ${index}`}>
        <div className="text-sm flex gap-2 mb-2">
          <div className="rounded-full w-[24px] h-[24px] bg-[#13f187] opacity-80 text-center align-center items-center p-auto">{index + 1}</div>
          <span> Your {chain} wallet</span>
        </div>
        <div className="flex p-3 mb-4 overflow-auto">
          {
            validWallet.length === 0 ? <div className="text-[#f44336]"><span className="font-bold">ERROR:</span> You should connect a {chain} supported wallet</div> :
              validWallet.map((connectedWallet) => {
                let isSelected = false;
                for (index = 0; index < selectedWalletsList.length; index++) {
                  const selectedWalletList = selectedWalletsList[index];
                  if (Object.keys(selectedWalletList).includes(chain) &&
                    connectedWallet.address === selectedWalletList[chain]?.address
                    && connectedWallet.walletType === selectedWalletList[chain]?.walletType
                    && connectedWallet.chain === selectedWalletList[chain]?.chain) {
                    isSelected = true;
                    break;
                  }
                }
                return (<ChainWallet key={connectedWallet.address + connectedWallet.walletType} connectedWallet={connectedWallet} isSelected={isSelected} chain={chain} />)
              })
          }
        </div>
        {validDatas && validDatas.map((validData, index) => {
          return (<div key={index} className={`${validData.ok === true ? "text-[#13f187]" : "text-[#f44336]"} text-xs flex flex-col items-center tracking-wide mb-2`}>
            <span>Needed ~{getAmountFromString(validData.requiredAmount.amount, validData.requiredAmount.decimals)} {validData.asset.symbol} for &quot;{validData.reason}&quot; and You have {getAmountFromString(validData.currentAmount.amount, validData.currentAmount.decimals)} {validData.asset.symbol} </span>
          </div>)
        })}
      </div>

    )
  }

  const ChainWallet: FC<ChainWalletProps> = ({ connectedWallet, isSelected, chain }) => {
    const walletLogo = list.find(detail => detail.type === connectedWallet.walletType)?.image;
    const selectConfirmWallet = () => {
      const tempSelectedWalletsList = selectedWalletsList.map((selectedWalletList) => {
        if (Object.keys(selectedWalletList).includes(chain)) {
          return ({ [chain]: connectedWallet });
        } else {
          return selectedWalletList
        }
      })
      setSelectedWalletsList(tempSelectedWalletsList)
    }
    return (
      <button key={connectedWallet.walletType + chain}
        className="flex flex-col items-center align-center m-auto rounded-lg bg-[#67676775] p-6 py-4 gap-2 hover:opacity-80"
        style={{ border: "1px", borderStyle: "solid", borderColor: isSelected ? "#13f187" : "" }}
        onClick={selectConfirmWallet}>
        <Image src={walletLogo || ""}
          alt="button-icon"
          width={64}
          height={64} />
        <div className="text-[#bbbbbb] text-xs flex flex-col items-center align-center">
          <span>{connectedWallet.walletType}</span>
          <span>{getAbbrAddress(connectedWallet.address)}</span>
        </div>
      </button>
    )
  }

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      onRequestClose={closeConfirmModal}
      contentLabel="Example Modal"
      style={customStyles}
      className="bg-gradient-to-b from-black to-[#042214] border rounded-3xl border-seperator z-30 p-6"
    >
      <div className="flex justify-between border-b border-[#5f5f5f] p-2 pt-0">
        <div className="text-2xl font-bold p-2 ">Confirm wallet</div>
        <button onClick={closeConfirmModal}>
          <X className="w-7 h-7 p-0.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
        </button>
      </div>
      {
        selectedRoute && lastNumber && <div className="text-sm font-bold text-center py-2">Confirm Swap
          <span className="text-[#bbbbbb] text-lg"> {parseFloat(selectedRoute.swaps[0].fromAmount).toFixed(3)} </span>
          {selectedRoute.swaps[0].from.symbol} [{selectedRoute.swaps[0].from.blockchain}]
          to <span className="text-[#bbbbbb] text-lg"> {parseFloat(selectedRoute.swaps[lastNumber - 1].toAmount).toFixed(3)} </span>
          {selectedRoute.swaps[lastNumber - 1].to.symbol} [{selectedRoute.swaps[lastNumber - 1].to.blockchain}]
        </div>
      }
      {loading ? <div className="flex items-center justify-center min-h-[30vh]"><CustomLoader /></div> : <div className="overflow-auto "
        style={{ height: `calc(70vh - 200px)` }}>
        {requiredChain && requiredChain.map((chain, index, array) => {
          const isLast = index === array.length - 1;
          return (<SingleConfirmWallet key={index} chain={chain} index={index} />)
        })}

        <div className="flex gap-3 items-center justify-center mb-4">
          <input className="peer w-5 h-5 checked:color-primary color-primary" size={50} type="checkbox" onChange={() => setIsChecked(!isChecked)} />
          <input className="w-[400px] bg-[#ffffff2e] text-sm p-1 opacity-60 rounded-sm border-none outline-none border border-primary focus:ring-0 peer-checked:opacity-90"
            type="text" placeholder={`Choose a custom ${requiredChain[requiredChain.length - 1]} address`} disabled={!isChecked}></input>
        </div>
      </div>
      }
      <div className="flex">
        {!loading && <button className={`border border-[#13f187] w-[150px] h-[50px] rounded-full py-3 px-6 m-auto mt-3 ${error ? "opacity-70" : "hover:opacity-80"}`}
          style={{ backgroundColor: loading ? "" : "#13f187" }}
          disabled={error}
          onClick={closeModalAndContinue}
        >
          <span>continue</span></button>}
      </div>
    </Modal>
  )
}
export default ConfirmModal