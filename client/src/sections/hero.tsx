import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className="relative flex h-screen items-center justify-center bg-black text-white">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black opacity-80"></div>

            {/* Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center"
            >
                {/* Animated Title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl font-extrabold leading-tight tracking-wide md:text-6xl"
                >
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        codeNexus
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <p className="mt-4 text-lg text-gray-400 md:text-xl">
                    Where innovation meets efficiency. Code smarter, build
                    faster.
                </p>

                {/* Glowing Call-to-Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-8 flex justify-center"
                >
                    <Link
                        to="/form"
                        className="relative overflow-hidden rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-500"
                    >
                        Get Started →
                        <span className="absolute inset-0 -z-10 bg-blue-400 opacity-30 blur-xl"></span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Animated Floating Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute left-20 top-20 h-32 w-32 rounded-full bg-blue-500 blur-3xl"
            ></motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute bottom-20 right-20 h-24 w-24 rounded-full bg-cyan-500 blur-3xl"
            ></motion.div>
        </div>
    )
}

export default Hero
