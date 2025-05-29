import React from "react";

const Hero = () => {
  const handleBookClick = () => {
    const bookSection = document.getElementById("book");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-background to-card opacity-60 z-0"></div>
      <div className="relative min-h-[80vh] flex items-center z-10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Find Your Perfect Stay.
              <span className="block text-primary">Book a Visit Today.</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-lg">
              Safe, comfortable, home-like PGs for students and young professionals
              near XYZ University, Chennai.
            </p>
            <button
              onClick={handleBookClick}
              className="btn-primary text-lg transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Book Your Visit
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="Cozy PG room with a student studying"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
