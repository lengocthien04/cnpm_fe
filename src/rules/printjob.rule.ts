import * as yup from "yup";

export const printjobCreateSchema = yup.object({
  file_id: yup.string().required("Required"),
  user_id: yup.string().required("Required"),
  printer_id: yup.string().required("Required"),
  page_size: yup.string().required("Required"),
  duplex: yup.string().required("Required"),
  copies: yup.number().required("Required"),
});
export type PrintjobCreateSchema = yup.InferType<typeof printjobCreateSchema>;
