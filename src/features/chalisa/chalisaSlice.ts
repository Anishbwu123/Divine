import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; // <--- NEW: Import PayloadAction
import { ChalisaVerse } from '../../types';
import { chalisaService } from './chalisaServices';
import { RootState } from '../../store';

// Fetch Content
export const getVerses = createAsyncThunk('chalisa/getVerses', async (_, thunkAPI) => {
  try {
    return await chalisaService.fetchVerses();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Toggle Bookmark
export const toggleBookmark = createAsyncThunk(
  'chalisa/toggleBookmark',
  async (verseId: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;
    const isBookmarked = state.chalisa.bookmarkedIds.includes(verseId);

    if (!userId) return rejectWithValue('User not logged in');

    try {
      if (isBookmarked) {
        await chalisaService.removeBookmark(userId, verseId);
        return { verseId, action: 'remove' };
      } else {
        await chalisaService.addBookmark(userId, verseId);
        return { verseId, action: 'add' };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ChalisaState {
  verses: ChalisaVerse[];
  bookmarkedIds: number[];
  lastReadVerseIndex: number; // <--- NEW: Store the index (0, 1, 2...)
  isLoading: boolean;
}

const initialState: ChalisaState = {
  verses: [],
  bookmarkedIds: [],
  lastReadVerseIndex: 0, // <--- NEW: Default to start
  isLoading: false,
};

const chalisaSlice = createSlice({
  name: 'chalisa',
  initialState,
  reducers: {
    // <--- NEW: The action to update progress
    setReadingProgress: (state, action: PayloadAction<number>) => {
      state.lastReadVerseIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Verses
      .addCase(getVerses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVerses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verses = action.payload;
      })
      // Toggle Bookmark
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        if (action.payload.action === 'add') {
          state.bookmarkedIds.push(action.payload.verseId);
        } else {
          state.bookmarkedIds = state.bookmarkedIds.filter(id => id !== action.payload.verseId);
        }
      });
  },
});

// <--- NEW: Export the action so you can use it in ChalisaScreen
export const { setReadingProgress } = chalisaSlice.actions;

export default chalisaSlice.reducer;