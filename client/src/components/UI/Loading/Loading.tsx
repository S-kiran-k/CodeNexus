import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const codeLines = [
    { text: "Initializing CodeNexus...", color: "text-blue-400" },
    { text: "Connecting to the server...", color: "text-green-400" },
    { text: "Loading collaborative workspace...", color: "text-yellow-400" },
    { text: "Starting AI integrations...", color: "text-purple-400" },
    { text: "Almost there...", color: "text-red-400" },
]

const LoadingScreen = ({
    setIsLoading,
}: {
    setIsLoading: (value: boolean) => void
}) => {
    const [loadingPercentage, setLoadingPercentage] = useState(0)
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingPercentage((prev) => {
                if (prev < 100) return prev + 1
                clearInterval(interval)
                setTimeout(() => setIsLoading(false), 500)
                return 100
            })
        }, 50)

        return () => clearInterval(interval)
    }, [setIsLoading])

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) =>
                prevIndex === codeLines.length - 1 ? prevIndex : prevIndex + 1,
            )
        }, 1500) // Change message every 1.5 seconds

        return () => clearInterval(messageInterval)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#1e1e1e] text-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: loadingPercentage === 100 ? 0 : 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Video */}
            <video
                className="absolute inset-0 h-full w-full object-cover"
                src="https://ik.imagekit.io/0oeuxr64bc/abstract-color-lines.1920x1080.mp4?updatedAt=1742031410716"
                autoPlay
                loop
                muted
            />

            {/* Dark Overlay for better readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            {/* Loading Title */}
            <motion.h1
                className="z-10 mb-4 text-center text-2xl font-bold sm:text-3xl md:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">CodeNexus</span>
            </motion.h1>

            {/* Dynamic Loading Messages with Colors */}
            <motion.p
                className={`z-10 mb-6 text-base font-semibold sm:text-lg ${codeLines[currentMessageIndex].color}`}
                key={currentMessageIndex} // Ensures animation triggers on update
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
            >
                {codeLines[currentMessageIndex].text}
            </motion.p>

            {/* Loading Percentage */}
            <motion.div
                className="z-10 text-lg font-semibold sm:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                Loading... {loadingPercentage}%
            </motion.div>

            {/* Progress Bar */}
            <div className="relative z-10 mt-4 h-2 w-11/12 rounded-full bg-gray-700 sm:w-3/4">
                <motion.div
                    className="h-full bg-green-400"
                    style={{ width: `${loadingPercentage}%` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingPercentage}%` }}
                />
            </div>
        </motion.div>
    )
}

export default LoadingScreen
