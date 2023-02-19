import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/userProfile/Profile";
import SideBar from "./components/sideBar/SideBar";
import Zone from "./components/sideBar/PvE/Zone";
import PlayerVsNPC from "./components/sideBar/PvE/PlayerVsNPC";
import PvEBattle from "./components/sideBar/PvE/PvEBattle";
import PlayerVsPlayer from "./components/sideBar/PvP/PlayerVsPlayer";
import Shop from "./components/sideBar/Shop/Shop";
import Ranking from "./components/sideBar/Ranking/Ranking";
import Quests from "./components/sideBar/Quests/Quests";
import Guild from "./components/sideBar/Guild/Guild";
import PvPBattle from "./components/sideBar/PvP/PvPBattle";
import Mail from "./components/sideBar/Mail/Mail";

function App() {
  const [cookiesToken, setCookiesToken] = React.useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    setCookiesToken(cookies.get("token"));
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
        }}
      >
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
            <Route path="/pvpbattle" element={<PvPBattle />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/quest" element={<Quests />} />
            <Route path="/guild" element={<Guild />} />
            <Route path="/mail" element={<Mail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
