import { useState } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState<Errors[]>([]);

  const clearAllErrors = () => setErrors([]);

  const getErrorMessage = (name: string): string | undefined => {
    const errorObj = errors.find((error) => error.field === name);
    return errorObj ? errorObj.message : undefined;
  };

  return { errors, setErrors, clearAllErrors, getErrorMessage };
}
