# TypeScript Notes

- syntaktische Erweiterung (Syntactic Superset) von JavaScript, die eine statische Typisierung hinzufügt
- Typüberprüfung zur Kompilierungszeit d.h.
  - überprüft, ob die Typen **vor** dem Ausführen des Codes übereinstimmen.
  - überprüft **nicht** während des Ausführens des Codes.
  - Dadurch können Fehler frühzeitig erkannt werden.

## [Installing TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html)

- Version check

  ```bash
  tsc -v
  ```

- Global

  ```bash
  npm install -g typescript
  ```

- Project based (as dev dependencie )

  ```bash
  npm install typescript --save-dev
  ```

### The TypeScript Compiler (and its Configuration)

- Watch Mode
  - kompiliert spezifische Datei nach dem speichern
  ```bash
  tsc app.ts --watch
  or
  tsc app.ts -w
  ```

## Type Inference

TypeScript kann den Datentyp einer Variablen **ableiten**, wenn wir Werte zuweisen. Wenn wir zum Beispiel einer Variablen einen Zahlenwert zuweisen, erkennt TypeScript automatisch, dass der Wert eine Zahl ist, ohne dass wir explizit im Code angeben müssen, dass die Variable den Datentyp "number" hat.

```tsx
let number: number; // Good practice to tell TS which value will be stored

let number1 = 5; // Inference, TS detect `number1` store a number
number1 = "1"; // Type '"1"' is not assignable to type 'number'.
```

> ❗️Important: It is string and number (etc.), **NOT** String, Number etc. The core primitive types in TypeScript are all **lowercase**!

## Types

- String
  ```tsx
  // Primitive
  const myName: string = "Roman";
  ```
- Number
  ```tsx
  // Primitive
  const myAge: number = 29;
  ```
- Boolean
  ```tsx
  // Primitive
  const isAwake: boolean = true;
  ```
- [Undefined](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)
  **`undefined`** wird implizit zugewiesen, wenn eine Variable deklariert wurde, aber kein Wert zugewiesen wurde.
  ```tsx
  // Primitive
  let myNumber: number = undefined;
  console.log(myNumber); // Ausgabe: undefined
  ```
- [Null](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)

  `null` ist ein expliziter Wert, der verwendet wird, um anzuzeigen, dass eine Variable bewusst leer ist oder kein Wert hat.

  ```tsx
  // Primitive
  let myString: string = null;
  console.log(myString); // Ausgabe: null
  ```

  ⚠️ Es wird empfohlen `strictNullChecks: true` zu aktivieren! Dadurch müssen Variablen und Parameter explizit als `null` der `undefined` deklariert werden.
  Es schützt vor potenziellen Fehlern im Code z.B.

  ```tsx
  // strictNullChecks: false
  let myString: string = null; // okay
  let myNumber: number = undefined; // okay
  let myBoolean: boolean = undefined; // okay
  ```

- Void

  In TypeScript ist "void" ein Typ, der signalisiert, dass eine Funktion keinen Rückgabewert hat. Wenn eine Funktion als "void" deklariert ist, bedeutet dies, dass sie nichts zurückgibt und nur zur Ausführung von Anweisungen verwendet wird.

  ⚠️ Dies bedeutet jedoch nicht, dass die Funktion keinen Wert zurückgibt. Tatsächlich gibt die Funktion implizit den Wert "undefined" zurück, wenn sie keine andere explizite Rückgabe hat.

  ```tsx
  function sayHello(): void {
    console.log("Hello!");
    // return myName; // Not possible because the function can't return anything due to the void assigned type (more on this below).
  }

  console.log(sayHello());
  // "Hello!"
  // undefined
  ```

- Array

  ```tsx
  // Array
  // -- 1. manuelle Signierung 👈 Empfohlen!
  const hobbies: string[] = ["Programming", "Cooking"];
  // -- 2. automatische Signierung durch TypeScript (numbers: number)
  const numbers = [1, 2, , 3, -5, 3.14];
  ```

  💡 Wenn keine Typen deklariert sind, weist TypeScript basierend auf den Typen der Array-Werte automatisch einen Typ zu.

- Tuple
  Eine Art Array mit fixer Länge & Typ
  ```tsx
  // Tuple
  const address: [string, number] = ["kölnerstraße", 12];
  ```
- Any

  💡 Manchmal müssen wir in einer Anwendung den Typ von Variablen beschreiben, die wir nicht kennen. Diese Werte können von dynamischen Inhalten stammen, z. B. vom Benutzer oder von einer Bibliothek eines Drittanbieters. In diesen Fällen verzichten wir auf die Typüberprüfung und lassen die Werte durch die Kompilierzeitprüfung laufen. Wir kennzeichnen sie einfach mit dem Typ `any`.

  `any` sollte für gewöhnlich nicht verwendet werden.

  ```tsx
  // any
  let myCar: any = "BMW";
  console.log(myCar); // Prints: BMW

  myCar = { brand: "BMW", series: 3 };
  console.log(myCar); // Prints: { brand: "BMW", series: 3 }
  ```

- [Enum](https://github.com/rmolinamir/typescript-cheatsheet#enums)
  Eine hilfreiche Ergänzung des Standardsatzes der Datentypen von JavaScript ist die Verwendung von `Enums` (enumerated types). Eine Aufzählung ist ähnlich wie in Sprachen wie C# eine Möglichkeit, numerischen Werten freundlichere Namen zuzuweisen. Die Nummerierung der Enum-Mitglieder beginnt standardmäßig bei 0. Sie können jedoch einen anderen Wert festlegen, indem Sie den Wert eines der Mitglieder manuell ändern. Zum Beispiel können wir den Wert für "Green" auf 100 ändern, der nächste Wert wird dann 101 sein. Wenn wir dann "Yellow" auf 2 zurücksetzen, setzt sich die Nummerierung entsprechend fort.

  ```tsx
  // enums
  enum Color {
    Gray, // 0
    Red, // 1
    Green = 100, // 100
    Blue, // 101
    Yellow = 2, // 2
  }

  const myColor: Color = Color.Green;
  console.log(myColor); // Prints: 100
  ```

- Functions
  Funktionen funktionieren erwartungsgemäß genauso wie in JavaScript mit einigen neuen Funktionen. In TypeScript können Sie der Funktion zwei Dinge zuweisen:

  - Argument types.
  - Function types.

  ```tsx
  // argument types
  function multiply(value1: number, value2: number) {
    return value1 * value2;
  }
  // console.log(multiply('Robert', 5)) // Not possible, both arguments must be of type number.
  console.log(multiply(10, 5)); // Prints: 50
  ```

  ```tsx
  // function types
  const myMultiply: (val1: number, val2: number) => number;
  // myMultiply = sayHello; // Not possible.
  // myMultiply(); // Not possible.
  myMultiply = multiply;

  console.log(myMultiply(5, 2));
  ```

- Objects
  Der Typ "object" repräsentiert den nicht-primitiven Typ, also alles, was nicht `number`, `string`, `boolean`, `symbol`, `null` oder `undefined` ist.
  In JavaScript, wie auch in TypeScript, bestehen Objekte aus Schlüssel-Wert-Paaren.

  ```tsx
  let userData: { name: string; age: number } = {
    name: "Max",
    age: 27,
  };
  // userData = { // Not valid
  //   name: 2,
  //   age: 'Age'
  // };
  // userData = { // Not valid
  //   a: 'Robert',
  //   b: 24
  // };
  userData = {
    name: "Robert",
    age: 24,
  };
  ```

---

## Classes & instances

OOP steht für Objektorientierte Programmierung. Es ist ein Programmierparadigma, das auf der Konzeptualisierung von Problemen in Form von Objekten und deren Interaktionen basiert.

- Eine Klasse ist in OOP eine Vorlage oder ein Bauplan für die Erstellung von Objekten.
- Eine Klasse definiert die **Eigenschaften** und **Methoden**, die ein Objekt haben kann.
  - Eigenschaften sind Variablen, die die Daten eines Objekts darstellen
  - Methoden sind Funktionen, die das Verhalten eines Objekts beschreiben

### Creating a Class

Um ein Objekt zu erstellen, wird eine **Instanz** der Klasse erstellt.

- Eine Instanz ist eine Konkrete Darstellung der Klasse, die einen spezifischen Zustand der Eigenschaften enthält.
- Instanzen können unabhängig voneinander existieren und haben ein eigenes Verhalten und Eigenschaften, aber teilen die gleiche Definition, die in der Klasse festgelegt wurde.

```tsx
// Konvention: beginnen mit Großbuchstaben
class Department {
  name: string; // field of a class

  // constructor (reserviertes Schlüsselwort) methode
  // Syntax: constructor(Argument/e) {...}
  constructor(n: string) {
    this.name = n;
  }
}
// Objekt (Instanz) einer Klasse erstellen
const accounting = new Department("Accounting");
console.log(accounting); // Ausgabe: Department {name: "accounting"}
```

> Kompilierung zu JavaScript kann sich je nach "target version" unterscheiden (z.B. in "es5" werden "Klassen" als Konstruktorfunktionen kompiliert)

### `this` keyword in JavaScript

- In einer Objektmethode bezieht sich `this` auf das Objekt.
- Allein bezieht sich `this` auf das globale Objekt (window object in the browser)
- In einer Funktion bezieht sich `this` auf das globale Objekt (window object in the browser)
- In einer Funktion im "strict mode" ist `this`= `undefined`

### Access Modifiers (Zugriffsmodifizierer)

- `public` - per default aktiv, kann von **jeder Instanz** zugegriffen und verwendet werden
- `private` - Zugriff und Verwendung nur **innerhalb** der Klasse möglich
- `protected` - Zugriff und Verwendung nur **innerhakb** der Klasse und von **abgeleiteten** Klassen
- `readonly` (nur in TypeScript) - Schreibgeschützt
- `export` (nur in TypeScript) - exportiert Klassen, Funktionen und Variablen

```tsx
// PUBLIC
class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public sayHello() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}

const person = new Person("John");
person.sayHello(); // Ausgabe: "Hello, my name is John!"
```

```tsx
// PRIVATE
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private sayHello() {
    console.log(`Hello, my name is ${this.name}!`);
  }

  public introduce() {
    this.sayHello(); // private Methode wird innerhalb der Klasse aufgerufen
  }
}

const person = new Person("John");
person.introduce(); // Ausgabe: "Hello, my name is John!"
person.sayHello(); // Fehler: Property 'sayHello' is private and only accessible within class 'Person'.
```

```tsx
// PROTECTED
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  public bark() {
    console.log(`Woof! My name is ${this.name}!`);
  }
}

const dog = new Dog("Balu");
dog.bark(); // Ausgabe: "Woof! My name is Balu!"
dog.name; // Fehler: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```

```tsx
// READONLY
class Person {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public sayHello() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}

const person = new Person("John");
console.log(person.name); // Ausgabe: "John"
person.name = "Jane"; // Fehler: Cannot assign to 'name' because it is a read-only property.
```

### Shorthand Initialization

```tsx
class Department {
  // private id: string;
  // private name: string;
  private employees: string[] = [];

  // shorthand - fields werden gleich im constructor deklariert
  constructor(private id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }
  //...
}
```

### Inheritance (Vererbung)

```tsx
// Klasse "SubClass" erbt von "BaseClass"
class SubClass extends BaseClass {
  constructor(args: string) {
    super(args);
  }
}
```

- `super()`
  - ist ein JS/TS Schlüsselwort, das in Klassen verwendet wird, um auf die Elternklasse zu verweisen
  - in einer abgeleiteten Klasse kann `super()` verwendet werden, um auf die Methoden und Eigenschaften der Basisklasse **zuzugreifen** und diese zu **erweitern** oder zu **überschreiben**.

### Getters & Setters

- sind Methoden, die in Klassen verwendet werden, um den Zugriff auf Eigenschaften von Objekten zu kontrollieren.
- Ein Getter ist eine Methode, die den Wert einer Eigenschaft zurückgibt
- Setter eine Methode, die den Wert einer Eigenschaft ändert.

```tsx
class Person {
  private _name: string;
  // getter
  get name(): string {
    return this._name;
  }
  // setter
  set name(value: string) {
    this._name = value;
  }
}

const person = new Person();
person.name = "John"; // Verwendung des Setters, um den Namen festzulegen
console.log(person.name); // Verwendung des Getters, um den Namen abzurufen
```

### Static Methods & Properties

- sind Methoden und Eigenschaften, die auf der Klasse selbst und **nicht** auf den Instanzen der Klasse definiert sind.
- abgeleitet Klassen können von der Basisklasse erben und auf die `static` Eigenschaften und Methoden zugreifen
- ein `constructor` kann **kein** `static` haben
- Ein häufiges Anwendungsbeispiel für Static Methods und Properties sind Dienstprogramme (engl. utilities) oder Hilfsfunktionen, die in verschiedenen Teilen des Programms verwendet werden können, ohne dass dafür eine Instanz der Klasse erstellt werden muss.

```tsx
class MathUtils {
  static readonly PI: number = 3.14159;
  // Definition auf Klassenebene durch Kennzeichnung mit "static"
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }
}
// Zugriff nur über den Klassennamen
console.log(MathUtils.PI); // Zugriff auf die statische Eigenschaft
console.log(MathUtils.add(5, 3)); // Aufruf der statischen Methode "add"
console.log(MathUtils.multiply(2, 4)); // Aufruf der statischen Methode "multiply"
```

### [Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)

- dienen als Vorlage oder Bauplan für andere Klassen
- können **nicht** direkt instanziiert (new ...) werden
- abstrakte Klassen vererben an die andere Subklassen
- Abstrakte Methoden haben keinen Körper (also keinen Code)
  - und **müssen** von der abgeleiteten Klasse implementiert werden

```tsx
abstract class Vehicle {
  protected brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }
  // kein Körper, nur void
  abstract drive(): void;

  getBrand(): string {
    return this.brand;
  }
}

// Klasse "Car" erbt von der abstrakten Klasse "Vehicle"
class Car extends Vehicle {
  // Implementierung unbedingt erforderlich
  drive(): void {
    console.log(`Driving a ${this.brand} car...`);
  }
}

const myCar = new Car("Toyota");
myCar.drive(); // Ausgabe: "Driving a Toyota car..."
console.log(myCar.getBrand()); // Ausgabe: "Toyota"
```

- Eigenschaften können nicht als abstrakt gekennzeichnet werden und müssen daher nicht von abgeleiteten Klassen implementiert werden.
- ‼️ Es gibt jedoch eine Ausnahme: In TypeScript können abstrakte Eigenschaften in einer abstrakten Klasse mithilfe von Getter-Methoden implementiert werden. Der Getter muss als abstrakt gekennzeichnet werden und in der abgeleiteten Klasse implementiert werden.

```tsx
abstract class Person {
  // abstract field
  protected abstract _name: string;
  // abstract getter
  abstract get name(): string;
}

class Employee extends Person {
  protected _name = "Max Mustermann";
  // implementierung wird erzwungen
  get name() {
    // abgeleitete Klasse Employee implementiert die _name-Eigenschaft und überschreibt den name-Getter.
    return this._name;
  }
}

// Beim Erstellen einer Instanz von Employee kann nun auf die name-Eigenschaft zugegriffen werden,
// da sie in der abgeleiteten Klasse implementiert wurde.
const employee = new Employee();
console.log(employee.name); // Ausgabe: "Max Mustermann"
```

### Singletons & Private Constructos

- Ein privater Konstruktor ist ein Konstruktor, der von außerhalb der Klasse nicht aufgerufen werden kann.
  - wird typischerweise dazu verwendet, um sicherzustellen, dass eine Klasse nicht direkt instanziiert werden kann, sondern nur über eine statische Methode oder eine Factory-Methode zugänglich ist.
- Ein Singleton ist ein Entwurfsmuster in der objektorientierten Programmierung, das sicherstellt, dass **nur eine einzige** Instanz einer Klasse existiert und auf diese von verschiedenen Stellen aus zugegriffen werden kann.
- Das wird typischerweise dadurch erreicht:
  - dass der Konstruktor der Singleton-Klasse private ist
  - und eine statische Methode existiert, die die einzige Instanz zurückgibt.

```tsx
class Singleton {
  private static instance: Singleton;

  private constructor() {
    // Privater Konstruktor
  }
  // statische Methode für die Rückgabe
  public static getInstance(): Singleton {
    // prüfe ob bereits eine Instanz existiert. Falls nein, erstelle eine
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public doSomething(): void {
    console.log("Singleton doing something");
  }
}

// Beispiel-Nutzung des Singletons
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2); // Ausgabe: true
// true, da immer auf die selbe Instanz verwiesen wird

singleton1.doSomething(); // Ausgabe: "Singleton doing something"
singleton2.doSomething(); // Ausgabe: "Singleton doing something"
```

---

## Interface

- definieren die Struktur von Daten und Methoden, die von einer Klasse oder einem Objekt implementiert werden können.
- Interfaces dienen als "Verträge" für Klassen, um sicherzustellen, dass sie bestimmte Eigenschaften und Methoden besitzen, um mit anderen Klassen und Objekten interagieren zu können.
- mit dem Schlüsselwort `implements` wird ein Interface für Klasse, Obejkte oder Funktionen bereitgestellt
- Interface fields kann man als `readonly` markieren
- Interfaces sind erweiterbar `extends`
- optional `?`

### Interface in einer Klasse implementieren

```tsx
// Interface erstellen
interface Shape {
  name: string;
  getArea(): number;
  getPerimeter(): number;
}

// Klasse "Circle" implementiert das "Shape" Interface
// dadurch wird erzwungen, dass alle Eigenschaften und Methoden aus dem "Shape" Interface
// in der Klasse definiert werden
class Circle implements Shape {
  constructor(public name: string, public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
```

### Interface in einem Objekt implementiern

```tsx
interface Person {
  name: string;
  age?: number;
  sayHello(): void;
}

const john: Person = {
  name: "John",
  age: 30,
  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

john.sayHello(); // Output: "Hello, my name is John"
```

### Interface in einer Funktion implementieren

```tsx
interface Greeter {
  greet(name: string): void;
}

function greetPerson(person: Greeter, name: string) {
  person.greet(name);
}

const englishGreeter: Greeter = {
  greet(name: string) {
    console.log(`Hello, ${name}!`);
  },
};

greetPerson(englishGreeter, "John"); // Output: "Hello, John!"
```

### [Interfaces vs Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

- Interfaces definieren Strukturen, während Types (auch Typalias genannt) Aliase für Typen definieren.
- Interfaces können erweitert werden, während Types nicht erweitert werden können.
- Interfaces können deklariert werden, um Klassen, Funktionen und Objekte zu beschreiben, während Types häufiger verwendet werden, um Typen zu benennen, die in der Anwendung verwendet werden.
