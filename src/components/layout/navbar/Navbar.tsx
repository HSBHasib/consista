"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { HiOutlineBars3, HiOutlineCommandLine } from "react-icons/hi2";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { navLinks } from "@/data/landing.data";
import { motion } from "framer-motion";
import SmallNav from "./SmallNav";
import { handleSignOut } from "@/utils/signOut";

type Theme = "warm" | "light";

// ================================
// Theme Toggle
// ================================
export function ThemeToggle({
  theme,
  onToggle,
  mobile = false,
}: {
  theme: Theme;
  onToggle: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "warm" ? "light" : "warm"} mode`}
      className={`relative flex h-9 w-16 cursor-pointer items-center rounded-full border transition-colors duration-300 ${
        theme === "warm"
          ? "border-accent/60 bg-accent/20"
          : "border-fg/50 bg-fg/13"
      } ${mobile ? "mx-auto" : ""}`}
    >
      <span className="absolute left-1.5 text-[16px] leading-none">☀️</span>
      <span className="absolute right-1.5 text-[16px] leading-none">🌙</span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-[3px] h-[26px] w-[26px] rounded-full bg-surface shadow-md ${
          theme === "warm" ? "left-[3px]" : "left-[calc(100%-29px)]"
        }`}
      />
    </button>
  );
}

// ============================
// Theme Initialization
// ============================
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "warm";
  return (localStorage.getItem("consista-theme") as Theme) || "warm";
}

// ============================
// Main Navbar Component
// ============================
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const pathname = usePathname();
  
  // User Data
  const { data: session, isPending } = useSession(); 

  // User Role
  const role = (session?.user as unknown as { role?: string })?.role || "USER" || "ADMIN";
  const showDashboard = role === "USER" || role === "ADMIN";



  // ===============================
  // Theme toggle function
  // ===============================
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "warm" ? "light" : "warm";
      localStorage.setItem("consista-theme", next);
      return next;
    });
  }, []);

  // ===============================
  // Mobile Menu Effect
  // ===============================
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-parchment/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ============================ */}
        {/* Left: Logo + Brand */}
        {/* ============================ */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <HiOutlineCommandLine className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold tracking-tight text-fg">
            Consista
          </span>
        </Link>

        {/* ============================ */}
        {/* Desktop Navigation (hidden below lg) */}
        {/* ============================ */}
        <div className="hidden items-center gap-4 lg:flex">
          <ul className="flex items-center gap-2">
            {isPending
              ? Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <div className="h-9 w-20 rounded-xl bg-fg-soft animate-pulse" />
                  </li>
                ))
              : navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                          isActive
                            ? "text-fg font-semibold bg-accent/10"
                            : "text-muted hover:text-fg"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
            {!isPending && session && showDashboard && (
              <li>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    pathname === "/dashboard"
                      ? "text-fg font-semibold bg-accent/10"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Vertical Divider */}
          <span className="text-border">|</span>

          {/* ============================ */}
          {/* Desktop User Area */}
          {/* ============================ */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="h-9 w-20 rounded-xl bg-fg-soft animate-pulse" />
                <div className="h-9 w-24 rounded-xl bg-accent/20 animate-pulse" />
              </div>
            ) : session ? (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-fg hover:bg-muted/13 transition-colors duration-100 rounded-xl cursor-pointer"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-fg hover:bg-muted/13 transition-colors duration-100 rounded-xl"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    variant="primary"
                    className="bg-accent/90 text-white rounded-xl"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Controls (hidden lg+) */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-fg-soft hover:text-fg cursor-pointer"
            aria-label="Open Menu"
          >
            <HiOutlineBars3 className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* ============================ */}
      {/* Mobile Drawer */}
      {/* ============================ */}
      <SmallNav
        mobileOpen={mobileOpen}
        closeMobile={closeMobile}
        session={!!session}
        pathname={pathname}
        theme={theme}
        toggleTheme={toggleTheme}
        showDashboard={showDashboard}
      />
    </header>
  );
}
