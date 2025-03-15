import { useViews } from "@/context/ViewContext"
import useLocalStorage from "@/hooks/useLocalStorage"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ReactNode, useEffect, useRef, useState } from "react"
import Split from "split.js"
import { motion } from "framer-motion"
import CollaborativeLoadingScreen from "./UI/Loading/Loading"

function SplitterComponent({ children }: { children: ReactNode }) {
    const { isSidebarOpen } = useViews()
    const { width } = useWindowDimensions()
    const { setItem, getItem } = useLocalStorage()

    const splitInstanceRef = useRef<Split.Instance | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!containerRef.current || !width) {
            console.error("ContainerRef is not set or Width is undefined")
            return
        }

        // Destroy any existing Split instance before creating a new one
        if (splitInstanceRef.current) {
            try {
                splitInstanceRef.current.destroy()
            } catch (error) {
                console.warn(
                    "Error destroying previous Split.js instance:",
                    error,
                )
            }
        }

        // Get saved sizes or set default sizes
        const savedSizes = getItem("editorSizes")
        const isMobile = width < 768

        const defaultSizes = isSidebarOpen
            ? JSON.parse(savedSizes || "[35,65]") // Default: 35% sidebar, 65% editor
            : [isMobile ? -1 : 3, 100] // 0 when mobile, 3 when desktop

        // Initialize Split.js
        splitInstanceRef.current = Split(
            Array.from(containerRef.current?.children || []) as HTMLElement[],
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
            if (splitInstanceRef.current) {
                try {
                    splitInstanceRef.current.destroy()
                    splitInstanceRef.current = null // Ensure it's reset after destruction
                } catch (error) {
                    console.warn("Failed to destroy Split.js instance:", error)
                }
            }
        }
    }, [isSidebarOpen, width])


    useEffect(() => {
        if (isLoading || !containerRef.current || !width) return

        console.log("Initializing Split.js after loading...")

        const savedSizes = getItem("editorSizes")
        const isMobile = width < 768

        const defaultSizes = isSidebarOpen
            ? JSON.parse(savedSizes || "[35,65]")
            : [isMobile ? -1 : 3, 100]

        // Destroy previous instance before initializing
        splitInstanceRef.current?.destroy()

        splitInstanceRef.current = Split(
            Array.from(containerRef.current.children) as HTMLElement[],
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
    }, [isLoading, isSidebarOpen, width]) // Ensure it runs after loading

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {isLoading ? (
                <CollaborativeLoadingScreen setIsLoading={setIsLoading} />
            ) : (
                <div
                    ref={containerRef}
                    className={`flex h-screen overflow-hidden ${
                        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                    }`}
                >
                    {children}
                </div>
            )}
        </motion.div>
    )
}

export default SplitterComponent
