import { Dispatch, SetStateAction, useState } from "react";

interface PageInfo {
  size: string;
  count: number;
}

interface Props {
  setPages: Dispatch<SetStateAction<{ page: number; size: string }[]>>;
}

export default function AddPage({ setPages }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState("A4");
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageInfoList, setPageInfoList] = useState<PageInfo[]>([]);

  const pagesizes: { page: string }[] = [
    {
      page: "A4",
    },
    {
      page: "A5",
    },
    {
      page: "A3",
    },
    {
      page: "A2",
    },
    { page: "A1" },
    {
      page: "A0",
    },
  ];

  const handleAddPageInfo = () => {
    if (pageCount <= 0) return;

    setPageInfoList((prev) => {
      const existingIndex = prev.findIndex((item) => item.size === pageSize);
      let updatedList;

      if (existingIndex !== -1) {
        // Update the local list count
        updatedList = prev.map((item, index) =>
          index === existingIndex
            ? { ...item, count: item.count + pageCount }
            : item
        );
      } else {
        // Add new entry to the local list
        updatedList = [...prev, { size: pageSize, count: pageCount }];
      }

      // Update the parent state
      setPages((pages) => {
        const existingPageIndex = pages.findIndex((p) => p.size === pageSize);

        if (existingPageIndex !== -1) {
          return pages.map((p, index) =>
            index === existingPageIndex
              ? { ...p, page: updatedList[existingIndex]?.count || pageCount }
              : p
          );
        } else {
          return [...pages, { page: pageCount, size: pageSize }];
        }
      });

      return updatedList;
    });

    // Reset inputs
    setPageSize("A4");
    setPageCount(0);
    setIsModalOpen(false);
  };

  const handleRemoveEntry = (index: number) => {
    setPageInfoList((prev) => {
      const removedItem = prev[index];

      // Update parent state
      setPages((pages) => pages.filter((p) => p.size !== removedItem.size));

      // Return updated list for local state
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="pt-[2rem]">
      {/* Display page information */}
      <div className="space-y-4">
        {pageInfoList.map((info, index) => (
          <div
            key={index}
            className="flex items-center justify-start flex-row gap-[2rem] text-[2rem] font-[300]"
          >
            <div>
              <p>Kích thước {info.size}:</p>
              <p>Mua giấy in</p>
              <p>Số lượng: {info.count}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Remove entry */}
              <button
                onClick={() => handleRemoveEntry(index)}
                className="flex items-center justify-center px-2 py-2 bg-red-500 h-[3rem] w-[3rem] text-white rounded-full"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 flex items-center justify-center bg-green-500 h-[3rem] w-[3rem] text-white rounded-full"
      >
        +
      </button>

      {/* Modal for adding page info */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-[3rem] shadow-md  p-[5rem] min-h-[50vh]">
            <h2 className="text-[2.4rem] font-bold mb-8">Thêm giấy in</h2>
            <div className="mb-6">
              <label className="block mb-1">Kích thước</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {pagesizes.map((pagesize) => (
                  <option key={pagesize.page} value={pagesize.page}>
                    {pagesize.page}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-1">Số lượng</label>
              <input
                type="number"
                value={pageCount === 0 ? "" : pageCount} // Show empty string if pageCount is 0
                onChange={(e) => setPageCount(Number(e.target.value) || 0)} // Ensure valid number or reset to 0
                className="w-full p-2 border rounded"
                placeholder="Nhập số lượng"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-[2rem]"
              >
                Hủy
              </button>
              <button
                onClick={handleAddPageInfo}
                className="px-4 py-2 bg-blue-500 text-white rounded-[2rem]"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
