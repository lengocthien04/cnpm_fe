import { useQuery } from "@tanstack/react-query";
import printingApi from "../../../api/printing.api";
import { Fragment } from "react/jsx-runtime";
import LoadingSection from "../../../components/loading/LoadingSection";

export default function AdminReport() {
  const { data: reportData, isFetched } = useQuery({
    queryKey: ["printing-report"],
    queryFn: () => printingApi.getReportOfThisMonth(),
  });
  const report = reportData?.data;

  return (
    <Fragment>
      {!isFetched && <LoadingSection />}
      {isFetched && report && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 w-full text-center uppercase text-text-primary">
            Printing Report
          </h2>

          {/* Report Date Range */}
          <div className="mb-6 space-y-2">
            <p>
              <strong>Report Start Date:</strong>{" "}
              {new Date(report.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Report End Date:</strong>{" "}
              {new Date(report.end_date).toLocaleDateString()}
            </p>
          </div>

          {/* User Page Usage */}
          <div className="mb-6 space-y-2">
            <h3 className="text-lg font-semibold uppercase">User Page Usage</h3>
            <ul className="flex flex-col items-center">
              {Object.entries(report.user_page_usage).map(([userId, usage]) => (
                <li key={userId} className="flex w-1/2 justify-between mb-2">
                  <span>{usage.name}</span>
                  <span>{usage.used_pages} pages</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Printjobs */}
          <div className="mb-6 space-y-2 ">
            <h3 className="text-lg font-semibold uppercase">Printjobs</h3>
            <div className="space-y-4">
              {report.printjobs.map((printjob) => (
                <div key={printjob.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <strong>Printjob ID:</strong>
                    <span>{printjob.id}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <strong>Copies:</strong>
                    <span>{printjob.copies}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <strong>Printed Date:</strong>
                    <span>
                      {new Date(printjob.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="mb-2">
                    <strong>User:</strong> {printjob.user.name} (ID:{" "}
                    {printjob.user.id})
                  </div>

                  {/* Printer Info */}
                  <div className="mb-2">
                    <strong>Printer:</strong> {printjob.printer.printer_code} -{" "}
                    {printjob.printer.location} (ID: {printjob.printer.id})
                  </div>

                  {/* File Info */}
                  <div className="mb-2">
                    <strong>File:</strong>{" "}
                    <a
                      href={printjob.file.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {printjob.file.name}
                    </a>{" "}
                    (ID: {printjob.file.id})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-6 space-y-2">
            <h3 className="text-lg font-semibold uppercase">Notifications</h3>
            <div className="space-y-4">
              {report.notifications.map((notification) => (
                <div key={notification.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <strong>Notification ID:</strong>
                    <span>{notification.id}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <strong>Message:</strong>
                    <span>{notification.message}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <strong>Created At:</strong>
                    <span>
                      {new Date(notification.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Printed Pages */}
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold uppercase">
              Total Printed Pages
            </h3>
            <p className="uppercase text-text-primary font-semibold">
              {report.total_printed_pages}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
