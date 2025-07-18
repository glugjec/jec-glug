import React from "react";

const Gallery = () => {
  return (
    <section
      className="w-screen flex justify-center items-center py-12"
      style={{
        background: "linear-gradient(to bottom, #03022C, #151C57)",
      }}
    >
      <div className="max-w-4xl w-full px-4">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Gallery</h2>
        <img
          src="images/gallery.png"
          alt="Gallery Collage"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Gallery;
