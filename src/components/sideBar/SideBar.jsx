import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">IMG</div>

      <a href="/profile" className="button--links links m-3">
        Home
      </a>
      <a href="/zone" className="button--links links m-3">
        Maps
      </a>
      <a href="/playervsplayer" className="button--links links m-3" disabled>
        Arena
      </a>
      <a href="/shop" className="button--links links m-3">
        Shop
      </a>
      <a href="/quest" className="button--links links m-3">
        Quests
      </a>
      <a href="#" className="button--links links m-3">
        Dungeon (soon)
      </a>
      <a href="#" className="button--links links m-3">
        Profile (soon)
      </a>
      <a href="/ranking" className="button--links links m-3 mb-5">
        Ranking
      </a>

      <a href="/" className="button--links links btn btn-danger m-3">
        Log Out
      </a>
    </div>
  );
};

export default SideBar;
