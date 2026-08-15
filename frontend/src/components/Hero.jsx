import React, { useEffect, useState } from "react";

const Hero = () => {
  const [circleVisible, setCircleVisible] = useState(false);

  const scrollTosec = () => {
    const teamSection = document.getElementById("AboutGLUG");

    if (teamSection) {
      teamSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCircleVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#03022B] flex justify-center overflow-hidden">

      <div className="w-full max-w-7xl flex flex-col items-center text-center px-4 pt-10 sm:pt-14 md:pt-16 lg:pt-20">

        <img
          src="/images/circle3.png"
          alt=""
          role="presentation"
          loading="lazy"
          className={`
            w-[75%]
            max-w-[420px]
            sm:w-[65%]
            sm:max-w-[480px]
            md:w-[55%]
            md:max-w-[520px]
            lg:w-[50%]
            lg:max-w-[580px]
            h-auto
            pointer-events-none
            transition-all
            duration-1000
            ease-out
            ${
              circleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }
          `}
        />

        <div
          className="
            w-full
            flex
            flex-col
            items-center
            text-center
            mt-[-10px]
            sm:mt-[-15px]
            md:mt-[-20px]
            lg:mt-[-25px]
            relative
            z-20
          "
        >
          <h1
            className="
              font-canno
              text-3xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-extrabold
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-white
              via-white
              to-blue-400
              tracking-wide
              leading-[1.1]
              drop-shadow-[0px_4px_24px_rgba(80,140,255,0.25)]
              pb-4
            "
          >
            Unleash Innovation
            <br />
            Through Open Source
          </h1>

          <p
            className="
              tracking-tight
              text-sm
              md:text-base
              text-blue-200
              mb-10
              max-w-lg
              mx-auto
              leading-tight
            "
          >
            It is a student-led community hosting tech events, workshops and
            hackathons with the support of industry sponsors.
          </p>

          <div
            className="
              font-helvetica
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-4
              pb-16
            "
          >
            <a
              href="https://chat.whatsapp.com/C3ZPRyoG0OI5Uy5ZEs7xxL"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                bg-gradient-to-r
                from-blue-400
                to-blue-600
                text-white
                font-semibold
                rounded-full
                px-8
                py-3
                shadow-md
                hover:from-blue-700
                hover:to-blue-500
                transition-all
                duration-300
                transform
                hover:scale-105
              "
            >
              Join Us
            </a>

            <button
              onClick={scrollTosec}
              className="
                inline-block
                bg-transparent
                border-2
                border-blue-400
                text-blue-300
                font-semibold
                rounded-full
                px-8
                py-3
                shadow-md
                hover:bg-blue-500
                hover:text-white
                transition-all
                duration-300
                transform
                hover:scale-105
              "
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;