import Link from "next/link";

interface LinkItem {
  name: string;
  url: string;
}

interface Props {
  links: LinkItem[];
  selected: string;
}

export default function LinkButtons({ links, selected }: Readonly<Props>) {
  return links.map((link) => {
    const linkName = link.url.split("/");
    return (
      <Link
        href={link.url}
        key={link.name}
        className={`${selected === linkName[linkName.length - 1] ? "active" : ""} primary button`}
      >
        {link.name}
      </Link>
    );
  });
}
