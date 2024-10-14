import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  theme?: "dark" | "light";
}

export default function Radio({ label, checked, theme = "light", ...props }: RadioProps) {
  const themeToClass = {
    dark: {
      background: "w-4 h-4 bg-slate-700 border border-slate-500 rounded-full relative group-hover:border-white",
      dot: "border-white after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-2.5 after:h-2.5 after:rounded-full after:animate-jump after:animate-duration-300 after:animate-ease-linear",
    },
    light: {
      background: "w-4 h-4 bg-white border border-gray-500 rounded-full relative group-hover:border-black",
      dot: "border-black after:absolute after:top-0.5 after:left-0.5 after:bg-black after:w-2.5 after:h-2.5 after:rounded-full after:animate-jump after:animate-duration-300 after:animate-ease-linear",
    },
  };

  const defaultClassNameDot = twMerge(checked && themeToClass[theme].dot);
  const defaultClassNameBackground = twMerge(themeToClass[theme].background);
  const defaultClassName = twMerge(defaultClassNameBackground, defaultClassNameDot);

  return (
    <label className="cursor-pointer flex items-center gap-1.5 select-none group">
      <div className={defaultClassName}></div>
      <input type="radio" className="hidden" checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
}
