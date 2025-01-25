import { useViews } from "@/context/ViewContext"
import useLocalStorage from "@/hooks/useLocalStorage"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ReactNode, useEffect, useRef } from "react"
import Split from "split.js"

function SplitterComponent({ children }: { children: ReactNode }) {
    const { isSidebarOpen } = useViews()
    const { isMobile, width } = useWindowDimensions()
    const { setItem, getItem } = useLocalStorage()

    const splitInstanceRef = useRef<Split.Instance | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!width || !containerRef.current) return // Wait for container and width

        // Default sizes
        const savedSizes = getItem("editorSizes")
        const defaultSizes = isSidebarOpen
            ? JSON.parse(savedSizes || "[35,65]")
            : [0, width]

        splitInstanceRef.current = Split(
            containerRef.current?.children as HTMLCollectionOf<HTMLElement>,
            {
                sizes: defaultSizes,
                minSize: isSidebarOpen ? [350, 350] : [0, 0],
                gutterSize: 7,
                snapOffset: 30,
                direction: "horizontal",
                cursor: "ew-resize",
                gutter: createGutter,
                onDragEnd: (sizes: number[]) => {
                    setItem("editorSizes", JSON.stringify(sizes))
                },
            },
        )

        return () => {
            splitInstanceRef.current?.destroy()
        }
    }, [width, isSidebarOpen])

    const createGutter = () => {
        const gutter = document.createElement("div")
        gutter.className =
            "flex w-[7px] cursor-ew-resize items-center justify-center bg-grey-500 hover:bg-grey-700"
        const innerDiv = document.createElement("div")
        innerDiv.className = "h-10 w-[2px] rounded-full bg-white"
        gutter.appendChild(innerDiv)
        return gutter
    }

    if (!width) return null // Avoid rendering until dimensions are available

    return (
        <div
            ref={containerRef}
            className="flex h-screen overflow-hidden"
            style={{ display: isSidebarOpen ? "flex" : "none" }}
        >
            {children}
        </div>
    )
}

export default SplitterComponent
