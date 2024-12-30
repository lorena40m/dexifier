import { SwapProvider } from "@/app/providers/SwapProvider"

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SwapProvider>
      {children}
    </SwapProvider>
  )
}