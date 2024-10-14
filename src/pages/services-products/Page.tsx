import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";

import useForm from "./hooks/useForm";

export default function ServicesProdcuts() {
  const { formData, handleSubmitForm, handleInputChange, getErrorMessage } = useForm();

  return (
    <>
      <form onSubmit={handleSubmitForm} className="w-1/2 mx-auto mt-6">
        <Input
          name="name"
          label="Nome:"
          theme="light"
          value={formData.name}
          onChange={handleInputChange}
          error={getErrorMessage("name")}
        />
        <Input
          multiline
          theme="light"
          label="Descrição:"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={getErrorMessage("description")}
        />
        <div className="flex gap-4 items-center mb-6">
          <Radio
            name="type"
            value="product"
            label="Produto"
            checked={formData.type === "product"}
            onChange={handleInputChange}
          />
          <Radio
            name="type"
            value="service"
            label="Serviço"
            checked={formData.type === "service"}
            onChange={handleInputChange}
          />
        </div>
        <Button>Cadastrar</Button>
      </form>
    </>
  );
}
