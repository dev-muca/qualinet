import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
}

export default function Radio({ label, checked, ...props }: RadioProps) {
  return (
    <label className="cursor-pointer flex items-center gap-1.5 select-none group">
      <div
        className={twMerge(
          "w-4 h-4 bg-slate-700 border border-slate-500 rounded-full relative group-hover:border-white",
          checked &&
            "border-white after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-2.5 after:h-2.5 after:rounded-full after:animate-jump after:animate-duration-300 after:animate-ease-linear"
        )}
      ></div>
      <input type="radio" className="hidden" checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
}
