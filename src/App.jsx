import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";

/* -------------------------------- AUTH --------------------------------------------*/
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
/* -------------------------------- //AUTH --------------------------------------------*/

/* -------------------------------- USERPROFILE --------------------------------------------*/
import Profile from "./components/userProfile/Profile";
/* -------------------------------- //USERPROFILE --------------------------------------------*/

/* -------------------------------- SIDEBAR --------------------------------------------*/
import SideBar from "./components/sideBar/SideBar";

/* -------------------------------- MAP --------------------------------------------*/
import Zone from "./components/sideBar/PvE/Zone";
import PlayerVsNPC from "./components/sideBar/PvE/PlayerVsNPC";
import PvEBattle from "./components/sideBar/PvE/PvEBattle";
/* -------------------------------- //MAP --------------------------------------------*/

/* -------------------------------- ARENA --------------------------------------------*/

import PlayerVsPlayer from "./components/sideBar/PvP/PlayerVsPlayer";

/* -------------------------------- //ARENA --------------------------------------------*/
/* -------------------------------- SHOP --------------------------------------------*/

import Shop from "./components/sideBar/Shop/Shop";

/* -------------------------------- //SHOP --------------------------------------------*/
/* -------------------------------- RANKING --------------------------------------------*/

import Ranking from "./components/sideBar/Ranking";

/* -------------------------------- //RANKING --------------------------------------------*/

/* -------------------------------- //SIDEBAR --------------------------------------------*/

function App() {
  const [cookiesToken, setCookiesToken] = React.useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    setCookiesToken(cookies.get("token"));
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        {cookiesToken && <SideBar />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/zone" element={<Zone />} />
            <Route path="/playervsnpc" element={<PlayerVsNPC />} />
            <Route path="/pvebattle" element={<PvEBattle />} />
            <Route path="/playervsplayer" element={<PlayerVsPlayer />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
