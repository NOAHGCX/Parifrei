import axios from 'axios';
import cheerio from 'cheerio';

const HASURA_URL = import.meta.env.PUBLIC_HASURA;
const HASURA_ADMIN_SECRET = import.meta.env.PUBLIC_HASURA_SECRET;

const fightersListUrl = 'http://ufcstats.com/statistics/fighters?char=a&page=all';

// Function to fetch GraphQL
async function fetchGraphQL(operationsDoc, operationName, variables) {
  console.log('Executing GraphQL request:', { operationName, variables });
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
  console.log('GraphQL response:', json);
  return json;
}

// GraphQL mutation
const insertFighterMutation = `
  mutation InsertFighter($name: String!, $record: String, $career_statistics: jsonb) {
    insert_fighters_one(object: {name: $name, record: $record, career_statistics: $career_statistics}) {
      id
      name
    }
  }
`;

function executeInsertFighter(fighter) {
  const { name, record, career_statistics } = fighter;
  console.log('Inserting fighter:', { name, record, career_statistics });
  return fetchGraphQL(insertFighterMutation, "InsertFighter", { name, record, career_statistics });
}

// Fonction pour scraper les détails d'un combattant à partir de son URL
const scrapeFighterDetails = async (url) => {
    try {
        console.log(`Fetching details for fighter URL: ${url}`);
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const fighterDetails = {};

        // Nom du combattant et record
        fighterDetails.name = $('span.b-content__title-highlight').text().trim();
        fighterDetails.record = $('span.b-content__title-record').text().trim().split(':')[1].trim();
        console.log(`Fetched name: ${fighterDetails.name}`);
        console.log(`Fetched record: ${fighterDetails.record}`);

        // Infos du combattant et statistiques de carrière
        fighterDetails.career_statistics = {};
        $('.b-list__box-list-item').each((i, elem) => {
            const text = $(elem).text().trim();
            const [key, value] = text.split(':').map(s => s.trim());
            fighterDetails.career_statistics[key.toLowerCase().replace(/\./g, '').replace(/ /g, '_').replace(':', '')] = value;
            console.log(`Fetched ${key.toLowerCase().replace(/\./g, '').replace(/ /g, '_').replace(':', '')}: ${value}`);
        });

        // Statistiques de carrière
        $('.b-list__box-item').each((i, elem) => {
            const statKey = $(elem).find('.b-list__box-item-title').text().trim();
            const statValue = $(elem).find('.b-list__box-item-value').text().trim();
            const key = statKey.toLowerCase().replace(/\./g, '').replace(/ /g, '_').replace(':', '');
            fighterDetails.career_statistics[key] = statValue;
            console.log(`Fetched career statistic ${key}: ${statValue}`);
        });

        return fighterDetails;
    } catch (error) {
        console.error(`Error fetching details for URL ${url}:`, error);
        return null;
    }
};

// Scraper la liste des combattants et leurs détails
const scrapeAllFighters = async () => {
    try {
        console.log(`Fetching fighters list from URL: ${fightersListUrl}`);
        const response = await axios.get(fightersListUrl);
        const $ = cheerio.load(response.data);

        // Récupérer tous les liens vers les pages de détail des combattants
        const fighterLinks = $('.b-link.b-link_style_black');
        const fighterUrls = [];
        fighterLinks.each((i, elem) => {
            const url = $(elem).attr('href');
            fighterUrls.push(url);
            console.log(`Found fighter URL: ${url}`);
        });

        // Scraper les détails de chaque combattant
        const allFightersDetails = [];
        for (const url of fighterUrls) {
            const details = await scrapeFighterDetails(url);
            if (details) {
                const { errors, data } = await executeInsertFighter(details);
                if (errors) {
                    console.error('Error inserting fighter:', errors);
                } else {
                    console.log(`Successfully inserted fighter: ${data.insert_fighters_one.name}`);
                }
                allFightersDetails.push(details);
                console.log(`Added details for fighter: ${details.name}`);
            }
            // Attendre 1 seconde entre les requêtes pour ne pas surcharger le serveur
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('Finished scraping all fighters');
        return allFightersDetails;
    } catch (error) {
        console.error('Error fetching fighter list:', error);
        return [];
    }
};

// Fonction API pour déclencher le scraping
export const POST: APIRoute = async (request) => {
    try {
        console.log('Starting to scrape fighters details');
        const fightersDetails = await scrapeAllFighters();

        // Retourner les détails des combattants dans la réponse
        return new Response(JSON.stringify({ success: true, data: fightersDetails }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
