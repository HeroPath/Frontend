import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PlayerVsNPC from "./components/PlayerVsNPC";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/playervsnpc" element={<PlayerVsNPC />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
