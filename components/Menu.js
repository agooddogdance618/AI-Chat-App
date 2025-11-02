import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Menu({ anchorRef, scrollParentRef, open, setMenuOpen, children, ...props }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [flip, setFlip] = useState(false)
  const menuRef = useRef(null)

  const updatePosition = () => {
    if (!anchorRef?.current || !menuRef?.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const menuRect = menuRef.current.getBoundingClientRect()

    const spaceBelow = window.innerHeight - rect.bottom
    const shouldFlip = spaceBelow < menuRect.height
    setFlip(shouldFlip)

    setPosition({
      top: shouldFlip ? rect.top + window.scrollY - menuRect.height : rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }

  useLayoutEffect(() => {
    if (open) updatePosition()
  }, [anchorRef, open])

  useEffect(() => {
    if (!open) return
    updatePosition()

    const handleScroll = () => updatePosition()
    const handleResize = () => updatePosition()

    scrollParentRef?.current?.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      scrollParentRef?.current?.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    };
  }, [open, scrollParentRef])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!anchorRef) return
      if (!anchorRef?.current?.contains(e.target)) {
        setMenuOpen(null)
      }
    }
    if (open) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [open])

  if (!open) return null

  return createPortal(
    <>
      {!anchorRef && <div onClick={() => setMenuOpen(null)} className="fixed inset-0 bg-black bg-opacity-40 z-40"/>}
      <div
        ref={menuRef}
        className={`absolute p-2 z-30 bg-gray-400 rounded-md ${flip ? "origin-bottom" : "origin-top"}`}
        style={!anchorRef ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } : { top: position.top, left: position.left }}
        {...props}
      >
        {children}
      </div>
    </>,
    document.querySelector('.home')
  )
}
