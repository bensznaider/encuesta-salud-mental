import {
  lowRiskMessage,
  depressionMessage,
  anxietyMessage,
  combinedMessage,
} from "../lib/messages";

export default function FinalMessageSection({ phq9Enabled, gad7Enabled }) {
  let resultMessage = "";

  if (!phq9Enabled && !gad7Enabled) {
    resultMessage = lowRiskMessage;
  } else if (phq9Enabled && gad7Enabled) {
    resultMessage = combinedMessage;
  } else if (phq9Enabled && !gad7Enabled) {
    resultMessage = depressionMessage;
  } else if (!phq9Enabled && gad7Enabled) {
    resultMessage = anxietyMessage;
  }

  return (
    <div className="question-box">
      <p>Gracias por participar de la encuesta.</p>
      <p>{resultMessage}</p>
    </div>
  );
}
