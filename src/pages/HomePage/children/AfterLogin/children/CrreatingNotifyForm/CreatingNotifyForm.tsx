import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userQuery from "../../../../../../hooks/queries/useUserQuery";
import notifyQuery from "../../../../../../hooks/queries/useNotifyQuery";
import {
  notifyCreateSchema,
  NotifyCreateSchema,
} from "../../../../../../rules/notify.rule";
import LoadingPage from "../../../../../../components/loading/LoadingPage";
import printjobQuery from "../../../../../../hooks/queries/usePrintjobQuery";
import usePrintjobQueryConfig from "../../../../../../hooks/queryConfigs/usePrintjobQueryConfig";

// Define the form props for TypeScript
interface NotifyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatingNotifyForm: React.FC<NotifyFormProps> = ({ isOpen, onClose }) => {
  const { data, isLoading: isUsersLoading } = userQuery.useListUsers(); // Fetch users
  const printjobqueryconfig = usePrintjobQueryConfig();
  const { data: printjobdata, isLoading: isPrinjobLoading } =
    printjobQuery.useListPrintjob(printjobqueryconfig); // Fetch users

  const { mutate: createNotify } = notifyQuery.mutation.useCreatNotify(); // Mutation to create a notification

  // Users data
  const users = data?.data || [];
  const printjobs = printjobdata?.data.data || [];

  // Form schema
  const schema = notifyCreateSchema;
  const methods = useForm<NotifyCreateSchema>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // Using useState for selected users (multiple)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  console.log(selectedUsers);
  // Fetch users on loading
  if (isUsersLoading || isPrinjobLoading) {
    return <LoadingPage />;
  }

  // Handle form validation errors

  // Handle submit logic
  const onSubmit = (data: NotifyCreateSchema) => {
    const cleanedData = { ...data, receiver_ids: selectedUsers }; // Add selected users as an array to the form data

    // Additional custom validation

    createNotify(cleanedData, {
      onSettled: () => {},
      onSuccess: () => {
        reset(); // Reset form after success
        onClose(); // Close modal
      },
      onError: () => {},
    });
  };

  // Reset selected users when modal opens

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ${!isOpen && "hidden"}`}
    >
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Create Notification</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Receiver Selection (Multiple) */}
          <div className="mb-4">
            <label htmlFor="receiver_ids" className="block font-medium mb-2">
              Select Users
            </label>
            <select
              id="receiver_ids"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              multiple
              {...methods.register("receiver_ids")}
              onChange={(e) => {
                const options = e.target.selectedOptions;
                const selectedValues = Array.from(
                  options,
                  (option) => option.value
                );
                setSelectedUsers(selectedValues); // Update the selected users array
              }}
            >
              <option value="">Select Users</option>
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  className={`${
                    selectedUsers.includes(user.id)
                      ? "bg-blue-100 text-blue-800"
                      : ""
                  }`} // Highlight selected option
                >
                  {user.name}
                </option>
              ))}
            </select>
            {errors.receiver_ids && (
              <p className="text-red-500 text-sm">
                {errors.receiver_ids.message}
              </p>
            )}
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-2">
              Message
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

          {/* Optional Print Job ID */}
          <select
            id="printjob_id"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...methods.register("printjob_id")}
          >
            <option value="">Select Printjob</option>
            {printjobs.map((printjob) => (
              <option key={printjob.id} value={printjob.id}>
                {printjob.copies}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Create Notification
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CreatingNotifyForm;
