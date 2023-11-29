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

export const riempiMatrice = function () {
	state.produttori = Array.from({ length: state.righe }, (_, i) => `produttore n:${i}`);
	state.consumatori = Array.from({ length: state.colonne }, (_, i) => `consumatore n:${i}`);

	state.matrice.valori = Array.from({ length: state.righe }, () =>
		Array.from({ length: state.colonne }).fill(0)
	);

	// RIEMPI I TOTALI DI NUMERI ZERO
	state.totali.fabbisogno = Array.from({ length: state.colonne }).fill(0);
	state.totali.produzione = Array.from({ length: state.righe }).fill(0);
};

export const riempiMatriceRandom = function () {
	// state.matrice.valori = Array.from({ length: state.righe }, () =>
	// 	Array.from({ length: state.colonne }).fill(0)
	// );

	state.matrice.valori = Array.from({ length: state.righe }, () =>
		Array.from({ length: state.colonne }, () => {
			const random =
				Math.floor(Math.random() * (state.matrice.massimo - state.matrice.minimo + 1)) + state.matrice.minimo;
			return random;
		})
	);
};

export const riempiTotali = function () {
	const regenerateArrays = () => {
		state.totali.produzione = generateArray(state.righe, state.totali.minimo, state.totali.massimo);
		state.totali.fabbisogno = generateArray(
			state.colonne,
			state.totali.minimo,
			state.totali.massimo
		);
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
};
