//* Validation Functionality
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// eine Funktion "validate", die ein Objekt mit dem Interface "Validatable" als Parameter erwartet.
function validate(validatableInput: Validatable) {
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

//* Creating & Using an "Autobind" Decorator
function Autobind(
  _: any, // target - wird nicht verwendet
  _2e: string, // methodName - wird nicht verwendet
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  //   console.log(originalMethod);
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//* Rendering Project Lists
// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

//* DOM Element Selection & OOP Rendering
class ProjectInput {
  // definiere Variablen vom Typ...
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // `templateElement` wird auf das HTML-Template-Element mit der ID `project-input` gesetzt.
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    // `hostElement` wird auf das HTML-Div-Element mit der ID `app` gesetzt.
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    // Ein neues `DocumentFragment` wird erstellt und das `content` des `templateElement` wird diesem Fragment hinzugefügt.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // `element` wird auf das erste HTML-Formularelement innerhalb des `DocumentFragment` gesetzt.
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // interaktion mit dem Element (hinzufügen einer id)
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    // Die `attach`-Methode wird aufgerufen, um `element` an `hostElement` anzuhängen.
    this.attach();

    this.configure();
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
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    // `element` wird an den Anfang von `hostElement` angehängt.
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

// Eine Instanz der Klasse `ProjectInput` wird erstellt. Dies führt die Schritte im Konstruktor der Klasse aus.
// Das Ergebnis ist ein Eingabeabschnitt für Projektinformationen, der am Anfang des Elements mit der ID `app` angezeigt wird.
const projectInput = new ProjectInput();

const aktiveProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
