import { NotifyQueryConfig } from "../../types/notify.type";
import useQueryParams from "./useQueryParams";
import { isUndefined, omitBy } from "lodash";

export default function useNotifyQueryConfig() {
  const queryParams: NotifyQueryConfig = useQueryParams();
  const queryConfig: NotifyQueryConfig = omitBy(
    {
      receiver_ids: queryParams.receiver_ids,
      prinjob_id: queryParams.printjob_id,
    },
    isUndefined
  );
  return queryConfig;
}
