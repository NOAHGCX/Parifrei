import React from 'react';

const AthleteBio = ({ status, birthplace, age, weight, octagon_debut }) => {
  return (
    <div className="athlete-bio mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Bio</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="text-lg font-medium">Status</p>
          <p className="text-xl">{status}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Birthplace</p>
          <p className="text-xl">{birthplace}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Age</p>
          <p className="text-xl">{age}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Weight</p>
          <p className="text-xl">{weight}</p>
        </div>
        <div className="col-span-2">
          <p className="text-lg font-medium">Octagon Debut</p>
          <p className="text-xl">{octagon_debut}</p>
        </div>
      </div>
    </div>
  );
};

export default AthleteBio;
