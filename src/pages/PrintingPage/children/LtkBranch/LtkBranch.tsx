import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const printers = [
  { id: "001", address: "B4.301", queue: 1 },
  { id: "002", address: "B4.302", queue: 2 },
  { id: "003", address: "B4.303", queue: 3 },
  { id: "004", address: "B4.304", queue: 4 },
  { id: "005", address: "B4.305", queue: 5 },
  { id: "006", address: "B4.306", queue: 6 },
  { id: "007", address: "B4.307", queue: 7 },
  { id: "008", address: "B4.308", queue: 8 },
  { id: "009", address: "B4.309", queue: 9 },
  { id: "010", address: "B4.310", queue: 10 },
  { id: "011", address: "B4.311", queue: 11 },
  { id: "012", address: "B4.312", queue: 12 },
  { id: "013", address: "B4.313", queue: 13 },
  { id: "014", address: "B4.314", queue: 14 },
  { id: "015", address: "B4.315", queue: 15 },
  { id: "016", address: "B4.316", queue: 16 },
  { id: "017", address: "B4.317", queue: 17 },
  { id: "018", address: "B4.318", queue: 18 },
  { id: "019", address: "B4.319", queue: 19 },
  { id: "020", address: "B4.320", queue: 20 },
]

const locations = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5"]

const groupLocationsByName = (locations: string[]): Record<string, string[]> => {
  const grouped = locations.reduce<Record<string, string[]>>((acc, location) => {
    const firstLetter = location.charAt(0);
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(location);
    return acc;
  }, {});

  return grouped;
};

export default function LtkBranch() {
  const limit = 9
  const [pageActive, setPageActive] = useState(0)
  const [currentPrinters, setCurrentPrinters] = useState(printers.slice(0, limit));
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const quantities = Math.ceil(printers.length / limit)

  useEffect(() => {
    const startIdx = pageActive * limit;
    const endIdx = startIdx + limit;
    setCurrentPrinters(printers.slice(startIdx, endIdx));
  }, [pageActive]);

  const handleClick = (e: number) => {
    setPageActive(e)
  }

  const handlePrevious = () => {
    if (pageActive > 0) {
      setPageActive(pageActive - 1);
    }
  };

  const handleNext = () => {
    if (pageActive < quantities - 1) {
      setPageActive(pageActive + 1);
    }
  };

  const handleFilterClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const groupedLocations = groupLocationsByName(locations);
  
  const groups = Object.values(groupedLocations);

  return (
    <div className="w-full mt-[16px]">
      <div className="relative ml-[48px] mb-[48px] mr-[48px]">
        <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">In ấn</p>
        <p className="font-[inter] font-normal text-[20px] leading-[24px] text-[#1E1E1E]">Cơ sở Lý Thường Kiệt</p>
        <button 
          className="absolute top-0 right-0 h-full font-[inter] font-semibold text-[24px]"
          onClick={handleFilterClick}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-[8px]" />
          Lọc
        </button>

        {isFilterVisible && (<div className="flex bg-[#C0C0C0] rounded-[10px] absolute w-full z-[1] shadow-[5px_10px_15px_rgba(0,0,0,0.3)]">
          <div className="w-1/3 mt-[20px] mb-[20px]">
            <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] pl-[60px] pb-[8px]">Loại máy in</p>
            <div className="flex h-1/4 items-center pl-[24px]">
              <input type="checkbox"></input>
              <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] ml-[2px]">Máy có sẵn</p>
            </div>
            <div className="flex h-1/4 items-center pl-[24px]">
              <input type="checkbox"></input>
              <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] ml-[2px]">Máy in màu</p>
            </div>
            <div className="flex h-1/4 items-center pl-[24px]">
              <input type="checkbox"></input>
              <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] ml-[2px]">Máy in hai mặt</p>
            </div>
          </div>

          <div className="w-1/3 border-l border-r mt-[20px] mb-[20px] ">
            <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] pl-[60px]">Vị trí</p>
            <div className="flex pl-[24px]">
              {groups.map((group, index) => (
                <div key={index} className="flex flex-col mr-[24px]">
                  {group.map((location, idx) => (
                    <div className="flex items-center" key={idx}>
                      <input type="checkbox" />
                      <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] ml-2">{location}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 mt-[20px] mb-[20px] ">
            <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] pl-[60px]">Sắp xếp theo</p>
            <div className="flex h-1/3 items-center pl-[24px]">
              <input type="radio" name="sorting"></input>
              <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] ml-[2px]">Condition 1</p>
            </div>
            <div className="flex h-1/3 items-center pl-[24px]">
              <input type="radio" name="sorting"></input>
              <p className="font-[inter] font-normal text-[16px] leading-[20.59px] text-[#000000] ml-[2px]">Condition 2</p>
            </div>
          </div>

          <button className="absolute bottom-[20px] right-[20px] font-[inter] font-bold text-[16px] leading-[20.59px] text-[#FFFFFF] bg-[#030391] px-[24px] py-[4px] rounded-full ">Chọn</button>
        </div>)}
      </div>

      <div className="flex flex-wrap mx-[48px] justify-between">
        {currentPrinters.map(printer => (
          <div key={printer.id} className="relative w-1/4 px-[8px] mb-[32px] bg-[#60A3EF] mx-[8px] rounded-[8px]">
            <p className="pt-[8px] pl-[8px] pb-[16px] font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">Máy {printer.id}</p>
            <p className="pl-[8px] font-[inter] font-semibold text-[16px] leading-[22.4px] text-[#1E1E1E]">Phòng: {printer.address}</p>
            <p className="pl-[8px] pb-[16px] font-[inter] font-normal text-[16px] leading-[22.4px] text-[#1E1E1E] text-white">Hàng đợi: {printer.queue}</p>
            <button className="absolute right-8 bottom-8 bg-[#0B4FB7] px-[6px] border border-solid border-black rounded-[4px] text-white">Button</button>
          </div>
        ))}
      </div>

      <div className="flex place-content-end mr-[48px]">
        <button
          onClick={handlePrevious}
          className={`px-[16px] py-[8px] mr-[16px] ${pageActive === 0 ? 'opacity-50 cursor-not-allowed hover:cursor-default' : ' hover:cursor-pointer'}`}
          disabled={pageActive === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-[8px]" />
          Previous
        </button>

        <ul className="flex place-content-end">
          {[...Array(quantities)].map((_, index) => (
            <li
              onClick={() => handleClick(index)}
              className={`h-[32px] w-[32px] border border-solid border-black rounded-full flex items-center justify-center m-[4px] hover:cursor-pointer 
                                        ${index === pageActive ? "bg-black text-white" : ""
                }`}

            >{index + 1}</li>
          ))}
        </ul>

        <button
          onClick={handleNext}
          className={`px-[16px] py-[8px] ml-[16px] ${pageActive === quantities - 1 ? 'opacity-50 cursor-not-allowed hover:cursor-default' : ' hover:cursor-pointer'}`}
          disabled={pageActive === quantities - 1}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-[8px]" />
        </button>
      </div>
    </div>
  )
}