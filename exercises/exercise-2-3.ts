// Exercise 2-3 (a)
function mysterious(...args: number[]): void {
  const out = args.reduce((acc, num) => acc + num * num, 0);
  console.log(out);
}

mysterious(1, 2, 3); // 14

// Exercise 2-3 (b): change `const` to `let`, then update the outer variable.
let age: number = 25;
function updateAge(): void {
  age = age + 5;
}
updateAge();
console.log('my age is', age); // my age is 30

// Exercise 2-3 (c)
interface Employee {
  firstname: string;
  age: number;
  lastName?: string;
  salary?: number;
}

const employee: Employee = { firstname: 'farid', age: 23 };
employee.lastName = 'Mohamed';
const newEmployee: Employee = { ...employee, age: 24, salary: 3000 };
console.log(newEmployee);
// { firstname: 'farid', age: 24, lastName: 'Mohamed', salary: 3000 }

// Exercise 2-3 (d): arrays are truthy, so the result is "Invalid".
const condition: boolean | unknown[] = false || [];
const output: string = condition ? 'Invalid' : 'Correct';
console.log('The Input Type is', output);

// Exercise 2-3 (e)
type FirstObject = { a: number; b: number };
type SecondObject = { c: number; b: number; e: number };

function myFunction(x: FirstObject, y: SecondObject) {
  const { b: d, ...remainingY } = y;
  return { ...x, ...remainingY, d };
}

console.log(myFunction({ a: 1, b: 2 }, { c: 3, b: 4, e: 5 }));
console.log(myFunction({ a: 5, b: 4 }, { c: 3, b: 1, e: 2 }));

// Exercise 2-3 (f)
function isPrime(value: number): boolean {
  if (!Number.isInteger(value) || value < 2) return false;
  for (let divisor = 2; divisor <= Math.sqrt(value); divisor += 1) {
    if (value % divisor === 0) return false;
  }
  return true;
}

console.log(isPrime(29)); // true

// Exercise 2-3 (g)
function reverseNumber(value: number): number {
  const sign = Math.sign(value);
  const reversed = Number(String(Math.abs(value)).split('').reverse().join(''));
  return sign * reversed;
}

console.log(reverseNumber(32243)); // 34223

// Exercise 2-3 (h)
function first<T>(items: T[]): T | undefined;
function first<T>(items: T[], count: number): T[];
function first<T>(items: T[], count?: number): T | T[] | undefined {
  if (count === undefined) return items[0];
  if (count <= 0) return [];
  return items.slice(0, count);
}

console.log(first([7, 9, 0, -2]));
console.log(first([], 3));
console.log(first([7, 9, 0, -2], 3));
console.log(first([7, 9, 0, -2], 6));
console.log(first([7, 9, 0, -2], -3));

// Exercise 2-3 (i)
function lengthOrSquare(value: string | number): number {
  return typeof value === 'string' ? value.length : value * value;
}

console.log(lengthOrSquare('hello')); // 5
console.log(lengthOrSquare(6)); // 36

// Exercise 2-3 (j)
interface Person {
  readonly id: number;
  name: string;
  age: number;
  address?: string;
}

function createPerson(id: number, name: string, personAge: number, address?: string): Person {
  return { id, name, age: personAge, address };
}

const person = createPerson(1, 'Omar', 30, 'Cairo');

function demonstrateReadonlyId(candidate: Person): void {
  // This expected compiler error proves that readonly prevents reassignment.
  // @ts-expect-error Cannot assign to 'id' because it is a read-only property.
  candidate.id = 2;
}

// Keep the compile-time demonstration without executing the invalid assignment.
void demonstrateReadonlyId;
console.log(person);
