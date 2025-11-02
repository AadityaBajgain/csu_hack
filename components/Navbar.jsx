import Link from "next/link";
import React from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-800 backdrop-blur ">
      <nav className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30">
            H
          </div>
          <div className="leading-tight">
            <p className="text-base font-semibold text-white">HERB</p>
            <p className="text-xs text-muted">Your health AI buddy</p>
          </div>
        </Link>


        <Link href="/map" className="btn-primary">
          Find nearby care
        </Link>
      </nav>
    </header>
  );
};
export default Navbar;
