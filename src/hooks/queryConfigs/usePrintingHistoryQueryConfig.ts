import { PrintingHistoryQueryConfig } from "../../types/printinghistory.type";
import useQueryParams from "./useQueryParams";
import { isUndefined, omitBy } from "lodash";

export default function usePrintingHistoryQueryConfig() {
  const queryParams: PrintingHistoryQueryConfig = useQueryParams();
  const queryConfig: PrintingHistoryQueryConfig = omitBy(
    {
      date: queryParams.date,
    },
    isUndefined
  );
  return queryConfig;
}
