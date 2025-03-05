import {
    IconHome,
    IconMessage,
    IconUser,
    IconRocket,
} from "@tabler/icons-react"
import { Collaboration } from "@/sections/collaboration"
import { SamePage } from "@/sections/same-page"
import "./Home.css"
import { SparklesPreview } from "@/components/UI/Sparkles/SparklesPreview"
import { MacbookScrollHero } from "@/components/UI/Macbook-scroll/MacbookScrollHero"
import Features from "@/components/Features/Features"
import { StepByStep } from "@/components/StepByStep/StepByStep"
import FinalSection from "@/components/FinalSection/FinalSection"
import { FloatingNav } from "@/components/UI/Floating-Navbar/floating-navbar"
export default function Home() {
    const navItems = [
        {
            name: "Home",
            link: "#home",
            icon: (
                <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
        {
            name: "About",
            link: "#about",
            icon: (
                <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
        {
            name: "Features",
            link: "#features",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },

        {
            name: "GetStarted",
            link: "#final-section",
            icon: (
                <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />
            ),
        },
    ]


    return (
        <>
            <main>
                <FloatingNav navItems={navItems} />
                <section  id="home" className="min-h-screen">
                    <SparklesPreview />
                </section>
                <div className="relative z-10 w-full overflow-x-clip">
                        <MacbookScrollHero />
                        <Collaboration />
                    <section id="about" className="min-h-screen">
                        <SamePage />
                    </section>
                    <section id="features" className="min-h-screen">
                        <Features />
                    </section>
                    <StepByStep />
                    <section id="final-section" className="min-h-screen">
                        <FinalSection />
                    </section>
                </div>
            </main>
        </>
    )
}
