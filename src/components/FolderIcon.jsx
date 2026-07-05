import { useState } from "react"

function FolderSVG({ color = "#facae2" }) {
  return (
    <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10C4 7.79 5.79 6 8 6H20L26 12H48C50.21 12 52 13.79 52 16V40C52 42.21 50.21 44 48 44H8C5.79 44 4 42.21 4 40V10Z"
        fill={color}
        stroke="rgba(180,100,108,0.3)"
        strokeWidth="1"
      />
      <path
        d="M4 18H52V40C52 42.21 50.21 44 48 44H8C5.79 44 4 42.21 4 40V18Z"
        fill={color === "#facae2" ? "#ffc1de" : color}
        opacity="0.7"
      />
    </svg>
  )
}

function FileSVG() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2H28L40 14V50C40 51.1 39.1 52 38 52H6C4.9 52 4 51.1 4 50V2Z" fill="#facae2" stroke="rgba(180,100,108,0.3)" strokeWidth="1"/>
      <path d="M28 2L40 14H30C28.9 14 28 13.1 28 12V2Z" fill="rgba(180,100,108,0.2)"/>
      <rect x="10" y="22" width="20" height="1.5" rx="0.75" fill="rgba(180,100,108,0.4)"/>
      <rect x="10" y="27" width="16" height="1.5" rx="0.75" fill="rgba(180,100,108,0.4)"/>
      <rect x="10" y="32" width="18" height="1.5" rx="0.75" fill="rgba(180,100,108,0.4)"/>
    </svg>
  )
}

function TrashSVG() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="28" height="36" rx="3" fill="#facae2" stroke="rgba(180,100,108,0.3)" strokeWidth="1"/>
      <rect x="6" y="8" width="32" height="4" rx="2" fill="#ffc1de"/>
      <rect x="16" y="4" width="12" height="5" rx="2" fill="#facae2" stroke="rgba(180,100,108,0.3)" strokeWidth="1"/>
      <line x1="16" y1="18" x2="16" y2="38" stroke="rgba(180,100,108,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="18" x2="22" y2="38" stroke="rgba(180,100,108,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="18" x2="28" y2="38" stroke="rgba(180,100,108,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function FolderIcon({ label, type = "folder", style = {}, onOpen }) {
  const [clicks, setClicks] = useState(0)
  const [timer, setTimer] = useState(null)

  const handleClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)
    if (timer) clearTimeout(timer)
    if (newClicks >= 2) {
      setClicks(0)
      onOpen && onOpen()
    } else {
      const t = setTimeout(() => setClicks(0), 400)
      setTimer(t)
    }
  }

  return (
    <div
      className="folder-icon flex flex-col items-center gap-1 cursor-default w-20"
      style={style}
      onClick={handleClick}
    >
      {type === "folder" && <FolderSVG />}
      {type === "file" && <FileSVG />}
      {type === "trash" && <TrashSVG />}
      <span
        className="folder-label text-center px-1 py-0.5 leading-tight text-xs font-medium"
        style={{
          color: "var(--charcoal)",
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          textShadow: "0 1px 2px rgba(255,255,255,0.8)",
          maxWidth: "72px",
          wordBreak: "break-word",
        }}
      >
        {label}
      </span>
    </div>
  )
}
