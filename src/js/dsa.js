const rows = 3;
const columns = 5;
const minRandom = 10;
const maxRandom = 100;

let array1;
let array2;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateArray = (length) =>
	Array.from({ length }, () => getRandomNumber(minRandom, maxRandom));

const calculateSum = (array) => array.reduce((acc, value) => acc + value, 0);

const regenerateArrays = () => {
	array1 = generateArray(rows);
	array2 = generateArray(columns);
};

const adjustArrays = () => {
	let sumArray1 = calculateSum(array1);
	let sumArray2 = calculateSum(array2);

	let differenceSums = Math.abs(sumArray1 - sumArray2);

	const adjustArray = (array, index) => {
		while (differenceSums > 0) {
			array[index] += 1;
			if (array[index] > maxRandom) {
				regenerateArrays();
				adjustArrays();
				break;
			}
			index = (index + 1) % array.length;
			differenceSums--;
		}
	};

	if (sumArray1 > sumArray2) {
		adjustArray(array2, 0);
	} else if (sumArray1 < sumArray2) {
		adjustArray(array1, 0);
	}
};

regenerateArrays();
adjustArrays();