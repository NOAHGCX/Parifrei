import React from 'react';

const AthleteBio = ({ status, birthplace, age, weight, octagon_debut }) => {
  return (
    <div className="athlete-bio mt-4 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Bio</h2>
      <p>Status: {status}</p>
      <p>Birthplace: {birthplace}</p>
      <p>Age: {age}</p>
      <p>Weight: {weight}</p>
      <p>Octagon Debut: {octagon_debut}</p>
    </div>
  );
};

export default AthleteBio;
