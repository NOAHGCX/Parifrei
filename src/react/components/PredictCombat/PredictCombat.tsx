import React, { useState } from 'react';

const PredictFightButton = ({ fighter1, fighter2, onPredict }) => {
  const [prediction, setPrediction] = useState(null);

  const calculateAccuracy = (landed, attempted) => (landed / attempted) * 100;

  const sigStrikeAccuracy1 = calculateAccuracy(fighter1?.sig_strikes_per_minute, fighter1?.sig_strikes_attempted);
  const takedownAccuracy1 = calculateAccuracy(fighter1?.takedowns_landed, fighter1?.takedowns_attempted);

  const sigStrikeAccuracy2 = calculateAccuracy(fighter2?.sig_strikes_per_minute, fighter2?.sig_strikes_attempted);
  const takedownAccuracy2 = calculateAccuracy(fighter2?.takedowns_landed, fighter2?.takedowns_attempted);

  const dob1 = 2024 - fighter1.age;
  const dob2 = 2024 - fighter2.age;

  const tdfef1 = fighter1.takedown_defense / 100;
  const tdfef2 = fighter2.takedown_defense / 100;

  const handlePredictFight = async () => {
    // Example structure of the additional data
    const fighter1Details = {
      name: fighter1.name,
      weight: fighter1.weight,
      dob: dob1,
      slpm: fighter1.sig_strikes_landed,
      sacc: sigStrikeAccuracy1,
      sapm: fighter1.sig_strikes_absorbed_per_minute,
      strDef: fighter1.sig_strike_defense,
      tdAvg: fighter1.takedown_avg_per_15_min,
      tdAcc: takedownAccuracy1,
      tdDef: tdfef1,
      subAvg: fighter1.submission_avg_per_15_min,
      avgTime2Win: fighter1.avg_fight_time
    };

    const fighter2Details = {
      name: fighter2.name,
      weight: fighter2.weight,
      dob: dob2,
      slpm: fighter2.sig_strikes_landed,
      sacc: sigStrikeAccuracy2,
      sapm: fighter2.sig_strikes_absorbed_per_minute,
      strDef: fighter2.sig_strike_defense,
      tdAvg: fighter2.takedown_avg_per_15_min,
      tdAcc: takedownAccuracy2,
      tdDef: tdfef2,
      subAvg: fighter2.submission_avg_per_15_min,
      avgTime2Win: fighter2.avg_fight_time
    };

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fighter1: fighter1Details, fighter2: fighter2Details }),
      });

      const data = await response.json();
      setPrediction(data);
      onPredict(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handlePredictFight}>Prédire le combat</button>
      {prediction && (
        <div>
          <h3>{prediction.combat}</h3>
          <p>{`${prediction.fighter1_name} a une probabilité de gagner de ${prediction.fighter1_probability}%`}</p>
          <p>{`${prediction.fighter2_name} a une probabilité de gagner de ${prediction.fighter2_probability}%`}</p>
        </div>
      )}
    </>
  );
};

export default PredictFightButton;
