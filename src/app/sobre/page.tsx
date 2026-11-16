import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRightIcon, SocialIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem sou eu, o que faço e com quais tecnologias trabalho.",
  alternates: { canonical: "/sobre" },
};

export default async function AboutPage() {
  const profile = getProfile();
  const about = await renderMarkdown(profile.about ?? "");

  return (
    <>
      <PageHeader eyebrow="Sobre mim" title={profile.name} description={profile.role} />

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <div className="prose-post" dangerouslySetInnerHTML={{ __html: about }} />

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {profile.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar}
              alt={profile.name}
              className="hidden aspect-square w-full rounded-3xl border border-border object-cover lg:block"
            />
          )}
          <div className="card p-5">
            <p className="mb-3 text-sm font-semibold">Contato e redes</p>
            <ul className="space-y-1">
              {profile.socials?.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me" data-track={s.label} data-track-local="sobre"
                    className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-fg"
                  >
                    <SocialIcon name={s.label} width={18} height={18} /> {s.label}
                  </a>
                </li>
              ))}
              {profile.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`} data-track="Contato (e-mail)" data-track-local="sobre"
                    className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-fg"
                  >
                    <SocialIcon name="email" width={18} height={18} /> E-mail
                  </a>
                </li>
              )}
            </ul>
          </div>
          <Link
            href="/carreira"
            className="btn-primary w-full justify-between rounded-2xl p-5"
          >
            Ver experiência e formação <ArrowRightIcon />
          </Link>
        </aside>
      </div>

      {!!profile.skills?.length && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Stack & habilidades</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.skills.map((g) => (
              <div key={g.group} className="card p-5">
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-lg bg-surface-2 px-2.5 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
