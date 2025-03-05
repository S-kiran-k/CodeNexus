import { useState } from "react"
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    link: string
    icon?: JSX.Element
}

interface FloatingNavProps {
    navItems: NavItem[]
    className?: string
}

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
    const { scrollYProgress } = useScroll()
    const [visible, setVisible] = useState(false)

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const previous = scrollYProgress.getPrevious() ?? 0
            const direction = current - previous

            if (scrollYProgress.get() < 0.05) {
                setVisible(false)
            } else {
                setVisible(direction < 0)
            }
        }
    })

    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-neutral-300 bg-black px-6 py-3 shadow-lg dark:border-white/[0.2] dark:bg-neutral-900 dark:shadow-black/30",
                        className,
                    )}
                >
                    {navItems.map((navItem, idx) => (
                        <a
                            key={`link-${idx}`}
                            href={navItem.link}
                            className="relative flex items-center space-x-2 text-white hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-gray-300"
                        >
                            {navItem.icon && (
                                <span className="block text-lg">
                                    {navItem.icon}
                                </span>
                            )}
                            <span className="hidden text-sm font-medium sm:block">
                                {navItem.name}
                            </span>
                        </a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
