const ShadowDecoration = () => {
  return (
    <>
      <div className="absolute z-[10] inset-x-0 top-0 h-4 bg-gradient-to-b from-green-800/30 to-transparent pointer-events-none"></div>
      <div className="absolute z-[10] inset-x-0 bottom-0 h-4 bg-gradient-to-t from-green-800/30 to-transparent pointer-events-none"></div>
    </>
  )
}
export default ShadowDecoration