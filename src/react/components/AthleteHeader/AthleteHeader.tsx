import React from 'react';
import './AthleteHeader.css'; // Assurez-vous de créer et d'importer le fichier CSS

const AthleteHeader = ({ name, nickname, weight_class, record, images, tags }) => {
  const profileImage = images.find(img => img.type === "profile")?.url || '';
  const backgroundImage = images.find(img => img.type === "background")?.url || '';

  return (
    <header className="athlete-header">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="tags mb-2 flex flex-wrap">
              {tags.map(tag => (
                <span key={tag.name} className="tag bg-gray-800 text-white text-xs px-2 py-1 rounded mr-1 mb-1">
                  {tag.name}
                </span>
              ))}
            </div>
            <p className="text-lg">{weight_class}</p>
            <h1 className="text-4xl font-bold">{name}</h1>
            {nickname && <p className="text-2xl text-gray-400">{nickname}</p>}
            <p className="text-lg">{record}</p>
          </div>
          {backgroundImage && (
            <div className="profile-image-container">
              <img src={backgroundImage} alt={`${name}`} className="profile-image" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AthleteHeader;
