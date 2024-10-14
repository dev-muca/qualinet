import Image from "next/image";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";
import { LoaderCircle } from "lucide-react";

import Alert from "@/components/ui/Alert";
import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";

import useForm from "./hooks/useForm";
import useAnimation from "./hooks/useAnimation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Page() {
  const {
    showModal,
    buttonLoader,
    startAnimation,
    showRegisterForm,
    handleToggleModal,
    handleToggleButtonLoader,
    handleToggleRegisterForm,
  } = useAnimation();

  const {
    userInformations,
    clearErrors,
    handleInputError,
    handleInputChange,
    clearUserInformations,
    handleSubmitLoginForm,
    handleSubmitRegisterForm,
  } = useForm(handleToggleModal, handleToggleButtonLoader);

  useEffect(() => {
    clearErrors();
    clearUserInformations();
  }, [showRegisterForm]);

  return (
    <>
      {showModal && (
        <Alert.Background>
          <Alert.Modal title="Registro concluído!" clickOutside={handleToggleModal}>
            Seu registro foi concluído com sucesso! Por favor, efetue login seu login clicando{" "}
            <button
              onClick={() => {
                handleToggleRegisterForm();
                handleToggleModal();
              }}
              className="underline"
            >
              aqui
            </button>{" "}
            para voltar.
          </Alert.Modal>
        </Alert.Background>
      )}
      <div className="w-screen h-screen overflow-hidden bg-white grid place-items-center">
        <main className="flex overflow-hidden shadow-xl rounded-md border border-zinc-200">
          <section className="min-w-[420px] min-h-[36rem] rounded-l-md bg-slate-800 p-8">
            {/* LOGIN */}
            {!showRegisterForm && (
              <form
                onSubmit={handleSubmitLoginForm}
                className={twMerge(
                  "h-full flex flex-col justify-center items-center text-white",
                  startAnimation && "animate-fade animate-duration-[500ms] animate-reverse"
                )}
              >
                <h1 className="mb-8 flex flex-row justify-between items-center gap-6">
                  <Image src="/images/handshake.png" alt="Mãos se comprimentando" width={64} height={64} />
                  <div className={twMerge("text-4xl flex flex-col divide-y divide-slate-600", poppins.className)}>
                    <span className="pb-1">QualiNet</span>
                    <span className="text-xs pt-1">Feedback entre clientes e fornecedores!</span>
                  </div>
                </h1>
                <Input
                  name="email"
                  type="email"
                  label="E-mail:"
                  placeholder="email@dominio.com"
                  value={userInformations.email}
                  onChange={handleInputChange}
                  error={handleInputError("email")}
                  theme="dark"
                />
                <Input
                  name="password"
                  type="password"
                  label="Senha:"
                  placeholder="************"
                  value={userInformations.password}
                  onChange={handleInputChange}
                  error={handleInputError("password")}
                  theme="dark"
                />
                <Button loading={buttonLoader} className="mt-4">
                  Entrar
                </Button>
                <p className="text-center text-gray-300 text-sm mt-6">
                  Ainda não possuí uma conta?{" "}
                  <span className="underline cursor-pointer" onClick={handleToggleRegisterForm}>
                    Cadastre-se aqui!
                  </span>
                </p>
              </form>
            )}

            {/* REGISTER */}
            {showRegisterForm && (
              <form
                onSubmit={handleSubmitRegisterForm}
                className={twMerge(
                  "h-full flex flex-col justify-center items-center text-white",
                  !startAnimation && "animate-fade animate-duration-[500ms] animate-reverse"
                )}
              >
                <h1 className="text-2xl text-center mb-8">Registrar-se</h1>
                <div className="flex gap-4 items-center mb-4">
                  <Radio
                    name="type"
                    value="customer"
                    label="Sou Cliente!"
                    checked={userInformations.type === "customer"}
                    onChange={handleInputChange}
                    theme="dark"
                  />
                  <Radio
                    name="type"
                    value="supplier"
                    label="Sou Fornecedor!"
                    checked={userInformations.type === "supplier"}
                    onChange={handleInputChange}
                    theme="dark"
                  />
                </div>
                <Input
                  name="name"
                  type="text"
                  label="Nome:"
                  placeholder="Seu nome ou razão social"
                  value={userInformations.name}
                  onChange={handleInputChange}
                  error={handleInputError("name")}
                  theme="dark"
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail:"
                  placeholder="email@dominio.com"
                  value={userInformations.email}
                  onChange={handleInputChange}
                  error={handleInputError("email")}
                  theme="dark"
                />
                <Input
                  name="password"
                  type="password"
                  label="Senha:"
                  placeholder="************"
                  value={userInformations.password}
                  onChange={handleInputChange}
                  error={handleInputError("password")}
                  theme="dark"
                />
                <Input
                  name="tryPassword"
                  type="password"
                  label="Repetir sua senha:"
                  placeholder="************"
                  value={userInformations.tryPassword}
                  onChange={handleInputChange}
                  error={handleInputError("tryPassword")}
                  theme="dark"
                />
                <Button type="secundary" loading={buttonLoader} className="mt-6">
                  Registrar-se
                </Button>
                <p className="text-center text-gray-300 text-sm mt-6">
                  Já possuí uma conta?{" "}
                  <span className="underline cursor-pointer" onClick={handleToggleRegisterForm}>
                    Entre por aqui!
                  </span>
                </p>
              </form>
            )}
          </section>
          <Image
            src="/images/office.jpg"
            alt="Uma imagem de um escritório"
            width={384}
            height={576}
            className="min-w-96 rounded-r-md"
          />
        </main>
      </div>
    </>
  );
}
