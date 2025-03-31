import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl font-bold mb-4">Tato stránka nebyla nalezena </h2>

      <div>
        <Link href="/" className="underline">
          Vrátit domů
        </Link>
      </div>
    </div>
  );
}
