import { InputQuestionCard } from "./QuestionCards";
import { useState, useEffect } from "react";

export default function PersonalDataSection({
  setCurrentSection,
  form,
  setForm,
}) {
  const [continueEnabled, setContinueEnabled] = useState(false);

  useEffect(() => {
    const allFilled = [
      form.apellido,
      form.nombre,
      form.dni,
      form.contactoPersonal,
    ].every((field) => field.trim().length > 0);
    setContinueEnabled(allFilled);
  }, [form]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="section-title-box">Datos personales</div>
      <InputQuestionCard
        label="Apellido"
        value={form.apellido}
        onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
      />
      <InputQuestionCard
        label="Nombre"
        value={form.nombre}
        onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
      />
      <InputQuestionCard
        label="DNI"
        value={form.dni}
        onChange={(e) => setForm((f) => ({ ...f, dni: e.target.value }))}
      />
      <InputQuestionCard
        label="Contacto personal"
        value={form.contactoPersonal}
        onChange={(e) =>
          setForm((f) => ({ ...f, contactoPersonal: e.target.value }))
        }
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          className={
            continueEnabled ? "continue-button" : "continue-button--disabled"
          }
          disabled={!continueEnabled}
          onClick={() => setCurrentSection((section) => section + 1)}
        >
          Siguiente
        </button>
        <button
          className="clear-form-button"
          onClick={() =>
            setForm((f) => ({
              ...f,
              apellido: "",
              nombre: "",
              dni: "",
              contactoPersonal: "",
            }))
          }
        >
          Borrar formulario
        </button>
      </div>
    </div>
  );
}
