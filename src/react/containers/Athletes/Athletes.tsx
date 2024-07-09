import React, { useState, useEffect, useRef } from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';
import CardAthlete from '../../components/CardAthlete';
import Loader from '../../components/Loader';
// GraphQL queries
const GET_ATHLETES = gql`
  query GetAthletes($name: String!, $weightClass: String, $offset: Int!, $limit: Int!) {
    fighters(where: { 
      name: { _ilike: $name }, 
      weight_class: { _eq: $weightClass } 
    }, offset: $offset, limit: $limit) {
      id
      name
      nickname
      weight_class
      record
      profile_url
      images(where: { type: { _eq: "profile" } }) {
        url
      }
      background_images: images(where: { type: { _eq: "background" } }) {
        url
      }
    }
    totalCount: fighters_aggregate(where: { 
      name: { _ilike: $name }, 
      weight_class: { _eq: $weightClass } 
    }) {
      aggregate {
        count
      }
    }
  }
`;

const GET_ALL_ATHLETES = gql`
  query GetAllAthletes($name: String!, $offset: Int!, $limit: Int!) {
    fighters(where: { 
      name: { _ilike: $name }
    }, offset: $offset, limit: $limit) {
      id
      name
      nickname
      weight_class
      record
      profile_url
      images(where: { type: { _eq: "profile" } }) {
        url
      }
      background_images: images(where: { type: { _eq: "background" } }) {
        url
      }
    }
    totalCount: fighters_aggregate(where: { 
      name: { _ilike: $name }
    }) {
      aggregate {
        count
      }
    }
  }
`;


const generateWeightClasses = () => {
  return [
    "Lightweight", "Flyweight", "Welterweight", "Bantamweight", "Featherweight", 
    "Light Heavyweight", "Women's Flyweight", "PFP", "Heavyweight", "Middleweight",
    "Women's Bantamweight", "Women's Strawweight"
  ];
};

const QueryAthletes = React.forwardRef((props, ref) => {
  const { setItems, itemsPerPage, page, setCount, keywords, weightClass } = props;

  const query = weightClass ? GET_ATHLETES : GET_ALL_ATHLETES;

  const { loading, error, data, refetch } = useAstroQuery(query, {
    variables: {
      name: `%${keywords}%`,
      weightClass: weightClass || null,
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
      setItems(data.fighters);
      setCount(data.totalCount.aggregate.count);
    }
  }, [loading, error, data]);

  return <>{loading ? <Loader /> : <></>}</>;
});

QueryAthletes.displayName = 'QueryAthletes';

const AthletesListContent = () => {
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [keywords, setKeywords] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const queryRef = useRef();

  const handleSearchChange = (value) => {
    setKeywords(value);
    setPage(0);
    queryRef.current.getRefetch();
  };

  const handleWeightClassChange = (value) => {
    setWeightClass(value);
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
            className={`border rounded p-2 mx-1 ${i === currentPage ? 'bg-gray-800 text-white' : ''}`}
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
      <QueryAthletes
        ref={queryRef}
        setItems={setItems}
        setCount={setCount}
        itemsPerPage={itemsPerPage}
        page={page}
        keywords={keywords}
        weightClass={weightClass}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Athletes</h1>
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            className="border rounded p-2 w-1/3"
            placeholder="Trouver un combattant"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <select
            className="border rounded p-2 w-1/3"
            value={weightClass}
            onChange={(e) => handleWeightClassChange(e.target.value)}
          >
            <option value="">All Weight Classes</option>
            {generateWeightClasses().map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap justify-center">
          {items.map((fighter) => (
            <CardAthlete key={fighter.id} fighter={fighter} />
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

const Athletes = () => {
  return (
      <div className="flex">
        <AthletesListContent />
      </div>
  );
};

export default Athletes;
