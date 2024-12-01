import { PrintjobQueryConfig } from "../../types/printjob.type";
import useQueryParams from "./useQueryParams";
import { isUndefined, omitBy } from "lodash";

export default function usePrintjobQueryConfig() {
  const queryParams: PrintjobQueryConfig = useQueryParams();
  const queryConfig: PrintjobQueryConfig = omitBy(
    {
      date: queryParams.date,
    },
    isUndefined
  );
  return queryConfig;
}
