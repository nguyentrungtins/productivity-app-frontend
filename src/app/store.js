import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import todoReducer from "../features/todo/todoSlice";
import pomoReducer from "../features/pomo/pomoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    pomo: pomoReducer,
  },
});
