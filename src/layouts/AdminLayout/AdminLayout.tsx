import { ReactNode } from "react";
import SideBar from "./children/SideBar/SideBar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex flex-row ">
      <div className="w-[20vw] min-h-[100vh] bg-primary-blue ">
        <SideBar />
      </div>
      <div className="w-[80vw]">{children}</div>
    </div>
  );
}
