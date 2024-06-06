import React, { useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addGame } from '../store/store';

const { Search } = Input;

const GameInput: React.FC = () => {
  const [game, setGame] = useState<string>('');
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value);
  };

  const handleSearch = () => {
    dispatch(addGame(game));
    setGame('');
  };

  return (
    <Search
      placeholder="Enter game name"
      enterButton="Add game"
      value={game}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
};

export default GameInput;