import React, { useEffect, useState } from 'react';
import SearchBarFighter from '../../components/SearchBarFighter';
import AthleteStatisticsDuo from '../../components/AthleteStatisticsDuo';

const CompareFighters = () => {
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);

  useEffect(() => {
    console.log('fighter1', fighter1);
    console.log('fighter2', fighter2);
  }, [fighter1, fighter2]);

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-center text-3xl font-bold mb-6">Comparaison des combattants</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <SearchBarFighter onFighterSelect={setFighter1} />
        <div className="text-2xl font-bold">VS</div>
        <SearchBarFighter onFighterSelect={setFighter2} />
      </div>
      <div className="w-full mt-6">
        <AthleteStatisticsDuo stats1={fighter1?.career_statistics[0]} stats2={fighter2?.career_statistics[0]} name1={fighter1?.name}  name2={fighter2?.name}/>
      </div>
    </div>
  );
};

export default CompareFighters;
