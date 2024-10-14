import { useEffect, useState } from "react";

interface LayoutProps {
  title: string;
}

export default function useLayout() {
  const [modal, setModal] = useState<boolean>(false);
  const [layout, setLayout] = useState<LayoutProps | undefined>(null!);

  useEffect(() => {
    const getRoles = async () => {
      const session = sessionStorage.getItem("session");
      if (session) {
        const { userInformation, token } = JSON.parse(session);
        setLayout((prev) => ({
          ...prev,
          title: userInformation.type == "customer" ? "Portal Cliente" : "Portal Fornecedor",
        }));
      }
    };
    getRoles();
  }, []);

  const handleToggleModal = () => setModal((prev) => !prev);

  return { layout, modal, handleToggleModal };
}
