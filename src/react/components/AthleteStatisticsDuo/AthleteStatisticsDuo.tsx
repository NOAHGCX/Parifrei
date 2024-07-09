import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AthleteStatisticsDuo = ({ stats1, stats2, name1, name2 }) => {
  const calculateAccuracy = (landed, attempted) => (landed / attempted) * 100;

  const sigStrikeAccuracy1 = calculateAccuracy(stats1?.sig_strikes_per_minute, stats1?.sig_strikes_attempted);
  const takedownAccuracy1 = calculateAccuracy(stats1?.takedowns_landed, stats1?.takedowns_attempted);

  const sigStrikeAccuracy2 = calculateAccuracy(stats2?.sig_strikes_per_minute, stats2?.sig_strikes_attempted);
  const takedownAccuracy2 = calculateAccuracy(stats2?.takedowns_landed, stats2?.takedowns_attempted);

  const calculateHighlight = (headStrikes, bodyStrikes, legStrikes) => {
    if (headStrikes > bodyStrikes && headStrikes > legStrikes) {
      return { head: 1, body: 0.38, leg: 0.38 };
    } else if (bodyStrikes > headStrikes && bodyStrikes > legStrikes) {
      return { head: 0.38, body: 1, leg: 0.38 };
    } else if (legStrikes > headStrikes && legStrikes > bodyStrikes) {
      return { head: 0.38, body: 0.38, leg: 1 };
    } else {
      return { head: 0.38, body: 0.38, leg: 0.38 };
    }
  };

  const highlight1 = calculateHighlight(stats1?.sig_strike_target_head, stats1?.sig_strike_target_body, stats1?.sig_strike_target_leg);
  const highlight2 = calculateHighlight(stats2?.sig_strike_target_head, stats2?.sig_strike_target_body, stats2?.sig_strike_target_leg);

  const calculatePercentage = (value, total) => Math.round((value / total) * 100);

  const totalStrikes1 = stats1?.sig_strike_position_permanent + stats1?.sig_strike_position_sol + stats1?.sig_strike_position_clinch;
  const permanentPercentage1 = calculatePercentage(stats1?.sig_strike_position_permanent, totalStrikes1);
  const clinchPercentage1 = calculatePercentage(stats1?.sig_strike_position_clinch, totalStrikes1);
  const solPercentage1 = calculatePercentage(stats1?.sig_strike_position_sol, totalStrikes1);

  const totalStrikes2 = stats2?.sig_strike_position_permanent + stats2?.sig_strike_position_sol + stats2?.sig_strike_position_clinch;
  const permanentPercentage2 = calculatePercentage(stats2?.sig_strike_position_permanent, totalStrikes2);
  const clinchPercentage2 = calculatePercentage(stats2?.sig_strike_position_clinch, totalStrikes2);
  const solPercentage2 = calculatePercentage(stats2?.sig_strike_position_sol, totalStrikes2);

  return (
    <div className="athlete-statistics mt-4 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="stat-card bg-white p-6 rounded shadow-lg flex items-center">
          <div className="w-1/4">
            <CircularProgressbar
              value={sigStrikeAccuracy1}
              text={`${Math.round(sigStrikeAccuracy1)}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: 'red',
                textColor: 'black',
              })}
            />
          </div>
          <div className="w-3/4 pl-4">
            <h3 className="text-xl font-bold mb-2">Précision Saisissante {name1}</h3>
            <p className="text-3xl font-bold">{stats1?.sig_strikes_per_minute}</p>
            <p className="text-md">Sig. Frappes débarquées</p>
            <p className="text-3xl font-bold">{stats1?.sig_strikes_attempted}</p>
            <p className="text-md">Sig. Frappes tentées</p>
          </div>
        </div>
        <div className="stat-card bg-white p-6 rounded shadow-lg flex items-center">
          <div className="w-1/4">
            <CircularProgressbar
              value={takedownAccuracy1}
              text={`${Math.round(takedownAccuracy1)}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: 'red',
                textColor: 'black',
              })}
            />
          </div>
          <div className="w-3/4 pl-4">
            <h3 className="text-xl font-bold mb-2">Précision de Takedown {name1}</h3>
            <p className="text-3xl font-bold">{stats1?.takedowns_landed}</p>
            <p className="text-md">Takedowns débarqués</p>
            <p className="text-3xl font-bold">{stats1?.takedowns_attempted}</p>
            <p className="text-md">Takedowns tentés</p>
          </div>
        </div>
        <div className="stat-card bg-white p-6 rounded shadow-lg flex items-center">
          <div className="w-1/4">
            <CircularProgressbar
              value={sigStrikeAccuracy2}
              text={`${Math.round(sigStrikeAccuracy2)}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: 'blue',
                textColor: 'black',
              })}
            />
          </div>
          <div className="w-3/4 pl-4">
            <h3 className="text-xl font-bold mb-2">Précision Saisissante {name2}</h3>
            <p className="text-3xl font-bold">{stats2?.sig_strikes_per_minute}</p>
            <p className="text-md">Sig. Frappes débarquées</p>
            <p className="text-3xl font-bold">{stats2?.sig_strikes_attempted}</p>
            <p className="text-md">Sig. Frappes tentées</p>
          </div>
        </div>
        <div className="stat-card bg-white p-6 rounded shadow-lg flex items-center">
          <div className="w-1/4">
            <CircularProgressbar
              value={takedownAccuracy2}
              text={`${Math.round(takedownAccuracy2)}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: 'blue',
                textColor: 'black',
              })}
            />
          </div>
          <div className="w-3/4 pl-4">
            <h3 className="text-xl font-bold mb-2">Précision de Takedown {name2}</h3>
            <p className="text-3xl font-bold">{stats2?.takedowns_landed}</p>
            <p className="text-md">Takedowns débarqués</p>
            <p className="text-3xl font-bold">{stats2?.takedowns_attempted}</p>
            <p className="text-md">Takedowns tentés</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
        <div className="stat-card bg-white p-6 rounded shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{name1}</h3>
              <p className="text-3xl font-bold">{stats1?.sig_strikes_landed}</p>
              <p className="text-md">Sig. Frappes Atterri per Min</p>
              <p className="text-3xl font-bold">{stats1?.sig_strikes_absorbed_per_minute}</p>
              <p className="text-md">Sig. Frappes Encaissées per Min</p>
              <p className="text-3xl font-bold">{stats1?.takedown_avg_per_15_min}</p>
              <p className="text-md">Takedown Avg per 15 Min</p>
              <p className="text-3xl font-bold">{stats1?.submission_avg_per_15_min}</p>
              <p className="text-md">Envoi Avg per 15 Min</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{name2}</h3>
              <p className="text-3xl font-bold">{stats2?.sig_strikes_landed}</p>
              <p className="text-md">Sig. Frappes Atterri per Min</p>
              <p className="text-3xl font-bold">{stats2?.sig_strikes_absorbed_per_minute}</p>
              <p className="text-md">Sig. Frappes Encaissées per Min</p>
              <p className="text-3xl font-bold">{stats2?.takedown_avg_per_15_min}</p>
              <p className="text-md">Takedown Avg per 15 Min</p>
              <p className="text-3xl font-bold">{stats2?.submission_avg_per_15_min}</p>
              <p className="text-md">Envoi Avg per 15 Min</p>
            </div>
          </div>
        </div>
        <div className="stat-card bg-white p-6 rounded shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Sig. Str. par Position {name1}</h3>
              <p className="text-3xl font-bold">{stats1?.sig_strike_position_permanent} ({permanentPercentage1}%) </p>
              <p className="text-md">Permanente</p>
              <p className="text-3xl font-bold"> {stats1?.sig_strike_position_clinch} ({clinchPercentage1}%)</p>
              <p className="text-md">Clinch</p>
              <p className="text-3xl font-bold">{stats1?.sig_strike_position_sol} ({solPercentage1}%)</p>
              <p className="text-md">Sol</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Sig. Str. par Position {name2}</h3>
              <p className="text-3xl font-bold">{stats2?.sig_strike_position_permanent} ({permanentPercentage2}%) </p>
              <p className="text-md">Permanente</p>
              <p className="text-3xl font-bold"> {stats2?.sig_strike_position_clinch} ({clinchPercentage2}%)</p>
              <p className="text-md">Clinch</p>
              <p className="text-3xl font-bold">{stats2?.sig_strike_position_sol} ({solPercentage2}%)</p>
              <p className="text-md">Sol</p>
            </div>
          </div>
        </div>
        <div className="stat-card bg-white p-6 rounded shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Sig. Str. par Cible {name1}</h3>
              <p className="text-3xl font-bold">{stats1?.sig_strike_target_head}%</p>
              <p className="text-md">Tête</p>
              <p className="text-3xl font-bold">{stats1?.sig_strike_target_body}%</p>
              <p className="text-md">Corps</p>
              <p className="text-3xl font-bold">{stats1?.sig_strike_target_leg}%</p>
              <p className="text-md">Jambe</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Sig. Str. par Cible {name2}</h3>
              <p className="text-3xl font-bold">{stats2?.sig_strike_target_head}%</p>
              <p className="text-md">Tête</p>
              <p className="text-3xl font-bold">{stats2?.sig_strike_target_body}%</p>
              <p className="text-md">Corps</p>
              <p className="text-3xl font-bold">{stats2?.sig_strike_target_leg}%</p>
              <p className="text-md">Jambe</p>
            </div>
          </div>
        </div>
        <div className="stat-card bg-white p-6 rounded shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Victoire par Méthode {name1}</h3>
              <p className="text-3xl font-bold">{stats1?.ko_tko}  <span className='text-xl font-bold'>{Math.round((stats1?.ko_tko / (stats1?.ko_tko + stats1?.decision + stats1?.submission)) * 100)}% </span></p>
              <p className="text-md">KO/TKO</p>
              <p className="text-3xl font-bold">{stats1?.decision}   <span className='text-xl font-bold'>{Math.round((stats1?.decision / (stats1?.ko_tko + stats1?.decision + stats1?.submission)) * 100)}% </span></p>
              <p className="text-md">Décision</p>
              <p className="text-3xl font-bold">{stats1?.submission}   <span className='text-xl font-bold'>{Math.round((stats1?.submission / (stats1?.ko_tko + stats1?.decision + stats1?.submission)) * 100)}% </span></p>
              <p className="text-md">Soumission</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Victoire par Méthode {name2}</h3>
              <p className="text-3xl font-bold">{stats2?.ko_tko}  <span className='text-xl font-bold'>{Math.round((stats2?.ko_tko / (stats2?.ko_tko + stats2?.decision + stats2?.submission)) * 100)}% </span></p>
              <p className="text-md">KO/TKO</p>
              <p className="text-3xl font-bold">{stats2?.decision}   <span className='text-xl font-bold'>{Math.round((stats2?.decision / (stats2?.ko_tko + stats2?.decision + stats2?.submission)) * 100)}% </span></p>
              <p className="text-md">Décision</p>
              <p className="text-3xl font-bold">{stats2?.submission}   <span className='text-xl font-bold'>{Math.round((stats2?.submission / (stats2?.ko_tko + stats2?.decision + stats2?.submission)) * 100)}% </span></p>
              <p className="text-md">Soumission</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteStatisticsDuo;
