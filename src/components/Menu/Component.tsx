import Link from "next/link";
import { ReactNode } from "react";

export default function Menu({
  itemsMenu,
}: {
  itemsMenu: Array<{ link: string; label: string; icon?: ReactNode }>;
}) {
  return (
    <ul className="p-4 space-y-2 text-white">
      {itemsMenu.map(({ link, label, icon }) => (
        <Link
          className="h-10 hover:bg-blue-500 rounded-md flex justify-start items-center gap-2 pl-4 cursor-pointer"
          href={link}
        >
          {icon}
          {label}
        </Link>
      ))}
    </ul>
  );
}
