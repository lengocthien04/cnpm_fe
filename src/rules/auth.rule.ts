import * as yup from "yup";

const handleEmailYup = () => {
  return yup
    .string()
    .required("Email address is required")
    .email("Incorrect email format")
    .min(5, "Email address must have at least 5 characters")
    .max(160, "Email address can only have a total length of 160 characters");
};

const handlePasswordYup = () => {
  return yup.string().required("Password is required");
};
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref(refString)], "Passwords do not match");
};

export const registerSchema = yup.object({
  email: handleEmailYup(),
  password: handlePasswordYup(),
  confirm_password: handleConfirmPasswordYup("password"),
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
});
export type RegisterSchema = yup.InferType<typeof registerSchema>;

export const requestVerifySchema = yup.object({
  email: handleEmailYup(),
});
export type RequestVerifySchema = yup.InferType<typeof requestVerifySchema>;

export const loginSchema = yup.object({
  username: yup.string().required("ID is required"),
  password: yup.string().required("Password is required"),
});
export type LoginSchema = yup.InferType<typeof loginSchema>;
