build-lists: true
autoscale: true

![](bg.png)

---

# [fit] UPPESITTARKVÄLL MED ANGULAR 2

^ Som ni redan vet så kommer huvud fokus av denna presentation och kväll vara tillängnad åt Angular 2 men för att vi alla ska vara på någolunda samma sida så tänkte jag gå igenom lite förkunskaper först.
^ Detta får mig att hoppa direkt på ES6

---

# [fit] ES6

^ Eller Harmony som det kanske kallas

---

# [fit] Harmony

^ Eller ECMAScript version 6 om man vill vara tydlig

---

# [fit] ECMAScript version 6

^ Eller ES2015 som det nu officielt heter

---

# [fit] ES2015

^ Kärt barn har många namn. Utan att gå in på några ditaljer vad ecmascript är för något så kan vi säga att det är specifikationen av javascript, typ (egentligen är javascript bara en dialekt av ecmascript).
^ Och ES6 är en big deal för javascrip världen.
^ Varför? Låt oss bara lite snabbt kolla på tids axlen:

---

## History of ECMAScript

- 1997: ES1
- 1998: ES2
- 1999: ES3
- 2007: ES4
- 2009: ES5

^ ES2: inga nyheter
ES3: Man ska komma ihåg att internet var inte så stort 1999, PC hade precis börjat letat sig in i vart och varanat hem
ES4: Åtta år senare kommer en stort genombrott, vi skulle få classer, ett modul system, statisk typning, iteratorer. Detta skulle bli stort.
ES5: Vi fick strict mode. Som vi hade väntat!

---

## History of ECMAScript

- 2015: ES6
- 2016: ES7

^ Okej, så låt oss böja med några nyhter i ES6,
Jag kommer inte hinna ta upp alla. Utan detta kommer bara bli ett utplock för att ni enklare ska kunna sätta in er i Angular.

---

## var, let and const

```javascript
if (true) {
    var a = 1;
}
console.log(a); // 1
```

---

## var, let and const

```javascript
if (true) {
    let a = 1;
}
console.log(a); // ReferenceError: x is not defined
```

var => Function scope
let => Block scope

---

## var, let and const

Function scope:

```javascript
(function () {
    var a = 1;
}());
console.log(a); // ReferenceError
```

---

## var, let and const

Block scope

```javascript
{
    let a = 1;
}
console.log(a); // ReferenceError
```

var => Function scope
let => Block scope

---

## var, let and const

```javascript
const a = 1;
a = 2; // TypeError: Assignment to constant variable
```

```javascript
const arr = [1, 2];
arr.push(3);
arr.someRandomProp = 'Jepp Jepp';
```

---

# CLASS

---

## Class

```javascript
class Person {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fulName() {
        return this.firstName + ' ' + this.lastName;
    }

}

const heisenberg = new Person('Walter', 'White');
heisenberg.fulName();
```

^ Det är inga konstigheter är.
Det finns inga privata medlemmar. Ungefär som i python.
Det finns dock förslag på privata medlemmar till es7.

---

## Arrow functions

```javascript
function add(a, b) { return a + b; }
```

^ Detta är en av funktionerna som javascript saknade mest.
javascript är i regel enekl trådat, vilket gör att allt sker asyncront.
Vilket gör att vi måste ha callbacks
enkel tråd => async => classback => lamda functioner

---

## Arrow functions

```javascript
function add(a, b) { return a + b; }
```

(i grova drag) samma sak som (ej hosted):

```javascript
var add = function(a, b) { return a + b; };
```

---

## Arrow functions

```javascript
function add(a, b) { return a + b; }
```

(i grova drag) samma sak som (ej hosted):

```javascript
var add = function(a, b) { return a + b; };
```

Vilket är samma sak som:

```javascript
var add = (a, b) => a + b;
```

---

## Arrow functions

```javascript
class Person {

    numbers = [1, 2, 3, 4, 5];

    constructor() {
        numbers.filter(i => this.odd(i));

        // same as:
        var that = this;
        numbers.filter(function(i) {
            return that.odd(i);
        });

        // same as:
        numbers.filter((function(i) {
            return that.odd(i);
        }).bind(this));
    }

    odd(i) {
        return i % 2 != 0;
    }

}
```

---

## Arrow functions

```javascript
const a = () => {}
a.prototype // undefined
// a.bind, a.call, a.apply is defined
// 'arguments' is not defined
new a(); // TypeError: () => {} is not a constructor
```

---

## Arrow function

```javascript
const fun = () => 1; // returns 1
```

---

## Arrow function

```javascript
const fun = () => 1; // returns 1
```

```javascript
const fun = () => {a: 1}; // returns undefined
```

---

## Arrow function

```javascript
const fun = () => {a: 1}; // returns undefined
```

Faktum är att det är samma sak som:

```javascript
const fun = () => {
    (a: 1)
};
```

Vilket beter sig på samma sätt som:

```javascript
const fun = function() {
    a: 1
};
```

---

## Arrow function

```javascript
const fun = () => ({a: 1});
```
<br>

```javascript
const fun = () => {
    return {a: 1};
}
```

---

## Template strings

```javascript
var name = 'Heisenberg';
var s = [
    'Walter White: Now... Say my name.'
    'Declan: You\'re ' + name,
    'Walter White: You\'re goddamn right!'
].join('\n');
```

---

## Template strings

```javascript
var name = 'Heisenberg';
var s = [
    'Walter White: Now... Say my name.'
    'Declan: You\'re ' + name,
    'Walter White: You\'re goddamn right!'
].join('\n');
```

<br>

```javascript
const name = 'Heisenberg';
const s = `
    Walter White: Now... Say my name.
    Declan: You're ${name}
    Walter White: You're goddamn right!
`;
```

^ I javascript kan ' användas på samma sätt som " dock har vi saknat något sätt att deklarera multilines men nu har vi `

---

## Destructuring, Default and the Rest

^ Detta används och om ni inte har använt det för ut i javascript så kan det ta ett tag för att bli van vid syntaxen

---

## Destructuring, Default and the Rest

```javascript
const numbers = [1, 2, 3];
const [one, two] = numbers; // one = 1, two = 2
const [one, ...rest] = numbers; // one = 1, rest = [2, 3]
```

^ Okej, låt oss krångla till det med objekt:

---

## Destructuring, Default and the Rest

```javascript
const num = {x: 1, y: 2};
const {x, y} = num; // x = 1, y = 2
```

---

## Destructuring, Default and the Rest

```javascript
const num = {x: 1, y: 2};
const {x: a, y: b} = num; // a = 1, b = 2
```

^ Vi döpa om parametrar

---

## Destructuring, Default and the Rest

```javascript
const num = {x: 1};
const {x: a = 0, y: b = 1} = num; // a = 1, b = 1
```

---

## Destructuring, Default and the Rest

```javascript
const num = { x: [{ foo: 1, bar: 2 }, {}], y: 2 };
const { x: [{foo: a}] = 2 } = num; // a = 1
```

---

## Destructuring, Default and the Rest

```javascript
const fs = require('fs');
const {rename} = fs;

rename('walter.txt', 'heisenberg.txt');
```

^ Okej, några verkliga exempel:

---

## Destructuring, Default and the Rest

```javascript
const {element, index} = findElement(1, [1, 2]);
const {element} = findElement(1, [1, 2]);
const {index} = findElement(1, [1, 2]);
```

---

## Destructuring, Default and the Rest

```javascript
httpClient.get(url, ({body}) => {
   console.log(body);
});
```

---

## Destructuring, Default and the Rest

```javascript
function fun({a, b}) {
    return a + b;
}
fun({b: 2, a: 1});
```

---

## Destructuring, Default and the Rest

```javascript
function fun(a, b, ...args) {} // a = 1, b = 2, args = [3, 4]
f(1, 2, 3, 4);
```

---

## Destructuring, Default and the Rest

```javascript
Math.min(...[-1, 5, 11, 3]) // -1
Math.min.apply(Math, [-1, 5, 11, 3]) // -1
Math.min(-1, 5, 11, 3) // -1
```
<br>

```javascript
let [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2016-02-12');
```

---

## Iterators and Generators

```javascript
function* binary() {
    yield 0;
    yield 1;
    return;
}

for (let b of binary()) {
    console.log(b);
}
```

---

## Iterators and Generators

```javascript
function* test() {
    const n = yield 0;
    yield n + 1;
    return;
}

const gen = test();

console.log(gen.next().value); // 0
console.log(gen.next(2).value); // 3
```

^ Det som kan skilja sig från andra språk är att man kan trycka tillbaka värden. Man brukar prata om push och pull.

---

## for of

```javascript
const arr = [3, 5, 7];
a.note = 'LA FAMILIA ES TODO';

for (let key in arr) {
   console.log(key); // logs: 0, 1, 2, note
}

for (let value of arr) {
   console.log(value); // logs 3, 5, 7
}

arr.forEach(v => console.log(v)); // logs 3, 5, 7
```

---

## for of

```javascript
const arr = undefined;

for (let key in arr) { // OK
   console.log(key);
}

for (let value of arr) { // Cannot read property 'Symbol(Symbol.iterator)' of undefined
   console.log(value);
}

arr.forEach(v => console.log(v)); // Cannot read property 'forEach' of undefined
```

---

## Modules

### CommonJS

```javascript
// circle.js
exports.area = r => {
    return 3.14 * r * r;
};
```

```javascript
// index.js
const circle = require('./circle.js');
circle.area(2)
```

---

## Modules

### AMD

```javascript
// circle.js
define(['circle'], () => {

    return {
        area(r) {
          return 3.14 * r * r;
        }
    };

});
```

```javascript
// index.js
require(['circle'], circle => {
    circle.area(2);
});
```

---

## Modules

### SystemJS

```javascript
// circle.js
define(function() {
  return {
      area(r) {
        return 3.14 * r * r;
      }
  };
});
```

```javascript
// index.js
const circle = require('./circle.js');
circle.area(2);
```

---

## Modules

### ES6

```javascript
// circle.js
const area = r => {
    return 3.14 * r * r;
};

export {area};
```

```javascript
// index.js
import {area} from './circle.js';
area(2)
```

---

## Modules

### ES6

```javascript
const area = r => Math.PI * r * r;
const perimeter = r => Math.PI * 2 * r;

export {area, perimeter};
export {area as calculateArea};
export default area;

export default {area, perimeter};
// same as:
export default {area: area, perimeter: perimeter};
// same as:
const modulesToExport = {area: area, perimeter: perimeter};
export default modulesToExport;
```

---

## Modules

### ES6

```javascript
export {area, perimeter};
import {area, perimeter} from './circle.js';

export {area, perimeter};
import * as circle from './circle.js';
circle.area(2);

export {area as calculateArea};
import {calculateArea} from './circle.js';
calculateArea(2);

export default area;
import area from './circle.js';
area(2);

export default {area, perimeter};
import circle from './circle.js';
circle.area(2);
```

---

## Promises

---

## Tail Calls
^ Wii, detta kommer ni kanske inte ikontakt med idag men det gör att man kan skriva funktionel programering i javascript på allval

---

## ES7

---

## Decorators

```javascript
class Heisenberg {

    constructor() {
        ...
    }

}
```
^ Vad är decorators? Om ni har arbetat med pythons decorators så kommer ni känna er hemma annars så kommer här en snabb genomgång
Låt oss säga att vi har en enkel klass:
Låt oss nu säga att vi vill lägga på meta data

---

## Decorators

```javascript
function canCook(target) {
    target.canCook = true;
}

@canCook
class Heisenberg {

    constructor() {
        ...
    }

}

const heisenberg = new Heisenberg();
heisenberg.canCook // true
```

^ Och vad är det som är fantastiskt med detta?
Detta möjliggör att vi kan lägga på egensaker som kan senare användas. Ex:

---

## Decorators

```javascript
@template(`
    <button>Click me</button>
`)
class ButtonController {

}
```

---

## Decorators

```javascript
import {autoInject, dependencyInjection} from 'autoinject';

class Db {

    connectionString: 'user:pass@local';

}

@autoInject
class MyClass {

    db: Db;

    constructor(db: Db) {
        this.db = db;
    }
}

const myClass = dependencyInjection(MyClass);
myClass.db.connectionString // 'user:pass@local'
```

^Och det stannar så klart inte här utan man kan göra ganska mycket med decorators. I sommras skrev jag en dependncy injector med hjälp av decorators (och typescript):

---

## Decorators

```javascript
class MrWhite {

    name = 'Heisenberg';

    knocking() {
        return 'I am the one who knocks.';
    }

}
```

---

## Decorators

```javascript
class MrWhite {

    get name() {
        return 'Heisenberg';
    }

    set name() {}

    knocking() {
        return 'I am the one who knocks.';
    }

}
```

---

## Decorators

```javascript
class MrWhite {

    knocking() {
        return 'I am the one who knocks.';
    }

}
Object.defineProperty(MrWhite.prototype, 'name', {
    value: 'Heisenberg',
    writable: false
});
```

---

## Decorators

```javascript
class MrWhite {

    @readOnly name = 'Heisenberg';

    knocking() {
        return 'I am the one who knocks.';
    }

}

function readOnly(target, name, descriptor) {
    descriptor.writable = false;
}
```

---

## Decorators

```javascript
class MrWhite {

    @readOnly(true)
    name = 'Heisenberg';

    knocking() {
        return 'I am the one who knocks.';
    }

}

function readOnly(isReadOnly) {
    return (target, name, descriptor) => {
        descriptor.writable = !isReadOnly;
    }
}
```

---

## Decorators

```javascript
function canCook(canHeCook) {
    return function(target) {
        target.canCook = canHeCook;
    };
}

@canCook(true)
class MrWhite {}

// Same as:

var MrWhite = (function () {
  class MrWhite {
  }

  MrWhite = canCook(true)(MrWhite) || MrWhite;
  return MrWhite;
})();

const mrWhite = new MrWhite();
mrWhite.canCook // true
```

---

## Decorators

```javascript
class MyClass {

    @memorizeFor(1000)
    fetchFromServer(delta) {
        ...
    }

    @trace()
    complexFunction() {
        ...
    }

}
```

---

^ Gulp, grunt, systemJS

---

## Typescript

^ Alla vettiga språka har några olika datatyper. Eller hur?
I javascript har vi 7 olika typer:

---

## Typescript

- Boolean
- Null
- Undefined
- Number
- String
- Symbol
- Object

---

## Typescript

- typeof null === 'object' // bug
- typeof Array() === 'object'
- typeof ( new Map() ) === 'object'

^ Man kan tycka vad man vill om typning men eftersom vi uppenbarlige har olika datatyper så är det ide att annotera metoder.

---

## Typescript

```javascript
const obj = {
    firstNumber: 1,
    secondNumber: 2,
    threadNumber: 3
};

function add(a, b, c) {
    return a + b + c;
}

const result = add(obj.firstNumber, obj.secondNumber, obj.threadNunber);
console.log(result);
```

---

## Typescript

```javascript
const obj = {
    firstNumber: 1,
    secondNumber: 2,
    threadNumber: 3
};

function add(a, b, c) {
    return a + b + c;
}

const result = add(obj.firstNumber, obj.secondNumber, obj.threadNunber);
console.log(result); // NaN
```

---

## Typescript

```javascript
function area(r) {
    return Math.PI * r * r;
}

const result = area('1O');
```

---

## Typescript

```javascript
function area(r: number): number {
    return Math.PI * r * r;
}
```

^ Okej, så vad inebär detta?
Jo, Vi har en funktion som tar emot ett argument och det argumentet måste vara ett number och sedan returnerar funktionen ett number.
Typescript hjälper till med detta. Dock kan det också sätta keppar i hjulet.

---

## Typescript

```javascript
const obj = {};
obj.name = 'Mr. White'; // Property 'name' does not exist on type {}.
```

^ Vilket är förvisso sant MEN det hindrar mig från att programera javascript. Om ni börjar använda typescript så kommer ni springa på minor. Alla gör det och typescript är inte felfritt
- Jag tror att jag har rapporterart ett tiotal buggar.
Vissa är inte återgärdade.

---

## Typescript

```javascript
// a.js
let a = 1;

if (true) {
    a = 2;
}

export {a};

// index.js
import {a} from './a.js';
console.log(a); // 1
```

---

## Typescript

```javascript
// a.js
let a = 1;
export {a};

if (true) {
    a = 2;
}

// index.js
import {a} from './a.js';
console.log(a); // 1
```

---

## Typescript

```javascript
const obj = {};
obj.name = 'Mr. White';
// Property 'name' does not exist on type {}.
```

^ Så det finns problem men det finns också stora fördelar, så pass stroa fördelar som har gjort vänt mig från att vara emot typescript till att använda det i nästa alla mina projekt (både frontend och backend).
Typescript ska vara ett hjälpmedel. Om det är ivägen. Använd `any` type.

---

## Typescript

```javascript
const obj: any = {};
obj.name = 'Mr. White';
```

^ Syntaxen kan vara lite förvirrande i vissa sammanhang men man kommer över det efter ett tag.

---

## Typescript

```javascript
interface tvShow {
    title: string;
    runtime: number;
    airDate: Date;
    genre: string[];
    episode: episode[];
}

function fetchTvShowsFromServer(): tvShow {
    return http.get('breaking-bad');
}

const show = fetchTvShowsFromServer();
show.title // OK
show.name  // Property 'name' does not exist on type 'tvShow'.
```

---

## Andra ES7 features

- System global: https://github.com/tc39/proposal-global
- Call constructor: https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md
- observable: https://github.com/zenparsing/es-observable
- decorators: https://github.com/wycats/javascript-decorators/blob/master/README.md
- async/await https://github.com/tc39/ecmascript-asyncawait
- SIMD: http://tc39.github.io/ecmascript_simd/
- This binding: https://github.com/zenparsing/es-function-bind

---

# [fit] Angular 2

---

```javascript
// app.component.ts
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `<h1>I'm the one who knocks</h1>`
})
class AppComponent { }

export {AppComponent};
```

---

```javascript
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent);
```

---

```html
<body>
    <my-app>Loading...</my-app>
</body>
```

---
#### Data binding

```javascript
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <h2>{{quote}}</h2>
    `
})
export class AppComponent {
  title = 'Breaking Bad';
  quote = `I'm not in the meth business. I'm in the empire business.`;
}
```

---
#### Iterator

```javascript
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <ul>
            <li *ngFor="#episodeName of episodes">
                {{ episodeName }}
            </li>
        </ul>
    `
})
export class AppComponent {
  title = 'Breaking Bad';
  episodes = [
    'Live Free or Die',
    'Madrigal',
    'Hazard Pay'
  ];
}
```

---
#### Local DOM variable

```javascript
import {Component} from 'angular2/core';

@Component({
    selector: 'search',
    template: `
        <input #searchInput (keyup)="undefined">
        <p>Value: {{searchInput.value}}</p>
    `
})
export class SearchComponent {}

```
<sub>http://plnkr.co/edit/7s5RJAKXdvFXPD31TdK8?p=preview</sub>

---

#### Events

```javascript
import {Component} from 'angular2/core';

@Component({
    selector: 'search',
    template: `
        <input (keyup)="onKeyUp($event)">
        <p>Value: {{value}}</p>
    `
})
export class SearchComponent {
    value;

    onKeyUp(event) {
        this.value = event.target.value;
    }
}

```
<sub>http://plnkr.co/edit/7s5RJAKXdvFXPD31TdK8?p=preview</sub>

---

#### Property bindings

```javascript
import {Component} from 'angular2/core';

@Component({
    selector: 'login',
    template: `
        <input [value]="username">
    `
})
export class LoginComponent {
    username = 'Jesse';
}

```
<sub>http://plnkr.co/edit/O0Y7uBnSFUNEaJSKGf61?p=preview</sub>

---

#### Property binding
```html
<input [value]="username">
```

#### Event binding
```html
<input (keyup)="onKeyUp($event)">
```

---

# 2-WAY binding?

---

#### 2-WAY binding

```html
<input [value]="username" (input)="username=$event.target.value" >
```

---

#### 2-WAY binding - Angular way

```html
<input [ngModel]="username" (ngModelChange)="username=$event" >
```

---

#### 2-WAY binding - Angular way

```html
<input [(ngModel)]="username">
```

---

#### 2-WAY binding - Implementation

```javascript
@Directive({
  selector: '[ngModel]',
  host: {
    '[value]': 'ngModel',
    '(input)': 'ngModelChange.next($event.target.value)'
  }
})
class NgModel {
  @Input() ngModel;
  @Output() ngModelChange = new EventEmitter();
}
```

---

### Component in component

![](doll.gif)

---

```javascript
import {Component, Input, Output, EventEmitter, Directive} from 'angular2/core';

@Component({
    selector: 'quote-generator',
    template: `<button (click)="onClick()">{{buttonText}}</button>`
})
class QuoteGeneratorComponent {
    @Input() buttonText = '';
    @Output() buttonClick = new EventEmitter();
    quotes = ['Say my name', 'I am the one who knocks', 'Science bitch', 'Stay out of my territory'];

    onClick() {
      const random = Math.floor((Math.random() * this.quotes.length));
      this.buttonClick.next(this.quotes[random]);
    }
}

@Component({
    selector: 'quote',
    template: `
        <quote-generator [buttonText]="buttonText" (buttonClick)="updateQuote($event)"></quote-generator>
        {{quoteText}}
    `,
    directives: [QuoteGeneratorComponent]
})
export class SearchComponent {
    buttonText = 'Click me';
    quoteText = '';

    updateQuote(event) {
      this.quoteText = event;
    }
}
```

<sub>http://plnkr.co/edit/8PDsCRsZa1dCLovTaUWY?p=preview</sub>

---

## dependency injection

---

```javascript
import {Component} from 'angular2/core';

class QuoteService {
  quote = 'Test data';
}

@Component({
    selector: 'quote',
    template: `{{quoteText}}`
})
export class QuoteComponent {
  quoteText = '';
  constructor(service: QuoteService) {
    this.quoteText = service.test;
  }
}
```

---

DI Exception
No provider for QuoteService! (QuoteComponent -> QuoteService)

---

### 1. bootstrap

---

```javascript
import {bootstrap} from 'angular2/platform/browser';
import {QuoteComponent} from './quote.component';

bootstrap(QuoteComponent);
```

---

```javascript
import {bootstrap} from 'angular2/platform/browser';
import {QuoteComponent} from './quote.component';
import {QuoteService} from './quote.service';

bootstrap(QuoteComponent, [
    QuoteService
]);
```

---

```javascript
import {bootstrap} from 'angular2/platform/browser';
import {QuoteComponent} from './quote.component';
import {QuoteService} from './quote.service';

bootstrap(QuoteComponent, [
    provide(QuoteService, {useClass: QuoteService})
]);
```

---

### 2. component providers

---

```javascript
import {Component} from 'angular2/core';

class QuoteService {
  quote = 'Test data';
}

@Component({
    selector: 'quote',
    template: `{{quoteText}}`,
    providers: [Service]
})
export class QuoteComponent {
  quoteText = '';
  constructor(service: Service) {
    this.quoteText = service.test;
  }
}
```

---

## ROUTER

---

```javascript
@Component({
    template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  {path:'/search', name: 'Search', component: SearchComponent},
  {path:'/shows', name: 'Shows', component: ShowsComponent},
  {path:'/show/:id', name: 'Show', component: ShowComponent}
])
class AppComponent { }
```

---

```javascript
@Component(...)
@RouteConfig([
  ...
  {path:'/show/:id', name: 'Show', component: ShowComponent}
])
class AppComponent { }

@Component(...)
class ShowComponent {
  constructor(params: RouteParms) {
    this.showId = params.get('id');
  }
}
```

---

```html
<h1>Amazing app</h1>
<nav>
    <a [routerLink]="['Shows']">Shows</a>
    <a [routerLink]="['Show', {id: '5'}]">Heroes</a>
</nav>
<router-outlet></router-outlet>
```

---

## Zone.js

---

## `$scope.$apply()`

---

### Zone.js
<br>
### The Good, The Bad and The Ugly

---

#### The Good

```javascript
setTimeout(() => {
    // This will trigger a DOM update
    this.viewData = 'New view data';
}, 100);
```

---

#### The Bad

```javascript
setInterval(() => {
   // Paint the Sunset with me
   window.requestAnimationFrame(sunset);
}, 10);
```

---

## The Ugly

---

![inline](monkey-patch.jpg)

---

#### The Ugly

```javascript
const orgSetInterval = window.setInterval;
window.setInterval = function(...args) {
    return zone.run(orgSetInterval, args);
}
```

---

## Other features

- Change detection
- Testing
- Pipes
- Lifetime hooks
- Directives

http://victorsavkin.com/post/110170125256/change-detection-in-angular-2

---

## Beyond Angular

---

```javascript
const angular = 1 * '🍎';
const react = 1 * '🍐';

angular > react   // false
angular < react   // false
angular === react // false
```

---

## 6<sup>5th</sup> constraints for performance

---

#### 6<sup>5th</sup> constraints for performance

- Under 60 kB css
- Under 60 kB html
- Under 60 kB javascript
- 60 fps
- .6 sec avg latency

<sub>https://developers.google.com/web/showcase/case-study/googleplus</sub>

---

- Size doesn't matter with service worker
- Use web workers
- Cache everything on local device

---

![inline](server-render.png)

https://jakearchibald.com/2016/streams-ftw/

---
