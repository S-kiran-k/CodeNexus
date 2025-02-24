import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
export const BentoGrid = ({
    className,
    children,
}: {
    className?: string
    children?: React.ReactNode
}) => {
    return (
        <div
            className={cn(
                "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
                className,
            )}
        >
            {children}
        </div>
    )
}

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    header?: React.ReactNode
    icon?: React.ReactNode
}) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // Smooth cubic bezier easing
                },
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Adds a floating effect
                transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }} // Slight press effect
            className={cn(
                "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
                className,
            )}
        >
            {header}
            <div className="transition-all duration-300 group-hover/bento:translate-x-2">
                {icon}
                <div className="mb-2 mt-2 font-sans font-bold text-white">
                    {title}
                </div>
                <div className="font-sans text-xs font-normal text-white">
                    {description}
                </div>
            </div>
        </motion.div>
    )
}
