import Breadcrumbs from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 max-h-dvh overflow-y-scroll bg-[--gray] p-10">
        <Breadcrumbs />
        <section className="">{children}</section>
      </div>
    </div>
  );
}
