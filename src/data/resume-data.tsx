import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Andre Souza",
  initials: "AS",
  location: "Rio de Janeiro, Brasil, GMT-3",
  locationLink: "https://www.google.com/maps/place/Rio+de+Janeiro",
  about: "Sou um programador completamente apaixonado pelo que faço.",
  summary:"Sou um programador fullstack com 8 anos de experiência, apaixonado por criar soluções inovadoras e eficientes. Tenho envolvimento direto com programação, design e prototipação. Acredito na importância da colaboração e na entrega de código limpo e escalável. Fora do trabalho, gosto de explorar novas tecnologias e me manter atualizado com as tendências do setor. Estou sempre pronto para enfrentar novos desafios e transformar ideias em realidade.",
  avatarUrl: "https://github.com/devsouza.png",
  personalWebsiteUrl: "https://devsouza.com.br",
  contact: {
    email: "devsouza01@gmail.com",
    tel: "+55 21 99606-3947",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/devsouza",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/devsouza/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/devsouza01",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Estácio",
      degree: "Graduação, Analise e desenvolvimento de Sistemas",
      start: "2020",
      end: "2022",
    },
  ],
  certificates: [
    {
      school: "Udemy",
      name: "Modelagem de Dados UML (Análise&Projeto Orientado a Objetos)",
      start: "2024",
      end: "2024",
    },
    {
      school: "Udemy",
      name: "RabbitMQ na Prática",
      start: "2024",
      end: "2024",
    },
    {
      school: "Udemy",
      name: "Testes com JUnit5 Mockito e Spring Boot",
      start: "2024",
      end: "2024",
    },
    {
      school: "Decoder",
      name: "Decoder Project",
      start: "2022",
      end: "2022",
    },
  ],
  work: [
    {
      company: "Franquias Odonto-Vida",
      link: "#",
      badges: ["Presencial"],
      title: "Programador",
      logo: ConsultlyLogo,
      start: "2016",
      end: null,
      description:
        "Atuei diretamente no desenvolvimento e na migração de sistemas legados, realizando análises detalhadas, refatoração de código e integração de novos recursos para garantir a continuidade e a modernização das aplicações existentes. Participei ativamente no ciclo completo de desenvolvimento de software, incluindo a programação, o design de arquitetura e a prototipação de soluções. Desenvolvi interfaces e funcionalidades com base nas necessidades dos usuários e nas melhores práticas de design. Fui responsável pelo desenvolvimento de serviços distribuídos, aplicando princípios de design de microservices e garantindo a escalabilidade e a eficiência das soluções implementadas. Isso incluiu a criação de APIs, a implementação de mensagens assíncronas e a integração com sistemas externos.",
    },
  ],
  skills: [
    "Java",
    "Spring",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "Git",
    "Github",
    "TDD",
    "BDD",
    "RESTful"
  ],
  projects: [
    {
      title: "Decode Project",
      techStack: [
        "Backend Developer",
        "Java",
        "Spring",
        "RabbitMQ",
        "Microservice",
        "PostgreSQL",
        "RESTful",
      ],
      description:
        "Projeto desenvolvido no curso Decode Project",
      logo: ParabolLogo,
      link: {
        label: "github.com",
        href: "https://github.com/DevSouza/decode-project",
      },
    },
    {
      title: "Clone - tabnews.com.br",
      techStack: [
        "Fullstack Developer",
        "JavaScript",
        "PostgreSQL",
        "BDD",
        "TDD",
        "React",
        "Next.js",
        "Docker",
      ],
      description:
        "Projeto desenvolvido no curso.dev",
      logo: ParabolLogo,
      link: {
        label: "github.com",
        href: "https://github.com/DevSouza/clone-tabnews",
      },
    }
  ],
} as const;
