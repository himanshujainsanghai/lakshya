import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const params = await searchParams;
  const { date } = params;
  return (
    <div className="bg-white rounded-lg">
      <EventCalendar />

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold my-4 mx-2">Events</h1>
        <Image
          src="/moredark.png"
          alt=""
          width={20}
          height={20}
          className="mx-2"
        ></Image>
      </div>

      <EventList dateParam={date} />
    </div>
  );
};

export default EventCalendarContainer;
