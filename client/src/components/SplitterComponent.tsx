import { useViews } from "@/context/ViewContext"
import useLocalStorage from "@/hooks/useLocalStorage"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ReactNode, useEffect, useRef } from "react"
import Split from "split.js"

function SplitterComponent({ children }: { children: ReactNode }) {
    const { isSidebarOpen } = useViews()
    const { width } = useWindowDimensions() // Removed isMobile since it was unused
    const { setItem, getItem } = useLocalStorage()

    const splitInstanceRef = useRef<Split.Instance | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!containerRef.current) {
            console.error("ContainerRef is not set")
            return
        }

        if (!width) {
            console.error("Width is undefined")
            return
        }

        // Get saved sizes or set to default sizes
        const savedSizes = getItem("editorSizes")
        const isMobile = width < 768 // Define mobile breakpoint

        const defaultSizes = isSidebarOpen
            ? JSON.parse(savedSizes || "[35,65]") // Default: 35% sidebar, 65% editor
            : [isMobile ? -1 : 3, 100] // 0 when mobile, 3 when desktop

        // Initialize Split.js
        splitInstanceRef.current = Split(
            Array.from(containerRef.current?.children || []) as HTMLElement[],
            {
                sizes: defaultSizes,
                minSize: isSidebarOpen ? [350, 350] : [0, 0], // Sidebar constraints
                gutterSize: 7,
                snapOffset: 30,
                direction: "horizontal",
                cursor: "ew-resize",
                gutter: createGutter, // Use custom gutter element
                onDragEnd: (sizes: number[]) => {
                    setItem("editorSizes", JSON.stringify(sizes)) // Save sizes on drag
                },
            },
        )

        return () => {
            splitInstanceRef.current?.destroy() // Cleanup Split instance
        }
    }, [isSidebarOpen, width])

    // Custom gutter creator
    const createGutter = () => {
        const gutter = document.createElement("div")
        gutter.className =
            "flex w-[7px] cursor-ew-resize items-center justify-center bg-gray-500 hover:bg-gray-700"
        const innerDiv = document.createElement("div")
        innerDiv.className = "h-10 w-[2px] rounded-full bg-white"
        gutter.appendChild(innerDiv)
        return gutter
    }

    // Avoid rendering until dimensions are available
    if (!width) return null

    return (
        <div
            ref={containerRef}
            className={`flex h-screen overflow-hidden ${
                isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
        >
            {children}
        </div>
    )
}

export default SplitterComponent
