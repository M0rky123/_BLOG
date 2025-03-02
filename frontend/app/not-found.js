import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Tato stránka nebyla nalezena </h2>

      <div>
        <Link href="/" className="underline">
          Vrátit domů
        </Link>
      </div>
    </div>
  );
}
