import React, { useEffect, useState } from 'react';
import './CompareFighters.css';
import SearchBarFighter from '../../components/SearchBarFighter';

const CompareFighters = () => {
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);

useEffect(() => {
  console.log('fighter1', fighter1);
  console.log('fighter2', fighter2);
}, [fighter1, fighter2]);

  return (
    <div>
      <h1 className="text-center">Comparaison des combattants</h1>
      <div className="fighters-selection">
        <SearchBarFighter onFighterSelect={setFighter1} />
        <div className="vs">VS</div>
        <SearchBarFighter onFighterSelect={setFighter2} />
      </div>
    </div>
  );
};

export default CompareFighters;
