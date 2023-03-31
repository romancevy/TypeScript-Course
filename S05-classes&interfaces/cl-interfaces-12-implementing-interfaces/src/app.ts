interface Greetable {
  name: string;

  greet(phrase: string): void;
}

// die Klasse "Person" implementiert das Interface "Greetable"
// oder anders gesagt, die Klasse folgt dem Vertrag, der über die Schnittstelle eingerichtet wurde
// eine Klasse oder ein Objekt kann beliebig viele Interfaces implementierenä
// Syntax ... implements Greetable, AnotherInterface,...
class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Max");

user1.greet("Hi there - I am");
console.log(user1);
