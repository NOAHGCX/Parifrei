import React from 'react';

const AthleteStatistics = ({ stats }) => {
  return (
    <div className="athlete-statistics mt-4">
      <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="stat-card bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Précision Saisissante</h3>
          <p>20%</p>
          <p>Sig. Frappes débarquées: {stats.sig_strikes_landed}</p>
          <p>Sig. Frappes tentées: {stats.sig_strikes_attempted}</p>
        </div>
        <div className="stat-card bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Précision de Takedown</h3>
          <p>0%</p>
          <p>Takedowns Landed: {stats.takedowns_attempted}</p>
          <p>Takedowns Tentées: {stats.takedowns_attempted}</p>
        </div>
        <div className="stat-card bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Statistiques de Combats</h3>
          <p>Sig. Frappes Atterri per Min: {stats.sig_strikes_per_minute}</p>
          <p>Sig. Frappes Encaissées per Min: {stats.sig_strikes_absorbed_per_minute}</p>
          <p>Submission Avg per 15 Min: {stats.submission_avg_per_15_min}</p>
        </div>
        {/* Add more stat cards as necessary */}
      </div>
    </div>
  );
};

export default AthleteStatistics;
