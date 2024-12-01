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

// Convert date to a readable format (e.g., '2024-12-01 02:14 AM')
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString(); // You can format it further if needed
};

// Capitalize the first letter and replace underscores with spaces
const formatStatus = (status: string): string => {
  return status
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/(?:^\w|[A-Z]|\b\w|\s+\w)/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
};

const today = formatDateToString(new Date());

export default function PrintingHistoryPage() {
  const [, setSearchParams] = useSearchParams();

  // Use effect for resetting the search params only when the page is reloaded
  useEffect(() => {
    const isReload = performance.getEntriesByType("navigation").some((nav) => {
      return (nav as PerformanceNavigationTiming).type === "reload";
    });

    // Only update search params if it's a reload and params are not already set
    if (isReload) {
      const currentParams = convertToStringParams();
      const urlParams = new URLSearchParams(window.location.search);

      // Compare current params with existing params in the URL
      const shouldUpdateParams = !Array.from(urlParams.entries()).every(
        ([key, value]) => currentParams[key] === value
      );

      // Only update search params if different
      if (shouldUpdateParams) {
        setSearchParams(currentParams);
      }
    }
  }, [setSearchParams]); // Added dependency array so it runs once on mount

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
  const printJobs = data?.data || [];

  return (
    <div className="py-[4.8rem] px-[4.5rem] bg-white">
      <p className="font-[700] text-[2.4rem]">In ấn</p>
      <p className="font-[700] text-[1.6rem] mt-[3rem]">Thời gian</p>
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
              <th className="border border-white text-center p-[1.6rem] text-[2rem] text-white">
                Thời gian
              </th>
              <th className="border border-white text-center p-[1.6rem] text-[2rem] text-white">
                Số bản
              </th>
              <th className="border border-white text-center p-[1.6rem] text-[2rem] text-white">
                File in
              </th>
              <th className="border border-white text-center p-[1.6rem] text-[2rem] text-white">
                Số lượng giấy
              </th>
              <th className="border border-white text-center p-[1.6rem] text-[2rem] text-white">
                Máy in
              </th>
              <th className="border border-white text-center p-[1.6rem] text-[2rem] text-white">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {printJobs.map((printing, index) => (
              <tr key={index}>
                <td className="border border-white text-center text-[1.2rem] p-[1rem] text-white">
                  {formatDate(printing.created_at)}
                </td>
                <td className="border border-white text-center text-[1.2rem] p-[1rem] text-white">
                  {printing.copies}
                </td>
                <td className="border border-white text-[1.2rem] p-[1rem] text-white text-center">
                  {printing.file.name}
                </td>
                <td className="border border-white text-[1.2rem] p-[1rem]  text-white text-center">
                  {printing.num_pages}
                </td>
                <td className="border border-white text-center text-[1.2rem] p-[1rem] text-white">
                  {printing.printer.location}
                </td>
                <td className="border border-white text-center text-[1.2rem] p-[1rem] text-white">
                  {formatStatus(printing.print_status)}{" "}
                  {/* Apply status formatting */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
