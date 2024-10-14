import { X } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  children: ReactNode;
  title?: string | ReactNode;
  clickOutside: () => void;
}

export function Background({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen grid place-items-center bg-slate-100 absolute z-10 bg-opacity-50 animate-fade animate-duration-[500ms]">
      {children}
    </div>
  );
}

export function Modal({ title, children, clickOutside }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      modalRef.current && !modalRef.current.contains(e.target as Node) && clickOutside();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clickOutside]);

  return (
    <div
      ref={modalRef}
      className="min-w-80 max-w-[480px] min-h-10 bg-slate-800 text-white shadow-xl rounded p-4 animate-jump animate-ease-out"
    >
      <div className="flex border-b border-slate-600 pb-3">
        {title && <h1 className="pl-1 font-semibold">{title}</h1>}
        <button className="absolute right-4" onClick={clickOutside}>
          <X />
        </button>
      </div>
      <section className="px-2 pt-2.5 pb-1 text-justify">{children}</section>
    </div>
  );
}
