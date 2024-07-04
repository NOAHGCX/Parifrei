import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

const HASURA_URL = import.meta.env.PUBLIC_HASURA;
const HASURA_ADMIN_SECRET = import.meta.env.PUBLIC_HASURA_SECRET;

const completedEventsListUrl = 'http://ufcstats.com/statistics/events/completed?page=all';
const upcomingEventsListUrl = 'http://ufcstats.com/statistics/events/upcoming?page=all';

const insertEventMutation = `
  mutation InsertEvent($event_name: String!, $date: date!, $location: String!) {
    insert_events_one(object: {event_name: $event_name, date: $date, location: $location}) {
      id
      event_name
    }
  }
`;

const insertFightMutation = `
  mutation InsertFight($event_id: Int!, $result: String, $fighter: String, $kd: String, $str: String, $td: String, $sub: String, $weight_class: String, $method: String, $round: String, $time: String) {
    insert_fights_one(object: {event_id: $event_id, result: $result, fighter: $fighter, kd: $kd, str: $str, td: $td, sub: $sub, weight_class: $weight_class, method: $method, round: $round, time: $time}) {
      id
      fighter
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

async function executeInsertEvent(event) {
  const { event_name, date, location } = event;
  return fetchGraphQL(insertEventMutation, "InsertEvent", { event_name, date, location });
}

function cleanText(text) {
  return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().replace(/ - /g, ' ').replace(/ /g, '--');
}

function cleanFighterText(text) {
  return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().replace(/\s-\s/g, ' - ').replace(/\s/g, '-');
}

async function executeInsertFight(fight) {
  const { event_id, result, fighter, kd, str, td, sub, weight_class, method, round, time } = fight;
  const cleanedFight = {
    event_id,
    result: cleanText(result),
    fighter: cleanFighterText(fighter),
    kd: cleanText(kd),
    str: cleanText(str),
    td: cleanText(td),
    sub: cleanText(sub),
    weight_class: cleanText(weight_class),
    method: cleanText(method),
    round: cleanText(round),
    time: cleanText(time)
  };
  return fetchGraphQL(insertFightMutation, "InsertFight", cleanedFight);
}

// Function to scrape the details of a fight event from its URL
const scrapeEventDetails = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const eventDetails = {};

    // Event name, date, and location
    eventDetails.event_name = $('.b-content__title-highlight').text().trim();
    eventDetails.date = $('.b-list__box-list-item:first-child').text().trim().split(':')[1].trim();
    eventDetails.location = $('.b-list__box-list-item:nth-child(2)').text().trim().split(':')[1].trim();

    // Fight information
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
      eventDetails.fights.push(fight);
    });

    return eventDetails;
  } catch (error) {
    console.error(`Error fetching details for URL ${url}:`, error);
    return null;
  }
};

// Scrape the list of events and their details
const scrapeAllEvents = async () => {
  try {
    const completedResponse = await axios.get(completedEventsListUrl);
    const $completed = cheerio.load(completedResponse.data);
    const upcomingResponse = await axios.get(upcomingEventsListUrl);
    const $upcoming = cheerio.load(upcomingResponse.data);

    // Use a set to avoid duplicate URLs
    const eventUrls = new Set();

    // Completed events
    $completed('.b-link.b-link_style_black').each((i, elem) => {
      const url = $completed(elem).attr('href');
      if (url) eventUrls.add(url);
    });

    // Upcoming events
    $upcoming('.b-link.b-link_style_black').each((i, elem) => {
      const url = $upcoming(elem).attr('href');
      if (url) eventUrls.add(url);
    });

    // Scrape details of each event
    const allEventsDetails = [];
    for (const url of eventUrls) {
      const details = await scrapeEventDetails(url);
      if (details) {
        const { errors: eventErrors, data: eventData } = await executeInsertEvent(details);
        if (eventErrors) {
          console.error('Error inserting event:', eventErrors);
        } else {
          const eventId = eventData.insert_events_one.id;
          const fightSet = new Set();
          for (const fight of details.fights) {
            const fightIdentifier = `${fight.fighter}-${fight.method}-${fight.round}-${fight.time}`;
            if (!fightSet.has(fightIdentifier)) {
              fightSet.add(fightIdentifier);
              const fightDetails = { ...fight, event_id: eventId };
              const { errors: fightErrors } = await executeInsertFight(fightDetails);
              if (fightErrors) {
                console.error('Error inserting fight:', fightErrors);
              }
            }
          }
          allEventsDetails.push(details);
        }
      }
      // Wait 1 second between requests to avoid overloading the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return allEventsDetails;
  } catch (error) {
    console.error('Error fetching event list:', error);
    return [];
  }
};

// API function to trigger the event scraping
export const POST = async (request) => {
  try {
    const eventsDetails = await scrapeAllEvents();
    return new Response(JSON.stringify({ success: true, data: eventsDetails }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during event scraping process:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
