export const api = {
  guardarRespuesta(payload) {
    return new Promise((resolve, reject) => {
      if (!(window.google && google.script && google.script.run)) {
        // Extra fallback (in addition to the one in main.jsx)
        console.log('[API Fallback] guardarRespuesta', payload)
        return resolve({ ok: true })
      }
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        .guardarRespuesta(payload)
    })
  }
}
