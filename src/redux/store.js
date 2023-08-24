import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import  authReducer  from "./reducer/authReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
