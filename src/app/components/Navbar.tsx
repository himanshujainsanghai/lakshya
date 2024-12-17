import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const userName = user?.username;
  return (
    <div className="flex items-center justify-between p-2">
      {/** ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex cursor-pointer items-center justify-center">
          <Image src="/message.png" alt="" width={14} height={14}></Image>
        </div>
        <div className="bg-white rounded-full w-7 h-7 cursor-pointer flex justify-center items-center relative">
          <Image src="/announcement.png" alt="" width={20} height={20}></Image>
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white bg-red-500 rounded-full text-xs">
            5
          </div>
        </div>
        <div className="flex flex-col">
          <span className="test-xs leading-3 font-mediium">{userName}</span>
          <span className="text-[12px] test-gray-500 test-right">{`${role}`}</span>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
