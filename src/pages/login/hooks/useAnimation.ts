import { useState } from "react";

export default function useAnimation() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [buttonLoader, SetButtonLoader] = useState<boolean>(false);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleToggleAnimation = () => setStartAnimation((prev) => !prev);

  const handleToggleButtonLoader = () => SetButtonLoader((prev) => !prev);

  const handleToggleStartAnimation = () => setStartAnimation((prev) => !prev);

  const handleToggleRegisterForm = () => {
    setStartAnimation((prev) => !prev);
    setTimeout(() => {
      setShowRegisterForm((prev) => !prev);
    }, 600);
  };

  return {
    showModal,
    buttonLoader,
    startAnimation,
    showRegisterForm,
    handleToggleModal,
    handleToggleAnimation,
    handleToggleButtonLoader,
    handleToggleRegisterForm,
    handleToggleStartAnimation,
  };
}
