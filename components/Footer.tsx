import { BadgeCheck, Github, Linkedin } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";

const iconMap = {
  github: Github,
  linkedin: Linkedin
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-[rgb(var(--foreground))]">{profile.name}</p>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">{profile.role}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[rgb(var(--muted))]">
            <BadgeCheck size={16} className="text-cyan-electric" />
            Built with Next.js
          </span>
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[rgb(var(--muted))] transition-colors hover:border-cyan-electric/50 hover:text-cyan-electric"
                aria-label={link.label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
