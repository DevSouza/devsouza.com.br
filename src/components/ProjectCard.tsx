import type { Project } from "@/lib/data";
import { ExternalIcon } from "./Icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      {/* Imagem só aparece se o projeto tiver uma (sem placeholders vazios) */}
      {project.image && (
        <div className="aspect-video overflow-hidden border-b border-border bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`Captura do projeto ${project.name}`}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {project.status && (
            <span className="rounded-md border border-border px-2 py-0.5 font-medium text-fg-soft">
              {project.status}
            </span>
          )}
          {project.year && <span className="font-mono">{project.year}</span>}
        </div>
        <h3 className="text-lg font-bold">{project.name}</h3>
        <p className="text-sm leading-relaxed text-fg-soft">{project.description}</p>
        {!!project.tags?.length && (
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {!!project.links?.length && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                {l.label} <ExternalIcon width={14} height={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
