import { useAstroQuery } from '../../helpers/apollo';
import { GET_EVENTS } from '../../schema/events';

const EventsList = ({ eventName = "%", location = "%", offset = 0, limit = 10 }) => {
  const { loading, error, data } = useAstroQuery(GET_EVENTS, {
    variables: {
      eventName,
      location,
      offset,
      limit
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>UFC Events</h1>
      <ul>
        {data.events.map(event => (
          <li key={event.id}>
            <h2>{event.event_name} - {event.date} - {event.location}</h2>
            <ul>
              {event.fights.map(fight => (
                <li key={fight.id}>
                  {fight.fighter1} vs {fight.fighter2} - {fight.result}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p>Total Events: {data.totalCount.aggregate.count}</p>
    </div>
  );
};

export default EventsList;
