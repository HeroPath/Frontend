import React from "react";

import "../styles/styles.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">
        <img src={require("../img/logo.png")} width="75px" height="75px" />
      </div>

      <a href="/profile" className="button--links links m-3">
        Home
      </a>
      <a href="/zone" className="button--links links m-3">
        Maps
      </a>
      <a href="/playervsplayer" className="button--links links m-3">
        Arena
      </a>
      <a href="/shop" className="button--links links m-3">
        Shop
      </a>
      <a href="/quest" className="button--links links m-3">
        Quests
      </a>
      <a href="/guild" className="button--links links m-3">
        Guild
      </a>
      <a href="/ranking" className="button--links links m-3">
        Ranking
      </a>
      <a href="#" className="button--links links m-3 mb-5">
        Dungeon (soon)
      </a>
      <a href="/" className="button--links links btn btn-danger m-3">
        Log Out
      </a>
    </div>
  );
};

export default SideBar;
