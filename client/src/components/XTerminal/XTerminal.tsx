import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client"
import "@xterm/xterm/css/xterm.css"
const socket = io(
    import.meta.env.VITE_BACKEND_URL || "https://codenexus-2uaa.onrender.com",
    {
        transports: ["websocket"], // Ensure proper WebSocket transport
    },
)

function XTerminal() {
    const terminalRef = useRef<HTMLDivElement | null>(null)
    const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        theme: { background: "#1e1e1e" },
    })
    const fitAddon = new FitAddon()

    useEffect(() => {
        if (!terminalRef.current) return

        term.loadAddon(fitAddon)
        term.open(terminalRef.current)
        fitAddon.fit() // Initial resize

        // Adjust terminal size on window resize
        const handleResize = () => fitAddon.fit()
        window.addEventListener("resize", handleResize)

        // Listen for terminal output from server
        socket.on("terminal-output", (data) => {
            term.write(data)
        })

        // Send user input to server
        term.onKey((e) => {
            socket.emit("terminal-input", e.key)
        })

        return () => {
            window.removeEventListener("resize", handleResize)
            socket.disconnect()
            term.dispose() // Clean up terminal instance
        }
    }, [])

    return <div ref={terminalRef} className="h-full w-full" />
}

export default XTerminal
