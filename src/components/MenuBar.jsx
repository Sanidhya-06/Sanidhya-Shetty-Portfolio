import { useState, useEffect, useRef } from "react"
import { useWindowStore } from "../store/useWindowStore"

export default function MenuBar() {
  const [time, setTime] = useState("")
  const [windowMenuOpen, setWindowMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { closeAll, minimizeAll, bringAllToFront } = useWindowStore()

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setWindowMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleWindowMenuClick = (action) => {
    action()
    setWindowMenuOpen(false)
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 h-7 z-50 no-select"
      style={{
        background: "rgba(242, 235, 227, 0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212, 133, 138, 0.15)",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
      }}
    >
      <div className="flex items-center gap-4 relative">
        <span style={{ color: "var(--charcoal)", fontWeight: 600 }}>✦</span>
        <span style={{ color: "var(--charcoal)", fontWeight: 500 }}>Sanidhya</span>
        
        <div ref={menuRef} className="relative">
          <span
            onClick={() => setWindowMenuOpen(!windowMenuOpen)}
            style={{
              color: "var(--text-muted)",
              fontWeight: 400,
              cursor: "pointer",
              paddingBottom: "2px",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Window
          </span>

          {windowMenuOpen && (
            <div
              className="absolute top-full mt-1 rounded-md py-1 min-w-48"
              style={{
                background: "var(--window-bg)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 32px rgba(44, 44, 44, 0.12), 0 2px 8px rgba(44, 44, 44, 0.08)",
                paddingLeft: "4px",
                zIndex: 9999,
              }}
            >
              <button
                onClick={() => handleWindowMenuClick(closeAll)}
                className="w-full px-4 py-2 text-left transition-colors text-sm"
                style={{
                  color: "var(--charcoal)",
                  fontFamily: "Inter, sans-serif",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(212, 133, 138, 0.1)"}
                onMouseLeave={(e) => e.target.style.background = "none"}
              >
                Close All Windows
              </button>
              <button
                onClick={() => handleWindowMenuClick(minimizeAll)}
                className="w-full px-4 py-2 text-left transition-colors text-sm"
                style={{
                  color: "var(--charcoal)",
                  fontFamily: "Inter, sans-serif",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(212, 133, 138, 0.1)"}
                onMouseLeave={(e) => e.target.style.background = "none"}
              >
                Minimize All
              </button>
              <button
                onClick={() => handleWindowMenuClick(bringAllToFront)}
                className="w-full px-4 py-2 text-left transition-colors text-sm"
                style={{
                  color: "var(--charcoal)",
                  fontFamily: "Inter, sans-serif",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(212, 133, 138, 0.1)"}
                onMouseLeave={(e) => e.target.style.background = "none"}
              >
                Bring All to Front
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span style={{ color: "var(--text-muted)" }}>☁</span>
        <span style={{ color: "var(--charcoal)", fontWeight: 500 }}>{time}</span>
      </div>
    </div>
  )
}
