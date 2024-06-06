import React, { useState, useEffect } from 'react';
import { List, Button, Input, Spin, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, deleteGame, editGame, fetchGames } from '../store/store';

const GameList: React.FC = () => {
  const { games, loading, error } = useSelector((state: RootState) => state.games);
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  useEffect(() => {
    if (games.length === 0) {
      dispatch(fetchGames());
    }
  }, [dispatch, games.length]);

  const handleDelete = (index: number) => {
    dispatch(deleteGame(index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewTitle(games[index]);
  };

  const handleSave = (index: number) => {
    dispatch(editGame({ index, newTitle }));
    setEditingIndex(null);
    setNewTitle('');
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <List
      bordered
      dataSource={games}
      renderItem={(game, index) => (
        <List.Item
          actions={[
            editingIndex === index ? (
              <>
                <Button type="link" onClick={() => handleSave(index)}>Save</Button>
                <Button type="link" onClick={() => setEditingIndex(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button type="link" onClick={() => handleEdit(index)}>Edit</Button>
                <Button type="link" onClick={() => handleDelete(index)}>Delete</Button>
              </>
            ),
          ]}
        >
          {editingIndex === index ? (
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          ) : (
            game
          )}
        </List.Item>
      )}
    />
  );
};

export default GameList;
