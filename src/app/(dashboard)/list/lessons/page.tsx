import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type LessonsList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

type searchParams = Promise<{ [key: string]: string | undefined }>;

const LessonsListPage = async (props: { searchParams: searchParams }) => {
  const { sessionClaims } = await auth();
  const userRole = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    ...(userRole === "admin"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];
  const renderRow = (item: LessonsList) => (
    <tr
      key={item.id}
      className="border-b  border-gary-200 even:bg-slate-50 text-sm hover:bg-mypurplelight"
    >
      <td className=" flex items-center gap-4 p-4">{item.subject.name}</td>
      <td className=" hidden md:table-cell">{item.class.name}</td>
      <td className=" hidden md:table-cell">{item.teacher.name}</td>

      <td>
        <div className="flex items-center gap-2">
          {userRole === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const searchParams = await props.searchParams;
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //  URL PARAMS CONDITIONS
  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.teacherId = value;
            break;
          case "classId":
            query.classId = parseInt(value);
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              {
                teacher: {
                  name: { contains: value, mode: "insensitive" },
                },
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  // note of data to be sent --> to be of all data | search data
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {userRole === "admin" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION  */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default LessonsListPage;