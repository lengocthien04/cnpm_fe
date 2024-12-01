import * as yup from "yup";

export const printerCreateSchema = yup.object({
  location: yup.string().required("Required"),
  printer_code: yup.string().required("Required"),
});
export type PrinterCreateSchema = yup.InferType<typeof printerCreateSchema>;

export const updateUserSchema = yup.object({
  location: yup.string().required("Required"),
  printer_code: yup.string().required("Required"),
  status: yup.string().required("Required"),
});
export type UpdatePrinterSchema = yup.InferType<typeof updateUserSchema>;
