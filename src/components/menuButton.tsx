"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "react-feather";

export default function MenuButton() {
  const [isMenuClosed, setIsMenuClosed] = useState(true);
  // stupid way of re-rendering component on navigation
  const pathname = usePathname();

  function toggleMenu() {
    let divs = document.querySelectorAll("main > div");

    divs[0].classList.toggle("hidden");
    divs[1].classList.toggle("hidden");

    setIsMenuClosed(!isMenuClosed);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsMenuClosed(
      document.querySelector("#menuPanel")?.classList.contains("hidden") ?? true
    );
  });

  return (
    <div className="sm:hidden">
      {isMenuClosed ? (
        <Menu onClick={toggleMenu} />
      ) : (
        <X onClick={toggleMenu} />
      )}
    </div>
  );
}
