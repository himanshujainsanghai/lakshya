import FormContainer from "@/app/components/FormContainer";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";

import prisma from "@/app/lib/prisma";
import { ITEM_PER_PAGE } from "@/app/lib/settings";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type SubjectList = Subject & { teachers: Teacher[] };

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];
const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b  border-gary-200 even:bg-slate-50 text-sm hover:bg-mypurplelight"
  >
    <td className=" flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(",")}
    </td>

    <td>
      <div className="flex items-center gap-2">
        <>
          <FormContainer table="subject" type="update" data={item} />
          <FormContainer table="subject" type="delete" id={item.id} />
        </>
      </div>
    </td>
  </tr>
);

type searchParams = Promise<{ [key: string]: string | undefined }>;

const SubjectsListPage = async (props: { searchParams: searchParams }) => {
  // since only admin has access to subjects page thus no need for userRole  authentication

  const searchParams = await props.searchParams;
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //  URL PARAMS CONDITIONS
  const query: Prisma.SubjectWhereInput = {};

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
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            <FormContainer table="subject" type="create" />
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

export default SubjectsListPage;