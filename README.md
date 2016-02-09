# Angular 2 Lab

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
- Few addons
- Can only change color theme (not ui theme)
- No tabs? - Can get confusing

#### Atom (My current favorite)
https://atom.io/

Install `atom-typescript` addon:
```
$ apm install atom-typescript
```

Or install the addon through the settings page: `cmd+,` (or `ctr+,` on windows/linux)

pros:
- Extremely easy to customize! If you want to change something, just do it!
- Good integration with git (anotate changes in tree- and file view)
- Massive collection of addons

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
- The typescript addon feels buggy


#### Webstorm
https://www.jetbrains.com/webstorm/

pros:
- Fully integrated IDE

cons:
- Fully integrated IDE
- Uses typescript 1.6 :/


#### Vim

pros:
- Only the cool kids use vim

cons:
- No one can exit vim


## Chapter 1 - Feel the flow

1. Start off by navigate to `http://localhost:9000/testing`.
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
		show => console.log(show) // this will print an array of shows
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
Update the routing in `app.component.ts`.

## Chapter 3 - Make it count

Create a component to show all subscribe shows. Call it `UpcomingShows`.

Challenge:
- Create a pipe to filter out the next episode to air.
- Create a directive for lazy load images (This can be tricky. – proposed solution exist)
- Fetch and update the show info in local storage (I don't have any solution for this but it should be fairly easy).
- The user should be able to unsubscribe to a show (I don't have any solution for this but it should be fairly easy).
- The user should be able to view all episodes for a show (I don't have any solution for this but it should be fairly easy).

Skeleton code (if you want): https://gist.github.com/tjoskar/9402044f45dc7d2ecbb0

## Chapter 4 - Don't tell me what to do

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


## Chapter 4 - Make it fast
OBS! Proposed solution do not exist.

### Use web workers!
- We can't use `localstorage` anymore. Create a new storage implementation for `indexedDB`.
- We can't use `webpack` as we do today since all code that are going to execute in a web-worker must be in a separate file(s).
- If you succeed, please let me know!

### Use service worker! OMG Service worker!
- Don't have anything to do with Angular but it is super cool so check it out!
