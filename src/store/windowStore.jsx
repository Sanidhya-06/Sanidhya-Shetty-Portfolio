import { useReducer, useCallback } from "react";
import { WindowContext } from "./WindowContext";

function getCenter(w, h) {
  if (typeof window === "undefined") return { x: 300, y: 160 }
  return {
    x: Math.max(60, window.innerWidth / 2 - w / 2),
    y: Math.max(40, window.innerHeight / 2 - h / 2),
  }
}

const wc = getCenter(420, 300)

const initialWindows = [
  {
    id: "welcome",
    title: "welcome.txt",
    component: "Welcome",
    x: wc.x,
    y: wc.y,
    width: 420,
    height: 300,
    zIndex: 10,
    isMinimized: false,
    isOpen: true,
    groupId: "welcome",
  },
]

let zCounter = 20
let activeGroupId = "welcome"

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const exists = state.find((w) => w.id === action.payload.id)
      if (exists) {
        zCounter++
        return state.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: false, zIndex: zCounter }
            : w
        )
      }
      zCounter++
      return [
        ...state,
        { ...action.payload, zIndex: zCounter, isOpen: true, isMinimized: false, groupId: action.groupId || "default" },
      ]
    }
    case "CLOSE_WINDOW":
      return state.filter((w) => w.id !== action.id)
    case "MINIMIZE_WINDOW":
      return state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: true } : w
      )
    case "FOCUS_WINDOW": {
      zCounter++
      const focusedWindow = state.find((w) => w.id === action.id)
      if (focusedWindow) {
        activeGroupId = focusedWindow.groupId
      }
      return state.map((w) =>
        w.id === action.id ? { ...w, zIndex: zCounter } : w
      )
    }
    case "MOVE_WINDOW":
      return state.map((w) =>
        w.id === action.id ? { ...w, x: action.x, y: action.y } : w
      )
    case "UPDATE_WINDOW_TITLE":
      return state.map((w) =>
        w.id === action.id ? { ...w, title: action.title } : w
      )
    case "CLOSE_ALL_WINDOWS":
      return []
    case "MINIMIZE_ALL_WINDOWS":
      return state.map((w) => ({ ...w, isMinimized: true }))
    case "BRING_ALL_TO_FRONT":
      return state.map((w) => ({ ...w, isMinimized: false }))
    default:
      return state
  }
}

export function WindowProvider({ children }) {
  const [windows, dispatch] = useReducer(reducer, initialWindows)

  const openWindow = useCallback((config, groupId) => {
    dispatch({ type: "OPEN_WINDOW", payload: config, groupId })
  }, [])

  const openWindows = useCallback((configs, groupId) => {
    configs.forEach((config) => {
      dispatch({ type: "OPEN_WINDOW", payload: config, groupId })
    })
  }, [])

  const closeWindow = useCallback((id) => {
    dispatch({ type: "CLOSE_WINDOW", id })
  }, [])

  const minimizeWindow = useCallback((id) => {
    dispatch({ type: "MINIMIZE_WINDOW", id })
  }, [])

  const focusWindow = useCallback((id) => {
    dispatch({ type: "FOCUS_WINDOW", id })
  }, [])

  const moveWindow = useCallback((id, x, y) => {
    dispatch({ type: "MOVE_WINDOW", id, x, y })
  }, [])

  const updateWindowTitle = useCallback((id, title) => {
    dispatch({ type: "UPDATE_WINDOW_TITLE", id, title })
  }, [])

  const closeAll = useCallback(() => {
    dispatch({ type: "CLOSE_ALL_WINDOWS" })
  }, [])

  const minimizeAll = useCallback(() => {
    dispatch({ type: "MINIMIZE_ALL_WINDOWS" })
  }, [])

  const bringAllToFront = useCallback(() => {
    dispatch({ type: "BRING_ALL_TO_FRONT" })
  }, [])

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeGroupId,
        openWindow,
        openWindows,
        closeWindow,
        minimizeWindow,
        focusWindow,
        moveWindow,
        updateWindowTitle,
        closeAll,
        minimizeAll,
        bringAllToFront,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}