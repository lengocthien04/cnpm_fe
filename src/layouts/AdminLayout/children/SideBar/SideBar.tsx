import { adminPath } from "../../../../constants/path";

export default function SideBar() {
  const Admin = [
    { name: "Dashboard", path: adminPath.admin },
    { name: "Thông tin cá nhân", path: adminPath.userDetail },
    { name: "Danh sách user", path: adminPath.userList },
    { name: "Tạo người dùng", path: adminPath.createUser },
    { name: "Điều chỉnh máy in", path: adminPath.printerConfig },
    { name: "Báo cáo", path: adminPath.report },
  ];

  return (
    <div className="w-full text-[2rem] flex flex-col gap-[2rem] py-[3rem]">
      {Admin.map((item, index) => (
        <a
          key={index}
          href={item.path}
          className="block py-2 px-4 mb-2 text-white hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 rounded-[1rem]"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}
