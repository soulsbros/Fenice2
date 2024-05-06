import contactLogo from "@/img/icon_contact.png";
import githubLogo from "@/img/icon_github.png";
import { defaultEdition } from "@/lib/skills";
import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  Calendar,
  File,
  Home,
  List,
  Map,
  Octagon,
  SkipBack,
  Users,
  Zap,
} from "react-feather";
import SidebarLink from "./sidebarLink";

export default function Sidebar() {
  return (
    <div
      id="menuPanel"
      className="min-w-fit flex-col justify-between hidden sm:flex"
    >
      <div>
        <SidebarLink name="Home" path="/" icon={<Home />} />
        <SidebarLink name="Alignment" path="/alignment" icon={<Octagon />} />
        <SidebarLink name="Calendar" path="/calendar" icon={<Calendar />} />
        <SidebarLink name="Campaigns" path="/campaigns" icon={<Archive />} />
        <SidebarLink name="Characters" path="/characters" icon={<Users />} />
        <SidebarLink
          name="Documents"
          path={`/documents/${defaultEdition}`}
          icon={<File />}
        />
        <SidebarLink name="Initiative" path="/initiative" icon={<List />} />
        <SidebarLink name="Map" path="/map" icon={<Map />} />
        <SidebarLink name="NPCs" path="/npcs" icon={<Users />} />
        <SidebarLink
          name="Skills"
          path={`/skills/${defaultEdition}`}
          icon={<Zap />}
        />
        {/* <SidebarLink name="Table" path="/table" icon={<Grid />} /> */}
        <SidebarLink
          name="Old site &#x2197;"
          path="https://lafenice.soulsbros.ch"
          icon={<SkipBack />}
        />
      </div>

      <div className="flex space-x-2 p-4 items-center">
        <p>&copy;{new Date().getFullYear()} Soulsbros</p>
        <Link
          href="https://github.com/soulsbros"
          target="_blank"
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
