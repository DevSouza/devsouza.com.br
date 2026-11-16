import type { Metadata } from "next";
import { getBooks, type Book, type BookStatus } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { StarIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Livros",
  description: "Livros que li, estou lendo e quero ler.",
  alternates: { canonical: "/livros" },
};

const sections: { status: BookStatus; title: string }[] = [
  { status: "lendo", title: "Lendo agora" },
  { status: "lido", title: "Já li" },
  { status: "quero-ler", title: "Quero ler" },
];

function Rating({ value }: { value: number }) {
  return (
    <div className="flex text-fg" aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} width={14} height={14} filled={i < value} />
      ))}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const Wrapper = book.url ? "a" : "div";
  return (
    <Wrapper
      {...(book.url ? { href: book.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card card-hover group flex gap-4 p-4"
    >
      <div className="aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-2 shadow-md sm:w-24">
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.cover} alt={`Capa de ${book.title}`} loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="relative grid size-full place-items-center bg-surface-2 text-muted" aria-hidden>
            <span className="absolute inset-y-0 left-2 w-px bg-border" />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
              <path d="M8 7h8M8 11h6" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-display font-bold leading-snug transition group-hover:text-accent">{book.title}</h3>
        <p className="text-sm text-muted">{book.author}</p>
        <div className="mt-1 flex items-center gap-3">
          {book.rating ? <Rating value={book.rating} /> : null}
          {book.year && <span className="font-mono text-xs text-muted">{book.year}</span>}
        </div>
        {book.review && <p className="mt-2 line-clamp-4 text-sm text-muted">“{book.review}”</p>}
      </div>
    </Wrapper>
  );
}

export default function BooksPage() {
  const books = getBooks();
  const read = books.filter((b) => b.status === "lido").length;

  return (
    <>
      <PageHeader
        eyebrow={`${read} livros lidos`}
        title="Estante"
        description="Livros que moldaram minha forma de pensar, programar e trabalhar."
      />
      {sections.map((s) => {
        const list = books
          .filter((b) => b.status === s.status)
          .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        if (!list.length) return null;
        return (
          <section key={s.status} className="mb-12">
            <h2 className="mb-5 text-2xl font-bold">
              {s.title} <span className="font-sans text-base font-normal text-muted">({list.length})</span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {list.map((b) => (
                <BookCard key={b.title} book={b} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
