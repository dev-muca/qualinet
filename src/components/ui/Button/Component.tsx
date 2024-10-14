import { LoaderCircle } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "primary" | "secundary" | "tertiary";
  loading?: boolean;
}

export default function Button({ children, type = "primary", loading = false, className, ...props }: ButtonProps) {
  const typesToClasses = {
    primary:
      "w-full py-1.5 mt-2 bg-blue-500 hover:bg-blue-400 text-white flex justify-center items-center rounded cursor-pointer transition-colors",
    secundary:
      "w-full py-1.5 mt-2 bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white flex justify-center items-center rounded cursor-pointer transition-colors",
    tertiary:
      "w-full py-1.5 mt-2 bg-blue-500 hover:bg-blue-400 flex justify-center items-center rounded cursor-pointer transition-colors",
  };

  const defaultClass = twMerge(typesToClasses[type], className);

  return (
    <button className={defaultClass} {...props}>
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  );
}
