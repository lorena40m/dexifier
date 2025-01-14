import { swapSDK } from '@/lib/utils';

export type DepositAddressResponseV2 = Awaited<ReturnType<typeof swapSDK.requestDepositAddressV2>>;