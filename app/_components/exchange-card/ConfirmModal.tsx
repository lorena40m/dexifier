import Image from 'next/image';
import { useWalletList } from '@/app/wallet/useWalletList';
import { useAppSelector } from '@/redux_slice/provider';
import { updateConfirmResponse, updateCustomAddress } from '@/redux_slice/slice/browserSlice/swapSlice';
import { ConnectedWallet, updateRequiredChain, updateSelectedWallets } from '@/redux_slice/slice/browserSlice/walletSlice';
import { X } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { useDispatch } from 'react-redux';
import { getAbbrAddress, getAmountFromString } from '@/app/utils/catch-data';
import { WalletType } from '@rango-dev/wallets-shared';
import { confirmRoute } from '@/app/api/rango-api';
import { BlockchainValidationStatus, ConfirmRouteRequest } from 'rango-types/mainApi';
import CustomLoader from '../common/loader';
import { toastError } from '@/lib/utils';
import ShadowDecoration from '../common/shadow-decoration';
import { ConfirmMessage } from '@/app/types/interface';
import ButtonCopyIcon from '../common/coyp-button-icon';
import ReactModal from 'react-modal';

// const customStyles = {
//   overlay: {
//     backgroundColor: '#000000cc',
//     zIndex: '30'
//   },
//   content: {
//     maxWidth: '560px',
//     maxHeight: '80vh',
//     top: '0',
//     right: '0',
//     transform: `translate(calc(50vw - 280px), 15vh)`,
//   },
// };

const customStyles: Styles = {
  overlay: {
    backgroundColor: '#000000cc',
    zIndex: '30',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'relative',  // 'absolute' could cause issues inside a flex container
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    maxHeight: '80vh',
    width: '90vw',  // Full width on smaller screens
    maxWidth: '560px',  // For larger screens
    padding: '1.5rem',
    margin: 'auto',  // Centering inside the flex container
    borderRadius: '15px',
    overflow: 'auto',
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
  isDisable: boolean;
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
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [confirmValidation, setConfirmValidation] = useState<BlockchainValidationStatus[]>()
  const [selectedWalletsList, setSelectedWalletsList] = useState<SelectedWalletListProps[]>([]);
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const { connectedWallets, refOfConnectButton } = useAppSelector((state) => state.wallet);
  const { filterLoading } = useAppSelector((state) => state.filter);
  const { customAddress, confirmResponse } = useAppSelector((state) => state.swap);
  const lastNumber = selectedRoute?.swaps.length;

  const isValidSelectedWalletList = (selectedWalletsList: SelectedWalletListProps[]) => {
    let isValid = true;
    for (let i = 0; i < selectedWalletsList.length; i++) {
      const selectedWalletList = selectedWalletsList[i];
      const keys = Object.keys(selectedWalletList);
      const key = keys[0];
      if (keys.length !== 1 || selectedWalletList === undefined || selectedWalletList[key] === undefined) {
        isValid = false;
        setConfirmValidation(undefined);
        toastError("error while confirm wallet");
        break
      }
    }
    return isValid;
  }

  const onClickWalletButton = (chain: string) => {
    setIsFetched(false);
    setConfirmValidation(undefined);
    if (refOfConnectButton) {
      dispatch(updateRequiredChain({ requiredChain: chain }))
      refOfConnectButton.click()
    }
  }

  const setCustomAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const customAddress = event.target.value;
    setTimeout(() => {
      dispatch(updateCustomAddress({ customAddress }));
    }, 1500);
  }

  const onCheckBox = () => {
    if (isChecked) {
      dispatch(updateCustomAddress({ customAddress: null }));
    }
    setIsFetched(false)
    setIsChecked(!isChecked)
  }
  const closeModalAndContinueHandler = () => {
    setIsChecked(false);
    setError(false);
    setIsFetched(false);
    dispatch(updateCustomAddress({ customAddress: null }));
    dispatch(updateRequiredChain({ requiredChain: "" }));
    setConfirmValidation(undefined);
    closeModalAndContinue();
  }

  const closeConfirmModalHandler = () => {
    setIsChecked(false);
    setError(false);
    setIsFetched(false);
    dispatch(updateCustomAddress({ customAddress: null }));
    dispatch(updateRequiredChain({ requiredChain: "" }));
    setConfirmValidation(undefined);
    dispatch(
      updateConfirmResponse({
        confirmResponse: undefined
      })
    );
    closeConfirmModal();
  }
  // confirm function ______________________________________________________________________________________________

  const confirmWallet = async (customAddress: string | null) => {
    if (!isConfirmModalOpen) {
      return
    }
    if (isChecked) {
      if (customAddress === null || customAddress === "") {
        toastError("Please enter custom Address")
        setError(true)
        return
      }
    }
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

      if (selectedWalletsList.length === 0 ||
        selectedRoute?.requestId === undefined ||
        selectedWallets === undefined
      ) {
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

      setConfirmValidation(response.result?.validationStatus);
      if (!response.ok) {
        setError(true);
      } else {
        setError(false);
        setIsFetched(true);
      }
      dispatch(
        updateConfirmResponse({
          confirmResponse: response
        })
      );
    } catch (error) {
      console.error("Error confirming wallet:", error);
      setIsFetched(false);
    } finally {
      setLoading(false);
    }
  };

  //  useEffect part______________________________________________________________________________________________

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

  // useEffect(() => {
  //   if (selectedWalletsList.length > 0) {
  //     confirmWallet().then().catch(console.log);
  //   }
  // }, [selectedWalletsList, isConfirmModalOpen]);

  // SingleConfirmWallet Component______________________________________________________________________________

  const SingleConfirmWallet: FC<singleConfirmWalletProps> = ({ chain, index, isDisable }) => {
    const validWallet = connectedWallets.filter((connectedWallet) => {
      return (connectedWallet.chain === chain)
    })

    const validDatas = confirmValidation && confirmValidation.find((response) => {
      return (response.blockchain === chain)
    })?.wallets[0].requiredAssets

    return (
      <div key={`confirm ${index}`}>
        <div className="text-sm flex gap-2 mb-2">
          <div className="rounded-full w-[24px] h-[24px] bg-[#13f187] text-black font-bold text-center align-center items-center p-auto">
            {index + 1}
          </div>
          <div className="flex gap-2 items-center">
            <span> Your {chain} wallet</span>
          </div>
        </div>

        {
          !isDisable &&
          <div className="flex p-3 mb-4 overflow-auto gap-3 items-center justify-center">
            {
              validWallet.length === 0 ? <div className='flex flex-col items-center justify-center gap-3'> <div className="text-error">
                <span className="font-bold w-full">ERROR:</span> You should connect a {chain} supported wallet
              </div>
                <button
                  className="flex h-[124px] w-[100px] flex-col text-center items-center align-center rounded-lg bg-modal p-2 gap-2 hover:opacity-80"
                  style={{ border: "1px", borderStyle: "solid" }}
                  onClick={() => onClickWalletButton(chain)}>
                  <span className='m-auto text-sm'>
                    More wallets...
                  </span>
                </button>
              </div> : <div className="flex items-center justify-center gap-3">
                {validWallet.map((connectedWallet) => {
                  let isSelected = false;
                  for (index = 0; index < selectedWalletsList.length; index++) {
                    const selectedWalletList = selectedWalletsList[index];
                    if (Object.keys(selectedWalletList).includes(chain) &&
                      connectedWallet.address === selectedWalletList[chain]?.address &&
                      connectedWallet.walletType === selectedWalletList[chain]?.walletType &&
                      connectedWallet.chain === selectedWalletList[chain]?.chain) {
                      isSelected = true;
                      break;
                    }
                  }
                  return (
                    <ChainWallet
                      key={connectedWallet.address + connectedWallet.walletType}
                      connectedWallet={connectedWallet}
                      isSelected={isSelected}
                      chain={chain}
                    />
                  )
                })}
                <button
                  className="flex h-[124px] w-[100px] flex-col text-center items-center align-center rounded-lg bg-modal p-2 gap-2 hover:opacity-80"
                  style={{ border: "1px", borderStyle: "solid" }}
                  onClick={() => onClickWalletButton(chain)}>
                  <span className='m-auto text-sm'>
                    More wallets...
                  </span>
                </button></div>
            }
          </div>
        }

        {
          validDatas && validDatas.map((validData, index) => {
            return (
              <div
                key={index}
                className={`${validData.ok ? "text-[#13f187]" : "text-error"} text-xs font-bold flex flex-col items-center tracking-wide mb-2`}
              >
                <span>Needed &nbsp; &asymp; {getAmountFromString(validData.requiredAmount.amount, validData.requiredAmount.decimals)} {validData.asset.symbol} for &nbsp;
                  {ConfirmMessage[validData.reason]} &nbsp;
                  and You have {getAmountFromString(validData.currentAmount.amount, validData.currentAmount.decimals)} {validData.asset.symbol} </span>
              </div>)
          })
        }
      </div >

    )
  }

  // ChainWallet Component______________________________________________________________________________

  const ChainWallet: FC<ChainWalletProps> = ({ connectedWallet, isSelected, chain }) => {

    const walletLogo = list.find(detail => detail.type === connectedWallet.walletType)?.image;

    const selectConfirmWallet = () => {
      setIsFetched(false);
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
        className="flex flex-col items-center align-center m-auto rounded-lg bg-modal p-2 py-3 gap-2 hover:opacity-80"
        style={{ border: "1px", borderStyle: "solid", borderColor: isSelected ? "#13f187" : "" }}
        onClick={selectConfirmWallet}>
        <Image src={walletLogo || ""}
          alt="button-icon"
          width={48}
          height={48} />
        <div className="text-[#bbbbbb] text-sm flex flex-col items-center align-center">
          <span>
            {connectedWallet.walletType}
          </span>
          <span className="flex items-center text-[10px] md:text-xs gap-1">
            <span>{getAbbrAddress(connectedWallet.address)}</span>
            <div className='w-[12px] h-[12px] md:w-[22px], md:h-[22px] flex items-center'>
              <ButtonCopyIcon text={connectedWallet.address} />
            </div>
          </span>
        </div>
      </button>
    )
  }

  // _________________________________________________________________________________________________________________________________

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      onRequestClose={closeConfirmModalHandler}
      contentLabel="Example Modal"
      style={customStyles}
      className="bg-gradient-to-b from-[#001109] to-[#072919] border rounded-3xl border-seperator z-30 p-6 max-w-[90vw] sm:max-w-[560px] mx-auto"
    >
      <div className="flex justify-between border-b border-[#5f5f5f] p-2 pt-0">
        <div className="text-2xl font-bold p-2 ">
          Confirm wallet
        </div>
        <button
          onClick={closeConfirmModalHandler}>
          <X className="w-7 h-7 p-0.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
        </button>
      </div>
      <div className='flex items-center justify-around'>
        {
          selectedRoute && lastNumber && <div className="text-sm font-bold text-center py-2">Confirm Swap &nbsp;
            <span className="text-[#bbbbbb] text-lg">
              {parseFloat(selectedRoute.swaps[0].fromAmount).toFixed(2)} &nbsp;
            </span>
            {selectedRoute.swaps[0].from.symbol} [{selectedRoute.swaps[0].from.blockchain}] to &nbsp;
            <span className="text-[#bbbbbb] text-lg"> {parseFloat(selectedRoute.swaps[lastNumber - 1].toAmount).toFixed(2)} &nbsp;</span>
            {selectedRoute.swaps[lastNumber - 1].to.symbol} [{selectedRoute.swaps[lastNumber - 1].to.blockchain}]
          </div>
        }
        <button className="w-[30px] px-1" onClick={() => confirmWallet(customAddress)}>
          <Image src={"/assets/icons/reset-icon.png"} width={20} height={20} alt="refresh" />
        </button>
      </div>
      <div className="relative">
        {!(loading || filterLoading) && <ShadowDecoration />}
        <div className="overflow-auto bg-[#0625175c] pl-2 py-2"
          style={{ height: `calc(72vh - 200px)` }}>
          {
            loading || filterLoading ?
              <div className="flex items-center justify-center min-h-[30vh]">
                <CustomLoader />
              </div> :
              (requiredChain && requiredChain.map((chain, index, array) => {
                const isLast = index === array.length - 1;
                const isRequired = selectedRoute?.swaps.find((swap) => swap.from.blockchain === chain) !== undefined;
                const isDisable = (isLast && isChecked && !isRequired);
                return (
                  <SingleConfirmWallet
                    key={index}
                    chain={chain}
                    index={index}
                    isDisable={isDisable}
                  />
                )
              }))
          }
          <div className="flex flex-col" style={{ visibility: loading || filterLoading ? "hidden" : "visible" }}>
            {
              confirmResponse?.error &&
              <span className="text-error font-bold text-xs flex flex-col items-center tracking-wide mb-2">
                {confirmResponse.error}
              </span>
            }
            <div className="flex gap-3 items-center justify-center mb-4">
              <input className="peer w-5 h-5 checked:color-primary color-primary"
                size={50}
                type="checkbox"
                checked={isChecked}
                onChange={onCheckBox} />
              <input className="w-[400px] bg-[#ffffff2e] text-sm p-1 opacity-60 rounded-sm border-none outline-none border border-primary focus:ring-0 peer-checked:opacity-90"
                type="text"
                placeholder={`Choose a custom ${requiredChain[requiredChain.length - 1]} address`}
                disabled={!isChecked}
                onChange={(e) => setCustomAddress(e)}>
              </input>
            </div>
          </div>
        </div>
      </div>


      <div className="flex">
        {!(loading || filterLoading) && (isFetched && !(confirmResponse?.result === null || confirmResponse?.result === undefined) ?
          <button
            className={`border border-[#13f187] min-w-[150px] h-[50px] rounded-lg m-auto mt-3 ${error ? "opacity-70" : "hover:opacity-80"}`}
            style={{ backgroundColor: loading || filterLoading ? "" : "#13f187" }}
            disabled={error || confirmResponse?.result === null || confirmResponse?.result === undefined}
            onClick={closeModalAndContinueHandler}
          >
            <span className="text-xl px-3 text-black font-bold">Preceed Anyway</span></button> :
          <button
            className={`border border-[#13f187] min-w-[150px] h-[50px] disabled:opacity-70 rounded-lg m-auto mt-3`}
            style={{ backgroundColor: loading || filterLoading ? "" : "#13f187" }}
            disabled={isChecked && (customAddress === null || customAddress === "")}
            onClick={() => confirmWallet(customAddress).catch(console.log)}
          >
            <span className="text-xl px-3 text-black font-bold">Confirm Wallet</span></button>)}
      </div>
    </Modal>
  )
}
export default ConfirmModal