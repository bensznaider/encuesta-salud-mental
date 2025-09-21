import { RadioQuestionCard } from "./QuestionCards";
import { useState, useEffect } from "react";
import { api } from "../api";

export default function QuestionsSection({
  questions,
  currentSection,
  setCurrentSection,
  form,
  setForm,
  flag,
  initialValues,
  endsForm = false,
  phq9Enabled,
  gad7Enabled,
}) {
  const [continueEnabled, setContinueEnabled] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const allFilled = form[flag].every((value) => typeof value === "number");
    setContinueEnabled(allFilled);
  }, [form, flag]);

  const handleContinue = () => {
    if (!endsForm) {
      setCurrentSection((section) => section + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  async function handleSubmit() {
    try {
      setSending(true);

      const payload = {
        apellido: form.apellido?.trim() ?? "",
        nombre: form.nombre?.trim() ?? "",
        dni: form.dni?.trim() ?? "",
        telefono: form.telefono?.trim() ?? "",
        fecha: new Date().toISOString(),
        phq2: (form.basic[0] ?? 0) + (form.basic[1] ?? 0),
        gad2: (form.basic[2] ?? 0) + (form.basic[3] ?? 0),
        phq9: phq9Enabled ? form.phq9.reduce((a, v) => a + (v ?? 0), 0) : null,
        gad7: gad7Enabled ? form.gad7.reduce((a, v) => a + (v ?? 0), 0) : null,
      };

      await api.guardarRespuesta(payload);
      setSending(false);
      setCurrentSection((section) => section + 1);
    } catch (e) {
      setSending(false);
      setErrorMessage(
        "Ocurrió el siguiente error al enviar, por favor informar al administrador del sitio: " +
          (e?.message || e)
      );
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="section-title-box">
        {flag === "basic"
          ? "Preguntas iniciales"
          : `En base a sus respuestas a las preguntas iniciales, le proponemos continuar con las siguientes preguntas ${
              currentSection === 3 && "(2/2)"
            }`}
      </div>
      <div
        style={{
          backgroundColor: "#005699",
          color: "white",
          borderRadius: "10px",
          padding: "1.5rem",
        }}
      >
        {"Durante las "}
        <b>
          <u>últimas 2 semanas</u>
        </b>
        {", ¿con qué frecuencia le han molestado los siguientes problemas?"}
      </div>
      {questions.map((question, index) => (
        <RadioQuestionCard
          label={questions[index]}
          selected={form[flag][index]}
          fixedValue={
            typeof initialValues?.[index] === "number"
              ? initialValues[index]
              : undefined
          }
          onSelect={(value) =>
            setForm((f) => {
              const newArray = [...f[flag]];
              newArray[index] = value;
              return { ...f, [flag]: newArray };
            })
          }
        />
      ))}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ display: "flex", gap: "1rem" }}>
          <button
            className="continue-button"
            onClick={() => {
              setCurrentSection((section) => section - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Atrás
          </button>
          <button
            className={
              continueEnabled ? "continue-button" : "continue-button--disabled"
            }
            disabled={endsForm ? sending : !continueEnabled}
            onClick={handleContinue}
          >
            {!endsForm ? "Siguiente" : sending ? "Enviando..." : "Enviar"}
          </button>
        </span>
        <button
          className="clear-form-button"
          onClick={() =>
            setForm((f) => ({
              ...f,
              [flag]: initialValues,
            }))
          }
        >
          Borrar formulario
        </button>
      </div>
      {errorMessage && (
        <div
          className="question-box"
          style={{ backgroundColor: "red", color: "white" }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
