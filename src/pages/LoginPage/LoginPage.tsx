import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/app.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorRespone, InputField } from "../../types/common.type";
import mainPath from "../../constants/path";
import AccountInput from "../../components/inputs/AccountInput";
import userQuery from "../../hooks/queries/useUserQuery";
import { isAxiosError } from "../../utils/utils";
import { setAccessTokenToLS, setProfileToLS } from "../../utils/auth";
import { isArray } from "lodash";
import createHttpStatusMessageMap from "../../constants/httpStatusMessage";
import { loginSchema, LoginSchema } from "../../rules/auth.rule";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../api/user.api";

type FormData = LoginSchema;

export default function LoginPage() {
  const { setIsAuthenticated, setLoadingPage, setProfile } =
    useContext(AppContext);
  const navigate = useNavigate();
  const getProfileMutation = useMutation({
    mutationFn: userApi.getMe,
  });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginForms: InputField[] = [
    {
      name: "username",
      title: "Mã số sinh viên",
      errorMsg: errors.username?.message,
      svgData: (
        <svg
          width="20"
          height="20"
          viewBox="-3 -3 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z"
            fill="#3B5FAD"
          />
        </svg>
      ),
    },
    {
      name: "password",
      title: "Mật khẩu",
      errorMsg: errors.password?.message,
      svgData: (
        <svg
          width="24"
          height="24"
          viewBox="-3 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z"
            fill="#3B5FAD"
          />
        </svg>
      ),
      type: "password",
    },
  ];

  const userLoginMutation = userQuery.mutation.useUserLogin();
  const onSubmit = handleSubmit((data) => {
    setLoadingPage(true);

    userLoginMutation.mutate(data, {
      onSettled() {
        setLoadingPage(false);
      },
      onSuccess(response) {
        const token = response.data;
        setAccessTokenToLS(token); // Save the token to localStorage or wherever needed

        // Proceed to get profile after login
        getProfileMutation
          .mutateAsync()
          .then((profileResponse) => {
            setIsAuthenticated(true);
            setProfileToLS(profileResponse.data); // Save profile data to localStorage
            setProfile(profileResponse.data); // Update profile in the state

            reset();
            navigate(mainPath.home);
          })
          .catch((error) => {
            console.error("Error fetching profile:", error);
          });
        navigate(mainPath.home);
      },
      onError: async (err) => {
        if (isAxiosError<ErrorRespone>(err)) {
          const formError = err.response?.data;
          if (formError) {
            const httpStatusMessageMap = await createHttpStatusMessageMap();
            const errorMessages = isArray(formError.message)
              ? formError.message.map(
                  (mess) => httpStatusMessageMap.get(mess) || mess
                )
              : [
                  httpStatusMessageMap.get(formError.message) ||
                    formError.message,
                ];
            setError("password", {
              message: errorMessages[0],
            });
          }
        }
      },
    });

    setLoadingPage(false);
  });

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-between bg-primary-background">
      <div className="w-[50vw] flex flex-col items-center justify-center bg-white">
        <img
          src="public/01_logobachkhoasang 1.png"
          alt="Bach Khoa Logo"
          className="mt-32 w-full max-w-xs object-contain"
        />
        <form
          className="mt-32 w-full max-w-xl flex flex-col items-center justify-center"
          onSubmit={onSubmit}
        >
          {loginForms.map((field) => (
            <div className="w-full mb-[2rem] " key={field.name}>
              <p>{field.title}</p>
              <AccountInput
                name={field.name}
                register={register}
                type={field.type || "text"}
                errorMessage={field.errorMsg}
                placeholder={field.title}
                label={field.svgData}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-4 mt-8 text-2xl font-bold text-white bg-primary-blue-unhover hover:bg-primary-blue rounded-md"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
