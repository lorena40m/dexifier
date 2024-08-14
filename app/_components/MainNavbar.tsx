"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import logo from "@/public/assets/logo.png";

const MainNavbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Example navigation links
  const navLinks = [
    { text: "Support", path: "/support" },
    { text: "Docs", path: "https://docs.dexifier.com/" },
    { text: "About Us", path: "/about" },
  ];

  useEffect(() => {}, []);

  return (
    <nav
      className={`w-screen fixed z-20 transition ${
        isScrolled ? "bg-black" : ""
      }`}
      style={{ transitionDuration: "250ms" }}
    >
      <div className={`max-w-[86rem] mx-auto px-2 sm:px-6 lg:px-8 pt-12 pb-4 `}>
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Logo (hidden on small screens) */}
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  className="block md:hidden "
                  src="/assets/logo.png"
                  alt="Logo"
                  width={142.5}
                  height={32}
                />
                <Image
                  className="hidden md:block "
                  src="/assets/logo.png"
                  alt="Logo"
                  width={285}
                  height={64}
                />
              </Link>
            </div>
          </div>
          {/* Navigation links */}
          <div className={`hidden md:flex md:space-x-5`}>
            <div className="flex space-x-5">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  target={link.text === "Docs" ? "_blank" : ""}
                  className={`${
                    pathname === link.path
                      ? "text-primary font-bold"
                      : "text-white hover:text-primary"
                  } block px-3 py-2 rounded-md text-[1.375rem] transition-colors duration-300`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown animation */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-[6rem] bg-black inset-x-0 bg-gray-100 z-10`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="main-menu"
      >
        <div className="flex flex-col space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`${
                pathname === link.path
                  ? "bg-blue-50 text-primary font-bold"
                  : "hover:bg-blue-50 hover:text-blue-500 text-gray-900"
              } block px-3 py-2 rounded-md text-[22px] font-medium`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
