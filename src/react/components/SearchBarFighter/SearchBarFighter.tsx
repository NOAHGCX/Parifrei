import React, { useState, useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useLazyAstroQuery } from '../../helpers/apollo';

const GET_ALL_ATHLETES = gql`
  query GetAllAthletes($name: String!, $offset: Int!, $limit: Int!) {
    fighters(where: { name: { _ilike: $name } }, offset: $offset, limit: $limit) {
      id
      name
      nickname
      weight_class
      record
      profile_url
      social_media_links
      status
      birthplace
      age
      weight
      octagon_debut
      career_statistics {
        sig_strikes_landed 
        sig_strikes_attempted 
        takedowns_landed 
        takedowns_attempted
        sig_strikes_per_minute
        sig_strikes_absorbed_per_minute
        submission_avg_per_15_min
        takedown_avg_per_15_min
        sig_strike_defense
        takedown_defense
        knockdown_avg
        sig_strike_target_body
        sig_strike_target_leg
        sig_strike_target_head
        sig_strike_position_clinch
        sig_strike_position_sol
        sig_strike_position_permanent
        ko_tko
        decision
        submission
        avg_fight_time
      }
      images {
        url
        type
      }
      tags {
        name
      }
    }
  }
`;

const SearchBar = ({ onFighterSelect }) => {
  const [query, setQuery] = useState('');
  const [getFighters, { loading, data }] = useLazyAstroQuery(GET_ALL_ATHLETES, {
    variables: { name: `%${query}%`, offset: 0, limit: 10 }
  });
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
    getFighters();
  };

  const handleSelect = (fighter) => {
    onFighterSelect(fighter);
    setQuery(fighter.name);
    setShowResults(false);
  };

  const handleClickOutside = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="search-bar  p-4 rounded-lg relative">
      <input
        type="text"
        className="w-[350px] p-2 text-lg rounded bg-gray-100 text-black placeholder-gray-400"
        placeholder="Trouver un combattant"
        value={query}
        onChange={handleSearch}
      />
      {showResults && data && data.fighters.length > 0 && (
        <ul className="mt-2 bg-gray-100 rounded-lg overflow-auto absolute w-[350px] max-h-[300px] z-10 custom-scrollbar">
          {data.fighters.map((fighter) => (
            <li
              key={fighter.id}
              className="p-2 border-b border-gray-300 last:border-none hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(fighter)}
            >
              {fighter.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
