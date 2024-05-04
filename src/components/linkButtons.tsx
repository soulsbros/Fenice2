import Link from "next/link";

interface LinkItem {
  name: string;
  url: string;
}

interface LinkButtonsProps {
  links: LinkItem[];
  selected: string;
}

export default function LinkButtons({
  links,
  selected,
}: Readonly<LinkButtonsProps>) {
  return links.map((link) => {
    const linkName = link.url.split("/");
    return (
      <Link
        href={link.url}
        key={link.name}
        className={`${selected === linkName[linkName.length - 1] ? "secondary" : "primary"} button`}
      >
        {link.name}
      </Link>
    );
  });
}
