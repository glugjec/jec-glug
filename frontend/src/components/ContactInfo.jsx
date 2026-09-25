import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Lightbulb,
  Code2,
  BookOpen,
  Users
} from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@glugjec.com",
      action: "Send us an email",
      href: "mailto:contact@glugjec.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Jorhat Engineering College",
      action: "View on map",
      href: "https://www.google.com/maps/search/?api=1&query=Jorhat+Engineering+College"
    }
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      href: "https://www.instagram.com/jecglug/"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/glug-jec/"
    }
  ];

  const glugTopics = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: "Learn new technologies"
    },
    {
      icon: <Code2 className="w-4 h-4" />,
      text: "Explore open-source"
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "Participate in technical events"
    }
  ];

  return (
    <div className="h-full flex flex-col">

      <div>
        <p className="text-[#60B5FF] text-sm uppercase tracking-wider font-medium mb-2">
          Reach out
        </p>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          We'd love to hear from you.
        </h2>

        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
          Whether you have a question, want to learn more about GLUG JEC,
          or simply want to connect, feel free to reach out.
        </p>
      </div>

      <div className="space-y-4 mt-8">

        {contactDetails.map((detail, index) => (
          <a
            key={index}
            href={detail.href}
            target={detail.label === "Location" ? "_blank" : undefined}
            rel={detail.label === "Location" ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-[#3093E5]/40 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#3093E5]/15 border border-[#3093E5]/20 flex items-center justify-center text-[#60B5FF] flex-shrink-0">
              {detail.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {detail.label}
              </p>

              <p className="text-white text-sm sm:text-base mt-1 truncate">
                {detail.value}
              </p>

              <p className="text-[#60B5FF] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {detail.action}
              </p>
            </div>

            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#60B5FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" />
          </a>
        ))}

      </div>

      <div className="mt-8">

        <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
          Connect with us
        </p>

        <div className="grid grid-cols-2 gap-3">

          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-[#3093E5]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-gray-300 group-hover:text-[#60B5FF] transition-colors duration-300">
                {social.icon}
              </div>

              <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                {social.name}
              </span>
            </a>
          ))}

        </div>
      </div>

      <div className="mt-8">

        <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
          What we do
        </p>

        <div className="space-y-2.5">

          {glugTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <div className="w-8 h-8 rounded-lg bg-[#3093E5]/10 border border-[#3093E5]/15 flex items-center justify-center text-[#60B5FF] flex-shrink-0">
                {topic.icon}
              </div>

              <span>
                {topic.text}
              </span>
            </div>
          ))}

        </div>

      </div>

      <div className="mt-auto pt-8">

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#3093E5]/10 to-transparent border border-[#3093E5]/10">

          <Lightbulb className="w-5 h-5 text-[#60B5FF] flex-shrink-0" />

          <p className="text-sm text-gray-300 leading-relaxed">
            Curious about open source or technology?
            <span className="text-white font-medium">
              {' '}Reach out and connect with GLUG JEC.
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default ContactInfo;