import { useNavigate, Outlet, useLocation } from "react-router-dom";

const branches = [
  {
    id: 1,
    name: "Cơ sở Lý Thường Kiệt",
    availablePrinter: 10,
    route: "/printing/ltk-branch",
  },
  {
    id: 2,
    name: "Cơ sở Dĩ An",
    availablePrinter: 8,
    route: "/printing/da-branch",
  },
];

export default function PrintingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isChildRoute = location.pathname.includes("/printing/");

  const handleNavigate = (route: string) => {
    console.log("Navigating to:", route);
    navigate(route);
  };

  return (
    <div className="w-full bg-white pb-[3rem]">
      {!isChildRoute && (
        <>
          <div className="pt-[48px] pl-[48px] pb-[48px]">
            <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">
              In ấn
            </p>
            <p className="font-[inter] font-normal text-[20px] leading-[24px] text-[#1E1E1E]">
              Chọn cơ sở in
            </p>
          </div>

          {branches.map((branch) => (
            <div
              key={branch.id}
              className="ml-[48px] pb-[48px] mr-[48px] mt-[4.8rem] border border-solid border-black rounded-[8px]"
            >
              <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E] mb-[12px] pt-[16px] pl-[16px]">
                {branch.name}
              </p>
              <p className="font-[inter] font-normal text-[16px] leading-[22.4px] text-[#1E1E1E] mb-[6px] pl-[16px]">
                Máy hiện có: {branch.availablePrinter}
              </p>
              <div className="pl-[16px] pb-[16px]">
                <button
                  onClick={() => handleNavigate(branch.route)}
                  className="p-[6px] bg-[#4B4DD6] rounded-[8px] w-[40px] h-[40px] text-white hover:opacity-80"
                >
                  In
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      <Outlet />
    </div>
  );
}
