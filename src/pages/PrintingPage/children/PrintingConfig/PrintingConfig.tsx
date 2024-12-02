import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useState } from "react";
import fileApi from "../../../../api/file.api";
import DialogPopup from "../../../../components/DialogPopup";
import LoadingSection from "../../../../components/loading/LoadingSection";
import printjobApi from "../../../../api/printjob.api";
import { AppContext } from "../../../../contexts/app.context";

interface Props {
  chosenprinter: string;
}

export default function PrintingConfig({ chosenprinter }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false);
  const [excuting, setExcuting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [duplex, setDuplex] = useState<boolean>(false); // Default value for duplex
  const [copies, setCopies] = useState<number>(1); // Default value for copies
  const { profile } = useContext(AppContext);

  const queryClient = useQueryClient();
  const uploadMaterialMutation = useMutation({
    mutationFn: fileApi.uploadFile,
  });

  const creatPrintjobMutation = useMutation({
    mutationFn: printjobApi.createPrintjob,
  });

  // Mapping page size names to number arrays
  const pageSizeMap: { [key: string]: number[] } = {
    A5: [148, 210],
    A4: [210, 297],
    A3: [297, 420],
    A2: [420, 594],
    A1: [594, 841],
    A0: [841, 1189],
  };
  const [pageSize, setPageSize] = useState<number[]>([210, 297]); // Default value for A4 size

  const pageSizeStringMap: { [key: string]: string } = {
    A5: 'A5',
    A4: 'A4',
    A3: 'A3',
    A2: 'A2',
    A1: 'A1',
    A0: 'A0',
  };
  const [pageSizeString, setPageSizeString] = useState<string>(pageSizeStringMap['A5']); // Default value for A4 size

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(droppedFiles)]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      setError(true);
      return;
    }

    if (!profile?.id) {
      setError(true);
      console.error("User ID is not available.");
      return;
    }

    setExcutingDialog(true);
    setExcuting(true);
    setSuccess(false);
    setError(false);

    let uploadedFilesCount = 0;

    const uploadAndCreatePrintJob = (file: File) => {
      const uploadBody = { file };
      uploadMaterialMutation.mutate(uploadBody, {
        onError: (error) => {
          console.error("File upload failed", error);
          setExcuting(false);
          setSuccess(false);
          setError(true);
        },
        onSuccess: (response) => {
          const fileId = response.data.id;

          const printJobBody = {
            file_id: fileId,
            user_id: profile.id,
            printer_id: chosenprinter,
            page_size: pageSize,
            duplex: duplex,
            copies: copies,
          };

          creatPrintjobMutation.mutate(printJobBody, {
            onSuccess: () => {
              uploadedFilesCount += 1; // Increment the count for each successful print job creation

              if (uploadedFilesCount === files.length) {
                // All files processed, set success
                setExcuting(false);
                setSuccess(true);
                setError(false);

                queryClient.invalidateQueries({ queryKey: ["file"] });
                queryClient.invalidateQueries({ queryKey: ["printjob"] });
              }
            },
            onError: (error) => {
              console.error("Print job creation failed", error);
              setExcuting(false);
              setSuccess(false);
              setError(true);
            },
          });
        },
      });
    };

    // Loop through all files and upload each one
    files.forEach(uploadAndCreatePrintJob);

    setFiles([]); // Clear the file list after submission
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
            <p className="text-gray-800 font-[inter] font-bold p-4">
              Danh sách tệp đã tải lên:
            </p>
            {files.length === 0 ? null : (
              <button
                onClick={clearFiles}
                className="text-black font-[inter] p-4"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          <div>
            {files.length === 0 ? (
              <p className="text-[#a0a0a0] font-[inter] p-4">
                Tải tệp lên hoặc kéo tệp vào đây.
              </p>
            ) : (
              <ul className="space-y-2 ml-2 mr-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 border"
                  >
                    <div className="flex items-center">
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
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="px-[32px] w-1/2 my-[40px]">
        <p className="text-[32px] font-[inter] font-bold mb-[48px]">
          Thông số in
        </p>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Layout:</p>
          <select
            className="text-[28px] font-[inter] bg-[#7373DC] text-white w-1/2 p-4 rounded-[8px]"
            value={

              pageSizeString
            } // Mapping number[] back to text
            onChange={(e) => {
              setPageSize(
                pageSizeMap[e.target.value as keyof typeof pageSizeMap]
              )
              setPageSizeString(
                pageSizeStringMap[e.target.value as keyof typeof pageSizeMap]

              )
            }
            }
          >
            <option value="A5">A5</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="A2">A2</option>
            <option value="A1">A1</option>
            <option value="A0">A0</option>
          </select>
        </div>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Số mặt:</p>
          <select
            className="text-[28px] font-[inter] bg-[#7373DC] text-white w-1/2 p-4 rounded-[8px]"
            value={duplex ? "2" : "1"}
            onChange={(e) => setDuplex(e.target.value === "1")} // Set duplex as boolean
          >
            <option value="1">1 Mặt</option>
            <option value="2">2 Mặt</option>
          </select>
        </div>

        <div className="flex justify-between mb-[12px]">
          <p className="text-[28px] font-[inter]">Số bản:</p>
          <input
            type="number"
            className="text-[28px] font-[inter] bg-[#7373DC] text-white w-1/2 p-4 rounded-[8px]"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
          />
        </div>

        <button
          className="bg-[#7373DC] text-white w-[5rem] p-[0.5rem] rounded-[8px] text-[28px] hover:bg-blue-300"
          onClick={handleSubmit}
        >
          In
        </button>
      </div>

      {/* Dialog Popup for status */}
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false);
        }}
      >
        {excuting && <LoadingSection />}
        {!excuting && (
          <Fragment>
            {success && (
              <p className="text-center text-xl font-medium uppercase leading-6 text-successGreen">
                Upload tài liệu thành công, tài liệu đang được xử lí
              </p>
            )}
            {error && (
              <p className="text-center text-xl font-medium uppercase leading-6 text-alertRed">
                Đã có lỗi xảy ra, vui lòng thử lại
              </p>
            )}
          </Fragment>
        )}
      </DialogPopup>
    </div>
  );
}
