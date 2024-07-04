import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

const HASURA_URL = import.meta.env.PUBLIC_HASURA;
const HASURA_ADMIN_SECRET = import.meta.env.PUBLIC_HASURA_SECRET;

if (!HASURA_URL || !HASURA_ADMIN_SECRET) {
  throw new Error("HASURA_URL ou HASURA_ADMIN_SECRET n'est pas défini dans les variables d'environnement.");
}

const baseUrl = 'https://www.ufc.com/athletes/all?page=';

const insertFighterMutation = `
  mutation InsertFighter(
    $name: String!,
    $nickname: String,
    $record: String,
    $weight_class: String,
    $profile_url: String,
    $social_media_links: _text,
    $career_statistics: [career_statistics_insert_input!]!,
    $tags: [tags_insert_input!]!,
    $images: [images_insert_input!]!,
    $status: String,
    $birthplace: String,
    $age: Int,
    $weight: float8,
    $octagon_debut: date
  ) {
    insert_fighters_one(object: {
      name: $name,
      nickname: $nickname,
      record: $record,
      weight_class: $weight_class,
      profile_url: $profile_url,
      social_media_links: $social_media_links,
      career_statistics: { data: $career_statistics },
      tags: { data: $tags },
      images: { data: $images },
      status: $status,
      birthplace: $birthplace,
      age: $age,
      weight: $weight,
      octagon_debut: $octagon_debut
    }) {
      id
      name
    }
  }
`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(HASURA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  const json = await result.json();
  return json;
}

async function executeInsertFighter(fighter) {
  const { name, nickname, record, weight_class, profile_url, social_media_links, career_statistics, tags, images, status, birthplace, age, weight, octagon_debut } = fighter;
  return fetchGraphQL(insertFighterMutation, "InsertFighter", { name, nickname, record, weight_class, profile_url, social_media_links, career_statistics, tags, images, status, birthplace, age, weight, octagon_debut });
}

function convertTimeToSeconds(time) {
  if (typeof time !== 'string') {
    time = time.toString();
  }
  const [minutes, seconds] = time.split(':').map(Number);
  return (minutes * 60) + seconds;
}

const scrapeFighterUrlsFromPage = async (pageNumber) => {
  try {
    const url = `${baseUrl}${pageNumber}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const fighterUrls = [];
    $('.c-listing-athlete-flipcard__inner').each((i, elem) => {
      const profilePath = $(elem).find('.c-listing-athlete-flipcard__action a').attr('href');
      const name = $(elem).find('.c-listing-athlete__name').first().text().trim();
      console.log(name);
      const nickname = $(elem).find('.c-listing-athlete__nickname .field__item').first().text().trim();
      console.log(nickname);
      const record = $(elem).find('.c-listing-athlete__record').text().trim();
      const weight_class = $(elem).find('.c-listing-athlete__title .field__item').text().trim();
      const image_url = $(elem).find('.c-listing-athlete__thumbnail img').attr('src');
      const background_image_url = $(elem).find('.c-listing-athlete__bgimg img').attr('src');
      const social_media_links = [];
      $(elem).find('.c-listing-athlete-flipcard__social-link').each((j, socialElem) => {
        const socialLink = $(socialElem).attr('href');
        social_media_links.push(socialLink);
      });

      if (profilePath) {
        const profileUrl = `https://www.ufc.com${profilePath}`;
        fighterUrls.push({ profileUrl, name, nickname, record, weight_class, image_url, background_image_url, social_media_links });
      }
    });

    return fighterUrls;
  } catch (error) {
    console.error(`Error fetching fighter list for page ${pageNumber}:`, error);
    return [];
  }
};

const scrapeFighterDetails = async (fighter) => {
  try {
    const { profileUrl, name, nickname, record, weight_class, image_url, background_image_url, social_media_links } = fighter;
    const response = await axios.get(profileUrl);
    const $ = cheerio.load(response.data);

    const fighterDetails = {
      name,
      nickname,
      record,
      weight_class,
      profile_url: profileUrl,
      social_media_links,
      career_statistics: [],
      tags: [],
      images: [],
      status: '',
      birthplace: '',
      age: null,
      weight: null,
      octagon_debut: null
    };

    fighterDetails.images.push({ type: 'profile', url: image_url });
    fighterDetails.images.push({ type: 'background', url: background_image_url });

    $('.hero-profile__tags .hero-profile__tag').each((i, elem) => {
      const tag = $(elem).text().trim();
      fighterDetails.tags.push({ name: tag });
    });

    const careerStats = {};
    $('.athlete-stats__stat').each((i, elem) => {
      const statName = $(elem).find('.athlete-stats__stat-text').text().trim();
      const statValue = $(elem).find('.athlete-stats__stat-numb').text().trim();
      careerStats[statName.toLowerCase().replace(/\s+/g, '_')] = parseFloat(statValue.replace('%', '').replace(':', ''));
    });

    const statSections = ['.stats-records--two-column', '.stats-records--three-column', '.stats-records--compare'];
    statSections.forEach(section => {
      $(section).each((i, sectionElem) => {
        $(sectionElem).find('.c-overlap__stats, .c-stat-compare__group, .c-stat-3bar__group').each((j, statElem) => {
          const statKey = $(statElem).find('.c-overlap__stats-text, .c-stat-compare__label, .c-stat-3bar__label').text().trim();
          const statValue = $(statElem).find('.c-overlap__stats-value, .c-stat-compare__number, .c-stat-3bar__value').text().trim();
          careerStats[statKey.toLowerCase().replace(/\s+/g, '_').replace('.', '').replace(':', '')] = parseFloat(statValue.replace('%', '').replace(':', ''));
        });
      });
    });

    const targetStats = {};
    $('#e-stat-body_x5F__x5F_head-txt, #e-stat-body_x5F__x5F_body-txt, #e-stat-body_x5F__x5F_leg-txt').each((i, elem) => {
      const targetKey = $(elem).find('text').first().text().trim().toLowerCase();
      const targetValue = $(elem).find('text').last().text().trim().replace('%', '');
      targetStats[targetKey] = parseFloat(targetValue);
    });

    fighterDetails.career_statistics = [
      {
        sig_strikes_landed: careerStats['sig_str._a_atterri'] || 0,
        sig_strikes_attempted: careerStats['sig_grèves_tentées'] || 0,
        takedowns_landed: careerStats['takedowns_landed'] || 0,
        takedowns_attempted: careerStats['takedowns_tentowns'] || 0,
        sig_strikes_per_minute: careerStats['sig_frappes_débarquées'] || 0,
        sig_strikes_absorbed_per_minute: careerStats['sig_frappes_encaissées'] || 0,
        takedown_avg_per_15_min: careerStats['takedown_avg'] || 0,
        submission_avg_per_15_min: careerStats['envoi_avg'] || 0,
        sig_strike_defense: careerStats['sig_str.défense'] || 0,
        takedown_defense: careerStats['défense_de_démolition'] || 0,
        knockdown_avg: careerStats['knockdown_avg'] || 0,
        avg_fight_time: careerStats['temps_de_combat_moyen'] ? convertTimeToSeconds(careerStats['temps_de_combat_moyen']) : 0,
        sig_strike_target_head: targetStats['tête'] || 0,
        sig_strike_target_body: targetStats['corps'] || 0,
        sig_strike_target_leg: targetStats['jambe'] || 0,
        ko_tko: careerStats['ko/tko'] || 0,
        decision: careerStats['dec'] || 0,
        submission: careerStats['sub'] || 0,
      }
    ];

    // Fetch bio information
    $('.c-bio__info-details .c-bio__row--1col, .c-bio__info-details .c-bio__row--3col .c-bio__field').each((i, elem) => {
      const label = $(elem).find('.c-bio__label').text().trim();
      const text = $(elem).find('.c-bio__text').text().trim();
      if (label === 'Status') {
        fighterDetails.status = text;
      } else if (label === 'Lieu de naissance') {
        fighterDetails.birthplace = text;
      } else if (label === 'Âge') {
        fighterDetails.age = parseInt(text, 10);
      } else if (label === 'Poids') {
        fighterDetails.weight = parseFloat(text);
      } else if (label === "Début de l'octogone") {
        fighterDetails.octagon_debut = new Date(text);
      }
    });

    return fighterDetails;
  } catch (error) {
    console.error(`Error fetching details for URL ${fighter.profileUrl}:`, error);
    return null;
  }
};

const scrapeAllFighters = async () => {
  try {
    const allFighterUrls = new Set();

    for (let pageNumber = 0; pageNumber <= 0; pageNumber++) {
      const fighterUrls = await scrapeFighterUrlsFromPage(pageNumber);
      fighterUrls.forEach(url => allFighterUrls.add(url));
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const allFightersDetails = [];
    for (const fighter of allFighterUrls) {
      const details = await scrapeFighterDetails(fighter);
      if (details) {
        details.social_media_links = `{${details.social_media_links.join(',')}}`;
        const { errors, data } = await executeInsertFighter(details);
        if (errors) {
          console.error('Error inserting fighter:', errors);
        } 
        allFightersDetails.push(details);
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    return allFightersDetails;
  } catch (error) {
    console.error('Error fetching fighter list:', error);
    return [];
  }
};

export const POST = async (req, res) => {
  try {
    console.log('Scraping all fighters...');  
    const allFighters = await scrapeAllFighters();
    res.status(200).json(allFighters);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: error.message });
  }
};
