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

const GET_EVENTS = gql`
  query GetEvents($filter: events_bool_exp!, $order: [events_order_by!]) {
    events(
      where: $filter,
      order_by: $order
    ) {
      id
      event_name
      date
      location
    }
  }
`;

const UpcomingEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(true);
  const eventsPerPage = 8;

  const filter = showUpcoming
    ? { date: { _gte: todayDate } }
    : { date: { _lte: todayDate } };

  const order = showUpcoming
    ? { date: 'asc' }
    : { date: 'desc' };

  const { loading, error, data, refetch } = useAstroQuery(GET_EVENTS, {
    variables: { filter, order },
  });

  useEffect(() => {
    refetch();
  }, [showUpcoming, refetch]);

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

  // Filter events based on search term
  const filteredEvents = data?.events.filter(event =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentEvents = filteredEvents?.slice(indexOfFirstEvent, indexOfLastEvent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!data || !data.events || data.events.length === 0) return <p>Aucun événement à afficher.</p>;

  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];

    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          onClick={() => paginate(currentPage - 1)}
          className="mx-2 text-blue-500 hover:text-blue-700"
        >
          Previous
        </button>
      );
    }

    pageNumbers.push(
      <button
        key={1}
        onClick={() => paginate(1)}
        className={`mx-2 ${currentPage === 1 ? 'font-bold' : ''} text-blue-500 hover:text-blue-700`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pageNumbers.push(<span key="dots1" className="mx-2">...</span>);
    }

    if (currentPage > 2 && currentPage < totalPages - 1) {
      pageNumbers.push(
        <button
          key={currentPage}
          onClick={() => paginate(currentPage)}
          className="mx-2 font-bold text-blue-500 hover:text-blue-700"
        >
          {currentPage}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(<span key="dots2" className="mx-2">...</span>);
    }

    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => paginate(totalPages)}
        className={`mx-2 ${currentPage === totalPages ? 'font-bold' : ''} text-blue-500 hover:text-blue-700`}
      >
        {totalPages}
      </button>
    );

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          onClick={() => paginate(currentPage + 1)}
          className="mx-2 text-blue-500 hover:text-blue-700"
        >
          Next
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Événements</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowUpcoming(true)}
          className={`px-4 py-2 mx-2 ${showUpcoming ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Prochains événements
        </button>
        <button
          onClick={() => setShowUpcoming(false)}
          className={`px-4 py-2 mx-2 ${!showUpcoming ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Événements passés
        </button>
      </div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Rechercher des événements"
          className="border rounded p-2 w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {currentEvents.map(event => (
          <a href={`/Prochains-evenements/${event.id}`} key={event.id}>
            <div className="bg-white rounded-lg shadow-lg m-6 max-w-xs w-full transition-transform transform hover:-translate-y-1" style={{ height: '350px' }}>
              <img src="https://www.sportsnet.ca/wp-content/uploads/2024/01/UFC_FightNight_16x9.png" alt={event.event_name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
                  <p className="text-gray-600 mb-1">{event.date}</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex list-none">
            {renderPageNumbers()}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UpcomingEvents;
