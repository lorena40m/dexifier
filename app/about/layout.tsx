export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-screen bg-[#04100C]">
      <div className="absolute w-1/3 aspect-square bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#097441] to-transparent to-60%"></div>
      {children}
    </main>
  )
}