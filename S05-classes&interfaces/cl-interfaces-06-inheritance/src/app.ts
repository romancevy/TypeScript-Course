class Department {
  // private readonly id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
// Klasse "ITDepartment" erbt von "Department"
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    // Zugriff auf den "id" Member aus der Elternklasse "Department"
    // Wertzuweisung "IT"
    super(id, "IT");
    this.admins = admins;
  }
}
// Klasse "AccountingDepartment" erbt von "Department"
class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }
  // neue Methode in der AccountingDepartment Klasse
  addReport(text: string) {
    this.reports.push(text);
  }
  // neue Methode in der AccountingDepartment Klasse
  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["Max"]);

it.addEmployee("Max");
it.addEmployee("Manu");

// it.employees[2] = 'Anna';

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment("d2", []);

accounting.addReport("Something went wrong...");

accounting.printReports();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
