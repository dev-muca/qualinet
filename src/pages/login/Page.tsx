import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { LoaderCircle } from "lucide-react";

import Input from "@/components/UI/Input";
import Radio from "@/components/UI/Radio";

import useForm from "./hook/useForm";
import Alert from "@/components/UI/Alert";

export default function Login() {
  const {
    formState,
    handleUserType,
    handleInputChange,
    enableRegisterForm,
    handleSubmitRegisterForm,
  } = useForm();

  return (
    <>
      {formState.showModal && (
        <Alert.Background>
          <Alert.Modal>Registrado com Sucesso!</Alert.Modal>
        </Alert.Background>
      )}
      <div className="w-screen h-screen overflow-hidden bg-white grid place-items-center">
        <main className="flex overflow-hidden shadow-xl rounded-md border border-zinc-200">
          <section className="min-w-96 min-h-[36rem] rounded-l-md bg-slate-800 p-8">
            {/* LOGIN */}
            {!formState.showRegisterForm && (
              <form
                className={twMerge(
                  "h-full flex flex-col gap-6 justify-center items-center text-white",
                  formState.startAnimation &&
                    "animate-fade animate-duration-[500ms] animate-reverse"
                )}
              >
                <h1 className="text-2xl text-center mb-8">Entrar</h1>
                <Input
                  type="email"
                  label="E-mail:"
                  placeholder="email@dominio.com"
                />
                <Input
                  type="password"
                  label="Senha:"
                  placeholder="************"
                />
                <button className="w-full py-1.5 mt-2 bg-blue-500 hover:bg-blue-400 flex justify-center items-center rounded cursor-pointer transition-colors">
                  {formState.buttonLoader ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Entrar"
                  )}
                </button>
                <p className="text-center text-gray-300 text-sm">
                  Ainda não possuí uma conta?{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={enableRegisterForm}
                  >
                    Cadastre-se aqui!
                  </span>
                </p>
              </form>
            )}
            {/* REGISTER */}
            {formState.showRegisterForm && (
              <form
                onSubmit={handleSubmitRegisterForm}
                className={twMerge(
                  "h-full flex flex-col gap-4 justify-center items-center text-white",
                  !formState.startAnimation &&
                    "animate-fade animate-duration-[500ms] animate-reverse"
                )}
              >
                <h1 className="text-2xl text-center mb-8">Registrar-se</h1>
                <div className="flex gap-4 items-center">
                  <Radio
                    name="type"
                    value="customer"
                    label="Sou Cliente!"
                    checked={formState.currentUser.type === "customer"}
                    onChange={() => handleUserType("customer")}
                  />
                  <Radio
                    name="type"
                    value="customer"
                    label="Sou Fornecedor!"
                    checked={formState.currentUser.type === "supplier"}
                    onChange={() => handleUserType("supplier")}
                  />
                </div>
                <Input
                  name="fullname"
                  value={formState.currentUser.fullname!}
                  type="text"
                  label="Nome:"
                  placeholder="Seu nome ou razão social"
                  onChange={handleInputChange}
                  errorMessage={
                    formState.inputError.field === "fullname" &&
                    formState.inputError.message
                  }
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail:"
                  placeholder="email@dominio.com"
                  value={formState.currentUser.email!}
                  onChange={handleInputChange}
                  errorMessage={
                    formState.inputError.field === "email" &&
                    formState.inputError.message
                  }
                />
                <Input
                  name="password"
                  type="password"
                  label="Senha:"
                  placeholder="************"
                  value={formState.currentUser.password!}
                  onChange={handleInputChange}
                  errorMessage={
                    formState.inputError.field === "password" &&
                    formState.inputError.message
                  }
                />
                <Input
                  name="retypedPassword"
                  type="password"
                  label="Repetir sua senha:"
                  placeholder="************"
                  value={formState.currentUser.retypedPassword!}
                  onChange={handleInputChange}
                  errorMessage={
                    formState.inputError.field === "retypedPassword" &&
                    formState.inputError.message
                  }
                />
                <button className="w-full py-1.5 mt-2 bg-blue-500 hover:bg-blue-400 flex justify-center items-center rounded cursor-pointer transition-colors">
                  {formState.buttonLoader ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Registrar"
                  )}
                </button>
                <p className="text-center text-gray-300 text-sm">
                  Já possuí uma conta?{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={enableRegisterForm}
                  >
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
