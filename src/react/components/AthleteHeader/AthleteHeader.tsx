import React from 'react';

const AthleteHeader = ({ name, nickname, weight_class, record, images, tags }) => {
  const profileImage = images.find(img => img.type === "profile")?.url || '';
  const backgroundImage = images.find(img => img.type === "background")?.url || '';

  return (
    <div className="athlete-header relative flex items-center bg-black text-white shadow-md p-6 mb-6 h-[329px]">
      <div className="flex flex-col z-10 p-4 w-2/3">
        <div className="tags mb-2">
          {tags.map(tag => (
            <span key={tag.name} className="tag bg-gray-800 text-white text-xs px-2 py-1 rounded mr-1">
              {tag.name}
            </span>
          ))}
        </div>
        <p className="text-lg">{weight_class}</p>
        <h1 className="text-4xl font-bold">{name}</h1>
        {nickname && <p className="text-2xl text-gray-400">{nickname}</p>}
        <p className="text-lg">{record}</p>
      </div>
      {profileImage && (
        <div className="profile-image-container w-[165px] h-[329px] ml-auto overflow-hidden">
          <img src={profileImage} alt={`${name}`} className="object-cover object-mid " />
        </div>
      )}
    </div>
  );
};

export default AthleteHeader;
