import './Home.sass';
import React, { useEffect, useState } from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import { Warzone } from '../../services/codAPI';
import { findUser, getUser } from '../../services/userFirebase';
import NewUser from '../NewUser';
import LevelChart from './LevelChart';

function Home() {
  const { user, addUser } = useAPIUser();
  let [error, setError] = useState();
  let [gameData, setGameData] = useState();

  useEffect(() => {
    if (user) {
      let platform = user.user.default;
      let gametag = user.user[platform];

      Warzone.fullData(gametag, platform)
        .then((data) => {
          if (data.status === 'success') {
            console.log(data);
            setGameData(data.data);
          } else {
            setError(data.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }, [user]);

  return (
    <div className="body">
      {user && !user.user.default ? <NewUser /> : ''}
      <div className="body-content">
        <div className="stats">
          Lifetime Statistics
          <div className="border"></div>
        </div>
        <div className="stats">
          Weekly Statistics
          <div className="border"></div>
        </div>
        <div className="profile">
          <div className="profile-chart">
            <LevelChart />
          </div>
          <div className="profile-data">
            <div>{gameData ? gameData.username : ''}</div>
            <div className="profile-data-level">
              {gameData ? gameData.level : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
