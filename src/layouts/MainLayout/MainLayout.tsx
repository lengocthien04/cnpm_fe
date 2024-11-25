import { ReactNode } from "react";
import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="relative">
      <div className="sticky top-0 left-0 z-20 w-full h-[6.2rem] bg-layout-color">
        <MainHeader />
      </div>

      {/* Body */}
      <div className="w-full flex h-full p-2">
        {/* Content */}
        <div className="w-full px-[3rem] overflow-hidden">{children}</div>
      </div>
      <MainFooter />
    </div>
  );
}
