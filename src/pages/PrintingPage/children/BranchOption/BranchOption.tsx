import { Dispatch, SetStateAction } from "react";

interface props {
  setbranchname: Dispatch<SetStateAction<string>>;
  count_cs1: number;
  count_cs2: number;
}
export default function BranchOption({
  setbranchname,
  count_cs1,
  count_cs2,
}: props) {
  const branches = [
    {
      name: "Lý Thường Kiệt",
      count: count_cs1,
    },
    { name: "Dĩ An", count: count_cs2 },
  ];
  return (
    <div>
      <>
        <div className="pt-[48px] pl-[48px] pb-[24px]">
          <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">
            In ấn
          </p>
          <p className="font-[inter] font-normal text-[20px] leading-[24px] text-[#1E1E1E]">
            Chọn cơ sở in
          </p>
        </div>

        {branches.map((branch) => (
          <div
            key={branch.name}
            className="ml-[48px] mb-[48px] mr-[48px] border border-solid border-black rounded-[8px]"
          >
            <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E] mb-[12px] pt-[16px] pl-[16px]">
              {branch.name}
            </p>
            <p className="font-[inter] font-normal text-[16px] leading-[22.4px] text-[#1E1E1E] mb-[6px] pl-[16px]">
              Máy hiện có: {branch.count}
            </p>
            <div className="pl-[16px] pb-[16px]">
              <button
                className="p-[6px] bg-[#4B4DD6] rounded-[8px] w-[40px] h-[40px] text-white hover:opacity-80"
                onClick={() => setbranchname(branch.name)}
              >
                In
              </button>
            </div>
          </div>
        ))}
      </>
    </div>
  );
}
