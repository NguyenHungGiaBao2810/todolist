import React from 'react';
import GameInput from './components/GameInput';
import GameList from './components/GameList';

const App: React.FC = () => {
  return (


    <div style={{ padding: 40 }}>
      <h1 style={{
        marginLeft: 650,
        fontFamily: 'fantasy',
        color: 'blue'
      }}>Game List</h1>
      <GameInput />
      <GameList />
    </div>

  );
};

export default App;
