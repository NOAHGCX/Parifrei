import React from 'react';
import { gql } from '@apollo/client';
import { useAstroQuery } from '../../helpers/apollo';
import AthleteHeader from '../../components/AthleteHeader';
import AthleteStatistics from '../../components/AthleteStatistics';
import AthleteBio from '../../components/AthleteBio';
const GET_ATHLETE_DETAILS = gql`
  query GetAthleteDetails($id: Int!) {
    fighter: fighters_by_pk(id: $id) {
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
        takedowns_attempted
        sig_strikes_per_minute
        sig_strikes_absorbed_per_minute
        submission_avg_per_15_min
        sig_strike_defense
        takedown_defense
        knockdown_avg
        sig_strike_target_head
        sig_strike_target_body
        sig_strike_target_leg
        ko_tko
        decision
        submission
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

const Athlete = ({ id }) => {
  const { data, loading, error } = useAstroQuery(GET_ATHLETE_DETAILS, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    name,
    nickname,
    weight_class,
    record,
    profile_url,
    social_media_links,
    status,
    birthplace,
    age,
    weight,
    octagon_debut,
    career_statistics,
    images,
    tags,
  } = data.fighter;

  return (
    <div className="athlete-container container mx-auto p-4">
      <AthleteHeader 
        name={name}
        nickname={nickname}
        weight_class={weight_class}
        record={record}
        images={images}
        tags={tags}
      />
      <AthleteStatistics stats={career_statistics} />
      <AthleteBio 
        status={status}
        birthplace={birthplace}
        age={age}
        weight={weight}
        octagon_debut={octagon_debut}
      />
    </div>
  );
};

export default Athlete;