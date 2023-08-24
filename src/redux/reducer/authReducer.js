// import { AUTH_ACTIONS } from "../actions/authActions";
// import { removeStorage, setStorage } from "../../utils";

// const defaultState = {
//   profile: {},
//   isLoggedIn: false,
//   jwtToken: "",
//   jwtRefreshToken: "",
// };

// export const authReducer = (state = defaultState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case AUTH_ACTIONS.LOGIN_SUCCESS:
//       setStorage("profile", JSON.stringify(payload));
//       return {
//         ...state,
//         profile: payload.users,
//         isLoggedIn: true,
//         jwtToken: payload.jwtToken,
//         jwtRefreshToken: payload.jwtRefreshToken,
//       };
//     case AUTH_ACTIONS.SET_PROFILE:
//       return {
//         ...state,
//         profile: payload.users,
//         isLoggedIn: true,
//         jwtToken: payload.jwtToken,
//         jwtRefreshToken: payload.jwtRefreshToken,
//       };
//     case AUTH_ACTIONS.LOGOUT:
//       removeStorage("profile");
//       return defaultState;
//     default:
//       return state;
//   }
// };

import { createSlice } from "@reduxjs/toolkit";
import { setStorage, removeStorage } from "../../utils/index";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: {},
    isLoggedIn: false,
    jwtToken: "",
    jwtRefreshToken: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload;
      setStorage("profile", { user: payload.users, isLoggedIn: true });
      setStorage("token", {
        jwtToken: payload.jwtToken,
        jwtRefreshToken: payload.jwtRefreshToken,
      });
      return {
        ...state,
        profile: payload.users,
        isLoggedIn: true,
        jwtToken: payload.jwtToken,
        jwtRefreshToken: payload.jwtRefreshToken,
      };
    },
    setProfile: (state, action) => {
      const payload = action.payload;
      console.log(payload);
      return {
        ...state,
        profile: payload.profile,
        isLoggedIn: true,
        jwtToken: payload.jwtToken,
        jwtRefreshToken: payload.jwtRefreshToken,
      };
    },
    logout: (state) => {
      removeStorage("profile");
      return {
        ...state,
        profile: {},
        isLoggedIn: false,
        jwtToken: "",
        jwtRefreshToken: "",
      };
    },
  },
});

export const { loginSuccess, setProfile, logout } = authSlice.actions;

export default authSlice.reducer;
