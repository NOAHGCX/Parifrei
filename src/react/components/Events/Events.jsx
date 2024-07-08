// components/UpcomingEvents.jsx

import React from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';

const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    events(
      where: { date: { _gte: "2024-07-09" } }
      orderBy: { date: asc }
    ) {
      id
      event_name: eventName
      date
      location
    }
  }
`;

const UpcomingEvents = () => {
  const { loading, error, data } = useAstroQuery(GET_UPCOMING_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Prochains événements</h1>
      <div className="flex flex-wrap justify-center">
        {data.events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg m-4 max-w-xs transition-transform transform hover:-translate-y-1">
            {/* Exemple d'image */}
            <img src="https://via.placeholder.com/400x225" alt={event.event_name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
              <p className="text-gray-600 mb-1">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
