import Sidebar from "@/components/Sidebar";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <section className="w-full max-h-dvh overflow-y-scroll bg-[--gray] p-10">{children}</section>
    </div>
  );
}
