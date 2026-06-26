import { useState } from "react"
import { projects } from "../data/projects"
import { useSelectionStore } from "../store/selectionStore"
import { useWindowStore } from "../store/useWindowStore"
import { PROJECT_PREVIEW_CONFIGS } from "./windowRegistry"

export default function ProjectsWindow() {
  const { selectedProjectId, selectProject } = useSelectionStore()
  const { openWindow, closeWindow } = useWindowStore()
  const [selected, setSelected] = useState(selectedProjectId)

  const handleSelect = (id) => {
    setSelected(id)
    selectProject(id)

    if (id === "ecolife") {
      closeWindow(PROJECT_PREVIEW_CONFIGS.horizontal.id)
      openWindow(PROJECT_PREVIEW_CONFIGS.vertical)
    } else {
      closeWindow(PROJECT_PREVIEW_CONFIGS.vertical.id)
      openWindow(PROJECT_PREVIEW_CONFIGS.horizontal)
    }
  }
  const project = projects.find((p) => p.id === selected)

  return (
    <div className="flex h-full" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <div className="finder-sidebar w-36 flex-shrink-0 py-3 overflow-auto">
        <p
          style={{
            fontSize: "10px",
            color: "var(--text-muted)",
            letterSpacing: "0.08em",
            padding: "0 12px",
            marginBottom: "6px",
          }}
        >
          PROJECTS
        </p>
        {projects.map((p) => (
          <button
            key={p.id}
            className="w-full text-left px-3 py-2 flex items-center gap-2 transition-colors"
            style={{
              background: selected === p.id ? "rgba(212, 133, 138, 0.18)" : "transparent",
              color: selected === p.id ? "var(--pink-accent)" : "var(--charcoal)",
              fontSize: "12px",
              fontWeight: selected === p.id ? 500 : 400,
              borderRadius: "6px",
              margin: "0 4px",
              paddingLeft: "8px",
            }}
            onClick={() => handleSelect(p.id)}

          >
            <span style={{ fontSize: "14px" }}>📄</span>
            <span className="truncate">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Detail pane */}
      {project && (
        <div className="flex-1 p-5 overflow-auto">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2
                className="font-handwritten"
                style={{ fontSize: "24px", color: "var(--charcoal)", fontWeight: 700,paddingLeft: "8px", paddingTop: "4px" }}
              >
                {project.name}
              </h2>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "1px", paddingLeft: "8px", paddingTop: "2px" }}>
                {project.subtitle}
              </p>
            </div>
            {project.badge && (
              <span
                className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                style={{
                  background: "rgba(196, 148, 58, 0.15)",
                  color: "#9A6A1A",
                  fontWeight: 600,
                  fontSize: "10px",
                  paddingRight: "8px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  paddingLeft: "8px",
                  marginRight: "8px",
                  marginTop: "8px",
                }}
              >
                {project.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {project.stack.map((s) => (
              <span style={{marginLeft: "8px", marginTop: "4px"}}key={s} className="skill-pill">{s}</span>
            ))}
            <span style={{ fontSize: "10px", color: "var(--text-muted)", marginRight: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "8px" }}>
              {project.date}
            </span>
          </div>

          {/* Colour accent bar */}
          <div
            className="w-full h-1 rounded-full mb-4"
            style={{ background: project.color, opacity: 0.6, marginTop: "6px" }}
          />

          <p
            style={{
              fontSize: "12px",
              color: "var(--charcoal)",
              lineHeight: 1.75,
              whiteSpace: "pre-line",
              paddingLeft: "8px",
            
            }}
          >
            {project.description}
          </p>

          <div className="mt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="skill-pill hover:opacity-70 transition-opacity"
              style={{ textDecoration: "none", cursor: "pointer", paddingLeft: "8px", paddingTop: "2px", paddingBottom: "2px", marginLeft: "8px"}}
            >
              ⌨ View on GitHub ↗
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
