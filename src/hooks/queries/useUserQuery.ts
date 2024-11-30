import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../api/user.api";

// const useListUsers = (qf: UserQueryConfig) => {
//   return useQuery({
//     queryKey: ["user", qf],
//     queryFn: () => userApi.listUsers(qf),
//     enabled: !!qf,
//   });
// };

// const useGetUserById = (id: string) => {
//   return useQuery({
//     queryKey: ["user", id],
//     queryFn: () => userApi.getUserById(id),
//   });
// };

// ! Mutations

const useUserLogin = () =>
  useMutation({
    mutationFn: userApi.userLogin,
  });

const useCreateMultipleUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createMultipleUsers,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// const useUpdateUserById = (id: string) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: userApi.updateUserById,
//     onSuccess() {
//       queryClient.invalidateQueries({
//         queryKey: ["user"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["user", id],
//       });
//     },
//   });
// };

const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.deleteUsers,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

const userQuery = {
  mutation: {
    useCreateMultipleUsers,
    useUserLogin,
    useDeleteUsers,
  },
};

export default userQuery;
