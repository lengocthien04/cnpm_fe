import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="relative">
      <div className="sticky top-0 left-0 z-20 w-full h-[6.2rem] bg-layout-color border-b border-[#dedfe3]">
        <img
          src="/public/vite.svg"
          alt="woodong_logo"
          className="w-[13rem] h-[4.472rem] absolute top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* Body */}
      <div className="w-full flex h-full">
        {/* Content */}
        <div className="w-full p-8 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
