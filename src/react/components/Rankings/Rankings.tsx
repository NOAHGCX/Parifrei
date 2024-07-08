// src/components/Rankings.jsx
import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';

const GET_RANKINGS = gql`
  query GetRankings($categories: [String!]!) {
    tags(where: { name: { _in: $categories } }) {
      id
      name
      fighter {
        id
        name
        nickname
        weight_class
        record
        profile_url
      }
    }
  }
`;

const generateCategories = () => {
  const categories = [
    "Lightweight", "Flyweight", "Welterweight", "Bantamweight", "Featherweight", 
    "Light Heavyweight", "Women's Flyweight", "PFP", "Heavyweight", "Middleweight",
    "Women's Bantamweight", "Women's Strawweight"
  ];
  return categories.map(category => {
    const ranks = [];
    for (let i = 1; i <= 15; i++) {
      ranks.push(`#${i} ${category} Division`);
    }
    return ranks;
  }).flat();
};

const Rankings = ({ initialCategory }) => {
  const initialCategories = initialCategory ? [initialCategory] : generateCategories();
  const [categories, setCategories] = useState(initialCategories);
  const { data, loading, error } = useAstroQuery(GET_RANKINGS, {
    variables: { categories },
  });

  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Data:', data);
  }, [categories, loading, error, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const fighters = data?.tags?.reduce((acc, tag) => [...acc, ...tag.fighter], []) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Rankings</h1>
      <div className="mb-4 flex justify-center">
        <select
          className="border rounded p-2"
          onChange={(e) => setCategories([e.target.value])}
        >
          {generateCategories().map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {fighters.map((fighter, index) => (
          <li key={fighter.id} className="flex items-center border-b py-4">
            <div className="text-xl font-bold w-12 text-center">{index + 1}</div>
            <div className="flex-grow pl-4">
              <a
                href={fighter.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-500 hover:underline"
              >
                {fighter.name} <span className="text-gray-600">"{fighter.nickname}"</span>
              </a>
              <p className="text-sm">{fighter.record}</p>
              <p className="text-sm">{fighter.weight_class}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rankings;
