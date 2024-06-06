import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

interface Game {
  id: number;
  title: string;
  body: string;
}

interface GamesState {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axiosClient.get('/posts');
  return response.data;
});

export const addGame = createAsyncThunk('games/addGame', async (newGame: Omit<Game, 'id'>) => {
  const response = await axiosClient.post('/posts', newGame);
  return response.data;
});

export const deleteGame = createAsyncThunk('games/deleteGame', async (id: number) => {
  await axiosClient.delete(`/posts/${id}`);
  return id;
});

export const updateGame = createAsyncThunk('games/updateGame', async (updatedGame: Game) => {
  const response = await axiosClient.put(`/posts/${updatedGame.id}`, updatedGame);
  return response.data;
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.games.push(action.payload);
      })
      .addCase(deleteGame.fulfilled, (state, action: PayloadAction<number>) => {
        state.games = state.games.filter((game) => game.id !== action.payload);
      })
      .addCase(updateGame.fulfilled, (state, action: PayloadAction<Game>) => {
        const index = state.games.findIndex((game) => game.id === action.payload.id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      });
  },
});

export default gamesSlice.reducer;
