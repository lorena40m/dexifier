export default function DexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-screen p-4 pt-32 md:bg-[url('/assets/background.png')] bg-cover">
      <div className="fixed inset-0 w-screen h-screen md:hidden -z-50">
        <div className="absolute w-full aspect-square bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#097441] to-transparent to-60% backdrop-blur-sm"></div>
      </div>
      {children}
    </main>
  )
}