import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import {
  Code2,
  GraduationCap,
  Users,
  Globe,
  Brain,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

const ContactSection = () => {
  const reasons = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Learn & Explore",
      description: "Discover new technologies and build your technical skills."
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Workshops & Events",
      description: "Take part in workshops, hackathons, tech talks and more."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Learn Together",
      description: "Connect and learn with fellow students and tech enthusiasts."
    }
  ];

  const techAreas = [
    {
      icon: <Code2 className="w-4 h-4" />,
      name: "Open Source"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      name: "Web Development"
    },
    {
      icon: <Brain className="w-4 h-4" />,
      name: "AI / ML"
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      name: "Cybersecurity"
    }
  ];

  return (
    <section className="relative min-h-screen py-16 sm:py-20 lg:py-24 text-white overflow-hidden">

      <div className="absolute top-20 left-10 w-72 h-72 bg-[#3093E5]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">

          <p className="text-[#60B5FF] text-sm sm:text-base font-medium tracking-[0.25em] uppercase mb-3">
            Contact GLUG JEC
          </p>

          <h1 className="font-canno text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#3093E5] via-white to-[#3093E5] bg-clip-text text-transparent">
            Get in Touch
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Have a question, want to learn more about GLUG JEC, or simply want
            to connect? We'd love to hear from you.
          </p>

        </div>

        <div className="relative backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] rounded-3xl shadow-2xl overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-[#3093E5]/[0.05] pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">

            <div className="p-6 sm:p-8 lg:p-12 lg:border-r border-white/10">
              <ContactInfo />
            </div>

            <div className="p-6 sm:p-8 lg:p-12">

              <div className="mb-7">

                <p className="text-[#60B5FF] text-sm font-medium uppercase tracking-wider mb-2">
                  Send a message
                </p>

                <h2 className="text-2xl sm:text-3xl font-semibold">
                  Let's start a conversation
                </h2>

                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Have something you'd like to ask? Drop us a message below.
                </p>

              </div>

              <ContactForm />

            </div>

          </div>

        </div>

        <div className="mt-16 sm:mt-20">

          <div className="text-center mb-8">

            <p className="text-[#60B5FF] text-sm uppercase tracking-wider font-medium mb-2">
              Why GLUG JEC?
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold">
              Learn, explore and grow together.
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-[#3093E5]/40 transition-all duration-300"
              >

                <div className="w-11 h-11 rounded-xl bg-[#3093E5]/15 border border-[#3093E5]/20 flex items-center justify-center text-[#60B5FF] mb-4 group-hover:scale-105 transition-transform duration-300">
                  {reason.icon}
                </div>

                <h3 className="text-white font-medium text-lg">
                  {reason.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                  {reason.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        <div className="mt-16 sm:mt-20">

          <div className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.05] border border-white/10 overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-[#3093E5]/10 via-transparent to-purple-500/5 pointer-events-none"></div>

            <div className="relative text-center">

              <p className="text-[#60B5FF] text-sm uppercase tracking-wider font-medium mb-2">
                Explore & Learn
              </p>

              <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
                Technology, open source and beyond.
              </h2>

              <div className="flex flex-wrap justify-center gap-3">

                {techAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:border-[#3093E5]/40 transition-all duration-300"
                  >

                    <span className="text-[#60B5FF]">
                      {area.icon}
                    </span>

                    <span className="text-sm">
                      {area.name}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

        <div className="mt-16 text-center">

          <div className="inline-flex items-center gap-2 text-[#60B5FF] mb-3">

            <Lightbulb className="w-5 h-5" />

            <span className="text-sm uppercase tracking-wider font-medium">
              Curious about technology?
            </span>

          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            There's always something new to learn.
          </h2>

          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Explore open source, participate in events and grow with GLUG JEC.
          </p>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;