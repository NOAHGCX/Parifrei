// src/components/Rankings.jsx
import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';
import CardAthlete from '../../components/CardAthlete'; // Import du nouveau composant
import SearchBarFighter from '../../components/SearchBarFighter';


const GET_RANKINGS = gql`
  query GetRankings($pattern: String!) {
    tags(where: { name: { _like: $pattern } }) {
      id
      name
      fighter {
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
    }
  }
`;

const GET_TITLE_HOLDERS = gql`
  query GetTitleHolders {
    tags(where: { name: { _like: "%Title%" } }) {
      id
      name
      fighter {
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
    }
  }
`;

const generateCategories = () => {
  return [
    "Lightweight", "Flyweight", "Welterweight", "Bantamweight", "Featherweight", 
    "Light Heavyweight", "Women's Flyweight", "PFP", "Heavyweight", "Middleweight",
    "Women's Bantamweight", "Women's Strawweight"
  ];
};

const parseRank = (tagName) => {
  const match = tagName.match(/^#(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
};

const Rankings = ({ initialCategory }) => {
  const [fighters, setFighters] = useState([]);
  const [category, setCategory] = useState(initialCategory || 'Lightweight');
  const pattern = `#% ${category}%`;
  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    console.log(fighter)
  }, [fighter])
  const { data: rankingData, loading: rankingLoading, error: rankingError } = useAstroQuery(GET_RANKINGS, {
    variables: { pattern },
  });

  const { data: titleHolderData, loading: titleHolderLoading, error: titleHolderError } = useAstroQuery(GET_TITLE_HOLDERS);

  useEffect(() => {
    if (rankingData && titleHolderData) {
      const filteredFighters = (rankingData.tags || [])
        .filter(tag => tag.name.includes(category))
        .map(tag => ({
          rank: parseRank(tag.name),
          ...tag.fighter,
          profile_image: tag.fighter.images[0]?.url,
          background_image: tag.fighter.background_images[0]?.url,
        }))
        .filter(fighter => fighter.weight_class === category && fighter.rank >= 1 && fighter.rank <= 15)
        .sort((a, b) => a.rank - b.rank);

      const titleHolders = (titleHolderData.tags || []).map(tag => ({
        rank: tag.name.includes("Interim") ? "Champion Interim" : "Champion",
        ...tag.fighter,
        profile_image: tag.fighter.images[0]?.url,
        background_image: tag.fighter.background_images[0]?.url,
      })).filter(fighter => fighter.weight_class === category);

      const [champion, interimChampion] = titleHolders.reduce((acc, fighter) => {
        if (fighter.name.includes("Interim")) {
          acc[1] = fighter;
        } else {
          acc[0] = fighter;
        }
        return acc;
      }, []);


      setFighters([champion, interimChampion, ...filteredFighters]);
    }
  }, [rankingData, titleHolderData, category]);

  if (rankingLoading || titleHolderLoading) return <p>Loading...</p>;
  if (rankingError || titleHolderError) return <p>Error :(</p>;

  return (
    <div className="container mx-auto p-4">
      <SearchBarFighter onFighterSelect={setFighter} />
      <h1 className="text-3xl font-bold text-center mb-6">{category} Division Rankings</h1>
      <div className="mb-4 flex justify-center">
        <select
          className="border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {generateCategories().map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {fighters.map((fighter, index) => {
          if (!fighter) return null;
          return <CardAthlete key={fighter.id} fighter={fighter} />;
        })}
      </div>
    </div>
  );
};

export default Rankings;
