import FolderIcon from "./FolderIcon"
import { useWindowStore } from "../store/useWindowStore"
import { WINDOW_CONFIGS } from "../windows/windowRegistry"

const DESKTOP_ICONS = [
  { id: "about", label: "About Me", type: "folder", x: 40, y: 60 },
  { id: "projects", label: "Projects", type: "folder", x: 40, y: 170 },
  { id: "recents", label: "Recents", type: "folder", x: 40, y: 280 },
  { id: "resume", label: "Resume.pdf", type: "file", x: 40, y: 390 },
  { id: "trash", label: "Trash", type: "trash", x: 40, y: 500 },
]

export default function Desktop() {
  const { openWindow, openWindows } = useWindowStore()

  const handleOpen = (id) => {
    const config = WINDOW_CONFIGS[id]
    if (!config) return
    if (Array.isArray(config)) {
      openWindows(config, id)
    } else {
      openWindow(config, id)
    }
  }

  return (
    <div
  className="fixed inset-0 pt-7"
  style={{
    zIndex: 0,
    backgroundImage: "url('/wallpaper.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
      {/* Subtle radial gradient for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(232,196,196,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(212,133,138,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Desktop icons on left edge */}
      {DESKTOP_ICONS.map((icon) => (
        <FolderIcon
          key={icon.id}
          label={icon.label}
          type={icon.type}
          style={{ position: "absolute", left: icon.x, top: icon.y + 28 }}
          onOpen={() => handleOpen(icon.id)}
        />
      ))}
    </div>
  )
}
