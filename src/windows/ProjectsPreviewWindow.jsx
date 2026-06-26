import { useSelectionStore } from "../store/selectionStore"
import { useWindowStore } from "../store/useWindowStore"
import { projects } from "../data/projects"
import { FULL_PREVIEW_CONFIG } from "./windowRegistry"

const isVideoPreview = (src) => /\.(mp4|webm|ogg)$/i.test(src)

export default function ProjectsPreviewWindow({ layout = "horizontal" }) {
  const { selectedProjectId, selectPreviewMedia } = useSelectionStore()
  const { openWindow, updateWindowTitle } = useWindowStore()
  const project = projects.find((item) => item.id === selectedProjectId)
  const images = project?.images?.slice(0, 3) ?? []
  const isVertical = layout === "vertical"

  const openFullPreview = (image, index) => {
    const title = `${project.name} preview ${index + 1}`
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
          gridTemplateColumns: isVertical
            ? "minmax(0, 1fr)"
            : `repeat(${Math.min(images.length, 2)}, minmax(0, 1fr))`,
        }}
      >
        {images.map((image, index) => {
          const sharedProps = {
            className: "w-full h-full rounded-lg min-h-0 overflow-hidden cursor-pointer",
            style:
              !isVertical && images.length === 3 && index === 0
                ? { gridRow: "span 2" }
                : undefined,
          }

          return (
            <button
              key={image}
              {...sharedProps}
              type="button"
              onClick={() => openFullPreview(image, index)}
              aria-label={`Open ${project.name} preview ${index + 1}`}
            >
              {isVideoPreview(image) ? (
                <video
                  src={image}
                  aria-label={`${project.name} preview ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={image}
                  alt={`${project.name} preview ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                />
              )}
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>
        {project.name} · {project.date}
      </p>
    </div>
  )
}
