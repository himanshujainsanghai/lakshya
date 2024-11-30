import Link from "next/link";
import Image from "next/image";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* left portion */}
      <div className="w-[14%] md:w-[8%] lg;w-[16%] xl:w-[14%]  p-4 ">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <span className="hidden lg:block p-2 mt-2 font-bold">Lakshya</span>
        </Link>

        <Menu></Menu>
      </div>

      {/* right portion */}
      <div className="w-[86%] md:w-[92%] lg;w-[84%] xl:w-[86%] bg-[#dfe7f8] overflow-y-scroll  flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
