import React from 'react';
import { useAstroQuery } from '../../helpers/apollo';
import { GET_EVENT } from '../../schema/events';
import Fight from '../../components/Fight';

const Event = ({ id }) => {
  const { loading, error, data } = useAstroQuery(GET_EVENT, {
    variables: {
      eventId: parseInt(id),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.events[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{event?.event_name}</h1>
      <h2 className="text-xl text-center mb-4">{event?.date} - {event?.location}</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between items-center border-b-2 py-2">
          <p className="w-2/3 text-center font-bold">Fighters</p>
          <p className="w-1/3 text-center font-bold">KD</p>
          <p className="w-1/3 text-center font-bold">STR</p>
          <p className="w-1/3 text-center font-bold">TD</p>
          <p className="w-1/3 text-center font-bold">SUB</p>
          <p className="w-1/2 text-center font-bold">Weight Class</p>
          <p className="w-1/2 text-center font-bold">Method</p>
          <p className="w-1/2 text-center font-bold">Round</p>
          <p className="w-1/2 text-center font-bold">Time</p>
        </div>
        {event?.fights.map(fight => (
          <Fight key={fight.id} fight={fight} />
        ))}
      </div>
    </div>
  );
};

export default Event;
