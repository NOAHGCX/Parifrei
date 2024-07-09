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
              <div className="flex">
            <div>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path id="e-stat-body_x5F__x5F_head" opacity={highlight1.head} fill="#D20A0A" d="M134.63,24.95
                c-0.63-1.46-0.61-2.87-0.8-4.29c-0.49-3.61-3.46-6.44-6.92-7.32c0-0.18,0-0.28,0-0.28c-0.66-0.08-1.33-0.07-1.99,0
                c-0.4-0.01-0.8,0.01-1.2,0.05c0,0,0,0.06,0,0.17c-3.46,0.87-6.43,3.7-6.92,7.32c-0.19,1.43-0.17,2.84-0.8,4.29
                c-0.6,1.39-0.08,3.35,1.19,4.47c2.01,1.78,1.83,4.14,2.2,6.36c0.12,0.71-0.34,1.52-1.01,2.04c-2.09,1.63-4.22,3.27-6.56,4.49h26.89
                c-2.3-1.22-4.39-2.83-6.45-4.43c-0.67-0.52-1.13-1.33-1.01-2.04c0.36-2.21,0.18-4.58,2.2-6.36
                C134.71,28.29,135.23,26.34,134.63,24.95z"></path>
                <path id="e-stat-body_x5F__x5F_body" opacity={highlight1.body} fill="#D20A0A" d="M108.18,43.7
                c-3.41,0.9-5.51,2.66-6.33,5.96c-0.25,0.99-0.45,1.98-0.56,3c-0.3,2.86-0.38,5.74-0.89,8.59c-1.12,6.21-3,12.23-4.53,18.33
                c-1.92,7.64-1.97,15.46-1.9,23.28c0.03,2.69-0.23,5.33-1.16,7.89v1.44c0.69,2.39,1.75,4.49,4.47,5.25c1.14,0.32,2.23,0.25,3.08-0.63
                c0.8-0.83,0.88-1.81,0.37-2.83c-0.16-0.32-0.27-0.67-0.31-1.03c-0.44-3.48-0.36-7.01-1.13-10.46c-0.33-1.48,0.13-2.99,0.82-4.36
                c3.42-6.77,4.99-14.01,5.81-21.45c0.26-2.37,1.23-4.5,2.37-6.96c0.55,1.8,0.8,3.22,1.21,4.6c1.24,4.2,1.49,8.43,1.09,12.81
                c-0.3,3.35-1.06,6.63-1.22,9.98c0.02,0.29,0.09,0.56,0.19,0.8c-0.41,1.47-0.65,2.98-0.87,4.48c-0.21,0.99-0.43,1.99-0.64,2.98
                c-0.25,1.55-0.5,3.11-0.75,4.66c-0.02,0.24-0.04,0.47-0.06,0.71c-0.45,0.7-0.26,1.47-0.29,2.22c-0.12,0.11-0.24,0.25-0.33,0.42
                c-0.39,2.13-0.53,4.25-0.55,6.38h16.84c0.58-2.4,1.44-4.77,1.45-7.29c-0.01-0.12,0.41-0.48,0.92-0.86c0.54,0.4,1.01,0.78,0.99,0.91
                c0.01,2.5,0.86,4.85,1.44,7.24h16.86c-0.02-2.11-0.17-4.22-0.55-6.33c-0.09-0.17-0.21-0.3-0.33-0.42c-0.03-0.75,0.16-1.52-0.29-2.22
                c-0.02-0.24-0.04-0.47-0.06-0.71c-0.25-1.55-0.5-3.11-0.75-4.66c-0.21-0.99-0.43-1.99-0.64-2.98c-0.23-1.51-0.47-3.01-0.87-4.48
                c0.1-0.24,0.17-0.5,0.19-0.8c-0.16-3.35-0.92-6.63-1.22-9.98c-0.4-4.38-0.15-8.61,1.09-12.81c0.41-1.38,0.66-2.8,1.21-4.6
                c1.14,2.46,2.1,4.59,2.37,6.96c0.82,7.43,2.39,14.68,5.81,21.45c0.69,1.37,1.15,2.88,0.82,4.36c-0.77,3.46-0.7,6.98-1.13,10.46
                c-0.05,0.36-0.15,0.71-0.31,1.03c-0.51,1.03-0.43,2.01,0.37,2.83c0.85,0.88,1.94,0.95,3.08,0.63c2.72-0.75,3.78-2.85,4.47-5.25
                v-1.44c-0.92-2.55-1.18-5.19-1.16-7.89c0.07-7.81,0.02-15.64-1.9-23.28c-1.54-6.1-3.41-12.13-4.53-18.33
                c-0.51-2.85-0.6-5.73-0.89-8.59c-0.11-1.02-0.31-2.01-0.56-3c-0.82-3.3-2.91-5.06-6.33-5.96c-1.32-0.35-2.56-0.88-3.74-1.5h-26.89
                C110.66,42.85,109.46,43.36,108.18,43.7z"></path>
                <g id="e-stat-body_x5F__x5F_leg">
                  <path opacity={highlight1.leg} fill="#D20A0A" d="M144.56,119.75H127.7c0.01,0.05,0.03,0.1,0.04,0.15
                    c1.23,5.2,2.24,10.45,3.24,15.69c0.78,4.08,1.88,8.05,3.6,11.87c1.41,3.14,2.4,6.37,2.41,9.9c0.02,4.53,1.57,8.84,2.59,13.21
                    c0.45,1.93,0.92,3.85,1.2,5.82c0.31,2.2,0.63,4.38-0.29,6.55c-0.43,1.01-0.31,2.14-0.12,3.2c0.21,1.19,0.25,2.38,0.16,3.58
                    c-0.15,1.95,0.24,2.51,2.09,3.27h1.11c1.2-0.67,2.52-0.08,3.78-0.33c0.96-0.19,1.96-0.21,2.88-0.57c1.58-0.6,2.03-1.94,0.71-2.88
                    c-1.93-1.38-2.37-3.08-2.71-5.27c-0.52-3.38-0.48-6.66,0.09-9.99c0.44-2.59,1.15-5.16,0.85-7.83c-0.04-0.53-0.07-1.05-0.14-1.57
                    c0.21-1.81,0.26-3.62-0.01-5.43c0.11-0.42,0.2-0.85,0.23-1.27c-0.14-2.81-1.13-5.4-2.4-7.86c-1.04-2.02-1.83-4.05-1.67-6.35
                    c0.06-0.84-0.07-1.71-0.42-2.47c-1.72-3.8-1.07-7.72-0.83-11.66C144.32,126.27,144.59,123.01,144.56,119.75z"></path>
                  <path opacity={highlight1.leg} fill="#D20A0A" d="M100.23,192.05c0.92,0.35,1.92,0.37,2.88,0.57
                    c1.26,0.25,2.58-0.34,3.78,0.33H108c1.86-0.75,2.25-1.31,2.09-3.27c-0.09-1.21-0.05-2.39,0.16-3.58c0.19-1.07,0.31-2.2-0.12-3.2
                    c-0.92-2.17-0.6-4.36-0.29-6.55c0.28-1.96,0.75-3.89,1.2-5.82c1.02-4.38,2.57-8.68,2.59-13.21c0.01-3.52,1-6.76,2.41-9.9
                    c1.72-3.82,2.82-7.79,3.6-11.87c1-5.25,2.01-10.49,3.24-15.69c0.01-0.03,0.02-0.07,0.02-0.1h-16.84c-0.03,3.24,0.24,6.48,0.44,9.71
                    c0.24,3.95,0.9,7.86-0.83,11.66c-0.34,0.76-0.47,1.63-0.42,2.47c0.16,2.3-0.62,4.33-1.67,6.35c-1.28,2.47-2.26,5.05-2.4,7.87
                    c0.03,0.43,0.12,0.85,0.23,1.27c-0.27,1.81-0.22,3.62-0.01,5.43c-0.06,0.52-0.1,1.05-0.14,1.57c-0.3,2.67,0.41,5.24,0.85,7.83
                    c0.56,3.34,0.61,6.61,0.09,9.99c-0.34,2.19-0.78,3.89-2.71,5.27C98.2,190.12,98.65,191.45,100.23,192.05z"></path>
                </g>
              </svg>
            </div>
            <div className="w-1/2 pl-4">
              <p className="text-3xl font-bold">{stats1?.sig_strike_target_head}%</p>
              <p className="text-md">Tête</p>
              <p className="text-3xl font-bold">{stats1?.sig_strike_target_body}%</p>
              <p className="text-md">Corps</p>
              <p className="text-3xl font-bold">{stats1?.sig_strike_target_leg}%</p>
              <p className="text-md">Jambe</p>
            </div>
          </div>
            </div>
            <div>
            <h3 className="text-xl font-bold mb-2">Sig. Str. par Cible {name2}</h3>
            <div className="flex">
            <div >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path id="e-stat-body_x5F__x5F_head" opacity={highlight2.head} fill="#D20A0A" d="M134.63,24.95
                c-0.63-1.46-0.61-2.87-0.8-4.29c-0.49-3.61-3.46-6.44-6.92-7.32c0-0.18,0-0.28,0-0.28c-0.66-0.08-1.33-0.07-1.99,0
                c-0.4-0.01-0.8,0.01-1.2,0.05c0,0,0,0.06,0,0.17c-3.46,0.87-6.43,3.7-6.92,7.32c-0.19,1.43-0.17,2.84-0.8,4.29
                c-0.6,1.39-0.08,3.35,1.19,4.47c2.01,1.78,1.83,4.14,2.2,6.36c0.12,0.71-0.34,1.52-1.01,2.04c-2.09,1.63-4.22,3.27-6.56,4.49h26.89
                c-2.3-1.22-4.39-2.83-6.45-4.43c-0.67-0.52-1.13-1.33-1.01-2.04c0.36-2.21,0.18-4.58,2.2-6.36
                C134.71,28.29,135.23,26.34,134.63,24.95z"></path>
                <path id="e-stat-body_x5F__x5F_body" opacity={highlight2.body} fill="#D20A0A" d="M108.18,43.7
                c-3.41,0.9-5.51,2.66-6.33,5.96c-0.25,0.99-0.45,1.98-0.56,3c-0.3,2.86-0.38,5.74-0.89,8.59c-1.12,6.21-3,12.23-4.53,18.33
                c-1.92,7.64-1.97,15.46-1.9,23.28c0.03,2.69-0.23,5.33-1.16,7.89v1.44c0.69,2.39,1.75,4.49,4.47,5.25c1.14,0.32,2.23,0.25,3.08-0.63
                c0.8-0.83,0.88-1.81,0.37-2.83c-0.16-0.32-0.27-0.67-0.31-1.03c-0.44-3.48-0.36-7.01-1.13-10.46c-0.33-1.48,0.13-2.99,0.82-4.36
                c3.42-6.77,4.99-14.01,5.81-21.45c0.26-2.37,1.23-4.5,2.37-6.96c0.55,1.8,0.8,3.22,1.21,4.6c1.24,4.2,1.49,8.43,1.09,12.81
                c-0.3,3.35-1.06,6.63-1.22,9.98c0.02,0.29,0.09,0.56,0.19,0.8c-0.41,1.47-0.65,2.98-0.87,4.48c-0.21,0.99-0.43,1.99-0.64,2.98
                c-0.25,1.55-0.5,3.11-0.75,4.66c-0.02,0.24-0.04,0.47-0.06,0.71c-0.45,0.7-0.26,1.47-0.29,2.22c-0.12,0.11-0.24,0.25-0.33,0.42
                c-0.39,2.13-0.53,4.25-0.55,6.38h16.84c0.58-2.4,1.44-4.77,1.45-7.29c-0.01-0.12,0.41-0.48,0.92-0.86c0.54,0.4,1.01,0.78,0.99,0.91
                c0.01,2.5,0.86,4.85,1.44,7.24h16.86c-0.02-2.11-0.17-4.22-0.55-6.33c-0.09-0.17-0.21-0.3-0.33-0.42c-0.03-0.75,0.16-1.52-0.29-2.22
                c-0.02-0.24-0.04-0.47-0.06-0.71c-0.25-1.55-0.5-3.11-0.75-4.66c-0.21-0.99-0.43-1.99-0.64-2.98c-0.23-1.51-0.47-3.01-0.87-4.48
                c0.1-0.24,0.17-0.5,0.19-0.8c-0.16-3.35-0.92-6.63-1.22-9.98c-0.4-4.38-0.15-8.61,1.09-12.81c0.41-1.38,0.66-2.8,1.21-4.6
                c1.14,2.46,2.1,4.59,2.37,6.96c0.82,7.43,2.39,14.68,5.81,21.45c0.69,1.37,1.15,2.88,0.82,4.36c-0.77,3.46-0.7,6.98-1.13,10.46
                c-0.05,0.36-0.15,0.71-0.31,1.03c-0.51,1.03-0.43,2.01,0.37,2.83c0.85,0.88,1.94,0.95,3.08,0.63c2.72-0.75,3.78-2.85,4.47-5.25
                v-1.44c-0.92-2.55-1.18-5.19-1.16-7.89c0.07-7.81,0.02-15.64-1.9-23.28c-1.54-6.1-3.41-12.13-4.53-18.33
                c-0.51-2.85-0.6-5.73-0.89-8.59c-0.11-1.02-0.31-2.01-0.56-3c-0.82-3.3-2.91-5.06-6.33-5.96c-1.32-0.35-2.56-0.88-3.74-1.5h-26.89
                C110.66,42.85,109.46,43.36,108.18,43.7z"></path>
                <g id="e-stat-body_x5F__x5F_leg">
                  <path opacity={highlight2.leg} fill="#D20A0A" d="M144.56,119.75H127.7c0.01,0.05,0.03,0.1,0.04,0.15
                    c1.23,5.2,2.24,10.45,3.24,15.69c0.78,4.08,1.88,8.05,3.6,11.87c1.41,3.14,2.4,6.37,2.41,9.9c0.02,4.53,1.57,8.84,2.59,13.21
                    c0.45,1.93,0.92,3.85,1.2,5.82c0.31,2.2,0.63,4.38-0.29,6.55c-0.43,1.01-0.31,2.14-0.12,3.2c0.21,1.19,0.25,2.38,0.16,3.58
                    c-0.15,1.95,0.24,2.51,2.09,3.27h1.11c1.2-0.67,2.52-0.08,3.78-0.33c0.96-0.19,1.96-0.21,2.88-0.57c1.58-0.6,2.03-1.94,0.71-2.88
                    c-1.93-1.38-2.37-3.08-2.71-5.27c-0.52-3.38-0.48-6.66,0.09-9.99c0.44-2.59,1.15-5.16,0.85-7.83c-0.04-0.53-0.07-1.05-0.14-1.57
                    c0.21-1.81,0.26-3.62-0.01-5.43c0.11-0.42,0.2-0.85,0.23-1.27c-0.14-2.81-1.13-5.4-2.4-7.86c-1.04-2.02-1.83-4.05-1.67-6.35
                    c0.06-0.84-0.07-1.71-0.42-2.47c-1.72-3.8-1.07-7.72-0.83-11.66C144.32,126.27,144.59,123.01,144.56,119.75z"></path>
                  <path opacity={highlight2.leg} fill="#D20A0A" d="M100.23,192.05c0.92,0.35,1.92,0.37,2.88,0.57
                    c1.26,0.25,2.58-0.34,3.78,0.33H108c1.86-0.75,2.25-1.31,2.09-3.27c-0.09-1.21-0.05-2.39,0.16-3.58c0.19-1.07,0.31-2.2-0.12-3.2
                    c-0.92-2.17-0.6-4.36-0.29-6.55c0.28-1.96,0.75-3.89,1.2-5.82c1.02-4.38,2.57-8.68,2.59-13.21c0.01-3.52,1-6.76,2.41-9.9
                    c1.72-3.82,2.82-7.79,3.6-11.87c1-5.25,2.01-10.49,3.24-15.69c0.01-0.03,0.02-0.07,0.02-0.1h-16.84c-0.03,3.24,0.24,6.48,0.44,9.71
                    c0.24,3.95,0.9,7.86-0.83,11.66c-0.34,0.76-0.47,1.63-0.42,2.47c0.16,2.3-0.62,4.33-1.67,6.35c-1.28,2.47-2.26,5.05-2.4,7.87
                    c0.03,0.43,0.12,0.85,0.23,1.27c-0.27,1.81-0.22,3.62-0.01,5.43c-0.06,0.52-0.1,1.05-0.14,1.57c-0.3,2.67,0.41,5.24,0.85,7.83
                    c0.56,3.34,0.61,6.61,0.09,9.99c-0.34,2.19-0.78,3.89-2.71,5.27C98.2,190.12,98.65,191.45,100.23,192.05z"></path>
                </g>
              </svg>
            </div>
            <div className="w-1/2 pl-4">
              <p className="text-3xl font-bold">{stats2?.sig_strike_target_head}%</p>
              <p className="text-md">Tête</p>
              <p className="text-3xl font-bold">{stats2?.sig_strike_target_body}%</p>
              <p className="text-md">Corps</p>
              <p className="text-3xl font-bold">{stats2?.sig_strike_target_leg}%</p>
              <p className="text-md">Jambe</p>
            </div>
          </div>
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
