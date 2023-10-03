import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Home,
  Map,
  MapPin,
  Octagon,
  SkipBack,
  Users,
  Zap,
} from "react-feather";
import contactLogo from "../img/icon_contact.png";
import githubLogo from "../img/icon_github.png";
import SidebarLink from "./sidebarLink";

export default function Sidebar() {
  return (
    <div className="min-w-fit flex flex-col justify-between">
      <div>
        <SidebarLink
          name="Old site"
          path="https://lafenice.soulsbros.ch"
          icon={<SkipBack />}
        />
        <SidebarLink name="Home" path="/" icon={<Home />} />
        <SidebarLink name="Alignment" path="/" icon={<Octagon />} />
        <SidebarLink name="Characters" path="/" icon={<Users />} />
        <SidebarLink name="Skill checks" path="/" icon={<Zap />} />
        <SidebarLink name="Golarion map" path="/map" icon={<Map />} />
        <SidebarLink name="Calendar" path="/" icon={<Calendar />} />
        <SidebarLink name="Itinerary" path="/itinerary" icon={<MapPin />} />
      </div>

      <div className="flex space-x-2 p-4 items-center">
        <p>&copy;{new Date().getFullYear()} Soulsbros</p>
        <Link
          href="https://github.com/soulsbros"
          target="_blank"
          rel="noreferrer"
          className="hover:rotate-45 transition-all"
        >
          <Image src={githubLogo} width={32} alt="GitHub logo" />
        </Link>
        <Link
          href="https://soulsbros.ch/?p=contact"
          target="_blank"
          className="hover:rotate-45 transition-all"
        >
          <Image src={contactLogo} width={32} alt="Contact logo" />
        </Link>
      </div>
    </div>
  );
}
