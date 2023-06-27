import "./sidebar.css";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/img/logo.webp";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar--logo">
        <a href="https://github.com/HeroPath" target="_blank">
          <Image src={logoImage} width={130} height={130} alt="Logo" />
        </a>
      </div>

      <Link href="/profile" className="button--sidebar button--links">
        Home
      </Link>

      <Link href="/zone" className="button--sidebar button--links">
        Maps
      </Link>

      <Link href="/playervsplayer" className="button--sidebar button--links">
        Arena
      </Link>

      <Link href="/shop" className="button--sidebar button--links">
        Shop
      </Link>

      <Link href="/quest" className="button--sidebar button--links">
        Quests
      </Link>

      <Link href="/guild" className="button--sidebar button--links">
        Guild
      </Link>

      <Link href="/ranking" className="button--sidebar button--links">
        Ranking
      </Link>

      <Link href="/mail" className="button--sidebar button--links">
        Mail
      </Link>

      <Link href="/market" className="button--sidebar button--links">
        Market
      </Link>

      <Link href="#" className="button--sidebar button--links">
        (Coming soon)
      </Link>

      <Link href="/" className="button--sidebar button--links">
        Log Out
      </Link>
    </div>
  );
};

export default SideBar;
