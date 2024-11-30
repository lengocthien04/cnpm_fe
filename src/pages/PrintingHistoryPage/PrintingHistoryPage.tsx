import { useEffect } from "react";
import {
  createSearchParams,
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { convertToStringParams } from "../../utils/utils";
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
import printjobQuery from "../../hooks/queries/usePrintjobQuery";
import usePrintjobQueryConfig from "../../hooks/queryConfigs/usePrintjobQueryConfig";
import LoadingSection from "../../components/loading/LoadingSection";
import { PrintjobQueryConfig } from "../../types/printjob.type";

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

  const printjobQueryConfig = usePrintjobQueryConfig();
  const navigate = useNavigate();

  // Handle fetch deliveries
  const handleFetchPrintingHistory = () => {
    const startDate = getValues("date_start") || today;
    const endDate = getValues("date_end") || today;

    const newPrintjobQueryConfig: PrintjobQueryConfig = {
      ...printjobQueryConfig,
      ...(startDate &&
        endDate && {
          date: [startDate, endDate],
        }),
    };
    navigate({
      pathname: mainPath.printinghistory,
      search: createSearchParams(
        newPrintjobQueryConfig as URLSearchParamsInit
      ).toString(),
    });
  };
  const { data, isLoading } =
    printjobQuery.useListPrintjob(printjobQueryConfig);
  const printJobs = data?.data.data || [];

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
      {isLoading && <LoadingSection />}
      {data && (
        <table className="border-collapse border border-white w-full bg-primary-blue">
          <thead>
            <tr>
              <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
                Thời gian
              </th>
              <th className="border border-white text-center p-[1.6rem] text-[2.4rem] text-white">
                Số bản
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
                  {printing.date}
                </td>
                <td className="border border-white text-center text-[1.6rem] p-[1rem] text-white">
                  {printing.copies}
                </td>
                <td className="border border-white text-[1.6rem] p-[1rem] pl-[3rem] text-white">
                  {printing.file_id}
                </td>
                <td className="border border-white text-[1.6rem] p-[1rem] pl-[3rem] text-white">
                  {printing.page_size}
                </td>
                <td className="border border-white text-center text-[1.6rem] p-[1rem] text-white">
                  {printing.printer_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
