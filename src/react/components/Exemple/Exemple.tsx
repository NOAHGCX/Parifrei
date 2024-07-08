// components/UpcomingEvents.tsx

import React from 'react';
import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, gql, useQuery } = pkg;

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql', // Assurez-vous que le chemin correspond à votre configuration Astro
  cache: new InMemoryCache(),
});

// Définition de la requête GraphQL
const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    events(
      where: { date: { _gte: "2024-07-09" } },
      orderBy: { date: asc }
    ) {
      id
      event_name
      date
      location
    }
  }
`;

interface Event {
  id: number;
  event_name: string;
  date: string;
  location: string;
}

const UpcomingEvents: React.FC = () => {
  const { loading, error, data } = useQuery<{ events: Event[] }>(GET_UPCOMING_EVENTS, {
    client,
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Prochains événements</h1>
      <div className="flex flex-wrap justify-center">
        {data?.events.map(event => (
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

