import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "../lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-2">
      {/* TITLE  */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">RadialChart</h1>
        <Image src="/moredark.png" alt="" width={14} height={14}></Image>
      </div>
      <CountChart boys={boys} girls={girls} />
      <div className="flex jsutify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-myblue rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-myYellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs">
            girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
