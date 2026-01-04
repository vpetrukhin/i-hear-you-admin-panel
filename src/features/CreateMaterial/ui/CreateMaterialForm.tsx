import { Form } from "@/shared/ui/Form"
import { useState } from "react";
import type { CreateFormStateType } from "../model/types";
import { MaterialContentField } from "./MaterialContentField";
import { MaterialParamsFields } from "./MaterialParamsFields";

interface Props {
  isCreateMaterialPending: boolean
  isCreateMaterialError: boolean
  materialErrorMessage?: string
  createMaterial: (formState: CreateFormStateType) => Promise<void>
  onCancelCreate: () => void
}

const defaultFormState: CreateFormStateType = {
  file: null,
  fileLink: "",
  name: "",
  description: "",
  category: null,
  topic: null,
  paths: [],
};

export const CreateMaterialForm = ({ isCreateMaterialPending, isCreateMaterialError, onCancelCreate, createMaterial }: Props) => {
  const [formState, setFormState] = useState<CreateFormStateType>(
    defaultFormState,
  );

  const changeFormState = (newFormState: Partial<CreateFormStateType>) => {
    setFormState(prev => ({ ...prev, ...newFormState }))
  }

  const handleSubmit = async () => {
    await createMaterial(formState)
  }

  const handleCancel = () => {
    onCancelCreate()
  }

  const error = isCreateMaterialError ? 'Ошибка при создании файла' : ''

  return (
    <Form error={error} onCancel={handleCancel} onSubmit={handleSubmit} isPendingSubmit={isCreateMaterialPending}>
      <MaterialContentField formState={formState} changeFormState={changeFormState} />
      <MaterialParamsFields formState={formState} changeFormState={changeFormState} />
    </Form>
  )
}
