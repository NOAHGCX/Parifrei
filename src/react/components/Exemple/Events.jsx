// components/UpcomingEvents.jsx

import React from 'react';

const UpcomingEvents = () => {
  // Exemple de données pour les événements
  const events = [
    {
      id: 1,
      title: "UFC Fight Night: Namajunas vs. Cortez",
      date: "July 13, 2024",
      location: "Denver, Colorado, USA",
      imageUrls: [
        "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2024-03/NAMAJUNAS_ROSE_03-23.png?itok=BvrCnyoR",
        "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-09/CORTEZ_TRACY_09-16.png?itok=dw4QnKkt"
      ]
    },
    {
      id: 2,
      title: "UFC 304: Edwards vs. Muhammad 2",
      date: "July 27, 2024",
      location: "Manchester, England, United Kingdom",
      imageUrls: [
        "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-12/EDWARDS_LEON_BELT_12-16.png?itok=PybcZaCp",
        "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-05/MUHAMMAD_BELAL_05-06.png?itok=kXjdOJ-D"
      ]
    },
    // {
    //     id: 3,
    //     title: "UFC 304: Edwards vs. Muhammad 2",
    //     date: "July 27, 2024",
    //     location: "Manchester, England, United Kingdom",
    //     imageUrls: [
    //       "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-12/EDWARDS_LEON_BELT_12-16.png?itok=PybcZaCp",
    //       "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-05/MUHAMMAD_BELAL_05-06.png?itok=kXjdOJ-D"
    //     ]
    //   },
    //   {
    //     id: 4,
    //     title: "UFC 304: Edwards vs. Muhammad 2",
    //     date: "July 27, 2024",
    //     location: "Manchester, England, United Kingdom",
    //     imageUrls: [
    //       "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-12/EDWARDS_LEON_BELT_12-16.png?itok=PybcZaCp",
    //       "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-05/MUHAMMAD_BELAL_05-06.png?itok=kXjdOJ-D"
    //     ]
    //   },
    //   {
    //     id: 5,
    //     title: "UFC 304: Edwards vs. Muhammad 2",
    //     date: "July 27, 2024",
    //     location: "Manchester, England, United Kingdom",
    //     imageUrls: [
    //       "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-12/EDWARDS_LEON_BELT_12-16.png?itok=PybcZaCp",
    //       "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-05/MUHAMMAD_BELAL_05-06.png?itok=kXjdOJ-D"
    //     ]
    //   },
    // Ajoutez plus d'événements ici
  ];

  return (
    <div className="py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Prochains événements</h1>
      <div className="flex flex-wrap justify-center">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg m-4 max-w-lg transition-transform transform hover:-translate-y-1">
            <div className="flex">
              {event.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`${event.title} image ${index + 1}`} className="w-1/2 h-48 object-cover rounded-t-lg" />
              ))}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-1">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
