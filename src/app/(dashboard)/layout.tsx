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
    <div className="h-screen w-screen flex  flex-col overflow-hidden">
      {/* left portion */}
      {/* <div className="w-[14%] md:w-[8%] lg;w-[16%] xl:w-[14%]  p-4 ">
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
          <span className="hidden xl:block p-2 mt-2 font-bold">Lakshya</span>
        </Link>

        <Menu></Menu>
        
      </div> */}

      {/* right portion */}
      {/* <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#dfe7f8] overflow-y-scroll  flex flex-col">
        <Navbar />
        {children}
      </div> */}

      {/* Top component */}
      <div className="w-[100%] h-[7%] overflow-hidden">
        <Navbar />
      </div>

      {/* Bottom components */}
      <div className="w-[100%] h-[93%] flex flex-row">
        {/* left componrt */}
        <div className="w-[14%] mobile:w-[20%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-[100%] overflow-hidden flex">
          <Menu />
        </div>

        {/* right components */}
        <div className="w-[86%] mobile:w-[80%] md:w-[92%] lg:w-[84%] xl:w-[86%] h-[100%] flex flex-col bg-[#dfe7f8] rounded-md overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
