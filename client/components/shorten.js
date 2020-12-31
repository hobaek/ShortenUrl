const ALPHABET =
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ID_LENGTH = 8;

const generate = function () {
	let rtn = '';
	for (let i = 0; i < ID_LENGTH; i++) {
		rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
	}
	return rtn;
};

const UNIQUE_RETRIES = 9999;

export default function generateUnique(previous) {
	previous = previous || [];
	let retries = 0;
	let id;

	while (!id && retries < UNIQUE_RETRIES) {
		id = generate();
		if (previous.indexOf(id) !== -1) {
			id = null;
			retries++;
		}
	}

	return id;
}
