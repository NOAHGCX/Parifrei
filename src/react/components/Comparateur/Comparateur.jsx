import React from 'react';

const Comparateur = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-2xl font-bold mb-6">Comparaison des combattants</h1>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <input 
            type="text" 
            placeholder="Ciryl Gane" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <img 
            src="https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2023-08/GANE_CIRYL_09-02.png?itok=c0Uvcues" 
            alt="Ciryl Gane" 
            className="w-32 h-32 object-cover"
          />
        </div>
        <div className="text-3xl font-bold">VS</div>
        <div className="flex flex-col items-center space-y-2">
          <input 
            type="text" 
            placeholder="Francis Ngannou" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <img 
            src="https://dmxg5wxfqgb4u.cloudfront.net/styles/event_results_athlete_headshot/s3/2021-03/67964%252Fprofile-galery%252Fprofile-picture%252FNGANNOU_FRANCIS_03-27.png?itok=swbBpy9V" 
            alt="Francis Ngannou" 
            className="w-32 h-32 object-cover"
          />
        </div>
      </div>
      <div className="flex justify-around w-full mt-6">
        <div className="flex flex-col items-center space-y-4">
          <span className="font-semibold">Homme</span>
          <span className="font-semibold">Poids lourd</span>
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center">
              <span className="w-20">Poids</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-2/3"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">Taille</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/2"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">Victoires</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-3/4"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">Pertes</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/4"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">W/L Ratio</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-2/3"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">K.O.</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-3/5"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">Soumissions</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/3"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">Combats à terre</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/2"></div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-20">Coups critiques</span>
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <span className="font-semibold">Homme</span>
          <span className="font-semibold">Poids lourd</span>
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-full"></div>
              </div>
              <span className="w-20 text-right">Poids</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-2/3"></div>
              </div>
              <span className="w-20 text-right">Taille</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-3/4"></div>
              </div>
              <span className="w-20 text-right">Victoires</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/2"></div>
              </div>
              <span className="w-20 text-right">Pertes</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-3/4"></div>
              </div>
              <span className="w-20 text-right">W/L Ratio</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-4/5"></div>
              </div>
              <span className="w-20 text-right">K.O.</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/3"></div>
              </div>
              <span className="w-20 text-right">Soumissions</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-2/3"></div>
              </div>
              <span className="w-20 text-right">Combats à terre</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-32 bg-gray-300">
                <div className="h-4 bg-red-500 w-1/2"></div>
              </div>
              <span className="w-20 text-right">Coups critiques</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparateur;
