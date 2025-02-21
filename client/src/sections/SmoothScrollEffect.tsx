import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const SmoothScrollEffect = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const textMoveX = useTransform(
        scrollYProgress,
        [0.2, 0.8],
        ["120%", "-120%"],
    )
    const fadeIn = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
    const scaleEffect = useTransform(scrollYProgress, [0.2, 0.8], [1, 0.75])

    const fadeBorder = useTransform(
        scrollYProgress,
        [0.75, 0.8, 0.85],
        [1, 1, 0],
    )
    const finalTextVisibility = useTransform(
        scrollYProgress,
        [0.8, 0.85, 0.9],
        [0, 1, 0],
    )
    const finalTextResize = useTransform(scrollYProgress, [0.85, 0.9], [1, 0.8])

    return (
        <motion.section
            ref={sectionRef}
            style={
                {
                    opacity: fadeIn,
                    "--scale-effect": scaleEffect as any, // ✅ TypeScript fix for CSS variables
                    "--fade-border": fadeBorder as any, // ✅ TypeScript fix for CSS variables
                } as React.CSSProperties
            } // ✅ Ensuring correct type
            className="relative mt-[50vh] flex h-[450vh] items-center justify-center"
        >
            <div className="sticky left-1/2 top-1/2 min-h-[48rem] min-w-[48rem] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap before:absolute before:inset-0 before:scale-[var(--scale-effect)] before:border-[2rem] before:border-[#F4B400] before:opacity-[var(--fade-border)]">
                <motion.p
                    aria-hidden
                    style={{ x: textMoveX, y: "-50%" }}
                    className="whitepspace-nowrap min-w-screen absolute top-1/2 left-[calc(-50vw+25rem)] text-[23rem] text-heading"
                >
                    Dynamic Coding Experience
                </motion.p>
                <motion.p
                    aria-hidden
                    style={{ x: textMoveX, y: "-50%" }}
                    className="whitepspace-nowrap min-w-screen absolute left-[calc(-50vw+25rem)] top-1/2 z-[11] text-[23rem] text-transparent [-webkit-text-stroke:1px_var(--color-heading)]"
                >
                    Dynamic Coding Experience
                </motion.p>

                <motion.p
                    style={{
                        opacity: finalTextVisibility,
                        scale: finalTextResize,
                        y: "-50%",
                        x: "-50%",
                    }}
                    className="absolute left-1/2 top-1/2 text-[8rem] font-semibold leading-tight text-white"
                >
                    【﻿ＣＯＤＥ　
                    <br />
                    ＮＥＸＵＳ】
                </motion.p>
                <span className="absolute left-[calc(50%*var(--scale-effect)+50%)] top-0 z-10 h-full w-[50vw] origin-left scale-[var(--scale-effect)]  opacity-[var(--fade-border)]" />
                <span className="absolute left-[calc(50%*var(--scale-effect)+50%-(2rem*var(--scale-effect)))] top-0 z-10 h-full w-[50vw] origin-left scale-[var(--scale-effect)] border-l-[2rem] border-[#F4B400] opacity-[var(--fade-border)]" />
            </div>
        </motion.section>
    )
}
