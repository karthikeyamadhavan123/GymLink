import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Main = () => {
  const controlsFirst = useAnimation();
  const controlsSecond = useAnimation();

  const [refFirst, inViewFirst] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [refSecond, inViewSecond] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inViewFirst) {
      controlsFirst.start("visible");
    }
    if (inViewSecond) {
      controlsSecond.start("visible");
    }
  }, [controlsFirst, controlsSecond, inViewFirst, inViewSecond]);

  const leftToRightVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightToLeftVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="text-center mt-10 flex flex-col">
      <h1 className="text-4xl font-semibold font-nunito">
        FITNESS <span className="text-4xl text-[#88E70B] font-bold font-roboto">STORIES</span>
      </h1>

      <div className="flex flex-col items-center">
        {/* First Section */}
        <motion.div
          ref={refFirst}
          initial="hidden"
          animate={controlsFirst}
          variants={leftToRightVariant}
          className="w-full max-w-6xl mx-auto p-4 relative"
        >
          {/* Large "01" number */}
          <div className="absolute top-0 left-0 z-0">
            <h1 className="text-gray-300 text-9xl leading-none font-roboto font-semibold">01</h1>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 pt-16 relative z-10">
            {/* Text Content */}
            <div className="md:col-span-7 relative">
              {/* Semi-transparent background */}
              <div
                className="bg-gray-200 bg-opacity-40 p-6 relative z-10 text-start rounded-tl-xl"
                style={{ backgroundColor: "rgba(229, 231, 235, 0.64)" }}
              >
                <p className="text-black mb-4 text-[16px] z-20">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Ornare porta nec orci, nostra
                  accumsan primis. Odio convallis iaculis metus enim sagittis. Ad mi aenean in hendrerit
                  orci sed blandit tellus. Blandit cubilia sapien eros class adipiscing fusce class cras
                  non. Quisque quis eu himenaeos vehicula sem leo.
                </p>
                <p className="text-black text-[16px]">
                  Leo eleifend suspendisse justo maximus morbi sapien eros. In ullamcorper mattis
                  litora sit nisl interdum. Tempor egestas non elementum; vestibulum lacus finibus.
                  Proin fermentum iaculis ornare sociosqu, facilisi risus maecenas nam. Gravida vehicula
                  at, vulputate dictumst lobortis auctor lacus. Justo augue laoreet consequat; platea
                  nam id eros. Primis elit conubia; eget platea hac felis. Nulla dignissim metus proin
                  dapibus nullam rhoncus.
                </p>
              </div>
            </div>

            {/* Green section with the triangular indent - fixed to stay with card */}
            <div className="md:col-span-5 relative">
              {/* Image on top of green section (visible only on lg screens and above) */}
              <div className="absolute right-0 top-0 bottom-0 md:w-3/5 z-30 hidden lg:block">
                <img
                  src="/1.jpg"
                  alt="Person in fitness attire"
                  className="w-[250px] h-[250px] object-cover rounded-tl-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second Section */}
        <motion.div
          ref={refSecond}
          initial="hidden"
          animate={controlsSecond}
          variants={rightToLeftVariant}
          className="w-full max-w-6xl mx-auto p-4 relative flex items-center mt-10"
        >
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 pt-16 relative z-10">
            {/* Image on the left (visible only on lg screens and above) */}
            <div className="md:col-span-5 relative">
              {/* Image on top of green section */}
              <div className="absolute left-0 top-0 bottom-0 md:w-3/5 z-30 hidden lg:block">
                <img
                  src="/2.jpg"
                  alt="Person exercising"
                  className="w-[250px] h-[250px] object-cover rounded-tr-xl"
                />
              </div>
            </div>

            {/* Text Content on the right */}
            <div className="md:col-span-7 relative">
              <div className="absolute -top-20 left-0 z-0">
                <h1 className="text-gray-300 text-9xl leading-none font-roboto font-semibold">02</h1>
              </div>
              {/* Semi-transparent background */}
              <div
                className="bg-gray-200 bg-opacity-40 p-6 relative z-10 text-start rounded-tr-xl"
                style={{ backgroundColor: "rgba(229, 231, 235, 0.64)" }}
              >
                <p className="text-black mb-4 text-[16px]">
                  Lorem ipsum dolor amet, consectetur adipiscing elit. Ornare porta nec orci, nostra
                  accumsan primis. Odio convallis iaculis metus enim sagittis. Ad mi aenean in hendrerit
                  orci sed blandit tellus. Blandit cubilia sapien eros class adipiscing fusce class cras
                  non. Quisque quis eu himenaeos vehicula sem leo.
                </p>
                <p className="text-black text-[16px]">
                  Leo eleifend suspendisse justo maximus morbi sapien eros. In ullamcorper mattis
                  litora sit nisl interdum. Tempor egestas non elementum; vestibulum lacus finibus.
                  Proin fermentum iaculis ornare sociosqu, facilisi risus maecenas nam. Gravida vehicula
                  at, vulputate dictumst lobortis auctor lacus. Justo augue laoreet consequat; platea
                  nam id eros. Primis elit conubia; eget platea hac felis. Nulla dignissim metus proin
                  dapibus nullam rhoncus.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Main;