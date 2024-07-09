import React, { useEffect, useState } from 'react';
import SearchBarFighter from '../../components/SearchBarFighter';
import AthleteStatisticsDuo from '../../components/AthleteStatisticsDuo';
import FighterImage from '../../components/FighterImage';

const CompareFighters = () => {
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    console.log('fighter1', fighter1);
    console.log('fighter2', fighter2);
  }, [fighter1, fighter2]);

  const handlePredictFight = () => {
    setShowStatistics(true);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-center text-3xl font-bold mb-6">Choisissez des combatants:</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <SearchBarFighter onFighterSelect={setFighter1} />
        <div className="text-2xl font-bold">VS</div>
        <SearchBarFighter onFighterSelect={setFighter2} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center w-full max-w-3xl mt-6 gap-4">
        {fighter1 && (
          <div className="flex flex-col items-center">
            <FighterImage fighter={fighter1}  />
          </div>
        )}
        {fighter2 && (
          <div className="flex flex-col items-center">
            <FighterImage fighter={fighter2}  />
          </div>
        )}
      </div>
      {fighter1 && fighter2 && (
        <button
          className="bg-gray-800 hover:bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-lg mt-4"
          onClick={handlePredictFight}
        >
          Prédire le combat
        </button>
      )}
      {showStatistics && (
        <div className="w-full mt-6">
          <AthleteStatisticsDuo 
            stats1={fighter1?.career_statistics[0]} 
            stats2={fighter2?.career_statistics[0]} 
            name1={fighter1?.name}  
            name2={fighter2?.name}
          />
        </div>
      )}
    </div>
  );
};

export default CompareFighters;
