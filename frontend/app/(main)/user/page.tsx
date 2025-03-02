import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ userAt: string }> }) {
  redirect("/profile");
}
