import React from 'react';

const Fight = ({ fight }) => {
  const kdStats = fight.kd.split('--');
  const strStats = fight.str.split('--');
  const tdStats = fight.td.split('--');
  const subStats = fight.sub.split('--');

  console.log(fight.method);

  return (
    <div className="bg-white rounded-lg shadow-lg max-w py-6 transition-transform transform hover:-translate-y-1">
      <div className="flex justify-between items-center space-x-4">
        <div className="flex flex-col space-y-2 w-1/2">
          <div className="flex justify-between items-center space-x-4">
            <p className={`font-bold ${fight.result === 'win' ? 'text-green-500' : ''} w-1/3 text-center`}>
              {fight.fighter.split('-')[0] + ' ' + fight.fighter.split('-')[1] + (fight.result === 'win' ? " (Winner)" : '')}
            </p>
            <p className="w-1/6 text-center">{kdStats[0]}</p>
            <p className="w-1/6 text-center">{kdStats[1]}</p>
            <p className="w-1/6 text-center">{strStats[0]}</p>
            <p className="w-1/6 text-center">{strStats[1]}</p>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <p className={`font-bold ${fight.result === 'win' ? 'text-red-500' : ''} w-1/3 text-center`}>
              {fight.fighter.replace(fight.fighter.split('-')[0] + '-' + fight.fighter.split('-')[1] + '-', '').replace('-', ' ')}
            </p>
            <p className="w-1/6 text-center">{tdStats[0]}</p>
            <p className="w-1/6 text-center">{tdStats[1]}</p>
            <p className="w-1/6 text-center">{subStats[0]}</p>
            <p className="w-1/6 text-center">{subStats[1]}</p>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4 w-1/2">
          <p className="w-1/4 text-center">{fight.weight_class.replace('--', ' ')}</p>
          <p className="w-1/4 text-center">{fight.method.replaceAll('--', ' ')}</p>
          <p className="w-1/4 text-center">{fight.round}</p>
          <p className="w-1/4 text-center">{fight.time}</p>
        </div>
      </div>
    </div>
  );
};

export default Fight;
