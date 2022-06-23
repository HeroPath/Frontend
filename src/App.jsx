import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PlayerVsNPC from "./components/PlayerVsNPC";
import SideBar from "./components/SideBar";
import Map from "./components/Map";

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
            <Route path="/map" element={<Map />} />
            <Route path="/playervsnpc" element={<PlayerVsNPC />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
