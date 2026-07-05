import { useRef, useEffect, useState } from "react"
import { useWindowStore } from "../store/useWindowStore"

export default function Window({
  id,
  title,
  x,
  y,
  width,
  height,
  zIndex,
  isMinimized,
  isActive = true,
  children,
}) {
  const { closeWindow, minimizeWindow, focusWindow, moveWindow } = useWindowStore()
  const dragRef = useRef(null)
  const offsetRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const onViewportChange = () => setIsMobile(mediaQuery.matches)

    onViewportChange()
    mediaQuery.addEventListener?.("change", onViewportChange)
    return () => mediaQuery.removeEventListener?.("change", onViewportChange)
  }, [])

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging.current) return

      const responsiveWidth = isMobile
        ? Math.min(width, Math.max(280, window.innerWidth - 16))
        : width
      const responsiveHeight = isMobile
        ? Math.min(height, Math.max(300, window.innerHeight - 84))
        : height
      const maxX = Math.max(8, window.innerWidth - responsiveWidth - 8)
      const maxY = Math.max(36, window.innerHeight - responsiveHeight - 8)
      const nx = e.clientX - offsetRef.current.x
      const ny = e.clientY - offsetRef.current.y

      moveWindow(
        id,
        Math.max(8, Math.min(nx, maxX)),
        Math.max(36, Math.min(ny, maxY))
      )
    }

    const onPointerUp = () => {
      isDragging.current = false
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("pointercancel", onPointerUp)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)
    }
  }, [id, width, height, isMobile, moveWindow])

  const onTitleBarPointerDown = (e) => {
    if (e.target.closest(".traffic-btn")) return
    isDragging.current = true
    offsetRef.current = { x: e.clientX - x, y: e.clientY - y }
    focusWindow(id)
  }

  if (isMinimized) return null

  const responsiveWidth = isMobile
    ? Math.min(width, Math.max(280, window.innerWidth - 16))
    : width
  const responsiveHeight = isMobile
    ? Math.min(height, Math.max(300, window.innerHeight - 84))
    : height
  const clampedX = Math.max(8, Math.min(x, Math.max(8, window.innerWidth - responsiveWidth - 8)))
  const clampedY = Math.max(36, Math.min(y, Math.max(36, window.innerHeight - responsiveHeight - 8)))

  return (
    <div
      className="window-glass window-enter absolute no-select transition-opacity duration-200"
      style={{
        left: clampedX,
        top: clampedY,
        width: responsiveWidth,
        zIndex,
        minHeight: responsiveHeight,
        touchAction: "none",
        opacity: isActive ? 1 : 0.6,
        filter: isActive ? "brightness(1)" : "brightness(0.85)",
      }}
      onPointerDown={() => focusWindow(id)}
      ref={dragRef}
    >
      {/* Title bar */}
      <div
        className="titlebar-glass flex items-center px-3 py-2 cursor-grab active:cursor-grabbing"
        style={{ height: 24, touchAction: "none" }}
        onPointerDown={onTitleBarPointerDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 traffic-btn">
          <button
            className="w-3 h-3 rounded-full traffic-red hover:brightness-90 transition-all"
            style={{ paddingTop: "2px", paddingLeft: "2px", marginLeft: "12px" }}
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(id)
            }}
          />
          <button
            className="w-3 h-3 rounded-full traffic-yellow hover:brightness-90 transition-all"
            style={{ paddingTop: "2px", paddingLeft: "2px" }}
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(id)
            }}
          />
          <button
            className="w-3 h-3 rounded-full traffic-green hover:brightness-90 transition-all"
            style={{ paddingTop: "2px", paddingLeft: "2px" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {/* Title */}
        <span
          className="flex-1 text-center text-xs font-medium pointer-events-none"
          style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
        >
          {title}
        </span>
        {/* Spacer to balance traffic lights */}
        <div className="w-12" />
      </div>

      {/* Window content */}
      <div className="overflow-auto" style={{ height: responsiveHeight - 36, cursor: "default" }}>
        {children}
      </div>
    </div>
  )
}
