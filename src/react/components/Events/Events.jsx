// components/UpcomingEvents.jsx

import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';

// Fonction pour obtenir la date d'aujourd'hui au format AAAA-MM-JJ
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayDate = getTodayDate();

const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    events(
      where: { date: { _gte: "${todayDate}" } }
      order_by: { date: asc }
    ) {
      id
      event_name
      date
      location
    }
  }
`;

const UpcomingEvents = () => {
  const { loading, error, data } = useAstroQuery(GET_UPCOMING_EVENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  useEffect(() => {
    if (loading) {
      console.log('Loading...');
    }
    if (error) {
      console.error('Error:', error.message);
    }
    if (data) {
      console.log('Data:', data);
    }
  }, [loading, error, data]);

  if (loading) {
    console.log('Loading...');
  }

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = data?.events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!data || !data.events || data.events.length === 0) return <p>Aucun événement à afficher.</p>;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Prochains événements</h1>
      <div className="flex flex-wrap justify-center">
        {currentEvents.map(event => (
          <a href={`/Prochains-evenements/${event.id}`} key={event.id}>
            <div className="bg-white rounded-lg shadow-lg m-6 max-w-xs transition-transform transform hover:-translate-y-1">
              <img src="https://www.sportsnet.ca/wp-content/uploads/2024/01/UFC_FightNight_16x9.png" alt={event.event_name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
                <p className="text-gray-600 mb-1">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex list-none">
            {pageNumbers.map(number => (
              <li key={number} className={`mx-2 ${currentPage === number ? 'font-bold' : ''}`}>
                <button onClick={() => paginate(number)} className="text-blue-500 hover:text-blue-700">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UpcomingEvents;
