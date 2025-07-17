import React, { useState } from "react";

const getProfilePic = (name) => {
  const firstName = name.split(" ")[0].toLowerCase();
  return `/images/${firstName}.jpg`;
};

const ManagementTeam = () => {
  const [show, setShow] = useState(true);

  const members = [
    {
      name: "Bishal Ranjan Nath",
      role: "Management Lead",
      desc: "Event planning and team coordination",
    },
    {
      name: "Priyam Nath",
      role: "Coordinator",
      desc: "Project management and logistics",
    },
    {
      name: "Arindom Mahanta",
      role: "Coordinator",
      desc: "Budget management and resources",
    },
    {
      name: "Ananya Das",
      role: "Coordinator",
      desc: "Partnership and collaboration",
    },
    {
      name: "Sumanta Bhargab",
      role: "Coordinator",
      desc: "Operations and workflow management",
    },
  ];

  return (
    <Section
      title="Management Team"
      show={show}
      setShow={setShow}
      cols="grid-cols-1 md:grid-cols-2"
      members={members}
    />
  );
};

const Section = ({ title, show, setShow, cols, members }) => (
  <div className="mx-auto my-8 max-w-5xl bg-black/25 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 transition-transform hover:scale-[1.01]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-white uppercase">{title}</h3>
      <button
        onClick={() => setShow(!show)}
        className="text-white text-3xl font-bold hover:text-green-400 transition-colors"
      >
        {show ? "–" : "+"}
      </button>
    </div>

    {show && (
      <div className={`grid ${cols} gap-6`}>
        {members.map((m, i) => (
          <Card key={i} m={m} />
        ))}
      </div>
    )}
  </div>
);

const Card = ({ m }) => {
  const imageSrc = getProfilePic(m.name);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex items-center space-x-4 shadow-md border border-white/10">
      <img
        src={imageSrc}
        alt={m.name}
        onError={(e) => {
          e.target.src = "/images/default.png";
        }}
        className="w-16 h-16 object-cover rounded-full border border-white/20"
      />
      <div>
        <h4 className="text-white font-semibold">{m.name}</h4>
        <p className="uppercase text-green-400 text-sm">{m.role}</p>
        <p className="text-gray-300 text-sm">{m.desc}</p>
      </div>
    </div>
  );
};

export default ManagementTeam;
