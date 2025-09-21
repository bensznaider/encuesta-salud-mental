import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// window.google.script.run only exists inside the Google Apps Script environment.
// To support local development (and the portfolio/demo version), we define a mock.
// This mock does not store any data: it simply logs the payload to the console
// and simulates a successful response after a short delay.
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
