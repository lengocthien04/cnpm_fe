import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import printjobApi from "../../api/printjob.api";
import { PrintjobQueryConfig } from "../../types/printjob.type";

const useListPrintjob = (qf: PrintjobQueryConfig) => {
  return useQuery({
    queryKey: ["printjob", qf],
    queryFn: () => printjobApi.listPrintJob(qf),
    enabled: !!qf,
  });
};

const useGetPrintjobById = (id: string) => {
  return useQuery({
    queryKey: ["printjob", id],
    queryFn: () => printjobApi.getPrintjobById(id),
  });
};

// ! Mutations

const useCreateMultiplePrintjob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: printjobApi.createMultiplePrintjobs,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["printjob"],
      });
    },
  });
};

// const useUpdateprintjobById = (id: string) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: printjobApi.updateprintjobById,
//     onSuccess() {
//       queryClient.invalidateQueries({
//         queryKey: ["printjob"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["printjob", id],
//       });
//     },
//   });
// };

const useDeletePrintjob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: printjobApi.deletePrintjob,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["printjob"],
      });
    },
  });
};

const printjobQuery = {
  useListPrintjob,
  useGetPrintjobById,
  mutation: {
    useCreateMultiplePrintjob,
    useDeletePrintjob,
  },
};

export default printjobQuery;
