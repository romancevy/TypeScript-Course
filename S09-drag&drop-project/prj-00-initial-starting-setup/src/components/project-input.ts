import { Component } from "./base-component.js";
import { Validatable, validate } from "../util/validation.js";
import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

//* DOM Element Selection & OOP Rendering
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  // definiere Variablen vom Typ...
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent() {}

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  // Funktion zur Erfassung von Benutzereingaben, die ein Tupel [string, string, number] zurückgibt oder void, wenn die Eingaben ungültig sind
  private gatherUserInput(): [string, string, number] | void {
    // Eingabefelder aus dem DOM-Element lesen
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // Erstellen von Validatable-Objekten, um die Eingabedaten zu validieren
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    // Überprüfen, ob die Validierung fehlschlägt
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      // Warnung ausgeben und die Funktion verlassen, wenn die Validierung fehlschlägt
      alert("Invalid input, please try again!");
      return;
    } else {
      // Rückgabe eines Tupels mit den validierten Benutzereingaben, wenn die Validierung erfolgreich ist
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // Leert die Input-Felder nach dem Submit
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
