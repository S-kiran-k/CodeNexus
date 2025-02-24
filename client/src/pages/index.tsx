import { Collaboration } from "@/sections/collaboration";
import { SamePage } from "@/sections/same-page";
import "./Home.css"
import { SparklesPreview } from "@/components/UI/Sparkles/SparklesPreview"
import { MacbookScrollHero } from '../components/UI/Macbook-scroll/MacbookScrollHero';
import Features from "@/components/Features/Features";
import { StepByStep } from "@/components/StepByStep/StepByStep";
import FinalSection from "@/components/FinalSection/FinalSection";
// import HomePage from "@/components/Home/Home";
// import { SmoothScrollEffect } from "@/sections/SmoothScrollEffect"
// import  Hero  from "@/sections/hero";

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
                  <StepByStep/>
                  <FinalSection/>
                  {/* <HomePage/> */}
                  {/*<SmoothScrollEffect /> */}
              </div>
          </main>
      </>
  )
}
