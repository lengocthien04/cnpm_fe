import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import printerApi from "../../api/printer.api";

const useListPrinters = () => {
  return useQuery({
    queryKey: ["printer"],
    queryFn: printerApi.listPrinters,
  });
};

// ! Mutations

const useCreateMultiplePrinters = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: printerApi.createPrinters,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["printer"],
      });
    },
  });
};

const useUpdatePrinterById = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: printerApi.updatePrinterbyID,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["printer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["printer", id],
      });
    },
  });
};

// const useDeleteUsers = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: userApi.deleteUsers,
//     onSuccess() {
//       queryClient.invalidateQueries({
//         queryKey: ["user"],
//       });
//     },
//   });
// };

const printerQuery = {
  useListPrinters,
  mutation: {
    useCreateMultiplePrinters,
    useUpdatePrinterById,
  },
};

export default printerQuery;
