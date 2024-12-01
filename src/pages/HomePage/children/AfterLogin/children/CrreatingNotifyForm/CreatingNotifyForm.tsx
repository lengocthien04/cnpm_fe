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
import printjobQuery from "../../../../../../hooks/queries/usePrintjobQuery";
import usePrintjobQueryConfig from "../../../../../../hooks/queryConfigs/usePrintjobQueryConfig";

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
  const printjobqueryconfig = usePrintjobQueryConfig();
  const { data: printjobdata, isLoading: isPrinjobLoading } =
    printjobQuery.useListPrintjob(printjobqueryconfig); // Fetch users

  const { mutate: createNotify } = notifyQuery.mutation.useCreatNotify(); // Mutation to create a notification

  // Users data
  const users = data?.data || [];
  const printjobs = printjobdata?.data || [];

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
  console.log(errors); // Check if any validation errors exist

  // Using useState for selected users (multiple)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  console.log(selectedUsers);
  const handleCheckboxChange = (id: string, isSelected: boolean) => {
    setSelectedUsers((prev) => {
      if (isSelected) {
        return [...prev, id];
      } else {
        return prev.filter((userId) => userId !== id);
      }
    });
  };
  const [selectedPrintjobs, setSelectedPrintjobs] = useState<string>();

  if (isUsersLoading || isPrinjobLoading) {
    return <LoadingPage />;
  }

  const onSubmit = (data: NotifyCreateSchema) => {
    console.log("onSubmit triggered"); // Check if it's being logged
    const cleanedData = {
      ...data,
      printjob_id: selectedPrintjobs,
      receiver_ids: selectedUsers,
    };

    console.log("Form submitted with data:", cleanedData);

    createNotify(cleanedData, {
      onSettled: () => {
        console.log("Mutation settled");
      },
      onSuccess: () => {
        console.log("Notification created successfully");
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
        <h2 className="text-xl font-bold mb-4">Create Notification</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Select Users</label>
            <div className="px-[3rem] bg-white max-h-[20vh] overflow-auto">
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

          <select
            id="printjob_id"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            {...methods.register("printjob_id")}
            onChange={(e) => {
              setSelectedPrintjobs(e.target.value);
            }}
          >
            <option value="">Select Printjob (optional)</option>
            {printjobs.map((printjob) => (
              <option key={printjob.id} value={printjob.id}>
                {printjob.file_id}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <div className="flex justify-end mt-4 z-50">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-200"
            >
              Create Notification
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
