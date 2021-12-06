import Tesseract  from "tesseract.js";
import { WORKER_STATUS } from "../constants/workerStatus";

export const recognizeImage = (image, language, updateProgressCallBack, updateResultCallBack) => {
  return (
    Tesseract
      .recognize(
        image,
        language,
        { logger: m => updateProgressCallBack(m) }
      )
      .then(({ data: { text } }) => {
        updateResultCallBack(text)
        return text
      })
  )
}