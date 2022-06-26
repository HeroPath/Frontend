import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">IMG</div>

      <a href="/home" className="button--links links m-3">
        Home
      </a>
      <a href="/zone" className="button--links links m-3">
        Maps
      </a>
      <a href="/playervsplayer" className="button--links links m-3">
        Arena
      </a>
      <a href="/playervsplayer" className="button--links links m-3">
        Shop
      </a>
      <a href="/playervsplayer" className="button--links links m-3">
        Quests
      </a>
      <a href="/playervsplayer" className="button--links links m-3">
        Dungeon
      </a>
      <a href="/profile" className="button--links links m-3">
        Profile
      </a>
      <a href="/profile" className="button--links links m-3 mb-5">
        Ranking
      </a>
      <a href="/" className="button--links links btn btn-danger m-3">
        Log Out
      </a>
    </div>
  );
};

export default SideBar;
