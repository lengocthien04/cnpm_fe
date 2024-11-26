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
      <div className="w-full px-[5rem] overflow-hidden pt-[2rem] bg-primary-background">
        {children}
      </div>
      <MainFooter />
    </div>
  );
}
