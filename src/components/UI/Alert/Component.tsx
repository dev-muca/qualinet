import { ReactNode } from "react";

export function Background({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen grid place-items-center bg-slate-100 absolute z-10 bg-opacity-50 animate-fade animate-duration-[500ms]">
      {children}
    </div>
  );
}

export function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-80 bg-slate-800 text-white shadow-xl rounded p-2 animate-jump animate-ease-out">
      {children}
    </div>
  );
}
