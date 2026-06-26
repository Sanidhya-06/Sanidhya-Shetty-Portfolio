import { createContext, useContext, useMemo, useState } from "react"

const SelectionContext = createContext(null)

export function SelectionProvider({ children }) {
  const [selectedProjectId, setSelectedProjectId] = useState("ecolife")
  const [selectedRecentId, setSelectedRecentId] = useState("iit-roorkee")
  const [selectedPreviewMedia, setSelectedPreviewMedia] = useState(null)

  const value = useMemo(
    () => ({
      selectedProjectId,
      selectProject: setSelectedProjectId,
      selectedRecentId,
      selectRecent: setSelectedRecentId,
      selectedPreviewMedia,
      selectPreviewMedia: setSelectedPreviewMedia,
    }),
    [selectedProjectId, selectedRecentId, selectedPreviewMedia],
  )

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSelectionStore() {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error("useSelectionStore must be used within a SelectionProvider")
  }
  return context
}
