import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="font-display text-8xl font-bold text-muted">404</p>
        <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
        <p className="mt-2 text-muted">O link pode estar quebrado ou a página foi removida.</p>
        <Link
          href="/"
          className="btn-primary mt-8"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
