import { configureStore, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GamesState {
  games: string[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data.map((post: { title: string }) => post.title);
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame(state, action: PayloadAction<string>) { //thêm game
      state.games.push(action.payload);
      localStorage.setItem('games', JSON.stringify(state.games));
    },
    deleteGame(state, action: PayloadAction<number>) {// xóa game
      state.games.splice(action.payload, 1);
      localStorage.setItem('games', JSON.stringify(state.games));
    },
    editGame(state, action: PayloadAction<{ index: number; newTitle: string }>) {// chỉnh sửa
      state.games[action.payload.index] = action.payload.newTitle;
      localStorage.setItem('games', JSON.stringify(state.games));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.games = action.payload;
        state.loading = false;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch games';
      });
  },
});

export const { addGame, deleteGame, editGame } = gamesSlice.actions;

const store = configureStore({
  reducer: {
    games: gamesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;