import {Component} from 'angular2/core';

@Component({
    selector: 'my-input',
    template: `
        <button (click)="onClick()">Random Number</button>
        <input [value]="username">
        {{randomNumber}}
    `,
    directives: [],
    providers: []
})
class MyInputComponent {
    username = 'Jesse';
    randomNumber = 3; // used a dice

    onClick(event) {
        this.randomNumber = Math.random() * 10;
    }

}

export default MyInputComponent;
export {MyInputComponent};
