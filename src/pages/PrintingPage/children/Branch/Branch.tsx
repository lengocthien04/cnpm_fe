import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useState } from "react";
import Filter from "./children/Filter";

interface props {
  branch: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  printers: any[];
  setChosenPrinter: Dispatch<SetStateAction<string>>;
}

export default function Branch({ branch, printers, setChosenPrinter }: props) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [pageActive, setPageActive] = useState(0);
  const printersPerPage = 9;
  const quantities = Math.ceil(printers.length / printersPerPage);

  const currentPrinters = printers
    .slice(pageActive * printersPerPage, (pageActive + 1) * printersPerPage)
    .map((printer, index) => ({
      ...printer,
      index: pageActive * printersPerPage + index + 1,
    }));
  const handleClick = (page: number) => {
    setPageActive(page);
  };

  const handleNext = () => {
    if (pageActive < quantities - 1) {
      setPageActive(pageActive + 1);
    }
  };

  const handlePrevious = () => {
    if (pageActive > 0) {
      setPageActive(pageActive - 1);
    }
  };
  const handleFilterClick = () => {};
  const locations =
    branch == "Lý Thường Kiệt"
      ? ["A1", "A2", "A3", "B1", "B2", "B3"]
      : ["H1", "H2", "H3", "H6"];

  return (
    <div className="w-full pt-[48px] px-[3rem]">
      <div className="relative mb-[48px] mr-[48px]">
        <p className="font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">
          In ấn
        </p>
        <p className="font-[inter] font-normal text-[20px] leading-[24px] text-[#1E1E1E]">
          Cơ sở {branch}
        </p>
        <button
          className="absolute top-0 right-0 h-full font-[inter] font-semibold text-[24px]"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-[8px]" />
          Lọc
        </button>
      </div>
      <Filter
        isFilterVisible={isFilterVisible}
        setIsFilterVisible={setIsFilterVisible}
        handleFilterClick={handleFilterClick}
        locations={locations}
      />

      <div className="flex flex-row justify-center w-full gap-[2rem] ">
        {currentPrinters.map((printer) => (
          <div
            key={printer.id}
            className="relative w-1/3 p-[1.6rem] bg-[#60A3EF] mx-[8px] rounded-[8px]"
          >
            <p className="pt-[8px] pb-[16px] font-[inter] font-semibold text-[24px] leading-[28.8px] text-[#1E1E1E]">
              Máy {printer.index}
            </p>
            <p className="font-[inter] font-semibold text-[16px] leading-[22.4px] text-[#1E1E1E]">
              Địa điểm: {printer.location}
            </p>
            <p className="font-[inter] font-normal text-[16px] text-[#1E1E1E]">
              Hàng đợi: {printer.printjob_queue.length}
            </p>
            <p className=" pb-[16px] font-[inter] font-normal text-[16px] text-[#1E1E1E]">
              Status: {printer.status}
            </p>
            <button
              className=" px-[0.8rem] border border-solid border-black bg-[#4B4DD6] p-2  hover:bg-blue-100 hover:text-blue-300 rounded-md  text-white font-[inter] text-[20px]"
              onClick={() => setChosenPrinter(printer.id)}
            >
              Chọn
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-end mt-[3rem]">
        <button
          onClick={handlePrevious}
          className={`px-[16px] py-[8px] ${
            pageActive === 0
              ? "opacity-50 cursor-not-allowed hover:cursor-default"
              : "hover:cursor-pointer"
          }`}
          disabled={pageActive === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-[8px]" />
          Previous
        </button>
        <ul className="flex flex-row">
          {[...Array(quantities)].map((_, index) => (
            <li
              key={index}
              onClick={() => handleClick(index)}
              className={`h-[32px] w-[32px] border border-solid border-black rounded-full flex items-center justify-center m-[4px] hover:cursor-pointer ${
                index === pageActive ? "bg-black text-white" : ""
              }`}
            >
              {index + 1}
            </li>
          ))}
        </ul>

        <button
          onClick={handleNext}
          className={`px-[16px] py-[8px] ${
            pageActive === quantities - 1
              ? "opacity-50 cursor-not-allowed hover:cursor-default"
              : "hover:cursor-pointer"
          }`}
          disabled={pageActive === quantities - 1}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-[8px]" />
        </button>
      </div>
    </div>
  );
}
