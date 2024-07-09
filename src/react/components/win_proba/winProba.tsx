import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const WinProbabilityProgress = ({ fighter1, fighter2 }) => {
  const generateRandomProbability = () => {
    const probability1 = Math.random() * 100;
    const probability2 = 100 - probability1;
    return [probability1, probability2];
  };

  const [prob1, prob2] = generateRandomProbability();

  return (
    <div className="flex flex-col md:flex-row items-center justify-around w-full mt-6 gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">{fighter1?.name}</h2>
        <div style={{ width: 250, height: 250 }}>
          <CircularProgressbar
            value={prob1}
            text={`${Math.round(prob1)}%`}
            styles={buildStyles({
              pathColor: `red`,
              textColor: 'red',
            })}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">{fighter2?.name}</h2>
        <div style={{ width: 250, height: 250 }}>
          <CircularProgressbar
            value={prob2}
            text={`${Math.round(prob2)}%`}
            styles={buildStyles({
              pathColor: `blue`,
              textColor: 'blue',
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default WinProbabilityProgress;
