"use client";

import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Footer() {
  const { name, github, linkedin, twitter, email } = PORTFOLIO_DATA.personal;
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { href: github, label: "GitHub", icon: Github },
    { href: linkedin, label: "LinkedIn", icon: Linkedin },
    { href: twitter, label: "Twitter / X", icon: Twitter },
    { href: `mailto:${email}`, label: "Email", icon: Mail },
  ];

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-foreground/50">
          © {year} {name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-foreground/70 transition-colors hover:border-accent/40 hover:text-accent-light"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-foreground/70 transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <ArrowUp size={14} />
          Back to top
        </button>
      </div>
    </footer>
  );
}
