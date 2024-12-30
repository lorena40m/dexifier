import { ExchangeProvider } from "@/app/providers/ExchangeProvider"

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ExchangeProvider>
      {children}
    </ExchangeProvider>
  )
}