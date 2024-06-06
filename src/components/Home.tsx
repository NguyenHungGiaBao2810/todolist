import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home: React.FC = () => {
  return (
    <div style={{
      position: 'relative'
    }}>
      <h1 style={{
        textAlign: 'center'
      }}>Home</h1>
      <Link to="/gamelist">
        <Button type="primary" style={{textAlign: 'center'}}>Go to Game List</Button>
      </Link>
    </div>
  );
};

export default Home;
