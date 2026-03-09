"use client";

import Link from "next/link";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import SearchInputWithKbd from "./search-input-with-kbd";
import ToggleButton from "./toggle-button";

type NavbarProps = {
  children: React.ReactNode;
}

export default function Navbar({children}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between gap-4">
      <Link href={"/"} className="flex items-center text-center gap-2">
        <ShoppingCartIcon className="text-black dark:text-white size-8 md:size-8" />
        <h1 className="font-bold text-xl hidden md:block">Tienda</h1>
      </Link>
      <div>
        <SearchInputWithKbd />
      </div>
      <div className="flex items-center gap-1">
        <ToggleButton />
        {children}
      </div>
    </nav>
  );
}
