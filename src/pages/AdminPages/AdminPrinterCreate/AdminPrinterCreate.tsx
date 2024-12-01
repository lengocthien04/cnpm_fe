import { useState } from "react";
import { PrinterCreate } from "../../../types/printer.type";
import printerQuery from "../../../hooks/queries/usePrinterQuery";

export default function AdminPrinterCreate() {
  const [printers, setPrinters] = useState<PrinterCreate[]>([
    { location: "", printer_code: "" },
  ]);

  const createPrinterMutation =
    printerQuery.mutation.useCreateMultiplePrinters();

  const handleInputChange = (
    index: number,
    field: keyof PrinterCreate,
    value: string
  ) => {
    const updatedPrinters = [...printers];
    updatedPrinters[index][field] = value;
    setPrinters(updatedPrinters);
  };

  const handleAddPrinter = () => {
    setPrinters([...printers, { location: "", printer_code: "" }]);
  };

  const handleRemovePrinter = (index: number) => {
    const updatedPrinters = printers.filter((_, i) => i !== index);
    setPrinters(updatedPrinters);
  };

  const handleSubmit = () => {
    // Filter printers whose fields are all filled
    const printersToCreate = printers.filter(
      (printer) => printer.location && printer.printer_code
    );

    if (printersToCreate.length === 0) {
      console.log("No printers with all fields filled.");
      return;
    }

    try {
      createPrinterMutation.mutate(printersToCreate, {
        onSuccess() {
          setPrinters([]); // Clear the form after successful creation
        },
      });
      console.log("Printers created:", printersToCreate);
    } catch (error) {
      console.error("Error creating printers:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Printers</h2>

      {printers.map((printer, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={() => handleRemovePrinter(index)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa máy in
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Vị trí</label>
              <input
                type="text"
                value={printer.location}
                onChange={(e) =>
                  handleInputChange(index, "location", e.target.value)
                }
                className="mt-1 p-2 border rounded-lg"
                placeholder="Nhập vị trí máy in"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Mã máy in</label>
              <input
                type="text"
                value={printer.printer_code}
                onChange={(e) =>
                  handleInputChange(index, "printer_code", e.target.value)
                }
                className="mt-1 p-2 border rounded-lg"
                placeholder="Nhập mã máy in"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleAddPrinter}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thêm máy in
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
