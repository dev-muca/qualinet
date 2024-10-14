import { useState, ChangeEvent, FormEvent } from "react";

import API_URL from "@/constants/API";
import useErrors from "@/hooks/Errors";

interface FormData {
  name: string;
  description: string;
  type: "product" | "service";
}

export default function useForm() {
  const { errors, setErrors, clearAllErrors, getErrorMessage } = useErrors();
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    type: "product",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleButtonLoader = () => setButtonLoader((prev) => !prev);

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAllErrors();
    handleToggleButtonLoader();

    const res = await fetch(formData.type == "product" ? `${API_URL}/product` : `${API_URL}/service`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    const { errors } = await res.json();

    if (errors) {
      handleToggleButtonLoader();
      return setErrors(errors);
    }

    handleToggleButtonLoader();
  };

  return { formData, handleSubmitForm, handleInputChange, getErrorMessage };
}
