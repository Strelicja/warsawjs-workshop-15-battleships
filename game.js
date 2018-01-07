
// const gameContainer = document.querySelector('#game');
// const cell = document.createElement('div');
// const textNode = document.createTextNode ("hello world");
// 	cell.appendChild(textNode);
// 	gameContainer.appendChild(cell);

// 	let onClick = function onClick() {
// 		cell.textContent = "Clicked";
// 	}
// 	cell.addEventListener('click', onClick);
'use strict';
//krok 1 przycisk dziala

// //klasa widoku 1
// class Component {
// 	getElement() {
// 		return this._element;
// 	}
// }
// //klasa widoku 2
// class CellComponent extends Component {
// 	constructor(){
// 		super();
// 		this._state = 'unknown';
// 		this._element= document.createElement('td');
// 		this._element.addEventListener('click', (function () {
// 			this.setState('miss');
// 		}).bind(this));
// 		this._refresh();
// 	}

// 	setState(stateName) {
// 		this._state= stateName;
// 		this._refresh(); //wywolanie fu//
// 	}
// 	_refresh(){
// 		this._element.textContent = this._state;
// 		this._element.className = 'cell_' + this._state;

// 	}
// }
// const myCell = new CellComponent();
// document
// 	.getElementById('cellCointainer')
// 	.appendChild(myCell.getElement());

// //krok drugi
// //klasa widoku 1
// class Component {
// 	getElement() {
// 		return this._element;
// 	}
// }
// //klasa widoku 2
// class CellComponent extends Component {
// 	constructor(handleCellClick){ //stworzyc kontroler, przekazac go do cell i go odpalic
// 		super();
// 		this._state = 'unknown';
// 		this._element= document.createElement('td');
// 		this._element.addEventListener('click', function () {
// 			handleCellClick();
// 		});
// 		this._refresh();
// 	}

// 	setState(stateName) {
// 		this._state= stateName;
// 		this._refresh(); //wywolanie fu//
// 	}
// 	_refresh(){
// 		this._element.textContent = this._state;
// 		this._element.className = 'cell_' + this._state;

// 	}
// }



// class GameController { 
// 	constructor(cell){
// 		this._cell = cell;
// 	}
// 	handleCellClick() {
// 		this._cell.setState('miss');
// 	}
// }

// let myController;
// function handleCellClick() {
// 	myController.handleCellClick();
// }
// const myCell = new CellComponent(handleCellClick);
// myController = new GameController(myCell)
// document
// 	.getElementById('cellCointainer')
// 	.appendChild(myCell.getElement());


//krok trzeci
//klasa widoku 1
class Component {
	getElement() {
		return this._element;
	}
}
//klasa widoku 2
class CellComponent extends Component {
	constructor({handleCellClick, location}){ 
		super();
		this._state = 'unknown';
		this._element= document.createElement('td');
		this._element.addEventListener('click', function () {
			handleCellClick({ location});
		});
		this._refresh();
	}

	setState(stateName) {
		this._state= stateName;
		this._refresh(); //wywolanie fu//
	}
	_refresh(){
		this._element.textContent = this._state;
		this._element.className = 'cell_' + this._state;

	}
}



class GameController { 
	constructor(cell){
		this._cell = cell;
	}
	handleCellClick({location}) {
		this._cell[location].setState('miss');
	}
}

let myController;
function handleCellClick(...args) {
	myController.handleCellClick.apply(myController, args);
}
const myCell = new CellComponent({handleCellClick, location: 0});
const cells = [myCell];
myController = new GameController(cells)
document
	.getElementById('cellCointainer')
	.appendChild(myCell.getElement());



