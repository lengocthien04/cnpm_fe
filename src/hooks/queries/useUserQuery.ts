import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../../api/user.api";

const useListUsers = () => {
  return useQuery({
    queryKey: ["user"], // No parameters for the query
    queryFn: userApi.listUsers, // Assuming `listUsers` doesn't require parameters
  });
};
const useGetme = () => {
  return useQuery({
    queryKey: ["user"], // No parameters for the query
    queryFn: userApi.getMe, // Assuming `listUsers` doesn't require parameters
  });
};

const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
  });
};

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
  useListUsers,
  useGetUserById,
  useGetme,
  mutation: {
    useCreateMultipleUsers,
    useUserLogin,
    useDeleteUsers,
  },
};

export default userQuery;
