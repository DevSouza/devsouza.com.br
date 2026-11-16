import { siteConfig } from "@/site.config";
import { getProfile } from "@/lib/data";
import { RssIcon, SocialIcon } from "./Icons";

export function Footer() {
  const profile = getProfile();
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name ?? siteConfig.author}.
        </p>
        <ul className="flex flex-wrap items-center gap-2">
          {profile.socials?.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer me" data-track={s.label} data-track-local="rodapé"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-border text-muted transition hover:border-accent hover:text-accent"
              >
                <SocialIcon name={s.label} />
              </a>
            </li>
          ))}
          <li>
            <a
              href="/rss.xml"
              aria-label="Feed RSS"
              className="grid size-10 place-items-center rounded-full border border-border text-muted transition hover:border-fg/30 hover:text-fg"
            >
              <RssIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
