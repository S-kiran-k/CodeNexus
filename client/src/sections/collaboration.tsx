import { useTransform, useScroll, motion } from "framer-motion"
import { useRef } from "react"

export const Collaboration = () => {
    const targetRef = useRef<HTMLDivElement | null>(null)
    const extendedRef = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end end"],
    })

    const { scrollYProgress: scrollYProgressIncludingOverlap } = useScroll({
        target: extendedRef,
        offset: ["start end", "end end"],
    })

    // Scale Effect (smooth zoom in/out)
    const scale = useTransform(
        scrollYProgressIncludingOverlap,
        [0.1, 0.4, 0.75, 1],
        [1, 2.5, 4, 1], // Adjusted scaling
    )

    // Keep X transformation centered
    const x = useTransform(
        scrollYProgressIncludingOverlap,
        [0.1, 0.25, 0.75, 1],
        ["0vw", "0vw", "0vw", "0vw"], // No left/right shift, stays centered
    )

    // Adjusted Y transformation for smooth vertical movement
    const y = useTransform(
        scrollYProgressIncludingOverlap,
        [0.1, 0.75, 1],
        ["0vh", "-10vh", "30vh"],
    )

    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0])

    return (
        <section ref={targetRef} className="relative z-10 mt-[-30vh] h-[300vh]">
            <div ref={extendedRef} className="mb-[-120vh] h-[420vh] w-full">
                {/* Sticky Container to Keep Centered */}
                <div className="sticky top-[10vh] flex h-screen items-center justify-center">
                    <motion.div
                        style={{ scale, x, y }}
                        className="flex origin-center items-center justify-center"
                    >
                        <motion.img
                            style={{ opacity }}
                            src="https://ik.imagekit.io/0oeuxr64bc/MainPicFinal.png?updatedAt=1740297446299"
                            className="h-auto w-[70vw] max-w-[800px]" // Ensures image remains centered
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
