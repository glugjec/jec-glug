const AboutGLUG = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header and Goals Side-by-side */}
      <div className="flex flex-col md:flex-row gap-12 mb-12">
        {/* Header Content (now in column) */}
        <div className="md:w-1/2">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About us</h1>
            <p className="text-xl text-gray-600 italic mb-6">Born from curiosity, powered by community.</p>
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                The GNU/Linux Users Group (GLUG) of Jontet Engineering College is a student-led community of passionate developers, designers, and tech enthusiasts committed to promoting open-source software and collaborative learning.
              </p>
              <p className="text-lg text-gray-700">
                We host workshops, hackathons, tech talks, and contribute to real-world open-source projects—empowering students to grow their skills and innovate together. From Linux basics to global programs like GSoC, we help our members explore the endless possibilities of open technology.
              </p>
            </div>
          </div>
        </div>

        {/* Our Goal Section (now side-by-side on desktop) */}
        <div className="md:w-1/2">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Goal</h2>
            <ul className="grid grid-cols-1 gap-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">-</span>
                <span className="text-gray-700">Promote open-source culture</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">-</span>
                <span className="text-gray-700">Build technical skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">-</span>
                <span className="text-gray-700">Foster collaboration</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">-</span>
                <span className="text-gray-700">Create innovative solutions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sponsors Section (below in column) */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Sponsors</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-20 flex items-center justify-center">
            <span className="font-medium text-gray-700">ascam</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-20 flex items-center justify-center">
            <span className="font-medium text-gray-700">Fruit</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-20 flex items-center justify-center">
            <span className="font-medium text-gray-700">SUBIBRI</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-20 flex items-center justify-center">
            <span className="font-medium text-gray-700">MEDIA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGLUG;