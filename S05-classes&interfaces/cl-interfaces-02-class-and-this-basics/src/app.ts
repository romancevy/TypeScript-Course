class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  // adding a new method
  // providing a "hint" for TypeScript (about what "this" is):
  describe(this: Department) {
    console.log("Department: " + this.name);
  }
}

const accounting = new Department("Accounting");

accounting.describe();
// Ausgabe: Department: Accounting
// why? because it only points to the method, it doesn't provide arguments!

// const accountingCopy = { describe: accounting.describe };
// Ausgabe wäre :  Department: undefined
// weil this. auf die aktuelle Instant referenziert, jedoch hat die aktuelle Instanz (accountCopy)
// gar keine Eigenschaft mit der Bezeichnung "name"

// Die Lösung für dieses Problem wäre:
// 1. "this: type" Parameter in "describe"-method einfügen
// 2. "name" Eigenschaft in accountingCopy erstellen
const accountingCopy = { name: "DUMMY", describe: accounting.describe };

accountingCopy.describe();
// Ausgabe: Department: DUMMY
