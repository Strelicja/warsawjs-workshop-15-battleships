
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


// //krok trzeci
// //klasa widoku 1
// class Component {
// 	getElement() {
// 		return this._element;
// 	}
// }
// //klasa widoku 2
// class CellComponent extends Component {
// 	constructor({handleCellClick, location}){ 
// 		super();
// 		this._state = 'unknown';
// 		this._element= document.createElement('td');
// 		this._element.addEventListener('click', function () {
// 			handleCellClick({ location});
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
// 	handleCellClick({location}) {
// 		this._cell[location].setState('miss');
// 	}
// }

// let myController;
// function handleCellClick(...args) {
// 	myController.handleCellClick.apply(myController, args);
// }
// const cells = [
// new CellComponent({handleCellClick, location:0}),
// new CellComponent({handleCellClick, location:1})
// ]

// const myCell = new CellComponent({handleCellClick, location: 0});

// myController = new GameController(cells)
// const cellContainer = document.getElementById('cellCointainer')
// 	cellContainer.appendChild(cells[0].getElement());
// 	cellContainer.appendChild(cells[1].getElement());

//krok czwarty
//klasa widoku 1
class Component { //przypisalismy metode getelement do componentu
	getElement() {
		return this._element;
	}
}
//klasa widoku 2
class CellComponent extends Component { //renderuje kolumny i wiersze
	constructor({handleCellClick, location}){ 
		super();
		this._state = 'unknown';
		this._element= document.createElement('td');
		this._element.addEventListener('click', function () {
			handleCellClick({ location});
		});
		this._refresh();
	}

	setState(stateName) { //ustawia stan
		this._state= stateName;
		this._refresh(); //wywolanie fu//
	}
	_refresh(){ //odświeża treść wpisów
		this._element.textContent = this._state;
		this._element.className = 'cell_' + this._state;

	}
}


class BoardComponent extends Component {
	constructor({ handleCellClick, size = 8 }) {
		super();
		this._element = document.createElement('table');
		this._cells = {};
		for (let rowNumber = 0; rowNumber < size; rowNumber += 1) {
			const rowElement = document.createElement('tr');
			for (let columnNumber = 0; columnNumber < size; columnNumber += 1) {
				const cell = new CellComponent({
					handleCellClick,
					location: { row: rowNumber, column: columnNumber }
				});
				rowElement.appendChild(cell.getElement());
				// Also save a reference to the cell so that it can be addressed later
				this._cells[`${rowNumber}X${columnNumber}`] = cell;
			}
			this._element. appendChild(rowElement);
		}
	}

	setCellState(location, state) {
		const key = `${location.row}X${location.column}`;
		this._cells[key].setState(state); // odwołuje się do wlaściwej pozycji i wywołuje funkcje setState
	}
}


class GameController { 
	constructor(board){
		this._board = board;
	}
	handleCellClick({location}) {
		this._board.setCellState(location, 'miss');
	}
}

let myController;
function handleCellClick(...args) {
	myController.handleCellClick.apply(myController, args);
}
const board = new BoardComponent({ handleCellClick })
myController = new GameController(board);

const boardContainer = document.getElementById('boardContainer').appendChild(board.getElement())
