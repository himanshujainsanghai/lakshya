import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

type searchParams = Promise<{ [key: string]: string | undefined }>;

const AssignmentsListPage = async (props: { searchParams: searchParams }) => {
  const { userId, sessionClaims } = await auth();
  const userRole = (sessionClaims?.metadata as { role?: string })?.role;
  const currUserId = userId;

  /** 
   * 
   * by this method you can call userRole from utils.ts
  const userRole = defineRole();
  */

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
    {
      header: "Due-Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    ...(userRole === "admin" || userRole === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b  border-gary-200 even:bg-slate-50 text-sm hover:bg-mypurplelight"
    >
      <td className=" flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td className=" hidden md:table-cell">{item.lesson.class.name[0]}</td>
      <td className=" hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className=" hidden md:table-cell">
        {new Intl.DateTimeFormat("en-IN").format(item.dueDate)}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {userRole === "admin" && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item.id} />
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
  const query: Prisma.AssignmentWhereInput = {};

  query.lesson = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;

          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS

  switch (userRole) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currUserId!;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currUserId!,
          },
        },
      };
      break;

    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: currUserId!,
          },
        },
      };
      break;
    default:
      break;
  }

  // note of data to be sent --> to be of all data | search data
  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Assignments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(userRole === "admin" || userRole === "teacher") && (
              <FormModal table="assignment" type="create" />
            )}
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

export default AssignmentsListPage;