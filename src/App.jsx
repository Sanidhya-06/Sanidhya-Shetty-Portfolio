import { WindowProvider } from "./store/windowStore"
import { SelectionProvider } from "./store/selectionStore"
import { useWindowStore } from "./store/useWindowStore"
import MenuBar from "./components/MenuBar"
import Desktop from "./components/Desktop"
import WindowShell from "./components/Window"
import Dock from "./components/Dock"
import RotateScreen from "./components/RotateScreen"

import WelcomeWindow from "./windows/WelcomeWindow"
import AboutWindow from "./windows/AboutWindow"
import AboutSkillsWindow from "./windows/AboutSkillsWindow"
import ProjectsWindow from "./windows/ProjectsWindow"
import RecentsWindow from "./windows/RecentsWindow"
import ResumeWindow from "./windows/ResumeWindow"
import TrashWindow from "./windows/TrashWindow"
import MePreviewWindow from "./windows/AboutPreviewWindow"
import ProjectsPreviewWindow from "./windows/ProjectsPreviewWindow"
import RecentsPreviewWindow from "./windows/RecentsPreviewWindow"
import FullPreviewWindow from "./windows/FullPreviewWindow"

const CONTENT_MAP = {
  Welcome: WelcomeWindow,
  About: AboutWindow,
  AboutSkills: AboutSkillsWindow,
  Projects: ProjectsWindow,
  Recents: RecentsWindow,
  Resume: ResumeWindow,
  Trash: TrashWindow,
  MePreview: MePreviewWindow,
  ProjectsPreviewVertical: () => <ProjectsPreviewWindow layout="vertical" />,
  ProjectsPreviewHorizontal: () => <ProjectsPreviewWindow layout="horizontal" />,
  RecentsPreview: RecentsPreviewWindow,
  FullPreview: FullPreviewWindow,
}

function PortfolioOS() {
  const { windows } = useWindowStore()

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MenuBar />
      <Desktop />
      {windows.map((win) => {
        if (win.isMinimized) return null
        const ContentComponent = CONTENT_MAP[win.component]
        if (!ContentComponent) return null
        return (
          <WindowShell key={win.id} {...win}>
            <ContentComponent />
          </WindowShell>
        )
      })}
      <Dock />
      <RotateScreen />
    </div>
  )
}

export default function App() {
  return (
    <SelectionProvider>
      <WindowProvider>
        <PortfolioOS />
      </WindowProvider>
    </SelectionProvider>
  )
}
