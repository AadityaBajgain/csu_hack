import Link from "next/link";
import React from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30">
            H
          </div>
          <div className="leading-tight">
            <p className="text-base font-semibold text-white">Herb</p>
            <p className="text-xs text-muted">Your health AI buddy</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-muted transition-colors duration-200 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/map" className="btn-primary">
          Find nearby care
        </Link>
      </div>
    </header>
  );
};
export default Navbar;
