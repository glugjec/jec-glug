
const AboutGLUG = () => {
  return (
    <div id="AboutGLUG" className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 py-12">
      <div className="px-4 sm:px-6 lg:px-12 py-8 w-full">
        {/* Main flex container. 
          It stacks children vertically by default (`flex-col`).
          On extra-large screens (`xl:`), it switches to a horizontal layout (`flex-row`).
        */}
        <div className="flex flex-col xl:flex-row gap-12 mb-12">
          
          {/* Column 1: "About us" Content */}
          <div className="w-full xl:w-1/2 px-2 sm:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-4 lg:pb-6 xl:pb-8">
            <div className="h-full flex flex-col rounded-xl p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col">
                <h1 className="font-poppins text-xl text-gray-100 mb-4">About us</h1>
                <p className="font-noto-serif-jp text-[2.5rem] font-bold text-gray-300 mb-6">
                  Born from curiosity, powered by community.
                </p>
                <div className="font-helvetica space-y-6">
                  <p className="text-lg text-gray-200 text-justify" >
                    The GNU/Linux Users Group (GLUG) of Jorhat Engineering College is a student-led community of passionate developers, designers, and tech enthusiasts committed to promoting open-source software and collaborative learning.
                  </p>
                  <p className="text-lg text-gray-200 text-justify">
                    We host workshops, hackathons, tech talks, and contribute to real-world open-source projects—empowering students to grow their skills and innovate together. From Linux basics to global programs like GSoC, we help our members explore the endless possibilities of open technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: "Our Goal" Section */}
          <div className="w-full xl:w-1/2 px-2 sm:px-4 lg:px-6 xl:px-8">
            <div class="font-helvetica h-full flex flex-col bg-[#83B3FF] rounded-xl p-6 sm:p-8 lg:p-10">
  <div>
    <h3 className="text-2xl font-family-noto-serif-jp text-white mb-6">Our Goal</h3>
    
    <ul class="font-family-helvetica ml-6 list-disc list-inside text-white space-y-3 text-md">
      <li>Promote open-source culture</li>
      <li>Build technical skills</li>
      <li>Foster collaboration</li>
      <li>Create innovative solutions</li>
    </ul>
  </div>

  {/* --- MODIFICATION --- */}
  {/* The `ml-8` class has been removed from this div to align the logo with the "Our Goal" title. */}
  <div class="mt-auto pt-6">
    <img 
      src="images/aboutLogo.png" 
      alt="GLUG Logo" 
      class="w-48 sm:w-56 md:w-60"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/240x100/ffffff/83B3FF?text=GLUG+Logo'; }}
    />
  </div>
</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutGLUG;
