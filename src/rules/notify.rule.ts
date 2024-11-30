import * as yup from "yup";

export const notifyCreateSchema = yup.object({
  reciever_id: yup.string().required("Required"),
  message: yup.string().required("Required"),
  printjob_id: yup.string(),
});
export type NotifyCreateSchema = yup.InferType<typeof notifyCreateSchema>;
