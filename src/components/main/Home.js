import React from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import NewUser from '../NewUser';

function Home() {
  const { newUser } = useAPIUser();
  return <div>{newUser ? <NewUser /> : ''}</div>;
}

export default Home;
