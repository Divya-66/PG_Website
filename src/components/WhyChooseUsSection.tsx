import React from "react";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: "Trusted by 300+ Residents",
      description: "Our community includes students and professionals from top institutions and companies.",
    },
    {
      title: "Dedicated Boys & Girls PGs",
      description: "Separate accommodations with customized facilities for both male and female residents.",
    },
    {
      title: "Prime Locations",
      description: "Strategically located near major colleges, universities and business districts.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="section-container">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-card rounded-lg p-6 text-center shadow-md border border-border">
              <h3 className="text-xl font-bold mb-3 text-primary">{reason.title}</h3>
              <p className="text-secondary-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
