import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const LoadingScreen = ({
    onLoadingComplete,
}: {
    onLoadingComplete: () => void
}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            setTimeout(onLoadingComplete, 5000) // Give time for animation
        }, 3000) // Adjust time as needed

        return () => clearTimeout(timer)
    }, [onLoadingComplete])

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={loading ? { y: 0 } : { y: "-100%" }} // Slide up after loading
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
            {/* Background GIF */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source
                        src="https://ik.imagekit.io/0oeuxr64bc/backg.gif"
                        type="video/mp4"
                    />
                </video>
            </div>

            {/* Overlay to enhance visibility */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Loader */}
            <div className="relative h-24 w-24 rotate-45">
                {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute m-1 h-7 w-7 bg-white"
                        style={{
                            top: 0,
                            left: 0,
                            borderRadius: "0px",
                            animation: `square-animation 10s ease-in-out infinite both`,
                            animationDelay: `-${i * 1.4285714286}s`,
                        }}
                    />
                ))}
            </div>

            {/* Loader Animation */}
            <style>
                {`
                @keyframes square-animation {
                    0%, 10.5% { left: 0; top: 0; }
                    12.5%, 23% { left: 32px; top: 0; }
                    25%, 35.5% { left: 64px; top: 0; }
                    37.5%, 48% { left: 64px; top: 32px; }
                    50%, 60.5% { left: 32px; top: 32px; }
                    62.5%, 73% { left: 32px; top: 64px; }
                    75%, 85.5% { left: 0; top: 64px; }
                    87.5%, 98% { left: 0; top: 32px; }
                    100% { left: 0; top: 0; }
                }
                `}
            </style>
        </motion.div>
    )
}

export default LoadingScreen
