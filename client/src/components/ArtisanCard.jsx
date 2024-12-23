import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

export default function ArtisanCard({ artisan }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/sellerhome/${artisan.brand._id}`)}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm dark:bg-gray-950 cursor-pointer transform transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="relative h-48 w-full">
          <img
            alt="Artisan Image"
            className="object-cover w-full h-full"
            height={300}
            src={artisan.brand.image}
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={400}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar className="w-16 h-16 border-4 border-white dark:border-gray-950">
              <AvatarImage alt="Artisan Name" src={artisan.image} />
              <AvatarFallback>
                {extractInitials(artisan.brand.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">{artisan.brand.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
            {artisan.brand.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function extractInitials(name) {
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    initials += word.charAt(0).toUpperCase();
  }
  return initials;
}
