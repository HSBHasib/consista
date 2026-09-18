import Link from "next/link";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { footerColumns } from "@/data/landing.data";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border py-14 text-[13px] text-muted"
    >
      <div className="mx-auto max-w-295 px-8">
        {/* Responsive grid for mobile/tablet, shifting to flex-wrap on large screens */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between gap-10">
          
          {/* ============================= */}
          {/* Footer Left Column — Brand & Contact */}
          {/* ============================= */}
          <div className="sm:col-span-2 md:col-span-1 lg:max-w-xs">
            <Link href="/" className="mb-3 flex items-center gap-2">
              <HiOutlineCommandLine className="h-5 w-5 text-accent" />
              <span className="text-lg font-semibold tracking-tight text-fg">
                Consista
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A productivity and consistency tracking platform. Plan, act,
              measure, and improve — one day at a time.
            </p>

          </div>

          {/* ============================= */}
          {/* Footer Right Column — Data Links */}
          {/* ============================= */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs uppercase tracking-[0.06em] text-fg font-medium">
                {col.title}
              </p>
              <div className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className="mb-4 border-border" />
        <div className="flex flex-wrap justify-center items-center md:justify-between gap-3">
          <span>
            &copy; {new Date().getFullYear()} Consista. All rights reserved.
          </span>
          <span className="text-xs text-muted">
            Built for consistency & productivity.
          </span>
        </div>
      </div>
    </footer>
  );
}
