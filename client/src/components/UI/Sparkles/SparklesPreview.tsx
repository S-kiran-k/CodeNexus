import { SparklesCore } from "./Sparkles"
import { motion } from "framer-motion"

export function SparklesPreview() {
    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
            {/* Sparkles Background */}
            <div className="absolute inset-0 h-full w-full">
                <SparklesCore
                    id="tsparticleshero"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={80}
                    className="h-full w-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 text-center">
                {/* Animated Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-extrabold text-white md:text-6xl lg:text-7xl"
                >
                    Code Smarter, <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Collaborate Faster.
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-4 text-lg text-gray-300 md:text-xl"
                >
                    Build, test, and deploy seamlessly. CodeNexus is your
                    ultimate real-time, cloud-based coding platform.
                </motion.p>

                {/* Call-to-Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-6"
                >
                    {/* <a
                        href="/form"
                        className="inline-block rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        Get Started →
                    </a> */}
                </motion.div>
            </div>
        </div>
    )
}
