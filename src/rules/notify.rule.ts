import * as yup from "yup";

export const notifyCreateSchema = yup.object({
  receiver_ids: yup
    .array()
    .of(yup.string().required("Receiver ID is required"))
    .required("Receiver is required"),
  message: yup.string().required("Required"),
  printjob_id: yup.string(),
});
export type NotifyCreateSchema = yup.InferType<typeof notifyCreateSchema>;
