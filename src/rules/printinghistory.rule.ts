import * as yup from "yup";

export const printingHistorySchema = yup.object({
  date_start: yup.string(),
  date_end: yup.string(),
  vendor: yup.string(),
  item_name: yup.string(),
  pic: yup.string(),
  location: yup.string(),
  delivery_date_start: yup.string(),
  delivery_date_end: yup.string(),
});
export type PrintingHistorySchema = yup.InferType<typeof printingHistorySchema>;
