import { InputHTMLAttributes, ReactNode, useId } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  notifyMessage?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export default function AccountInput({
  name,
  register,
  rules,
  label,
  required = false,
  disabled = false,
  errorMessage,
  ...rest
}: Props) {
  const inputId = useId();

  return (
    <div className="relative my-2 w-full">
      <div className="flex items-center w-full min-h-[2.8rem] border border-gray-300 rounded-lg p-2 bg-white">
        {label && <span className="mr-3">{label}</span>}

        <input
          id={inputId}
          className="w-full h-full bg-white border-none outline-none text-xl placeholder-gray-400 disabled:text-gray-400 disabled:bg-gray-200"
          disabled={disabled}
          required={required}
          {...register(name, rules)}
          {...rest}
        />
      </div>
      <p className="mt-1 text-sm text-red-500 font-normal">{errorMessage}</p>
    </div>
  );
}
