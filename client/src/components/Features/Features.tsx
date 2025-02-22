import { BentoGrid, BentoGridItem } from "../UI/bento-grid/bento-grid"
import {
    IconCode,
    IconFolder,
    IconDownload,
    IconUsers,
    IconSettings,
    IconBrush,
    IconTypography,
} from "@tabler/icons-react"

export default function Features() {
    return (
        <section
            className="container mx-auto bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] px-6 py-20"
            id="features"
        >
            <BentoGrid className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={
                            i === 0 || i === 3
                                ? "col-span-2 row-span-2 rounded-xl bg-black p-6"
                                : "col-span-1 row-span-1 rounded-xl bg-black p-6"
                        }
                    />
                ))}
            </BentoGrid>
        </section>
    )
}

const Skeleton = () => (
    <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-black"></div>
)

const items = [
    {
        title: "Real-time Collaboration",
        description:
            "Work on code simultaneously with multiple users and see changes in real time.",
        header: <Skeleton />,
        icon: (
            <IconUsers className="h-6 w-6 bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent" />
        ),
    },
    {
        title: "File Management",
        description:
            "Create, edit, save, and organize files and folders efficiently.",
        header: <Skeleton />,
        icon: (
            <IconFolder className="h-6 w-6 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent" />
        ),
    },
    {
        title: "Code Execution",
        description:
            "Run code directly within the environment with real-time output.",
        header: <Skeleton />,
        icon: (
            <IconCode className="h-6 w-6 bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent" />
        ),
    },
    {
        title: "Instant Updates",
        description:
            "Code changes are synced instantly across all files and users.",
        header: <Skeleton />,
        icon: (
            <IconDownload className="h-6 w-6 bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent" />
        ),
    },
    {
        title: "User Presence",
        description:
            "See who's online and get notifications for user activity.",
        header: <Skeleton />,
        icon: (
            <IconSettings className="h-6 w-6 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent" />
        ),
    },
    {
        title: "Real-time Chat",
        description:
            "Communicate seamlessly with team members inside the editor.",
        header: <Skeleton />,
    },
    {
        title: "Custom Themes & Fonts",
        description:
            "Personalize your coding experience with various themes and fonts.",
        header: <Skeleton />,
        icon: (
            <IconBrush className="h-6 w-6 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent" />
        ),
    },
    {
        title: "Typography Customization",
        description: "Change font size and style to match your preference.",
        header: <Skeleton />,
        icon: (
            <IconTypography className="h-6 w-6 bg-gradient-to-r from-teal-400 to-blue-300 bg-clip-text text-transparent" />
        ),
    },
]
