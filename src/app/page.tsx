import type { CSSProperties } from "react";
import Link from "next/link";
import { getCertificates, getExperience, getProfile, getProjects } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/site.config";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/PageHeader";
import { CountUp } from "@/components/CountUp";
import { ArrowRightIcon, MapPinIcon, SocialIcon } from "@/components/Icons";

/** Atraso da animação (em ms) via variável CSS --d */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function yearsOfExperience(starts: string[]) {
  const first = Math.min(...starts.map((s) => parseInt(String(s), 10)).filter(Boolean));
  return Number.isFinite(first) ? new Date().getFullYear() - first : 0;
}

export default function Home() {
  const profile = getProfile();
  const experience = getExperience();
  const certificates = getCertificates();
  const allProjects = getProjects();
  const projects = allProjects.filter((p) => p.featured).slice(0, 2);
  const posts = getAllPosts().slice(0, siteConfig.postsPerHomePage);
  const current = experience.find((e) => !e.end);
  const years = yearsOfExperience(experience.map((e) => e.start));
  // os 3 primeiros itens de cada grupo de habilidades (ordem definida em data/profile.yaml)
  const stack = profile.skills?.flatMap((g) => g.items.slice(0, 3)) ?? [];

  const stats = [
    { value: years, suffix: "+", label: "anos de experiência" },
    { value: allProjects.length, suffix: "", label: "projetos no portfólio" },
    { value: certificates.length, suffix: "", label: "certificações" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border pb-14 pt-8 sm:pb-20 sm:pt-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            {profile.available && (
              <p className="enter mb-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-fg-soft">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-600 dark:bg-green-500" />
                </span>
                Aberto a novas oportunidades
              </p>
            )}
            <h1 className="enter text-4xl font-bold leading-tight sm:text-6xl" style={delay(0)}>
              {profile.name}
            </h1>
            <p className="enter mt-2 font-display text-xl font-medium text-fg-soft sm:text-2xl" style={delay(100)}>
              {profile.role}
              {current && <span className="text-muted"> · {current.company}</span>}
            </p>
            <p className="enter mt-5 text-lg leading-relaxed text-fg-soft" style={delay(200)}>
              {profile.headline}
            </p>
            {profile.location && (
              <p className="enter mt-4 flex items-center gap-1.5 text-sm text-muted" style={delay(280)}>
                <MapPinIcon width={16} height={16} /> {profile.location}
              </p>
            )}

            <div className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(360)}>
              <Link href="/carreira" className="btn-primary group" data-track="Ver experiência" data-track-local="home">
                Ver experiência
                <ArrowRightIcon width={18} height={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn-secondary" data-track="Contato (e-mail)" data-track-local="home">
                  Entrar em contato
                </a>
              )}
              <div className="flex gap-2">
                {profile.socials?.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me" data-track={s.label} data-track-local="home"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-border text-fg-soft transition hover:-translate-y-0.5 hover:border-fg/30 hover:text-fg"
                  >
                    <SocialIcon name={s.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {profile.avatar && (
            <div className="enter order-first sm:order-none" style={delay(150)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.name}
                width={176}
                height={176}
                className="size-24 rounded-2xl border border-border object-cover shadow-sm transition duration-500 hover:-rotate-2 hover:scale-[1.03] hover:shadow-lg sm:size-44"
              />
            </div>
          )}
        </div>

        {/* Números */}
        <dl
          className="mt-12 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border"
          data-reveal
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end px-3 py-4 text-center sm:px-6 sm:py-5">
              <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
              <dd className="font-display text-2xl font-bold sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        {/* Stack */}
        {stack.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-muted" data-reveal>
              Principais tecnologias
            </p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((s, i) => (
                <li
                  key={s}
                  data-reveal
                  style={delay(i * 40)}
                  className="chip px-3 py-1 text-sm hover:border-fg/30 hover:text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Projetos */}
      {projects.length > 0 && (
        <section className="py-14">
          <div data-reveal>
            <SectionTitle
              title="Projetos em destaque"
              action={
                <Link href="/projetos" className="group inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Ver todos <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-1" />
                </Link>
              }
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <div key={p.name} data-reveal style={delay(i * 120)} className="flex [&>*]:w-full">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="border-t border-border pt-14">
        <div data-reveal>
          <SectionTitle
            title="Últimos artigos"
            action={
              <Link href="/blog" className="group inline-flex items-center gap-1 text-sm font-medium text-accent">
                Ver todos <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-1" />
              </Link>
            }
          />
        </div>
        {posts.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <div key={p.dir} data-reveal style={delay(i * 120)} className="flex [&>*]:w-full">
                <PostCard post={p} compact />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Nenhum artigo publicado ainda.</p>
        )}
      </section>
    </>
  );
}
