import { useSelectionStore } from "../store/selectionStore"
import { useWindowStore } from "../store/useWindowStore"
import { recents } from "../data/recents"
import { FULL_PREVIEW_CONFIG } from "./windowRegistry"

const allRecents = [...recents[2026], ...recents[2025]]

export default function RecentsPreviewWindow() {
  const { selectedRecentId, selectPreviewMedia } = useSelectionStore()
  const { openWindow, updateWindowTitle } = useWindowStore()
  const item = allRecents.find((recent) => recent.id === selectedRecentId)
  const images = item?.images?.slice(0, 3) ?? []

  const openFullPreview = (image, index) => {
    const title = `${item.title} preview ${index + 1}`
    selectPreviewMedia({ src: image, alt: title })
    openWindow({ ...FULL_PREVIEW_CONFIG, title })
    updateWindowTitle(FULL_PREVIEW_CONFIG.id, title)
  }

  if (!images.length) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ color: "var(--text-muted)", fontSize: "12px", fontFamily: "Inter" }}
      >
        no preview available
      </div>
    )
  }

  return (
    <div className="p-3 h-full flex flex-col gap-2">
      <div
        className="grid flex-1 min-h-0 gap-2"
        style={{
          gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, minmax(0, 1fr))`,
        }}
      >
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`Open ${item.title} preview ${index + 1}`}
            className="w-full h-full rounded-lg min-h-0 overflow-hidden cursor-pointer"
            style={images.length === 3 && index === 0 ? { gridRow: "span 2" } : undefined}
            onClick={() => openFullPreview(image, index)}
          >
            <img
              src={image}
              alt={`${item.title} preview ${index + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </button>
        ))}
      </div>
      <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
        {item.title} · {item.date}
      </p>
    </div>
  )
}
