import { ReactNode, useContext, useId } from "react";

import Menu from "../Menu";
import useLayout from "./hooks/useLayout";
import { AuthContext } from "@/context/AuthContext";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

export default function Layout({ children }: { children: ReactNode }) {
  const { logout } = useContext(AuthContext);
  const { layout, modal, handleToggleModal } = useLayout();

  return (
    <>
      {modal && (
        <Alert.Background>
          <Alert.Modal title="Encerrando sessão..." clickOutside={handleToggleModal}>
            Sua sessão será encerrada, você será redirecionado para tela inicial após clicar no botão abaixo.
            <Button onClick={logout} className="mt-4">
              Encerrar
            </Button>
          </Alert.Modal>
        </Alert.Background>
      )}
      <div className="w-screen h-screen overflow-hidden bg-gray-100 flex">
        <aside className="w-80 h-screen bg-slate-800 relative">
          <h1 className="text-xl text-white font-semibold text-center py-6">{layout?.title}</h1>
          <Menu
            itemsMenu={[
              { link: "/services-products", label: "Produtos/Serviços" },
              { link: "/supplier", label: "Fornecedores" },
              { link: "/feedback", label: "Avaliações" },
              { link: "/teste", label: "Testes" },
            ]}
          />
          <p
            className="w-full text-center text-gray-400 hover:text-white cursor-pointer absolute bottom-2"
            onClick={handleToggleModal}
          >
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
    </>
  );
}
