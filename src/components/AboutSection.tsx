import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="section-container">
        <h2 className="section-title">About Us</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-secondary-foreground leading-relaxed">
            CozyStay PG provides safe, comfortable, and affordable accommodation for students and young professionals. 
            With over 5 years of experience, we understand what residents need to feel at home while focusing on their studies or careers.
            Our PGs are strategically located near major educational institutions and business hubs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
