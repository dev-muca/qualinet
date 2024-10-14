import Link from "next/link";
import { ReactNode } from "react";

import Button from "../ui/Button";

export default function Menu({ itemsMenu }: { itemsMenu: Array<{ link: string; label: string; icon?: ReactNode }> }) {
  return (
    <ul className="p-4 space-y-2 text-white">
      {itemsMenu.map(({ link, label, icon }) => (
        <>
          <Button type="secundary" key={crypto.randomUUID()}>
            <Link className="w-full h-full" href={link}>
              {icon}
              {label}
            </Link>
          </Button>
        </>
      ))}
    </ul>
  );
}
