import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

//? Drag & Drop API
//? https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

// Eine Instanz der Klasse `ProjectInput` wird erstellt. Dies führt die Schritte im Konstruktor der Klasse aus.
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
