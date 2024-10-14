import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

import API_URL from "@/constants/API";
import { AuthContext } from "@/context/AuthContext";
import useErrors from "@/hooks/Errors/Hook";

export default function useForm(handleToggleModal: () => void, handleToggleButtonLoader: () => void) {
  const { auth } = useContext(AuthContext);

  const { errors, setErrors, clearAllErrors, getErrorMessage } = useErrors();
  const [userInformations, setUserInformations] = useState({
    name: "",
    type: "",
    email: "",
    password: "",
    tryPassword: "",
  });

  useEffect(() => {
    setUserInformations((prev) => ({ ...prev, type: "customer" }));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserInformations((prev) => ({ ...prev, [name]: value }));
  };

  const clearUserInformations = () =>
    setUserInformations({
      name: "",
      type: "customer",
      email: "",
      password: "",
      tryPassword: "",
    });

  const handleSubmitRegisterForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAllErrors();
    handleToggleButtonLoader();

    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userInformations),
    });

    const { errors, register } = await res.json();

    if (errors) {
      handleToggleButtonLoader();
      return setErrors(errors);
    }

    handleToggleButtonLoader();
    handleToggleModal();
  };

  const handleSubmitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAllErrors();
    handleToggleButtonLoader();

    const data = await auth({ email: userInformations.email, password: userInformations.password });

    handleToggleButtonLoader();
    if (data) return setErrors(data.errors);
  };

  return {
    errors,
    userInformations,
    clearErrors: clearAllErrors,
    handleInputError: getErrorMessage,
    handleInputChange,
    clearUserInformations,
    handleSubmitLoginForm,
    handleSubmitRegisterForm,
  };
}
