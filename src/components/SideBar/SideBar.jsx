import "./sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">
        <a href="https://github.com/HeroPath" target="_blank">
          <img src={require("../../img/logo.webp")} alt="Logo" width="130px" height="130px" />
        </a>
      </div>

      <a href="/profile" className="button--sidebar button--links">
        Home
      </a>
      <a href="/zone" className="button--sidebar button--links">
        Maps
      </a>
      <a href="/playervsplayer" className="button--sidebar button--links">
        Arena
      </a>
      <a href="/shop" className="button--sidebar button--links">
        Shop
      </a>
      <a href="/quest" className="button--sidebar button--links">
        Quests
      </a>
      <a href="/guild" className="button--sidebar button--links">
        Guild
      </a>
      <a href="/ranking" className="button--sidebar button--links">
        Ranking
      </a>
      <a href="/mail" className="button--sidebar button--links">
        Mail
      </a>
      <a href="#" className="button--sidebar button--links">
        (Coming soon)
      </a>
      <a href="#" className="button--sidebar button--links">
        (Coming soon)
      </a>

      <a href="/" className="button--sidebar button--links">
        Log Out
      </a>
    </div>
  );
};

export default SideBar;
