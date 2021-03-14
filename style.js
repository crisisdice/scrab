

	function set_fixed_style(id) {
		if (id === null)
			return;
		let element = document.getElementById(id);

		element.style = "border:2px solid blue";
		element.disabled = true;
	}

	function set_selected_style(id) {
		if (id === null)
			return;
		let element = document.getElementById(id);

		element.style = "border:2px solid #4CAF50";
	}

	function set_placed_style(id) {
		if (id === null)
			return;
		let element = document.getElementById(id);

		element.style = "border:2px solid yellow";
	}

	function clear_style(id) {
		if (id === null)
			return;
		let element = document.getElementById(id);

		element.style = "initial";
	}
