import { useEffect } from "react";
import {
  createSearchParams,
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { convertToStringParams } from "../../utils/utils";
import usePrintingHistoryQueryConfig from "../../hooks/queryConfigs/usePrintingHistoryQueryConfig";
import { PrintingHistoryQueryConfig } from "../../types/printinghistory.type";
import mainPath from "../../constants/path";
import { formatDateToString } from "../../utils/date.util";
import useQueryParams from "../../hooks/queryConfigs/useQueryParams";
import {
  PrintingHistorySchema,
  printingHistorySchema,
} from "../../rules/printinghistory.rule";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import PrintingHistoryTimeSearch from "./children/PrintingHistoryTimeSearch";

const today = formatDateToString(new Date());

export default function PrintingHistoryPage() {
  // ! Clear url search on reload
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    const isReload = performance.getEntriesByType("navigation").some((nav) => {
      // 'navigate' is for first-time entries
      return (nav as PerformanceNavigationTiming).type === "reload";
    });

    if (isReload) {
      setSearchParams({ ...convertToStringParams() });
    }
  });
  const queryParam = useQueryParams();
  const paramStartDate = queryParam.date
    ? queryParam.date[0]
    : formatDateToString(new Date());
  const paramEndDate = queryParam.date
    ? queryParam.date[1]
    : formatDateToString(new Date());

  const methods = useForm<PrintingHistorySchema>({
    resolver: yupResolver(printingHistorySchema),
    defaultValues: {
      date_start: paramStartDate,
      date_end: paramEndDate,
    },
  });
  const { handleSubmit, getValues } = methods;

  const printingHistorQueryConfig = usePrintingHistoryQueryConfig();
  const navigate = useNavigate();

  // Handle fetch deliveries
  const handleFetchPrintingHistory = () => {
    const startDate = getValues("date_start") || today;
    const endDate = getValues("date_end") || today;

    const newPrintingHistoryQueryConfig: PrintingHistoryQueryConfig = {
      ...printingHistorQueryConfig,
      ...(startDate &&
        endDate && {
          date: [startDate, endDate],
        }),
    };
    navigate({
      pathname: mainPath.printinghistory,
      search: createSearchParams(
        newPrintingHistoryQueryConfig as URLSearchParamsInit
      ).toString(),
    });
  };

  const printJobs = [
    {
      time: "17/06/2024 10:30 - 11:00",
      size: "A4",
      file: "CNPM.pdf",
      pages: 78,
      printer: "001",
    },
    {
      time: "15/06/2024 10:30 - 11:00",
      size: "A4",
      file: "LSD.pdf",
      pages: 45,
      printer: "005",
    },
    {
      time: "12/06/2024 10:30 - 11:00",
      size: "A4",
      file: "CNPM.pdf",
      pages: 354,
      printer: "006",
    },
    {
      time: "11/06/2024 10:30 - 11:00",
      size: "A4",
      file: "LSD.pdf",
      pages: 345,
      printer: "007",
    },
    {
      time: "01/06/2024 10:30 - 11:00",
      size: "A4",
      file: "CNPM.pdf",
      pages: 45,
      printer: "001",
    },
  ];

  return (
    <div className="py-[4.8rem] px-[4.5rem] bg-white">
      <h1>In ấn</h1>
      <h2>Thời gian</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleFetchPrintingHistory, (errors) =>
            console.log(errors)
          )}
        >
          <PrintingHistoryTimeSearch />
        </form>
      </FormProvider>
      <table className="border-collapse border border-white w-full bg-primary-blue">
        <thead>
          <tr>
            <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
              Thời gian
            </th>
            <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
              Kích thước in
            </th>
            <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
              File in
            </th>
            <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
              Số lượng giấy
            </th>
            <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
              Máy in
            </th>
          </tr>
        </thead>
        <tbody>
          {printJobs.map((printing, index) => (
            <tr key={index}>
              <td className="border border-white text-center text-[1.6rem] p-[1rem] text-white">
                {printing.time}
              </td>
              <td className="border border-white text-center text-[1.6rem] p-[1rem] text-white">
                {printing.size}
              </td>
              <td className="border border-white text-[1.6rem] p-[1rem] pl-[3rem] text-white">
                {printing.file}
              </td>
              <td className="border border-white text-[1.6rem] p-[1rem] pl-[3rem] text-white">
                {printing.pages}
              </td>
              <td className="border border-white text-center text-[1.6rem] p-[1rem] text-white">
                {printing.printer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
