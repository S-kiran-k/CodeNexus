import { useEffect, useRef } from "react"
import { MacbookScroll } from "./MacbookScroll"
import { motion, useAnimation, useInView } from "framer-motion"

export function MacbookScrollHero() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            setTimeout(() => {
                controls.start("hidden")
            }, 300)
        }
    }, [isInView, controls])

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 text-white">
            {/* Subtle glowing effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/4 top-1/4 h-48 w-48 bg-blue-500 opacity-40 blur-[100px] md:h-72 md:w-72"></div>
                <div className="absolute bottom-1/4 right-1/4 h-48 w-48 bg-purple-500 opacity-40 blur-[100px] md:h-72 md:w-72"></div>
            </div>

            {/* Animated Heading (Scroll-Based) */}
            <motion.h1
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                }}
                className="relative z-10 mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 bg-clip-text text-center text-3xl font-extrabold text-transparent sm:text-4xl md:text-7xl"
            >
                Welcome to CodeNexus
            </motion.h1>

            {/* Animated Subtitle (Scroll-Based) */}
            <motion.p
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: 0.3 },
                    },
                }}
                className="relative z-10 mb-6 text-center text-base text-gray-300 sm:text-lg md:text-xl"
            >
                The <span className="text-blue-400">Future</span> of{" "}
                <span className="text-purple-400">Collaborative Coding</span>{" "}
                Starts Here.
            </motion.p>

            {/* Macbook Scroll Component (Tagline Appears on Scroll) */}
            <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, delay: 0.5 },
                    },
                }}
                className="w-full max-w-3xl"
            >
                <MacbookScroll
                    title={
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.8,
                                ease: "easeOut",
                            }}
                            className="text-lg font-semibold text-white sm:text-2xl md:text-5xl"
                        >
                            Build together, innovate faster. CodeNexus redefines
                            collaborative coding.
                        </motion.span>
                    }
                    badge={
                        <Badge className="h-8 w-8 -rotate-12 transform md:h-10 md:w-10" />
                    }
                    src={`/linear.webp`}
                    showGradient={false}
                />
            </motion.div>
        </div>
    )
}

// Styled Badge Component
const Badge = ({ className }: { className?: string }) => {
    return (
        <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="28" cy="28" r="28" fill="black" />
            <image
                href="https://ik.imagekit.io/0oeuxr64bc/logo.jpg?updatedAt=1741094558070"
                x="8" // Adjust these values to center the image
                y="8"
                width="40"
                height="40"
                clipPath="circle(20px at center)"
            />
        </svg>
    )
}

export default Badge

