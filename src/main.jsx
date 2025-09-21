import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// MOCK de google.script.run para desarrollo local
if (!(window.google && window.google.script && window.google.script.run)) {
  window.google = {
    script: {
      run: {
        _ok: (x) => x,
        _err: (x) => x,
        withSuccessHandler(cb) {
          this._ok = cb;
          return this;
        },
        withFailureHandler(cb) {
          this._err = cb;
          return this;
        },
        guardarRespuesta(payload) {
          console.log("[MOCK] guardarRespuesta →", payload);
          setTimeout(() => this._ok({ ok: true }), 400);
        },
      },
    },
  };
}

createRoot(document.getElementById("root")).render(<App />);
