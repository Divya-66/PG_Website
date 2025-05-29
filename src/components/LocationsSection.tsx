import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LocationCardProps {
  id: string;
  name: string;
  image: string;
  address: string;
  nearbyPlaces: string;
}

const LocationCard = ({ id, name, image, address, nearbyPlaces }: LocationCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={`${name} PG Accommodation`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{address}</p>
        <p className="text-sm text-gray-500 mb-4">Near: {nearbyPlaces}</p>
        <Link to={`/pg/${id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

const locations = [
  {
    id: "anna-nagar",
    name: "Anna Nagar PG",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    address: "45 Second Avenue, Anna Nagar, Chennai",
    nearbyPlaces: "Anna University, VR Mall, Metro Station"
  },
  {
    id: "adyar",
    name: "Adyar PG",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    address: "12 Beach Road, Adyar, Chennai",
    nearbyPlaces: "IIT Madras, Adyar Beach, Phoenix Mall"
  },
  {
    id: "velachery",
    name: "Velachery PG",
    image: "https://images.unsplash.com/photo-1648012201258-33cbfbf96327",
    address: "78 Main Street, Velachery, Chennai",
    nearbyPlaces: "SRM University, Phoenix Mall, Grand Mall"
  },
];

const LocationsSection = () => {
  return (
    <section id="locations" className="py-16 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">PG Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              id={location.id}
              name={location.name}
              image={location.image}
              address={location.address}
              nearbyPlaces={location.nearbyPlaces}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
