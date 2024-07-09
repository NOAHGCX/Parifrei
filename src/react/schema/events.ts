import { gql } from '@apollo/client/index.js';

export const GET_EVENTS = gql`
  query GetEvents($eventName: String = "%", $location: String = "%", $offset: Int = 0, $limit: Int = 10) {
    events( 
      where: { 
        event_name: { _ilike: $eventName }, 
        location: { _ilike: $location } 
      },
      offset: $offset, 
      limit: $limit
    ) {
      id
      event_name
      date
      location
      fights {
        id
        result
      }
    }
    totalCount: events_aggregate(where: { 
      event_name: { _ilike: $eventName }, 
      location: { _ilike: $location } 
    }) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($eventId: Int!) {
    events(where: {id: {_eq: $eventId}}) {
      id
      event_name
      date
      location
      fights {
        id
        kd
        result
        round
        time
        weight_class
        td
        sub
        str
        method
        fighter
        event_id
      }
    }
  }
`;