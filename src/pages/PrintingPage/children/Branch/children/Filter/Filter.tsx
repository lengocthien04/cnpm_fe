import { Dispatch, SetStateAction } from "react";

interface props {
  isFilterVisible: boolean;
  setIsFilterVisible: Dispatch<SetStateAction<boolean>>;
  handleFilterClick: () => void;
  locations: string[];
}
export default function Filter({
  isFilterVisible,
  setIsFilterVisible,
  handleFilterClick,
  locations,
}: props) {
  return (
    <div>
      {isFilterVisible && (
        <div className="flex flex-row overflow-auto w-[30vw] pb-[5rem] bg-[#C0C0C0] rounded-[10px] justify-end absolute right-[5vw] top-[200px] z-[1] shadow-[5px_10px_15px_rgba(0,0,0,0.3)]">
          <div className="w-full sm:w-1/2 mt-[20px] mb-[20px]">
            <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] text-center">
              Loại máy in
            </p>
            <div className="flex h-1/4 items-center pl-[24px]">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000]">
                  Máy có sẵn
                </p>
              </label>
            </div>
          </div>

          <div className="w-full sm:w-1/2 border-l mt-[20px] mb-[20px]">
            <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] text-center">
              Vị trí
            </p>
            {locations.map((location) => (
              <div className="flex h-1/4 items-center pl-[24px]" key={location}>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000]">
                    {location}
                  </p>
                </label>
              </div>
            ))}
            <button
              onClick={() => {
                handleFilterClick();
                setIsFilterVisible(false);
              }}
              className="flex justify-center ml-[3vw] font-[inter] font-bold text-[16px] text-[#FFFFFF] bg-[#030391] px-[24px] py-[4px] rounded-full "
            >
              Chọn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
