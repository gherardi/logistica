import { calculateSum, generateArray } from './helper.js';

export const state = {
	righe: null,
	colonne: null,

	matrice: {
		valori: [],
		minimo: 10,
		massimo: 100,
	},

	produttori: [],
	consumatori: [],

	totali: {
		minimo: 100,
		massimo: 300,
		produzione: [],
		fabbisogno: [],
	},
};

export const riempiTotali = function () {
	const regenerateArrays = () => {
		state.totali.produzione = generateArray(state.righe, state.totali.minimo, state.totali.massimo);
		state.totali.fabbisogno = generateArray(state.colonne, state.totali.minimo, state.totali.massimo);
	};

	const adjustArrays = () => {
		let sumArray1 = calculateSum(state.totali.produzione);
		let sumArray2 = calculateSum(state.totali.fabbisogno);
		let differenceSums = Math.abs(sumArray1 - sumArray2);

		const adjustArray = (array, index) => {
			while (differenceSums > 0) {
				array[index] += 1;
				if (array[index] > state.totali.massimo) {
					regenerateArrays();
					adjustArrays();
					break;
				}
				index = (index + 1) % array.length;
				differenceSums--;
			}
		};

		if (sumArray1 > sumArray2) {
			adjustArray(state.totali.fabbisogno, 0);
		} else if (sumArray1 < sumArray2) {
			adjustArray(state.totali.produzione, 0);
		}
	};

	regenerateArrays();
	adjustArrays();
}