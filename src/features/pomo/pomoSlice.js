import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pomoService from "./pomoService";

const initialState = {
  pomos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createPomo = createAsyncThunk(
  "pomos/create",
  async (pomoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await pomoService.createPomo(pomoData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get user goals
export const getPomos = createAsyncThunk(
  "pomos/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log(token);
      return await pomoService.getPomos(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pomoSlice = createSlice({
  name: "pomo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPomo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPomo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pomos.push(action.payload);
      })
      .addCase(createPomo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPomos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPomos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pomos = action.payload;
      })
      .addCase(getPomos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pomoSlice.actions;
export default pomoSlice.reducer;
