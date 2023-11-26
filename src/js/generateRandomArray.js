export function (state.righe, columns, minRandom, maxRandom, array1, array2) {
	const regenerateArrays = () => {
		array1 = generateArray(state.righe, minRandom, maxRandom);
		array2 = generateArray(columns, minRandom, maxRandom);
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

		return [array1, array2];
	};

	regenerateArrays();
	return adjustArrays();
}
