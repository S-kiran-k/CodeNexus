
import { MessageCircle } from "lucide-react"
import { BentoGrid, BentoGridItem } from "../UI/bento-grid/bento-grid"
import {
    IconCode,
    IconFolder,
    IconDownload,
    IconUsers,
    IconBrush,
} from "@tabler/icons-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import "./Feature.css"

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 }) // Triggers when 20% is visible

    return (
        <section
            ref={ref}
            className="relative h-full w-full bg-slate-950 bg-[radial-gradient(circle_at_center,rgba(255,0,182,.15),rgba(255,255,255,0))] px-5 py-24"
            id="features"
        >
            <h1 className="px-5 py-5 text-center text-[70px] font-bold text-white">
                Features
            </h1>
            <p className="mx-auto max-w-3xl text-center text-lg text-gray-300">
                CodeNexus is more than just a code editor—it's a
                <span className="gradient-text">
                    {" "}collaborative PowerHouse{" "}
                </span>
                designed to make development seamless, interactive, and
                efficient. Explore our top features that{" "}
                <strong className="gradient-text">supercharge</strong> your
                workflow!
            </p>

            {/* Animated BentoGrid */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.2 }, // Stagger animation for child items
                    },
                }}
                className="mt-10"
            >
                <BentoGrid className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={item.classname}
                        />
                    ))}
                </BentoGrid>
            </motion.div>
        </section>
    )
}


const items = [
    {
        title: "Real-time Collaboration",
        description:
            "No more waiting! Code together live, with seamless real-time updates for instant teamwork.",
        header: (
            <img
                src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20gif.gif?updatedAt=1740311271013"
                alt="Feature Image"
                className="h-auto max-h-[400px] w-auto rounded-lg md:max-h-[350px] lg:max-h-[450px]"
                loading="lazy"
            />
        ),
        icon: <IconUsers className="h-6 w-6 text-blue-400" />,
        classname: "col-span-2 row-span-2 rounded-xl bg-black p-6",
    },
    {
        title: "Real-time Chat",
        description:
            "Discuss, debug, and collaborate without leaving your editor —chat in real time!",
        header: (
            <img
                src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20chat%20gif.gif?updatedAt=1740334270853"
                alt="Real-time Chat Feature"
                className="h-[75%] max-h-[400px] w-full rounded-lg md:max-h-[350px] lg:max-h-[450px]"
                loading="lazy"
            />
        ),
        icon: <MessageCircle className="h-6 w-6 text-cyan-400" />,
        classname: "col-span-1 row-span-2 rounded-xl bg-black p-6",
    },
    {
        title: "AI Chatbot",
        description:
            "Get instant coding assistance with AI-powered suggestions, debugging, and explanations.",
        header: (
            <img
                src="https://ik.imagekit.io/0oeuxr64bc/Ai%20execution.png?updatedAt=1742050769869"
                alt="Real-time Chat Feature"
                className="h-[75%] max-h-[400px] w-full rounded-lg md:max-h-[350px] lg:max-h-[450px]"
                loading="lazy"
            />
        ),
        icon: <MessageCircle className="h-6 w-6 text-yellow-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "Drawing Space",
        description:
            "Sketch and visualize your ideas in a collaborative whiteboard space.",
        header: (
            <img
                src="https://ik.imagekit.io/0oeuxr64bc/drawing%20files.png?updatedAt=1742052362139"
                alt="Real-time Chat Feature"
                className="h-[75%] max-h-[400px] w-full rounded-lg md:max-h-[350px] lg:max-h-[450px]"
                loading="lazy"
            />
        ),
        icon: <IconBrush className="h-6 w-6 text-pink-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "File Management",
        description:
            "Organize files & folders like a pro! Drag, drop, rename, and manage effortlessly.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20Files.png?updatedAt=1740335807516"
                    alt="File Management Feature"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                />
            </div>
        ),
        icon: <IconFolder className="h-6 w-6 text-purple-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "Code Execution",
        description:
            "Run your code instantly and get real-time output—no need for external compilers!",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20Run.gif?updatedAt=1740337729864"
                    alt="Code Execution Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                />
            </div>
        ),
        icon: <IconCode className="h-6 w-6 text-green-400" />,
        classname: "col-span-1 row-span-2 rounded-xl bg-black p-6",
    },
    {
        title: "Instant Updates",
        description:
            "See changes as they happen! Real-time syncing keeps everyone on the same page.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20updates%20gif.gif?updatedAt=1740340442717"
                    alt="Instant Updates Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                />
            </div>
        ),
        icon: <IconDownload className="h-6 w-6 text-red-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "User Presence",
        description:
            "See who's online, who's coding, and stay in sync with live user activity updates.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20Users.gif"
                    alt="User Presence Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                />
            </div>
        ),
        icon: <IconUsers className="h-6 w-6 text-indigo-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "Custom Themes & Fonts",
        description:
            "Your editor, your style! Personalize themes & fonts for the ultimate coding experience.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/font%20img.png?updatedAt=1742052041461"
                    alt="User Presence Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                />
            </div>
        ),
        icon: <IconBrush className="h-6 w-6 text-pink-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "Multi-Cursor Editing",
        description:
            "Work together like magic! See and edit code with multiple cursors in real-time.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20updates%20gif.gif?updatedAt=1740340442717"
                    alt="User Presence Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                />
            </div>
        ),
        icon: <IconUsers className="h-6 w-6 text-orange-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
]




