function set_first_word() {
	for(let i=0; i<5; i++) {
		document.getElementById(`${i}`).click();
		document.getElementById(`7-${i + 5}`).click();
	}

	submit();
}

function test_main() {
	set_first_word();
}

