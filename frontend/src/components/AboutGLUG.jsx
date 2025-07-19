
const AboutGLUG = () => {
  return (
    <>
      <div id="AboutGLUG" className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 py-12">
        <div className="px-4 sm:px-6 lg:px-12 py-8 w-full">
          {/* Header and Goals Side-by-side */}
          <div className="flex flex-col xl:flex-row gap-12 mb-12">
            
            {/* Header Content */}
            <div className="w-full xl:w-1/2 px-2 sm:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-4 lg:pb-6 xl:pb-8">
              <div className="flex flex-col">
                <h1 className="font-poppins text-xl text-gray-100 mb-4">About us</h1>
                <p className="font-noto-serif-jp uppercase text-[2rem] font-bold text-gray-300  mb-6">
                  Born from curiosity, powered by community.
                </p>
                <div className="font-helvetica space-y-6">
                  <p className=" text-lg text-gray-200">
                    The GNU/Linux Users Group (GLUG) of Jontet Engineering College is a student-led community of passionate developers, designers, and tech enthusiasts committed to promoting open-source software and collaborative learning.
                  </p>
                  <p className="text-lg text-gray-200">
                    We host workshops, hackathons, tech talks, and contribute to real-world open-source projects—empowering students to grow their skills and innovate together. From Linux basics to global programs like GSoC, we help our members explore the endless possibilities of open technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Goal Section */}
            <div className="w-full xl:w-1/2 px-2 sm:px-4 lg:px-6 xl:px-8">
              <div className="font-helvetica h-full flex flex-col bg-[#83B3FF] rounded-xl p-6 sm:p-8 lg:p-10">
                <div>
                  <br/>
                  <h2 className="text-2xl font-bold text-white mb-6">Our Goal</h2>
                  <ul className="ml-6 list-disc list-inside text-white space-y-1 text-md">
                    <br/>
                    <li>Promote open-source culture</li>
                    <li>Build technical skills</li>
                    <li>Foster collaboration</li>
                    <li>Create innovative solutions</li>
                  </ul>
                </div>
                <div className="mt-auto pt-6">
                  <img src="images/aboutLogo.png" alt="GLUG Logo" className="w-48 sm:w-56 md:w-60" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Sponsors Section OUTSIDE the gradient */}
      {/* <div className="w-screen py-6 mx-auto relative left-1/2 right-1/2 -translate-x-1/2 bg-[#3B8FE1] text-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Sponsors</h2>
        <div className="flex justify-center items-center gap-4 overflow-x-auto px-4">
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={assamLogo} alt="Assam" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={saurabhiLogo} alt="Saurabhi" className="w-full h-full object-contain" />
          </div>
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={frintLogo} alt="Frint" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={instrumentLogo} alt="Instrument" className="w-full h-full object-contain" />
          </div>
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={oilLogo} alt="Oil" className="w-full h-full object-contain" />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AboutGLUG;
