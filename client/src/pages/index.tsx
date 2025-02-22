import { Collaboration } from "@/sections/collaboration";
// import  Hero  from "@/sections/hero";
import { SamePage } from "@/sections/same-page";
// import { SmoothScrollEffect } from "@/sections/SmoothScrollEffect"
import "./Home.css"
import { SparklesPreview } from "@/components/UI/Sparkles/SparklesPreview"
import { MacbookScrollHero } from '../components/UI/Macbook-scroll/MacbookScrollHero';
import Features from "@/components/Features/Features";
// import HomePage from "@/components/Home/Home";
export default function Home() {
  return (
      <>
          <main>
              <SparklesPreview />

              <div className="relative z-10 w-full overflow-x-clip">
                  <MacbookScrollHero />
                  <Collaboration />
                  <SamePage />
                  <Features/>
                  {/* <HomePage/> */}
                  {/*<SmoothScrollEffect /> */}
              </div>
          </main>
      </>
  )
}
