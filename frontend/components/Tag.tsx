import Link from "next/link";

export default function Tag({ title, link }: { title: string; link: string }) {
  return (
    <Link href={link} className="bg-[--gray] text-[--white] rounded-md px-3 py-1 hover:bg-[--white] hover:text-[--gray]">
      <span>{title}</span>
    </Link>
  );
}
