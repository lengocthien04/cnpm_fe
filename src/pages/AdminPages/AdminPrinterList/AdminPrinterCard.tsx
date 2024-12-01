import { useState } from "react";
import { PrinterModel } from "../../../types/printer.type";
import printerQuery from "../../../hooks/queries/usePrinterQuery";
interface AdminPrinterCardProps {
  printer: PrinterModel;
}

export default function AdminPrinterCard({ printer }: AdminPrinterCardProps) {
  const [newStatus, setNewStatus] = useState(printer.status);

  const isAvailable = printer.status === "available";

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value as "available" | "in_maintain");
  };

  const updatePrinterMutation = printerQuery.mutation.useUpdatePrinterById(
    printer.id
  );

  const handleSave = () => {
    if (newStatus === printer.status) {
      return;
    }

    try {
      updatePrinterMutation.mutate({
        id: printer.id,
        data: { status: newStatus },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-2">{printer.printer_code}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <strong>Location:</strong> <span>{printer.location}</span>
        </div>
        <div className="flex justify-between">
          <strong>Status:</strong>{" "}
          <span>{isAvailable ? "Available" : "Unavailable"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Change Status:</strong>
          <select
            value={newStatus}
            onChange={handleStatusChange}
            className="p-2 border rounded-lg"
          >
            <option value="available">Available</option>
            <option value="in_maintain">In Maintain</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={newStatus === printer.status}
          className={`px-4 py-2 rounded-lg ${
            newStatus === printer.status
              ? "bg-gray-400"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
