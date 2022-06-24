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
import Zone from "./components/sideBar/Zone";
import PlayerVsNPC from "./components/sideBar/PlayerVsNPC";
/* -------------------------------- //MAP --------------------------------------------*/

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
            <Route path="/map" element={<Zone />} />
            <Route path="/playervsnpc" element={<PlayerVsNPC />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
