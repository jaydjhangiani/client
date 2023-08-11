import { configureStore } from "@reduxjs/toolkit";
import userReducure from "./usersSlice";

const store = configureStore({
  reducer: {
    users: userReducure,
  },
});

export default store;
