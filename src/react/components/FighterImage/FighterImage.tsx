import React from 'react';

const FighterImage = ({ fighter }) => {
  
console.log(fighter);
  let profileImage = fighter.images[1]?.url;

  if (!profileImage || profileImage.includes("no-profile-image.png") || profileImage.includes("silhouette-headshot-female.png")) {
    // Use fallback image if no profile image or if it's the "no-profile-image"
    profileImage = fighter.weight_class.includes("Women's ") ? '/UFC-Female-Fallback-Image.jpg' : '/UFC-Male-Fallback-Image.jpg';
  }
  const statusColor = fighter.status === 'active' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow-md h-[460px]">
      <div className="relative w-48 h-72 overflow-hidden mb-4">
        {profileImage && <img src={profileImage} alt={fighter.name} className="w-full h-full object-cover object-top transform " />}
      </div>
      <h2 className="text-xl font-bold">{fighter.name}</h2>
      {fighter.nickname && <p className="italic text-gray-700">"{fighter.nickname}"</p>}
      <p className="text-gray-600">Record: {fighter.record}</p>
      <p className="text-gray-600">Weight Class: {fighter.weight_class}</p>
      <p className={`${statusColor} font-bold`}>Status: {fighter.status}</p>
    </div>
  );
};

export default FighterImage;
