import UseCard from "@/app/components/UseCard";
import Financechart from "@/app/components/Financechart";
import Announcements from "@/app/components/Announcements";
import CountChartContainer from "@/app/components/CountChartContainer";
import AttendaceChartContainer from "@/app/components/AttendaceChartContainer";
import EventCalendarContainer from "@/app/components/EventCalendarContainer";

type searchParams = Promise<{ [key: string]: string | undefined }>;

const AdminPage = async (props: { searchParams: searchParams }) => {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col gap-2  p-2 md:flex-row">
      {/* LEFT  */}
      <div className="w-full lg:w-2/3 flex flex-col gap-2">
        <div className="flex gap-2 justify-between flex-wrap">
          <UseCard type="admin" />
          <UseCard type="teacher" />
          <UseCard type="student" />
          <UseCard type="parent" />
        </div>

        {/* MIDDLE CHARTS  */}
        <div className="flex gap-2 flex-col lg:flex-row">
          {/* COUNT CHART  */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>

          {/* ATTENDACE CHART  */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendaceChartContainer />
          </div>
        </div>

        {/* BOTTOM CHART  */}
        <div className="w-full h-[500px]">
          <Financechart />
        </div>
      </div>

      {/* RIGHT  */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
