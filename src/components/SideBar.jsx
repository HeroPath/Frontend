import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">IMG</div>

      <button className="btn btn-dark m-3" type="submit">
        <a href="/map" className="links">
          Map
        </a>
      </button>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          Arena
        </a>
      </button>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          Shop
        </a>
      </button>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          Quests
        </a>
      </button>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          Dungeon
        </a>
      </button>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          Guild
        </a>
      </button>
      <button className="btn btn-dark m-3" type="submit">
        <a href="/playervsnpc" className="links">
          Ranking
        </a>
      </button>
      <button className="btn btn-dark m-3 mb-5" type="submit">
        <a href="/profile" className="links">
          Home
        </a>
      </button>
      <button className="btn btn-danger m-3" type="submit">
        <a href="/" className="links">
          Log Out
        </a>
      </button>
    </div>
  );
};

export default SideBar;
