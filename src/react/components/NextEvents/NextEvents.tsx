import React, { useState, useEffect, useRef } from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';
import Loader from '../../components/Loader';

const GET_EVENTS = gql`
  query GetEvents($eventName: String = "%", $location: String = "%", $offset: Int = 0, $limit: Int = 10) {
    events( 
      where: { 
        event_name: { _ilike: $eventName }, 
        location: { _ilike: $location } 
      },
      offset: $offset, 
      limit: $limit
    ) {
      id
      event_name
      date
      location
      fights {
        id
        result
      }
    }
    totalCount: events_aggregate(where: { 
      event_name: { _ilike: $eventName }, 
      location: { _ilike: $location } 
    }) {
      aggregate {
        count
      }
    }
  }
`;

const QueryEvents = React.forwardRef((props, ref) => {
  const { setItems, itemsPerPage, page, setCount, keywords, location } = props;

  const { loading, error, data, refetch } = useAstroQuery(GET_EVENTS, {
    variables: {
      eventName: `%${keywords}%`,
      location: `%${location}%`,
      offset: page * itemsPerPage,
      limit: itemsPerPage,
    },
  });

  React.useImperativeHandle(ref, () => ({
    getRefetch() {
      refetch()
        .then(() => {})
        .catch((e) => {
          console.error('Refetch error', e);
        });
    },
  }));

  useEffect(() => {
    if (data) {
      setItems(data.events);
      setCount(data.totalCount.aggregate.count);
    }
  }, [loading, error, data]);

  return <>{loading ? <Loader /> : <></>}</>;
});

QueryEvents.displayName = 'QueryEvents';

const EventsListContent = () => {
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const queryRef = useRef();

  const handleSearchChange = (value) => {
    setKeywords(value);
    setPage(0);
    queryRef.current.getRefetch();
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    setPage(0);
    queryRef.current.getRefetch();
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    queryRef.current.getRefetch();
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(0, page - 1);
    setPage(newPage);
    queryRef.current.getRefetch();
  };

  const totalPages = Math.ceil(count / itemsPerPage);
  const currentPage = page + 1;

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <button
            key={i}
            className={`border rounded p-2 mx-1 ${i === currentPage ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => {
              setPage(i - 1);
              queryRef.current.getRefetch();
            }}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={i} className="p-2">...</span>);
      }
    }
    return pages;
  };

  return (
    <>
      <QueryEvents
        ref={queryRef}
        setItems={setItems}
        setCount={setCount}
        itemsPerPage={itemsPerPage}
        page={page}
        keywords={keywords}
        location={location}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Events</h1>
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            className="border rounded p-2 w-1/3"
            placeholder="Search by event name"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <input
            type="text"
            className="border rounded p-2 w-1/3"
            placeholder="Search by location"
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center">
          {items.map((event) => (
            <div key={event.id} className="border rounded p-4 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h2 className="text-xl font-bold">{event.event_name}</h2>
              <p className="text-gray-700">{event.location}</p>
              <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button 
            className="border rounded p-2"
            onClick={handlePreviousPage}
            disabled={page === 0}
          >
            Previous
          </button>
          <div className="flex items-center">
            {renderPagination()}
          </div>
          <button 
            className="border rounded p-2"
            onClick={handleNextPage}
            disabled={(page + 1) * itemsPerPage >= count}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

const Events = () => {
  return (
    <div className="flex">
      <EventsListContent />
    </div>
  );
};

export default Events;
