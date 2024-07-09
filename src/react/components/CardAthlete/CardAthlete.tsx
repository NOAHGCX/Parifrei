import React from 'react';
import './CardAthlete.css'; // Ensure you have a CSS file for styles

const CardAthlete = ({ fighter }) => {
  // Check profile image
  let profileImage = fighter.images[0]?.url;

  if (!profileImage || profileImage.includes("no-profile-image.png") || profileImage.includes("silhouette-headshot-female.png")) {
    // Use fallback image if no profile image or if it's the "no-profile-image"
    profileImage = fighter.weight_class.includes("Women's ") ? '/UFC-Female-Fallback-Image.jpg' : '/UFC-Male-Fallback-Image.jpg';
  }

  // Check background image
  let backgroundImage = fighter.background_images[0]?.url || '';

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="c-listing-athlete__thumbnail">
              <img src={profileImage} alt={fighter.name} className="w-full h-auto rounded"/>
            </div>
            <div className="c-listing-athlete__text text-center mt-2">
              <span className="c-listing-athlete__name text-lg font-semibold">
                {fighter.name}
              </span>
              {fighter.nickname && (
                <span className="c-listing-athlete__nickname block text-sm text-gray-600">
                  "{fighter.nickname}"
                </span>
              )}
              <span className="c-listing-athlete__title block text-sm">
                {fighter.weight_class}
              </span>
              <span className="c-listing-athlete__record block text-sm">
                {fighter.record}
              </span>
              {fighter.rank !== undefined && fighter.rank !== null && (
                <span className="c-listing-athlete__rank block text-sm font-bold">
                  {fighter.rank === undefined || fighter.rank === null ? (
                    fighter.name.includes("Interim") ? "Interim Champion" : "Champion" 
                  ) : (
                    `#${fighter.rank}`
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="flip-card-back" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="text-white text-center p-4">
              <p className="text-xl font-bold">{fighter.name}</p>
              <p>{fighter.weight_class}</p>
              <p>{fighter.record}</p>
              <a href={`/Athletes/${fighter.id}`} className="text-blue-300 underline">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAthlete;
