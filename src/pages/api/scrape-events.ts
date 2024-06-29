import axios from 'axios';
import cheerio from 'cheerio';

const HASURA_URL = import.meta.env.PUBLIC_HASURA;
const HASURA_ADMIN_SECRET = import.meta.env.PUBLIC_HASURA_SECRET;

const completedEventsListUrl = 'http://ufcstats.com/statistics/events/completed?page=all';
const upcomingEventsListUrl = 'http://ufcstats.com/statistics/events/upcoming?page=all';

const insertEventMutation = `
  mutation InsertEvent($event_name: String!, $date: String!, $location: String!, $fights: jsonb!) {
    insert_events_one(object: {event_name: $event_name, date: $date, location: $location, fights: $fights}) {
      id
      event_name
    }
  }
`;
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
function executeInsertEvent(event) {
    const { event_name, date, location, fights } = event;
    console.log('Inserting event:', { event_name, date, location, fights });
    return fetchGraphQL(insertEventMutation, "InsertEvent", { event_name, date, location, fights });
  }
  
  // Fonction pour scraper les détails d'un événement de combat à partir de son URL
  const scrapeEventDetails = async (url) => {
      try {
          console.log(`Fetching details for event URL: ${url}`);
          const response = await axios.get(url);
          const $ = cheerio.load(response.data);
  
          const eventDetails = {};
  
          // Nom de l'événement, date et lieu
          eventDetails.event_name = $('.b-content__title-highlight').text().trim();
          eventDetails.date = $('.b-list__box-list-item:first-child').text().trim().split(':')[1].trim();
          eventDetails.location = $('.b-list__box-list-item:nth-child(2)').text().trim().split(':')[1].trim();
          console.log(`Fetched event name: ${eventDetails.event_name}`);
          console.log(`Fetched date: ${eventDetails.date}`);
          console.log(`Fetched location: ${eventDetails.location}`);
  
          // Informations sur les combats
          eventDetails.fights = [];
          $('.b-fight-details__table-body tr').each((i, elem) => {
              const fight = {};
              $(elem).find('td').each((j, cell) => {
                  const text = $(cell).text().trim();
                  switch (j) {
                      case 0:
                          fight.result = text;
                          break;
                      case 1:
                          fight.fighter = $(cell).find('a').text().trim();
                          break;
                      case 2:
                          fight.kd = text;
                          break;
                      case 3:
                          fight.str = text;
                          break;
                      case 4:
                          fight.td = text;
                          break;
                      case 5:
                          fight.sub = text;
                          break;
                      case 6:
                          fight.weight_class = text;
                          break;
                      case 7:
                          fight.method = text;
                          break;
                      case 8:
                          fight.round = text;
                          break;
                      case 9:
                          fight.time = text;
                          break;
                  }
              });
              console.log(`Fetched fight: ${JSON.stringify(fight)}`);
              eventDetails.fights.push(fight);
          });
  
          return eventDetails;
      } catch (error) {
          console.error(`Error fetching details for URL ${url}:`, error);
          return null;
      }
  };
  
  // Scraper la liste des événements et leurs détails
  const scrapeAllEvents = async () => {
      try {
          console.log(`Fetching events list from URL: ${completedEventsListUrl}`);
          const response = await axios.get(completedEventsListUrl);
          const $ = cheerio.load(response.data);
  
          // Récupérer tous les liens vers les pages de détail des événements
          const eventLinks = $('.b-link.b-link_style_black');
          const eventUrls = [];
          eventLinks.each((i, elem) => {
              const url = $(elem).attr('href');
              eventUrls.push(url);
              console.log(`Found event URL: ${url}`);
          });
  
          // Ajouter les événements à venir
          console.log(`Fetching events list from URL: ${upcomingEventsListUrl}`);
          const upcomingResponse = await axios.get(upcomingEventsListUrl);
          const $upcoming = cheerio.load(upcomingResponse.data);
          const upcomingEventLinks = $upcoming('.b-link.b-link_style_black');
          upcomingEventLinks.each((i, elem) => {
              const url = $(elem).attr('href');
              eventUrls.push(url);
              console.log(`Found upcoming event URL: ${url}`);
          });
  
          // Scraper les détails de chaque événement
          const allEventsDetails = [];
          for (const url of eventUrls) {
              const details = await scrapeEventDetails(url);
              if (details) {
                  const { errors, data } = await executeInsertEvent(details);
                  if (errors) {
                      console.error('Error inserting event:', errors);
                  } else {
                      console.log(`Successfully inserted event: ${data.insert_events_one.event_name}`);
                  }
                  allEventsDetails.push(details);
                  console.log(`Added details for event: ${details.event_name}`);
              }
              // Attendre 1 seconde entre les requêtes pour ne pas surcharger le serveur
              await new Promise(resolve => setTimeout(resolve, 1));
          }
  
          console.log('Finished scraping all events');
          return allEventsDetails;
      } catch (error) {
          console.error('Error fetching event list:', error);
          return [];
      }
  };
  
  // Fonction API pour déclencher le scraping des événements
  export const POST: APIRoute = async (request) => {
      try {
          console.log('Starting to scrape event details');
          const eventsDetails = await scrapeAllEvents();
  
          // Retourner les détails des événements dans la réponse
          return new Response(JSON.stringify({ success: true, data: eventsDetails }), {
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