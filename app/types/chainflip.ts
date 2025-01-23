import { chainflipSDK } from '@/lib/utils';

export type DepositAddressResponseV2 = Awaited<ReturnType<typeof chainflipSDK.requestDepositAddressV2>>;