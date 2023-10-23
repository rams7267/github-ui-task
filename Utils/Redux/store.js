import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import repoReducer from "./repo.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    repo: repoReducer,
  },
});
