// query GetEvents($eventName: String, $location: String, $offset: Int!, $limit: Int!) {
//     events(where: { 
//       event_name: { _ilike: $eventName }, 
//       location: { _eq: $location } 
//     }, offset: $offset, limit: $limit) {
//       id
//       event_name
//       date
//       location
//       fights
//     }
//     totalCount: events_aggregate(where: { 
//       event_name: { _ilike: $eventName }, 
//       location: { _eq: $location } 
//     }) {
//       aggregate {
//         count
//       }
//     }
//   }
// Joe Banana — Aujourd’hui à 11:52
// Image
// Corbeau Vache — Aujourd’hui à 11:57
// import { gql, useQuery } from '@apollo/client';

// const GET_EVENTS = gql
//   query GetEvents($eventName: String, $location: String, $offset: Int, $limit: Int) {
//     events(
//       where: { 
//         event_name: { _ilike: $eventName }, 
//         location: { _eq: $location } 
//       }, 
//       offset: $offset, 
//       limit: $limit
//     ) {
//       id
//       event_name
//       date
//       location
//       fights {
//         id
//         fighter1
//         fighter2
//         result
//       }
//     }
//     totalCount: events_aggregate(where: { 
//       event_name: { _ilike: $eventName }, 
//       location: { _eq: $location } 
//     }) {
//       aggregate {
//         count
//       }
//     }
//   }
// ;

// const EventsList = ({ eventName = "%", location = "%", offset = 0, limit = 10 }) => {
//   const { loading, error, data } = useQuery(GET_EVENTS, {
//     variables: { 
//       eventName, 
//       location, 
//       offset, 
//       limit 
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>UFC Events</h1>
//       <ul>
//         {data.events.map(event => (
//           <li key={event.id}>
//             <h2>{event.event_name} - {event.date} - {event.location}</h2>
//             <ul>
//               {event.fights.map(fight => (
//                 <li key={fight.id}>
//                   {fight.fighter1} vs {fight.fighter2} - {fight.result}
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//       <p>Total Events: {data.totalCount.aggregate.count}</p>
//     </div>
//   );
// };

// export default EventsList;