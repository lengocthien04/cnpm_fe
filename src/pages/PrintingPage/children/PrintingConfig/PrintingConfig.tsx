import { useState } from "react";

interface FileType {
  name: string;
  size: number;
}

export default function PrintingConfig() {
  const [files, setFiles] = useState<FileType[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({
        name: file.name,
        size: file.size
      }))
      setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index))
  }

  const clearFiles = () => {
    setFiles([])
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      const newFiles = Array.from(droppedFiles).map((file) => ({
        name: file.name,
        size: file.size,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-[14px] flex">
      <div className="pl-[32px] w-1/2 my-[40px] border-r border-black">
        <p className="text-[32px] font-[inter] font-bold mb-[16px]">In ấn</p>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
        />

        <label
          htmlFor="fileInput"
          className="block font-[inter] w-1/5 p-4 border border-[#7373DC] rounded-[10px] bg-[#7373DC] text-center text-white cursor-pointer hover:opacity-80 hover:text-black"
        >
          Tải tệp tin
        </label>

        <div
          className="mt-[16px] border border-black rounded-[2px] h-[300px] overflow-y-auto w-11/12"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex justify-between items-center border-b border-black">
            <p className="text-gray-800 font-[inter] font-bold p-4">Danh sách tệp đã tải lên:</p>
            {files.length == 0 ? <></> : (<button
              onClick={clearFiles}
              className="text-black font-[inter] p-4"
            >
              Xóa tất cả
            </button>)}
          </div>

          <div>
            {files.length === 0 ?
            (<p className="text-[#a0a0a0] font-[inter] p-4">Tải tệp lên hoặc kéo tệp vào đây.</p>) : 
            (<ul className="space-y-2 ml-2 mr-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 border"
                >
                  <div className="flex itens-center">
                    <span className="text-gray-800">{file.name}</span>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="text-black"
                    aria-label="Remove file"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>)}
          </div>
        </div>
      </div>

      <div className="pl-[32px] w-1/2 my-[40px]">
        <p className="text-[32px] font-[inter] font-bold mb-[48px]">Thông số in</p>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Trang:</p>
          <select className="text-[28px] font-[inter] bg-[#4B4DD6] text-white w-1/2 p-4 rounded-[8px]">
            <option>Tất cả 1</option>
            <option>Tất cả 2</option>
            <option>Tất cả 3</option>
            <option>Tất cả 4</option>
            <option>Tất cả 5</option>
          </select>
        </div>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Layout:</p>
          <select className="text-[28px] font-[inter] bg-[#4B4DD6] text-white w-1/2 p-4 rounded-[8px]">
            <option>Layout 1</option>
            <option>Layout 2</option>
            <option>Layout 3</option>
            <option>Layout 4</option>
            <option>Layout 5</option>
          </select>
        </div>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Kích thước:</p>
          <select className="text-[28px] font-[inter] bg-[#4B4DD6] text-white w-1/2 p-4 rounded-[8px]">
            <option>A3</option>
            <option>A4</option>
          </select>
        </div>
        
        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Số mặt:</p>
          <select className="text-[28px] font-[inter] bg-[#4B4DD6] text-white w-1/2 p-4 rounded-[8px]">
            <option>1</option>
            <option>2</option>
          </select>
        </div>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Số bản:</p>
          <input className="text-[28px] font-[inter] bg-[#4B4DD6] text-white w-1/2 p-4 rounded-[8px]"></input>
        </div>
      </div>
    </div>
  )
}