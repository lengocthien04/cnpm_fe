import { ReactNode } from "react";
import AdminSideBar from "./children/SideBar/AdminSideBar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex flex-row ">
      <div className="w-[20vw] min-h-[100vh] bg-primary-blue ">
        <AdminSideBar />
      </div>
      <div className="w-[80vw]">{children}</div>
    </div>
  );
}
