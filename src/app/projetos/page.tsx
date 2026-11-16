import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Portfólio de projetos pessoais e profissionais.",
  alternates: { canonical: "/projetos" },
};

export default function ProjectsPage() {
  const projects = [...getProjects()].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured) || (b.year ?? 0) - (a.year ?? 0),
  );
  return (
    <>
      <PageHeader
        eyebrow="Portfólio"
        title="Projetos"
        description="Sistemas que construí no trabalho e nos estudos, com o problema que resolvem e a stack de cada um."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </>
  );
}
