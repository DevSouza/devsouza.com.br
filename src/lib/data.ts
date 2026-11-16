import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

/** Lê arquivos YAML de /data. Edite esses arquivos para atualizar o site. */
function load<T>(name: string, fallback: T): T {
  const file = path.join(process.cwd(), "data", `${name}.yaml`);
  if (!fs.existsSync(file)) return fallback;
  return (YAML.parse(fs.readFileSync(file, "utf8")) as T) ?? fallback;
}

export type Link = { label: string; url: string };

export type Profile = {
  name: string;
  role: string;
  location?: string;
  avatar?: string;
  headline: string;
  about: string; // markdown
  email?: string;
  available?: boolean;
  socials: Link[];
  skills: { group: string; items: string[] }[];
};

export type Project = {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  year?: number;
  featured?: boolean;
  status?: string;
  links?: Link[];
};

export type BookStatus = "lendo" | "lido" | "quero-ler";

export type Book = {
  title: string;
  author: string;
  cover?: string;
  status: BookStatus;
  year?: number;
  rating?: number;
  review?: string;
  url?: string;
};

export type Experience = {
  company: string;
  role: string;
  start: string; // AAAA-MM
  end?: string; // vazio = atual
  location?: string;
  description: string;
  stack?: string[];
  url?: string;
};

export type Education = {
  institution: string;
  degree: string;
  start: string;
  end?: string;
  description?: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date: string; // AAAA-MM
  hours?: number;
  url?: string;
  credentialId?: string;
  tags?: string[];
};

export const getProfile = () => load<Profile>("profile", {} as Profile);
export const getProjects = () => load<Project[]>("projects", []);
export const getBooks = () => load<Book[]>("books", []);
export const getExperience = () => load<Experience[]>("experience", []);
export const getEducation = () => load<Education[]>("education", []);
export const getCertificates = () =>
  load<Certificate[]>("certificates", []).sort((a, b) => String(b.date).localeCompare(String(a.date)));

export function formatMonth(s: string) {
  const [y, m] = String(s).split("-");
  if (!m) return y;
  return new Date(Date.UTC(+y, +m - 1, 1)).toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const formatPeriod = (start: string, end?: string) =>
  `${formatMonth(start)} — ${end ? formatMonth(end) : "atual"}`;
