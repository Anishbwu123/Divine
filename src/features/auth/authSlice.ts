import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types';
import { authService } from './authServices';

// 🔥 Import notification helpers
import {
  saveFCMToken,
  showLoginNotification,
  showSignupNotification,
} from '../notifications/notificationService';

// ✅ LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, pass }: { email: string; pass: string }, thunkAPI) => {
    try {
      const user = await authService.login(email, pass);

      // 🔥 Save FCM token
      await saveFCMToken();

      // 🔥 Show login notification
      await showLoginNotification(
        user.user_metadata?.full_name || 'Devotee',
      );

      return {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ SIGNUP (NEW)
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (
    {
      email,
      pass,
      name,
    }: { email: string; pass: string; name: string },
    thunkAPI,
  ) => {
    try {
      const user = await authService.signUp(email, pass, name);

      // 🔥 Save FCM token
      await saveFCMToken();

      // 🔥 Show signup notification
      await showSignupNotification(name);

      return {
        id: user.id,
        email: user.email,
        full_name: name,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ LOGOUT
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// ✅ UPDATE NAME
export const updateUserName = createAsyncThunk(
  'auth/updateUserName',
  async (name: string, thunkAPI) => {
    try {
      const user = await authService.updateProfile(name);
      return { full_name: user?.user_metadata?.full_name };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 🔹 STATE
interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// 🔹 SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔥 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // 🔥 SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // 🔥 UPDATE NAME
      .addCase(updateUserName.fulfilled, (state, action) => {
        if (state.user) {
          state.user.full_name = action.payload.full_name;
        }
      })

      // 🔥 LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;