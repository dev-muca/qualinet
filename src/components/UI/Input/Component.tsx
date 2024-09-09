import { InfoIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string | boolean;
}

export default function Input({ label, errorMessage, ...props }: InputProps) {
  const defaultClassName = twMerge(
    "border border-slate-600 rounded bg-slate-700 py-1 px-2 outline-slate-600 outline-1 text-white",
    errorMessage && "border-red-500 outline outline-red-700 text-red-500"
  );
  return (
    <label className="w-full text-gray-300 flex flex-col gap-1">
      {label && <span className="pl-0.5">{label}</span>}
      <input className={defaultClassName} {...props} />
      {errorMessage && (
        <p className="w-full text-right text-xs text-red-400 flex justify-end items-center gap-1">
          <InfoIcon size={14} />
          {errorMessage}
        </p>
      )}
    </label>
  );
}
