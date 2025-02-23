import { MessageCircle } from "lucide-react"
import { BentoGrid, BentoGridItem } from "../UI/bento-grid/bento-grid"
import {
    IconCode,
    IconFolder,
    IconDownload,
    IconUsers,
    IconBrush,
} from "@tabler/icons-react"

export default function Features() {
    return (
        <section
            className="relative h-full w-full bg-slate-950 bg-[radial-gradient(circle_at_center,rgba(255,0,182,.15),rgba(255,255,255,0))] px-5 py-24"
            id="features"
        >
            <h1 className = "text-center text-[70px] px-5 py-5">Features</h1>
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
        </section>
    )
}

const Skeleton = () => (
    <div className="h-32 w-full rounded-lg bg-gray-700"></div>
)

const items = [
    {
        title: "Real-time Collaboration",
        description:
            "Work on code simultaneously with multiple users and see changes in real time.",
        header: (
            <img
                src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20gif.gif?updatedAt=1740311271013"
                alt="Feature Image"
                className="h-auto max-h-[400px] w-auto rounded-lg md:max-h-[350px] lg:max-h-[450px]"
            />
        ),
        icon: <IconUsers className="h-6 w-6 text-blue-400" />,
        classname: "col-span-2 row-span-2 rounded-xl bg-black p-6",
    },
    {
        title: "Real-time Chat",
        description:
            "Communicate seamlessly with team members inside the editor.",
        header: (
            <img
                src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20chat%20gif.gif?updatedAt=1740334270853"
                alt="Real-time Chat Feature"
                className="h-[75%] max-h-[400px] w-full rounded-lg md:max-h-[350px] lg:max-h-[450px]"
            />
        ),
        icon: <MessageCircle className="h-6 w-6 text-cyan-400" />,
        classname: "col-span-1 row-span-2 rounded-xl bg-black p-6",
    },
    {
        title: "File Management",
        description:
            "Create, edit, save, and organize files and folders efficiently.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20Files.png?updatedAt=1740335807516"
                    alt="File Management Feature"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        ),
        icon: <IconFolder className="h-6 w-6 text-purple-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "Code Execution",
        description:
            "Run code directly within the environment with real-time output.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20Run.gif?updatedAt=1740337729864"
                    alt="Code Execution Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                />
            </div>
        ),
        icon: <IconCode className="h-6 w-6 text-green-400" />,
        classname: "col-span-1 row-span-2 rounded-xl bg-black p-6",
    },
    {
        title: "Instant Updates",
        description:
            "Code changes are synced instantly across all files and users.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20updates%20gif.gif?updatedAt=1740340442717"
                    alt="Instant Updates Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                />
            </div>
        ),
        icon: <IconDownload className="h-6 w-6 text-red-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "User Presence",
        description:
            "See who's online and get notifications for user activity.",
        header: (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20Users.gif"
                    alt="User Presence Feature"
                    className="absolute inset-0 h-full w-full object-contain"
                />
            </div>
        ),
        icon: <IconUsers className="h-6 w-6 text-indigo-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
    {
        title: "Custom Themes & Fonts",
        description:
            "Personalize your coding experience with various themes and fonts.",
        header: <Skeleton />,
        icon: <IconBrush className="h-6 w-6 text-pink-400" />,
        classname: "col-span-1 row-span-1 rounded-xl bg-black p-6",
    },
]
