import React from "react";
import { Wifi, Shield, Utensils, CircleDollarSign, Trash, Gamepad2 } from "lucide-react";

interface AmenityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Amenity = ({ icon, title, description }: AmenityProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="text-primary mb-4 p-3 bg-secondary rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-secondary-foreground text-center text-sm">{description}</p>
    </div>
  );
};

const AmenitiesSection = () => {
  const amenities = [
    {
      icon: <Wifi size={24} />,
      title: "Free Wi-Fi",
      description: "High-speed internet available throughout the premises",
    },
    {
      icon: <Shield size={24} />,
      title: "24x7 Security",
      description: "CCTV surveillance and security personnel for your safety",
    },
    {
      icon: <Utensils size={24} />,
      title: "Home-Style Meals",
      description: "Nutritious and delicious meals prepared freshly",
    },
    {
      icon: <CircleDollarSign size={24} />,
      title: "Laundry Services",
      description: "Weekly laundry service included in your package",
    },
    {
      icon: <Trash size={24} />,
      title: "Housekeeping",
      description: "Regular cleaning services to maintain hygiene",
    },
    {
      icon: <Gamepad2 size={24} />,
      title: "Recreational Facilities",
      description: "Common areas for relaxation and entertainment",
    },
  ];

  return (
    <section id="amenities" className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">Amenities and Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <Amenity
              key={index}
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
