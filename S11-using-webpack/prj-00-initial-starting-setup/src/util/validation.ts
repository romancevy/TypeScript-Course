//* Validation Functionality
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// eine Funktion "validate", die ein Objekt mit dem Interface "Validatable" als Parameter erwartet.
export function validate(validatableInput: Validatable) {
  let isValid = true;
  // Wenn das Objekt required enthält, prüfen, ob es einen Wert hat, der nicht leer ist
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // Wenn das Objekt minLength enthält und der Wert eine Zeichenkette ist, prüfen, ob die Zeichenkette die minimale Länge hat
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  // Wenn das Objekt maxLength enthält und der Wert eine Zeichenkette ist, prüfen, ob die Zeichenkette die maximale Länge hat
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  // Wenn das Objekt min enthält und der Wert eine Zahl ist, prüfen, ob die Zahl die minimale Größe hat
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  // Wenn das Objekt max enthält und der Wert eine Zahl ist, prüfen, ob die Zahl die maximale Größe hat
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  // Rückgabe des Validierungsergebnisses (true oder false)
  return isValid;
}
