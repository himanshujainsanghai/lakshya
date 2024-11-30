import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";

type ParentList = Parent & { students: Student[] };

type searchParams = Promise<{ [key: string]: string | undefined }>;

const ParentsListPage = async (props: { searchParams: searchParams }) => {
  const { sessionClaims } = await auth();
  const userRole = (sessionClaims?.metadata as { role?: string })?.role;
  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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

  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b  border-gary-200 even:bg-slate-50 text-sm hover:bg-mypurplelight"
    >
      <td className=" flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="text-semibold">{item.name}</h3>
          <p className="text-gray-500 text-xs">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>

      <td>
        <div className="flex items-center gap-2">
          {userRole === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
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
  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // note of data to be sent --> to be of all data | search data
  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {userRole === "admin" && <FormModal table="parent" type="create" />}
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

export default ParentsListPage;
