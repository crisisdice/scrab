let selected_slot_id = null;
let placed_letters = [];
let fixed_coordinates = [];

function submit() {
	if (placed_letters.length === 0)
		return;

	let coordinates = placed_letters
		.map(x => x.split('-')
			.map(y => parseInt(y)));

	let valid = validate(coordinates, fixed_coordinates);

	if (!valid)
		return;

	let mapping = placed_letters.map(x => {
		return {
			letter: document.getElementById(x).innerHTML,
			coord: x.split('-').map(y => parseInt(y))
		};
	});

	let obj = { word: mapping };

	console.log(obj);

	let json_obj = JSON.stringify(obj);

//	fetch('http://localhost:8080/', {
//		method: 'POST',
//		headers: {
//			'Content-Type': 'application/json',
//		},
//		body: json_obj
//	}).then(response => response.json())
//	  .then(data => { console.log("success", data) } )
//	  .catch((error) => {
//			console.error('Error:', error);
//	});


	let placed_letters_amount = placed_letters.length;

	for (i = 0; i < placed_letters_amount; i++) {
		let id = placed_letters[i];

		set_fixed_style(id);
	}

	let new_letters = get_letters(placed_letters_amount);

	new_letters.forEach(x => fill_slot(x));

	fixed_coordinates = fixed_coordinates.concat(coordinates);

	placed_letters = [];

	//pack word into object
	//logic to check validity of words
}

function select_letter(button_id) {
	let slot = document.getElementById(button_id);

	if (slot.innerHTML !== "--") {
		clear_style(selected_slot_id);
		selected_slot_id = button_id;
		set_selected_style(button_id);
	}
}

function update_position(button_id) {
	let board_position = document.getElementById(button_id);

	let empty = board_position.innerHTML === "--";
	let letter_selected = selected_slot_id !== null;

	if (empty && letter_selected) {
		place_letter_at(board_position);
		placed_letters.push(button_id);

		//css
		set_placed_style(button_id);
		clear_style(selected_slot_id);
	}

	if (!empty && !letter_selected) {
		unplace_letter_at(board_position);
		placed_letters = placed_letters.filter(x => x !== button_id);

		//css
		clear_style(button_id);
	}

	if (!empty && letter_selected) {
		swap_letter_at(board_position);

		//css
		clear_style(selected_slot_id);
	}
	
	selected_slot_id = null;
}

function place_letter_at(board_position) {
	let slot = document.getElementById(selected_slot_id);
	let selected_letter = slot.innerHTML;

	board_position.innerHTML = selected_letter;
	slot.innerHTML = "--";
}

function unplace_letter_at(board_position) {
	let letter = board_position.innerHTML;

	fill_slot(letter);
	board_position.innerHTML = "--";
}

function fill_slot(letter) {
	for (i = 0; i < 7; i++) {
		let slot = document.getElementById(i);

		if (slot.innerHTML === "--") {
			slot.innerHTML = letter;
			break;
		}
	}
}

function swap_letter_at(board_position) {
	let slot = document.getElementById(selected_slot_id);
	let slot_letter = slot.innerHTML;

	unplace_letter_at(board_position);

	board_position.innerHTML = slot_letter;
	slot.innerHTML = "--";
}
