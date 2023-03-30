// Konvention: beginnen mit Großbuchstaben
class Department {
  name: string; // field of a class

  // constructor (reserviertes Schlüsselwort) methode
  // Syntax: constructor(Argument/e) {...}
  constructor(n: string) {
    this.name = n;
    // this - referenziert auf die aktuelle Instanz der Klasse
  }
}

// Objekt (Instanz) einer Klasse erstellen
const accounting = new Department("Accounting");
console.log(accounting); // Ausgabe: Department {name: "accounting"}
