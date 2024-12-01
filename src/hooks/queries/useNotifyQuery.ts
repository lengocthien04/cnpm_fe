import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notifyApi from "../../api/notify.api";
import { NotifyQueryConfig } from "../../types/notify.type";

const useListNotify = (qf: NotifyQueryConfig) => {
  return useQuery({
    queryKey: ["notify", qf],
    queryFn: () => notifyApi.listNotify(qf),
    enabled: !!qf,
  });
};

const useGetNotifyById = (id: string) => {
  return useQuery({
    queryKey: ["notify", id],
    queryFn: () => notifyApi.getNotifyById(id),
  });
};

// ! Mutations

const useCreatNotify = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notifyApi.createNotify,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notify"],
      });
    },
  });
};

// const useUpdatenotifyById = (id: string) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: notifyApi.updatenotifyById,
//     onSuccess() {
//       queryClient.invalidateQueries({
//         queryKey: ["notify"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["notify", id],
//       });
//     },
//   });
// };

const useDeleteNotify = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notifyApi.deleteNotify,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notify"],
      });
    },
  });
};

const notifyQuery = {
  useListNotify,
  useGetNotifyById,
  mutation: {
    useCreatNotify,
    useDeleteNotify,
  },
};

export default notifyQuery;
