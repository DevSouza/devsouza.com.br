import type { Metadata } from "next";
import {
  formatMonth,
  formatPeriod,
  getCertificates,
  getEducation,
  getExperience,
} from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { AwardIcon, BriefcaseIcon, ExternalIcon, GraduationIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Carreira",
  description: "Experiência profissional, formação acadêmica e certificados.",
  alternates: { canonical: "/carreira" },
};

function Heading({ id, icon, title }: { id: string; icon: React.ReactNode; title: string }) {
  return (
    <h2 id={id} className="mb-8 flex scroll-mt-24 items-center gap-3 text-2xl font-bold sm:text-3xl">
      <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2 text-fg">{icon}</span>
      {title}
    </h2>
  );
}

export default function CareerPage() {
  const experience = getExperience();
  const education = getEducation();
  const certificates = getCertificates();

  return (
    <>
      <PageHeader
        eyebrow="Currículo"
        title="Carreira"
        description="Por onde passei, o que estudei e o que continuo aprendendo."
      >
        <nav aria-label="Seções" className="mt-6 flex flex-wrap gap-2">
          {[
            ["#experiencia", "Experiência"],
            ["#formacao", "Formação"],
            ["#certificados", "Certificados"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="chip px-3.5 py-1.5 text-sm transition hover:border-accent hover:text-accent">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* Experiência */}
      <section className="mb-20">
        <Heading id="experiencia" icon={<BriefcaseIcon />} title="Experiência" />
        <ol className="relative space-y-8 border-l-2 border-border pl-6 sm:pl-8">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.start}`} className="relative">
              <span
                className={`absolute -left-[33px] top-1.5 size-4 rounded-full border-4 border-bg sm:-left-[41px] ${
                  !job.end ? "bg-accent ring-4 ring-accent/20" : "bg-border"
                }`}
                aria-hidden
              />
              <div className="card p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-bold">{job.role}</h3>
                  <span className="font-mono text-xs text-muted">{formatPeriod(job.start, job.end)}</span>
                </div>
                <p className="mt-0.5 font-medium text-accent">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  {job.location && <span className="font-normal text-muted"> · {job.location}</span>}
                </p>
                <p className="mt-3 whitespace-pre-line text-muted">{job.description}</p>
                {!!job.stack?.length && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {i === 0 && !job.end && <span className="sr-only">(emprego atual)</span>}
            </li>
          ))}
        </ol>
      </section>

      {/* Formação */}
      <section className="mb-20">
        <Heading id="formacao" icon={<GraduationIcon />} title="Formação acadêmica" />
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((ed) => (
            <article key={`${ed.institution}-${ed.degree}`} className="card p-5 sm:p-6">
              <span className="font-mono text-xs text-muted">{formatPeriod(ed.start, ed.end)}</span>
              <h3 className="mt-2 text-lg font-bold">{ed.degree}</h3>
              <p className="font-medium text-accent">{ed.institution}</p>
              {ed.description && <p className="mt-3 text-sm text-muted">{ed.description}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Certificados */}
      <section>
        <Heading id="certificados" icon={<AwardIcon />} title="Certificados" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => {
            const content = (
              <>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold leading-snug">{c.name}</h3>
                  {c.url && <ExternalIcon width={16} height={16} className="mt-1 shrink-0 text-muted" />}
                </div>
                <p className="mt-1 text-sm text-accent">{c.issuer}</p>
                <p className="mt-auto pt-3 font-mono text-xs text-muted">
                  {formatMonth(c.date)}
                  {c.hours ? ` · ${c.hours}h` : ""}
                  {c.credentialId ? ` · ID ${c.credentialId}` : ""}
                </p>
              </>
            );
            return c.url ? (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex flex-col p-5"
              >
                {content}
              </a>
            ) : (
              <div key={c.name} className="card flex flex-col p-5">
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
