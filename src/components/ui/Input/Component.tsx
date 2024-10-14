import { InfoIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  theme?: "dark" | "light";
  multiline?: true;
}

export default function Input({ label, error, theme = "light", className, multiline, ...props }: InputProps) {
  const themeToClass = {
    dark: "border border-slate-600 text-white rounded bg-slate-700 py-1 px-2 outline-slate-600 outline-1",
    light: "border border-gray-300 text-black rounded bg-white py-1 px-2 outline-slate-600 outline-1",
  };

  const defaultClassName = twMerge(
    themeToClass[theme],
    error && "border-red-500 outline outline-red-700 text-red-500",
    className
  );

  return (
    <label className={twMerge("w-full flex flex-col gap-1 mb-7", !multiline && "max-h-[54px]")}>
      {label && <span className="pl-0.5">{label}</span>}
      {multiline ? (
        <textarea rows={3} className={defaultClassName} {...props}></textarea>
      ) : (
        <input className={defaultClassName} {...props} />
      )}
      {error && (
        <p className="w-full text-right text-xs text-red-400 flex justify-end items-center gap-1">
          <InfoIcon size={14} />
          {error}
        </p>
      )}
    </label>
  );
}
