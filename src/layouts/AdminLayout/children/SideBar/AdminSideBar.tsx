import { NavLink } from "react-router-dom";
import { adminPath } from "../../../../constants/path";
import classNames from "classnames";

export default function AdminSideBar() {
  const Admin = [
    { name: "Dashboard", path: adminPath.admin },
    { name: "Danh sách người dùng", path: adminPath.userList },
    { name: "Tạo người dùng", path: adminPath.createUser },
    { name: "Danh sách máy in", path: adminPath.printers },
    { name: "Thêm máy in", path: adminPath.createPrinters },
    { name: "Cài đặt", path: adminPath.printingSettings },
    { name: "Báo cáo", path: adminPath.report },
  ];

  return (
    <div className="w-full text-lg flex flex-col gap-2 py-4 px-2">
      {Admin.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            classNames(
              "block py-2 px-4 mb-2 text-white hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 rounded-[1rem]",
              {
                "bg-blue-100 !text-blue-500 ": isActive,
              }
            )
          }
          end
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
