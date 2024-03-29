import "./app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/User/Profile";
import SideBar from "./components/SideBar/SideBar";
import Zone from "./components/PvE/Zone";
import PlayerVsNPC from "./components/PvE/PlayerVsNPC";
import PvEBattle from "./components/PvE/PvEBattle";
import PlayerVsPlayer from "./components/PvP/PlayerVsPlayer";
import Shop from "./components/Shop/Shop";
import Ranking from "./components/Ranking/Ranking";
import Quests from "./components/Quests/Quests";
import Guild from "./components/Guild/Guild";
import PvPBattle from "./components/PvP/PvPBattle";
import Mail from "./components/Mail/Mail";
import Market from "./components/Market/Market";

function App() {
  const [cookiesToken, setCookiesToken] = useState(null);

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
            <Route path="/market" element={<Market />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
