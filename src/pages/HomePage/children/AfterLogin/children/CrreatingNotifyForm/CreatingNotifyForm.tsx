import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userQuery from "../../../../../../hooks/queries/useUserQuery";
import notifyQuery from "../../../../../../hooks/queries/useNotifyQuery";
import {
  notifyCreateSchema,
  NotifyCreateSchema,
} from "../../../../../../rules/notify.rule";
import LoadingPage from "../../../../../../components/loading/LoadingPage";

// Define the form props for TypeScript
interface NotifyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatingNotifyForm({
  isOpen,
  onClose,
}: NotifyFormProps) {
  const { data, isLoading: isUsersLoading } = userQuery.useListUsers(); // Fetch users

  const { mutate: createNotify } = notifyQuery.mutation.useCreatNotify(); // Mutation to create a notification

  // Users data
  const users = data?.data || [];

  // Form schema
  const schema = notifyCreateSchema;
  const methods = useForm<NotifyCreateSchema>({
    defaultValues: {
      receiver_ids: [],
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = methods;

  // Using useState for selected users (multiple)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const selectAllUsers = () => {
    setSelectedUsers(allSelected ? [] : users.map((u) => u.id));
    setValue("receiver_ids", allSelected ? [] : users.map((u) => u.id));
  };
  const allSelected = users.reduce((acc, u) => {
    return acc && selectedUsers.includes(u.id);
  }, true);
  const handleCheckboxChange = (id: string, isSelected: boolean) => {
    setSelectedUsers((prev) => {
      if (isSelected) {
        const newSelectedUsers = [...prev, id];
        setValue("receiver_ids", newSelectedUsers);
        return newSelectedUsers;
      } else {
        const newSelectedUsers = prev.filter((userId) => userId !== id);
        setValue("receiver_ids", newSelectedUsers);
        return newSelectedUsers;
      }
    });
  };

  if (isUsersLoading) {
    return <LoadingPage />;
  }

  const onSubmit = (data: NotifyCreateSchema) => {
    const cleanedData = {
      ...data,
      receiver_ids: selectedUsers,
    };

    createNotify(cleanedData, {
      onSettled: () => {},
      onSuccess: () => {
        reset();
        onClose();
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center ${!isOpen && "hidden"}`}
    >
      <div className="bg-primary-background p-6 rounded-lg w-[50vw] shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Tạo thông báo</h2>
        <form
          onSubmit={handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
        >
          <div className="mb-4">
            <div className="flex gap-2 items-center mb-4">
              <p className="block font-medium">Chọn người nhận</p>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`all-user`}
                  checked={allSelected} // Controlled checkbox state
                  onChange={selectAllUsers}
                  className="mr-2"
                />
                <label htmlFor={`all-user`} className="text-gray-700">
                  Tất cả
                </label>
              </div>
            </div>
            <div className="px-4 bg-white max-h-[20vh] overflow-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    value={user.id}
                    {...methods.register("receiver_ids")}
                    checked={selectedUsers.includes(user.id)} // Controlled checkbox state
                    onChange={(e) =>
                      handleCheckboxChange(user.id, e.target.checked)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`user-${user.id}`} className="text-gray-700">
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-2">
              Thông báo
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              {...methods.register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4 z-50">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Gửi thông báo
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          X
        </button>
      </div>
    </div>
  );
}
