import { createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "@/app/api/route";
import { headers } from "@/functions/utilities";

const initialState = {
  statusMsg: "",
  serverStatus: "",
  userData: "",
  activeEvent: "",
  pvpAndPvePts: "",
};

export const Slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setStatusMsg: (state, action) => {
      state.statusMsg = action.payload;
    },
    getServerStatus: (state, action) => {
      state.serverStatus = action.payload;
    },
    getProfile: (state, action) => {
      state.userData = action.payload;
    },
    getEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    getPvpAndPvePts: (state, action) => {
      state.pvpAndPvePts = action.payload;
    },
  },
});

/* -------------------------------- SERVER STATUS -------------------------------- */
export const fetchServerStatus = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/api/v1/stats/server");

      if (response.status === 200) {
        response.data.status = "Online";
        dispatch(getServerStatus(response.data));
      }
    } catch (err) {
      console.error("fetchServerStatus", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};

/* -------------------------------- GET PROFILE -------------------------------- */

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/api/v1/users/profile", headers);

      if (response.status === 200) {
        dispatch(getProfile(response.data));
      }
    } catch (err) {
      console.error("fetchUserData", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};
/* -------------------------------- GET EVENT -------------------------------- */

export const fetchEvent = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/api/v1/stats/active-event", headers);

      if (response.status === 200) {
        dispatch(getEvent(response.data));
      }
    } catch (err) {
      console.error("fetchUserData", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};
/* -------------------------------- GET PveAndPvpMaxPts -------------------------------- */

export const fetchPveAndPvpMaxPts = () => {
  return async (dispatch) => {
    try {
      const response = await GET("/api/v1/stats/pve-pvp/pts", headers);

      if (response.status === 200) {
        dispatch(getPvpAndPvePts(response.data));
      }
    } catch (err) {
      console.error("fetchUserData", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};

export const { getServerStatus, getProfile, getEvent, setStatusMsg } = Slice.actions;
export default Slice.reducer;
