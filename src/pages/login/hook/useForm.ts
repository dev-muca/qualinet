import API_URL from "@/constants/API";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function useForm() {
  const [formState, setFormState] = useState({
    showModal: false,
    buttonLoader: false,
    startAnimation: false,
    showRegisterForm: false,
    currentUser: {
      user_id: null,
      type: "customer",
      email: "",
      fullname: "",
      password: "",
      retypedPassword: "",
    },
    inputError: { field: "", message: "" },
  });

  useEffect(() => {
    clearCurrentUser();
    clearInputErrors();
    setFormState((prev) => ({
      ...prev,
      currentUser: { ...prev.currentUser, type: formState.currentUser.type! },
    }));
  }, [formState.showRegisterForm]);

  const clearCurrentUser = () =>
    setFormState((prev) => ({
      ...prev,
      currentUser: {
        user_id: null,
        type: "customer",
        email: "",
        fullname: "",
        password: "",
        retypedPassword: "",
      },
    }));

  const clearInputErrors = () =>
    setFormState((prev) => ({
      ...prev,
      inputError: { field: "", message: "" },
    }));

  const enableRegisterForm = () => {
    setFormState((prev) => ({
      ...prev,
      startAnimation: !prev.startAnimation,
    }));
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        showRegisterForm: !prev.showRegisterForm,
      }));
    }, 600);
  };

  const handleUserType = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      currentUser: { ...prev.currentUser, type: value },
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormState((prev) => ({
      ...prev,
      currentUser: { ...prev.currentUser, [name]: value },
    }));
  };

  const handleSubmitRegisterForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearInputErrors();
    setFormState((prev) => ({ ...prev, buttonLoader: true }));

    fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formState.currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return setFormState((prev) => ({
            ...prev,
            inputError: data.error,
          }));
        }
        setFormState((prev) => ({ ...prev, showModal: true }));
      })
      .catch((err: any) => console.error(err.message))
      .finally(() =>
        setFormState((prev) => ({ ...prev, buttonLoader: false }))
      );
  };

  return {
    formState,
    handleUserType,
    handleInputChange,
    enableRegisterForm,
    handleSubmitRegisterForm,
  };
}
