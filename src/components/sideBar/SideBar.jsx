const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">
        <img src={require("../../img/logo.webp")} width="130px" height="130px" />
      </div>

      <a href="/profile" className="button--links links button--sidebar">
        Home
      </a>
      <a href="/zone" className="button--links links button--sidebar">
        Maps
      </a>
      <a href="/playervsplayer" className="button--links links button--sidebar">
        Arena
      </a>
      <a href="/shop" className="button--links links button--sidebar">
        Shop
      </a>
      <a href="/quest" className="button--links links button--sidebar">
        Quests
      </a>
      <a href="/guild" className="button--links links button--sidebar">
        Guild
      </a>
      <a href="/ranking" className="button--links links button--sidebar">
        Ranking
      </a>
      <a href="/mail" className="button--links links button--sidebar">
        Mail
      </a>
      <a href="#" className="button--links links button--sidebar">
        (Coming soon)
      </a>
      <a href="#" className="button--links links button--sidebar">
        (Coming soon)
      </a>

      <a href="/" className="button--links links button--sidebar">
        Log Out
      </a>
    </div>
  );
};

export default SideBar;
