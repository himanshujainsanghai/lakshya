import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

const Navbar = async () => {
  const user = await currentUser();
  const userRole = user?.publicMetadata.role as string;
  const userName = user?.username;
  const currentUserId = user?.id;

  type SharedWhereInput = Prisma.AnnouncementWhereInput &
    Prisma.EventWhereInput;

  const query: SharedWhereInput = {};
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };
  if (userRole === "admin") {
    query.OR = undefined;
  } else {
    query.OR = [
      { classId: null },
      {
        class: roleConditions[userRole as keyof typeof roleConditions] || {},
      },
    ];
  }
  const countAnnouncemrnts = await prisma.announcement.count({ where: query });

  const countEvents = await prisma.event.count({ where: query });

  return (
    <div className="flex items-center justify-between p-2 py-2">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={34}
            height={34}
            className="rounded-full object-cover"
          />
          <span className="hidden md:block p-2 mt-2 font-bold text-3xl">
            Lakshya
          </span>
        </Link>
      </div>

      {/** ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* message icon */}
        <div className="bg-white rounded-full w-7 h-7 flex cursor-pointer items-center justify-center relative">
          <Link href={"/list/events"}>
            <Image src="/calendar.png" alt="" width={20} height={20}></Image>
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white bg-red-500 rounded-full text-xs">
              {countEvents}
            </div>
          </Link>
        </div>

        {/* announcements icon */}
        <div className="bg-white rounded-full w-7 h-7 cursor-pointer flex justify-center items-center relative">
          <Link href={"/list/announcements"}>
            <Image
              src="/announcement.png"
              alt=""
              width={20}
              height={20}
            ></Image>
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white bg-red-500 rounded-full text-xs">
              {countAnnouncemrnts}
            </div>
          </Link>
        </div>

        {/* userInfo */}
        <div className="flex flex-col">
          <span className="test-xs leading-3 font-mediium font font-bold text-transform:uppercase">
            {userName}
          </span>
          <span className="text-[12px] test-gray-500 test-right">{`${userRole}`}</span>
        </div>

        {/* clerk User */}
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
