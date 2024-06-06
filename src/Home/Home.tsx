import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1>Home Page</h1>
      <p>Welcome to the Game List Application!</p>
      <Link to="/games">Go to Game List</Link>
    </div>
  );
};

export default Home;
