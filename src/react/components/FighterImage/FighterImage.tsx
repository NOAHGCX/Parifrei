import React from 'react';

const FighterImage = ({ fighter }) => {
  const imageUrl = fighter.images.find(img => img.type === 'background')?.url || fighter.images[1].url;
  const statusColor = fighter.status === 'active' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="relative w-48 h-72 overflow-hidden mb-4">
        {imageUrl && <img src={imageUrl} alt={fighter.name} className="w-full h-full object-cover object-top transform rotate-6" />}
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
