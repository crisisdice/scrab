function validate(placed_coordinates, existing_coordinates) {
	let horizontal = placed_coordinates
		.map(x => x[0])
		.every((val, i, arr) => val === arr[0]);

	let vertical = placed_coordinates
		.map(x => x[1])
		.every((val, i, arr) => val === arr[0]);

	if (!(horizontal || vertical))
		return false;

	if (horizontal && vertical)
		return validate_single_letter(placed_coordinates, existing_coordinates);

	return validate_one_dimension(placed_coordinates, existing_coordinates, horizontal);
}

function validate_single_letter(placed_coordinates, existing_coordinates) {
	if (existing_coordinates.length === 0)
		return true;

	let horizontal_validation = validate_one_dimension(placed_coordinates, existing_coordinates, true);
	let vertical_validation = validate_one_dimension(placed_coordinates, existing_coordinates, false);

	return horizontal_validation || vertical_validation;
}

function validate_one_dimension(placed_coordinates, existing_coordinates, horizontal) {
	let common_index = horizontal ? 0 : 1;
	let test_index = Math.abs(1 - common_index);
	let common_entry = placed_coordinates[0][common_index];

	let entries = placed_coordinates
		.map(x => x[test_index])
		.sort((a, b) => (a - b));

	let existing_entries = existing_coordinates
		.filter(x => x[common_index] === common_entry)
		.map(x => x[test_index]);

	let word_vector = get_word_vector(entries, existing_entries);

	let start_index = get_word_start_index(entries[0], word_vector);
	let end_index = get_word_end_index(entries[entries.length - 1], word_vector);

	let sequential = test_sequential(word_vector, start_index, end_index);

	if (!sequential)
		return false;

	let sequence = word_vector.slice(start_index, end_index + 1);

	let intersection = sequence.filter(x => existing_entries.includes(x));

	return existing_coordinates.length === 0 ? true : intersection.length > 0;
}

function get_word_vector(entries, existing_entries) {
	let empty_vector = Array.from({ length: 15 }, () => null);

	for (i = 0; i < entries.length; i++) {
		empty_vector[entries[i]] = entries[i];
	}

	for (i = 0; i < existing_entries.length; i++) {
		empty_vector[existing_entries[i]] = existing_entries[i];
	}

	return empty_vector;
}

function test_sequential(arr, start, stop) {
	for (i = start; i <= stop; i++) {
		if (arr[i] === null)
			return false;
	}
	return true;
}

function get_word_start_index(start, word_vector) {
	if (start === 0)
		return 0;

	for (i = start; i > 0; i--) {
		let preceding_entry = word_vector[i - 1];

		if (preceding_entry === null)
			return i;

		if (i === 1)
			return 0;
	}
}

function get_word_end_index(start, word_vector) {
	if (start === 14)
		return 14;

	for (i = start; i < 14; i++) {
		let next_entry = word_vector[i + 1];

		if (next_entry === null)
			return i;

		if (i === 13)
			return 14;
	}
}
