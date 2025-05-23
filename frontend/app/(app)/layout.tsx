import Breadcrumbs from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full max-w-[1920px] mx-auto outline outline-[--light-gray]">
      <Sidebar />
      <div className="flex-1 relative flex flex-col max-h-dvh overflow-y-scroll overflow-x-clip bg-[--gray] p-10">
        <Breadcrumbs />
        <section>{children}</section>
      </div>
    </div>
  );
}
