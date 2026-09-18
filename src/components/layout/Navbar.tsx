"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineCommandLine } from "react-icons/hi2";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { MotionDiv } from "@/components/motion/Motion-div";
import { navLinks } from "@/data/landing.data";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-parchment/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-8 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <HiOutlineCommandLine className="h-5 w-5 text-accent" />
          <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-fg">
            Consista
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <Link href="/dashboard">
              <Button
                variant="primary"
                className="bg-accent text-white"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-fg">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" className="bg-accent text-white">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="p-2 text-fg md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <HiOutlineXMark className="h-5 w-5" /> : <HiOutlineBars3 className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="border-t border-border bg-parchment px-8 pb-4 pt-2 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-fg-soft hover:text-fg"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-fg-soft hover:text-fg"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            {session ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" className="w-full bg-accent text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full text-fg">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full bg-accent text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </MotionDiv>
      )}
    </header>
  );
}
