"use client";

import Link from "next/link";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./Navbar";
import { navLinks } from "@/data/landing.data";

interface SmallNavProps {
  mobileOpen: boolean;
  closeMobile: () => void;
  session: boolean;
  pathname: string;
  theme: "warm" | "light";
  toggleTheme: () => void;
}

const SmallNav = ({
  mobileOpen,
  closeMobile,
  session,
  pathname,
  theme,
  toggleTheme,
}: SmallNavProps) => {
  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
          />

          {/* Drawer Panel - slides from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-72 flex-col justify-between border-l border-border bg-[#F8F0EA]/80 p-6 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {/* Drawer Header */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                <span className="text-lg font-semibold tracking-wide text-fg">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-fg-soft hover:text-fg cursor-pointer"
                  aria-label="Close Menu"
                >
                  <HiOutlineXMark className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links - large touch targets */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={`w-full rounded-xl px-5 py-3.5 text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "text-fg font-semibold bg-accent/10"
                          : "text-muted hover:bg-accent/10 hover:text-fg"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {session && (
                  <Link
                    href="/dashboard"
                    onClick={closeMobile}
                    className={`w-full rounded-xl px-5 py-3.5 text-base font-medium transition-all duration-200 ${
                      pathname === "/dashboard"
                        ? "text-fg font-semibold bg-accent/10"
                        : "text-muted hover:bg-accent/10 hover:text-fg"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom: Theme Toggle + Auth Actions */}
            <div className="flex flex-col gap-3">
              <div className="my-2 h-px w-full bg-border" />

              <ThemeToggle theme={theme} onToggle={toggleTheme} mobile />

              {session ? (
                <Link href="/dashboard" onClick={closeMobile}>
                  <Button
                    variant="primary"
                    className="w-full bg-accent text-white rounded-lg"
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signin" onClick={closeMobile}>
                    <Button
                      variant="ghost"
                      className="w-full bg-muted/13 hover:bg-muted/18 transition-colors duration-100 rounded-xl"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeMobile}>
                    <Button
                      variant="primary"
                      className="w-full bg-accent text-white rounded-xl"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SmallNav;
