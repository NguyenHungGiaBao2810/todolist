import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, addGame, deleteGame, updateGame } from '../features/games/gamesSlice';
import { RootState, AppDispatch } from '../store';
import { List, Card, Button, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const GameList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { games, loading, error } = useSelector((state: RootState) => state.games);
  const [open, setOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<{ id?: number; title: string; body: string } | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const onCreate = (values: { title: string; body: string }) => {
    if (editingGame) {
      dispatch(updateGame({ id: editingGame.id!, ...values }));
    } else {
      dispatch(addGame(values));
    }
    setOpen(false);
    setEditingGame(null);
    form.resetFields();
  };

  const onDelete = (id: number) => {
    dispatch(deleteGame(id));
  };

  const onEdit = (game: { id: number; title: string; body: string }) => {
    setEditingGame(game);
    form.setFieldsValue(game);
    setOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 style={{
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'fantasy'
      }}>Game List</h1>
      
      <div className="nav">
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Game
      </Button>
      <Link to="/">
        <Button type="primary" style={{textAlign: 'center'}}>Go to Home</Button>
      </Link>
      </div>
      <List
        grid={{ 
        gutter: 16, 
        column: 4,
        }}
        dataSource={games}
        renderItem={(game) => (
          <List.Item>
            <Card
              title={game.title}
              actions={[
                <Button type="link" onClick={() => onEdit(game)}>Edit</Button>,
                <Button type="link" danger onClick={() => onDelete(game.id)}>Delete</Button>,
              ]}
            >
              <p>{game.body}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        open={open}
        title={editingGame ? "Edit Game" : "Add Game"}
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          setOpen(false);
          setEditingGame(null);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input the title of the game!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[
              {
                required: true,
                message: 'Please input the body of the game!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GameList;
