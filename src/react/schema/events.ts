import { gql } from '@apollo/client/index.js';

export const GET_EVENTS = gql`
  query GetEvents($eventName: String, $location: String, $offset: Int, $limit: Int) {
    events( 
      offset: $offset, 
      limit: $limit
    ) {
      id
      event_name
      date
      location
      fights {
        id
        fighter
        result
      }
    }
    totalCount: events_aggregate(where: { 
      event_name: { _ilike: $eventName }, 
      location: { _eq: $location } 
    }) {
      aggregate {
        count
      }
    }
  }
`;