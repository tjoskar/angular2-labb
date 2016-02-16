# Angular 2 Lab

What we will create: http://tjoskar.github.io/angular2-labb/

## Prologue - Get started

### Set up the project

- Clone the project:

```
$ git clone -b chapter/1 https://github.com/tjoskar/angular2-labb.git
```

- Install dependencies:

```
$ cd angular2-labb
$ npm install
```

- Boot up the application:

```
$ npm start
```

- Navigate to `http://localhost:9000`

Looking good? - Yes?

### Set up your text editor:

#### You must choose, but choose wisely:
Just kidding, you can change whenever you like.

#### Visual studio code
https://code.visualstudio.com/

pros:
- Support of typescript out of the box
- Kickass debugger right inside the editor (javascrip, python, php)
- Fast

cons:
- Few add-ons
- Can only change color theme (not ui theme)
- No tabs? - Can get confusing

#### Atom (My current favorite)
https://atom.io/

Install `atom-typescript` addon:
```
$ apm install atom-typescript
```

Or install the add-on through the settings page: `cmd+,` (or `ctr+,` on windows/linux)

pros:
- Extremely easy to customize! If you want to change something, just do it!
- Good integration with git (anotate changes in tree- and file view)
- Massive collection of add-ons

cons:
- Slow at startup and can get slow for large files (it will literally die for files >2mb)
- `atom-typescript` can have a bad day and are not always 100% stable


#### Sublime Text 3
https://www.sublimetext.com/3

https://github.com/Microsoft/TypeScript-Sublime-Plugin

pros:
- Blazing fast!
- Every one loves sublime text 💖

cons:
- The typescript add-on feels sketchy


#### Webstorm
https://www.jetbrains.com/webstorm/

pros:
- Fully integrated IDE

cons:
- Fully integrated IDE
- Uses typescript 1.6 :/


#### Vim
https://github.com/Valloric/YouCompleteMe

pros:
- It's cool

cons:
- You have to know vim


## Chapter 1 - Feel the flow

1. Start off by navigate to `http://localhost:9000/`.
1. Open up `testing/my-input.component.ts` in your (new) favorite editor.
1. Play around and get a feeling of how events and data binding works.

**_Pro tip_**

It may be easier to live edit the code in the browser:
http://plnkr.co/edit/A3LfxRup9LUzs6EoOzP4?p=preview
(N.B: You won't get any typeahead)

### Examples of things to do:
#### Play around with local view-variables:
```html
<button (click)="undefined">Click me</button> <!-- Why do you think we need this? -->
<input #myInput>
{{myInput.value}}
```

Or maybe:
```html
<button (click)="myInput.value = 'Hi'">Click me</button>
<input #myInput>
```

Or try out `[(ngModel)]="username"`.

#### Try `*ngFor`.

```html
<div *ngFor="#i of numbers">{{i}}</div>
```

```javascript
@Component({...})
class MyInputComponent {
    numbers = [1, 2, 3];
    ...
}
```

**_Fun facts_**:

Did you know that:
```html
<my-comp *ngFor="#show of shows" [show]="show"></my-comp>
```

de-sugars it into:
```html
<my-comp template="ngFor #show of shows" [show]="show"></my-comp>
```

which de-sugars into:

```html
<template ngFor [ngForOf]="shows" #show="$implicit">
    <my-comp [show]="show"></my-comp>
</template>
```

## Chapter 2 - Finding Nemo

Create a new component, a search component, with the following criteria:
- The search component should have a single input field
- The search component should give results in real time (when you type).
- The user should be able to subscribe to a chosen show.

**_Good to know_**

`lib/tv-maze.ts`
```javascript
searchShow('game of thrones')
	.subscribe(
		showsResult => console.log(showsResult) // this will print an array of shows
		error => console.log(':(', error)
	);
```

`lib/subscribe.service.ts`
```javascript
const showId = 1;
subscribeShow(showId)
	.subscribe(
		() => console.log('We do now subscribe on show with id = 1'),
		error => console.log(':(', error)
	)
```

Example markup to use:

```html
<!-- Search input -->
<form>
    <div class="input-group">
        <input type="search" class="form-control">
        <span class="input-group-btn">
            <button class="btn btn-primary">Search</button>
        </span>
    </div>
</form>
```

```html
<!-- Search result -->
<figure class="figure">
    <img src="show-image.jpg" alt="Show name" class="figure-img img-fluid img-rounded" />
    <figcaption class="figure-caption">Show name (year of show.premiered)</figcaption>
</figure>
```

– Have no idea where to start? Take a look at this skeleton code: https://gist.github.com/tjoskar/3e568131a90b67422a8e (don't copy without understanding, instead ask a friend. I'm your friend)

**_Remember!_**
Update the routing in `app.component.ts`and `base-template.html`.

## Chapter 3 - Make it count

Create a component to show all subscribe shows. Call it `UpcomingShows`.

Challenge:
- Create a pipe to filter out the next episode to air.
- Create a directive for lazy load images (This can be tricky. – proposed solution exist)
- Fetch and update the show info in local storage (I don't have any solution for this but it should be fairly easy).
- The user should be able to unsubscribe to a show (I don't have any solution for this but it should be fairly easy).
- The user should be able to view all episodes for a show (I don't have any solution for this but it should be fairly easy).

Skeleton code (if you want): https://gist.github.com/tjoskar/9402044f45dc7d2ecbb0

**_Remember!_**
Update the routing in `app.component.ts`and `base-template.html`.

## Chapter 4 - Test me

Writing and executing test cases for front-end are hard. But nevertheless important.
(almost) All browsers vendors implement the same features in different ways, they have different bugs, you do not control the upgrade cycle. - You are not in control over your own code.

Furthermore; Different devices have different input methods (mouse, keyboard, touch) and different outputs to consider (desktop, laptop, tablet, mobile, retina display, screenreader), and the end user can adapt the output (enlarging text, changing the color settings, etc.).

So you need tests, that's for sure.

### Unit test
> Let's get started by writing some unit tests.

To be able to run the same test case in different browsers, we need a test-runner and not any test runner. We need a test runner that can start up and communicated with different browsers.
We have two options: [Testem](https://github.com/testem/testem) and [Karma](http://karma-runner.github.io/). We will go with Karma for now.

We will also need to choose a test-framework (you wouldn't get far with `console.assert`). I would have chosen [AVA](https://github.com/sindresorhus/ava) or maybe [mocha](https://mochajs.org/) but unfortunately the Angular team have already made the choice for us, [Jasmine](http://jasmine.github.io/2.4/introduction.html), so lets go with the flow.

First we need to install a few new dependencies (they should already be listed in you `package.json`):
```
jasmine-core@2.4.1               // Core lib for jasmine
karma-jasmine@0.3.7              // So Karma understand jasmine
karma-mocha-reporter@1.1.5       // A better test reporter
karma-phantomjs-launcher@1.0.0   // So Karma can start PhantomJS
karma-sourcemap-loader@0.3.7     // So Karma understands sourcemaps
karma-webpack@1.7.0              // So Karma and webpack can talk to each other
phantomjs-polyfill@0.0.1         // PhantomJS is old
phantomjs-prebuilt@2.1.4         // PhantomJS, itself
source-map-loader@0.1.5          // So webpack understand sourcemaps
```

Since we are using typescript and `modules`, we need some way of bind all this modules so the browser can understand them, that is why we are using webpack. - Which is awesome but this require some extra work before we can run the test case.

Take a look inside `karma.conf.js`. Karma, will only load one javascript-file (`test.bundle.js`) and pass it to webpack. This file will however load all test files.
Take a look inside `test.bundle.js`. First of all we load some `polyfills`, angular stuff and similar. But then we use the the context method on `require` that webpack created in order to tell webpack what files we actually want to require or import. For each test-file we find we will call the context function that will require the file and load it up. Cool right?

Now when you have a basic idea of front end testing works. Lets get started.

Take first a look at: `lib/storage/test/local-storage.test.ts`. Looks straightforward right?
Now take a look at `lib/test/subscribe.service.test.ts` for a more complex test case.

-- Happy testing

## Chapter 5 - Don't tell me what to do

### Change detection strategy

Play around with different change detection strategies. For instance, use immutable objects and set the `changeDetection` to: `ChangeDetectionStrategy.OnPush`:
```javascript
@Component({
	selector: 'my-comp',
	template: `{{model.id}}, {{model.name}}`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
class MyComponent {
	@Input() model;

	onChanges(inputChanges) {
		if (inputChanges.model) { // We have a new model
			console.log(inputChanges.model);
		}
	}
}
```

Take a look at these blog posts:
http://victorsavkin.com/post/133936129316/angular-immutability-and-encapsulation
http://victorsavkin.com/post/110170125256/change-detection-in-angular-2

### View Encapsulation

OMG! Native Shadow DOM!

```javascript
import {ViewEncapsulation} from 'angular2/core';

@Component({
	selector: 'yoo-boy',
	templateUrl: 'template.html',
	styles: [`
		body { /* You have no power in the shadow of DOOM (Do you see the joke? – No? Okey) */
			background: green;
		}
	`],
	encapsulation: ViewEncapsulation.Native // Change this to `ViewEncapsulation.None`
})
class YooBoy {}
```


## Chapter 6 - Make it fast
OBS! Proposed solution do not exist.

### Use web workers!
- We can't use `localstorage` anymore. Create a new storage implementation for `indexedDB`.
- We can't use `webpack` as we do today since all code that are going to execute in a web-worker must be in a separate file(s).
- If you succeed, please let me know!

### Use service worker! OMG Service worker!
- Don't have anything to do with Angular but it is super cool so check it out!
