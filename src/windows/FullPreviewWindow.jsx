import { useSelectionStore } from "../store/selectionStore"

const isVideoPreview = (src = "") => /\.(mp4|webm|ogg)$/i.test(src)

export default function FullPreviewWindow() {
  const { selectedPreviewMedia } = useSelectionStore()

  if (!selectedPreviewMedia?.src) {
    return (
      <div
        className="flex h-full items-center justify-center"
        style={{ color: "var(--text-muted)", fontSize: "12px", fontFamily: "Inter" }}
      >
        no preview selected
      </div>
    )
  }

  const { src, alt } = selectedPreviewMedia

  return (
    <div className="h-full w-full p-3">
      {isVideoPreview(src) ? (
        <video
          src={src}
          aria-label={alt}
          className="h-full w-full rounded-lg object-contain"
          controls
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-lg object-contain"
        />
      )}
    </div>
  )
}
