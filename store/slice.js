import { createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "@/app/api/route";
import { headers, cookies } from "@/functions/utilities";
import { orderedObject, sortedInventory, sounds } from "@/functions/functions";

const initialState = {
  statusMsg: "",
  serverStatus: {},
  userData: {},
  userBox: {
    userInventory: {},
    userEquipment: {},
  },
  activeEvent: "",
  pvpAndPvePts: "",
  npcAttacked: [],
  battleData: {},
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
      state.userData = {
        ...action.payload,
        inventory: sortedInventory(action.payload.inventory.items),
        equipment: orderedObject(action.payload.equipment),
      };
    },
    getEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    getPvpAndPvePts: (state, action) => {
      state.pvpAndPvePts = action.payload;
    },
    addStat: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
    getUserBox: (state, action) => {
      state.userBox = {
        userInventory: sortedInventory(action.payload.inventory.items),
        userEquipment: orderedObject(action.payload.equipment),
      };
    },
    getNpcAttack: (state, action) => {
      state.npcAttacked = action.payload;
    },
    getBattleData: (state, action) => {
      state.battleData = action.payload;
      console.log(action.payload);
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

/* -------------------------------- POST Login -------------------------------- */
export const handleLoginUser = (dataLogin) => {
  return async (dispatch) => {
    try {
      if (dataLogin.username === "" || dataLogin.password === "") return;
      const response = await POST("/api/v1/auth/login", dataLogin);

      if (response.status === 200) {
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("username", dataLogin.username, { path: "/" });
        window.location.href = "/profile";
      }
    } catch (err) {
      console.error("handleLoginUser", err);
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
/* -------------------------------- POST Add Stat -------------------------------- */

export const fetchAddStat = (skillName) => {
  return async (dispatch) => {
    try {
      const response = await POST("/api/v1/users/add-skill-points/" + skillName, {}, headers);

      if (response.status === 200) {
        dispatch(addStat(response.data));
      }
    } catch (err) {
      console.error("fetchUserData", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};

/* -------------------------------- GET User inventory and equipment -------------------------------- */

export const fetchUserBox = (equipping, dataItem) => {
  return async (dispatch) => {
    try {
      if (dataItem === {}) return;
      let equip = equipping === true ? "equip/" : "unequip/";

      const response = await GET("/api/v1/items/" + equip + dataItem.id, headers);

      if (response.status === 200) {
        dispatch(getUserBox(response.data));
        if (dataItem.name === "potion") {
          sounds("potion");
        } else {
          sounds("equip");
        }
      }
    } catch (err) {
      console.error("fetchUserData", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};

/* -------------------------------- GET NPC Attack -------------------------------- */

export const fetchNpcAttack = (zoneName) => {
  return async (dispatch) => {
    try {
      const response = await GET("/api/v1/npcs/zone/" + zoneName, headers);
      if (response.status === 200) {
        dispatch(getNpcAttack(response.data));
      }
    } catch (err) {
      console.error("fetchUserData", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};

/* -------------------------------- POST Attack NPC -------------------------------- */

export const handleNpcAttack = (npcName) => {
  return async (dispatch) => {
    try {
      const response = await POST("/api/v1/users/attack-npc", { name: npcName }, headers);

      if (response.status === 200) {
        response.data = {
          ...response.data,
          nameData: npcName,
        };

        dispatch(getBattleData(response.data));
        window.location.href = "/pvebattle";
      }
    } catch (err) {
      console.error("handleLoginUser", err);
      dispatch(setStatusMsg(err.message));
    }
  };
};

export const {
  setStatusMsg,
  getServerStatus,
  getProfile,
  getEvent,
  getPvpAndPvePts,
  addStat,
  getUserBox,
  getNpcAttack,
  getBattleData,
} = Slice.actions;
export default Slice.reducer;
