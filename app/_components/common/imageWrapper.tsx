import { ReactNode } from "react"

const ImageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-full overflow-hidden">
      {children}
    </div>
  )
}
export default ImageWrapper