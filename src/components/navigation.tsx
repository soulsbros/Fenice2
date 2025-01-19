import { defaultEdition } from "@/lib/utils";
import {
  Archive,
  Calendar,
  File,
  Globe,
  Home,
  List,
  Map,
  Users,
  Volume2,
  Zap,
} from "react-feather";
import SidebarLink from "./sidebarLink";

export function Sidebar() {
  return (
    <div
      id="menuPanel"
      className="flex min-w-fit flex-col mr-5 hidden lg:inline-block"
    >
      <SidebarLink name="Home" href="/" icon={<Home />} />
      <SidebarLink name="Calendar" href="/calendar" icon={<Calendar />} />
      <SidebarLink name="Campaigns" href="/campaigns" icon={<Archive />} />
      <SidebarLink name="Characters" href="/characters" icon={<Users />} />
      <SidebarLink
        name="Documents"
        href={`/documents/${defaultEdition}`}
        icon={<File />}
      />
      <SidebarLink name="Initiative" href="/initiative" icon={<List />} />
      <SidebarLink name="Map" href="/map" icon={<Map />} />
      <SidebarLink
        name="Skills"
        href={`/skills/${defaultEdition}`}
        icon={<Zap />}
      />
      <SidebarLink name="Soundboard" href="/sounds" icon={<Volume2 />} />
      <SidebarLink
        name="Old website"
        href="https://lafenice.soulsbros.ch"
        icon={<Globe />}
      />
    </div>
  );
}
