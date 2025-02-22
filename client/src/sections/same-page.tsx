import { stylesWithCssVar } from "@/utils/motion";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const animationOrder = {
    initial: 0,
    fadeInEnd: 0.15,
    showParagraphOne: 0.25,
    hideParagraphOne: 0.3,
    showParagraphTwoStart: 0.35,
    showParagraphTwoEnd: 0.4,
    hideParagraphTwo: 0.5,
    showParagraphThreeStart: 0.6,
    showParagraphThreeEnd: 0.65,
    hideParagraphThree: 0.75,
    showLoadingScreenStart: 0.53,
    showLoadingScreenEnd: 0.58,
    createBranchStart: 0.65,
    createBranchEnd: 0.7,
    createBranchFadeInStart: 0.78,
    createBranchFadeInEnd: 0.85,
    endTextFadeInStart: 0.95,
    endTextFadeInEnd: 1,
    endTextFadeInStart2: 0.95,
    endTextFadeInEnd2: 1,
}

export const SamePage = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.createBranchEnd,
      animationOrder.endTextFadeInStart,
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.showLoadingScreenEnd,
      animationOrder.createBranchStart,
    ],
    [3, 1, 1, 1]
  );
  const x = useTransform(
      scrollYProgress,
      [
          animationOrder.initial,
          animationOrder.showParagraphOne,
          animationOrder.hideParagraphOne,
          animationOrder.showParagraphTwoStart,
          animationOrder.showParagraphTwoEnd,
          animationOrder.hideParagraphTwo,
          animationOrder.showParagraphThreeStart,
          animationOrder.showParagraphThreeEnd,
          animationOrder.hideParagraphThree,
          animationOrder.showLoadingScreenStart,
          animationOrder.showLoadingScreenEnd,
          animationOrder.createBranchEnd,
      ],
      [
          "50%",
          "50%",
          "55%",
          "-50%",
          "-50%",
          "-55%",
          "0%",
          "0%",
          "-50%",
          "-50%",
          "-55%",
          "-27%",
          
      ],
  )




  const paragraph1Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    [0, 1, 0]
  );


  const paragraph1TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const paragraph2Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    [0, 1, 0]
  );

  
  const paragraph2TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const paragraph3Opacity = useTransform(
      scrollYProgress,
      [
          animationOrder.showParagraphThreeStart,
          animationOrder.showParagraphThreeEnd,
          animationOrder.hideParagraphThree,
      ],
      [0, 1, 0],
  )
    const paragraph3TranslateY = useTransform(
        scrollYProgress,
        [
            animationOrder.showParagraphThreeStart,
            animationOrder.showParagraphThreeEnd,
            animationOrder.hideParagraphThree,
        ],
        ["4rem", "0rem", "-4rem"],
    )


  const endTextOpacity = useTransform(
      scrollYProgress,
      [animationOrder.endTextFadeInStart2, animationOrder.endTextFadeInEnd2],
      [0, 1],
  )
  const endTextScale = useTransform(
      scrollYProgress,
      [animationOrder.endTextFadeInStart2, animationOrder.endTextFadeInEnd2],
      [0.8, 1],
  )
  const endTextTranslateY = useTransform(
      scrollYProgress,
      [animationOrder.endTextFadeInStart2, animationOrder.endTextFadeInEnd2],
      ["4rem", "0rem"],
  )

  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );



  return (
      <section ref={targetRef}>
          <div className="relative h-[800vh]">
              <div className="sticky top-1/2 flex origin-center -translate-y-1/2 justify-center">
                  <motion.div
                      className="translate-x-centered-offset absolute left-1/2 top-1/2 flex w-[50vw] -translate-y-1/2 scale-[var(--scale)] flex-col items-center justify-center "
                      style={stylesWithCssVar({
                          opacity,
                          "--x": x,
                          "--scale": scale,
                      })}
                  >
                      <img src="/main-screen.svg" className="h-auto w-full" />
                  </motion.div>
              </div>
              <motion.p
                  style={stylesWithCssVar({
                      opacity: paragraph1Opacity,
                      "--y": paragraph1TranslateY,
                      position,
                  })}
                  className="translate-y-centered-offset left-[20px] top-1/2 w-[300px] pl-16 text-2xl leading-tight text-white"
              >
                  Collaborate in real-time.
                  <br />
                  <span className="text-white">
                      Share code, share insights, build together.
                  </span>
              </motion.p>
              <motion.p
                  style={stylesWithCssVar({
                      opacity: paragraph2Opacity,
                      "--y": paragraph2TranslateY,
                      position,
                  })}
                  className="translate-y-centered-offset right-[20px] top-1/2 w-[300px] pr-16 text-xl leading-tight text-white"
              >
                  Great ideas go beyond code.
                  <br />
                  <span className="text-white">
                      Align your team with real-time collaboration.
                  </span>
              </motion.p>
              <motion.p
                  style={stylesWithCssVar({
                      opacity: paragraph3Opacity,
                      "--y": paragraph3TranslateY,
                      position,
                  })}
                  className="translate-y-centered-offset right-[20px] top-1/2 w-[300px] pr-16 text-xl leading-tight text-white"
              >
                  Debug faster, build smarter,
                  <br />
                  <span className="text-white">
                      and stay in sync—effortlessly.
                  </span>
              </motion.p>

              <motion.div
                  style={stylesWithCssVar({
                      opacity: endTextOpacity,
                      "--y": endTextTranslateY,
                      "--scale": endTextScale,
                      position,
                  })}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-center"
              >
                  <p className="text-6xl font-extrabold text-white">
                      Let's check out the{" "}
                      <span className="text-gray-500">amazing features!</span>
                  </p>
              </motion.div>
          </div>
      </section>
  )
};
