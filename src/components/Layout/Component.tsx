import { ReactNode } from "react";
import { Users } from "lucide-react";

import Menu from "../Menu";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 flex">
      <aside className="w-80 h-screen bg-slate-800 relative">
        <h1 className="text-xl text-white font-semibold text-center py-6">
          Portal Cliente
        </h1>
        <Menu
          itemsMenu={[
            { link: "/orders", label: "Pedidos" },
            // { link: "/supplier", label: "Fornecedor" },
          ]}
        />
        <p className="w-full text-center text-gray-400 hover:text-white cursor-pointer absolute bottom-2">
          Encerrar
        </p>
      </aside>
      <main className="w-full block">
        <header className="bg-white w-full h-20">
          <h2 className="text-2xl pl-6 flex items-center h-full">Subtitle</h2>
        </header>
        <div className="p-4 w-full h-full">{children}</div>
      </main>
    </div>
  );
}
