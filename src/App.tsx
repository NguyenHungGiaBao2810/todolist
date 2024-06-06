import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import GameList from './components/GameList';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gamelist" element={<GameList />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
