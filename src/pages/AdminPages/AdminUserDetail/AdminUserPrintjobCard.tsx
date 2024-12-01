import { PrintjobModel } from "../../../types/printjob.type";

interface Props {
  printjob: PrintjobModel;
}

export default function AdminUserPrintjobCard({ printjob }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="space-y-2">
        <div className="flex justify-between">
          <strong>File Name:</strong> <span>{printjob.file.name}</span>
        </div>
        <div className="flex justify-between">
          <strong>Copies:</strong> <span>{printjob.copies}</span>
        </div>
        <div className="flex justify-between">
          <strong>Number of Pages:</strong> <span>{printjob.num_pages}</span>
        </div>
        <div className="flex justify-between">
          <strong>Printed Date:</strong>{" "}
          <span>{new Date(printjob.created_at).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <strong>File Link:</strong>
          <a
            href={printjob.file.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {printjob.file.path}
          </a>
        </div>
      </div>
    </div>
  );
}
