import * as yup from "yup";

export const printerCreateSchema = yup.object({
  location: yup.string(),
  printer_code: yup.string(),
});
export type PrinterCreateSchema = yup.InferType<typeof printerCreateSchema>;

export const updateUserSchema = yup.object({
  location: yup.string(),
  printer_code: yup.string(),
  status: yup.string(),
});
export type UpdatePrinterSchema = yup.InferType<typeof updateUserSchema>;
