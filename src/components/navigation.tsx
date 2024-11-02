import { defaultEdition } from "@/lib/utils";
import {
  Archive,
  Calendar,
  File,
  Home,
  List,
  Map,
  Users,
  Volume2,
  Zap,
} from "react-feather";
import SidebarLink, { TopbarLink } from "./sidebarLink";

export function Sidebar() {
  return (
    <div id="menuPanel" className="flex min-w-fit flex-col mr-5 hidden">
      <SidebarLink name="Home" href="/" icon={<Home />} />

      <SidebarLink name="Characters" href="/characters" icon={<Users />} />
      <SidebarLink name="Calendar" href="/calendar" icon={<Calendar />} />
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
      <SidebarLink name="Stats" href="/campaigns" icon={<Archive />} />
    </div>
  );
}

export function Topbar() {
  return (
    <div className="hidden lg:inline-block">
      <TopbarLink name="Chars" href="/characters" icon={<Users />} />
      <TopbarLink name="Cal" href="/calendar" icon={<Calendar />} />
      <TopbarLink
        name="Docs"
        href={`/documents/${defaultEdition}`}
        icon={<File />}
      />
      <TopbarLink name="Init" href="/initiative" icon={<List />} />
      <TopbarLink name="Map" href="/map" icon={<Map />} />
      <TopbarLink
        name="Skills"
        href={`/skills/${defaultEdition}`}
        icon={<Zap />}
      />
      <TopbarLink name="Sounds" href="/sounds" icon={<Volume2 />} />
      <TopbarLink name="Stats" href="/campaigns" icon={<Archive />} />
    </div>
  );
}
