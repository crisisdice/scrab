function draw_board() {
	let board_element = document.getElementById("board");

	let table = "";

	for (i = 0; i < 15; i++) {
		let row = "";

		for (j = 0; j < 15; j++) {
			row += `<td><button id="${i}-${j}" onClick="update_position(this.id)" >--</button></td>`;
		}

		row = "<tr>" + row + "</tr>";

		table += row;
	}

	//console.log(table);

	board_element.innerHTML = table;
}

function fill_slots() {
	let letters_element = document.getElementById("letters");

	let letters = get_letters(7);

	let row = "";

	for (i = 0; i < 7; i++) {
		row += `<button id="${i}" onClick="select_letter(this.id)" >${letters[i]}</button>`;
	}

	letters_element.innerHTML = row;
}

function get_letters(amount) {
	alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	letters = [];

	for (i = 0; i < amount; i++) {
		let index = Math.floor(Math.random() * 26);

		letters.push(alphabet[index]);
	}

	return letters;
}
