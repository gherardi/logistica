import { calculateSum, wait } from '../helper.js';
import TableView from './tableView.js';
import RiepilogoView from './riepilogoView.js';

class NordovestView extends TableView {
	constructor() {
		super('#nordovest');
		this.costoTotale = 0;
	}

	addHandlerResolve(state) {
		this.parentElement.querySelector('[data-trigger]')?.addEventListener('click', () => {
			this.metodo(state);
		});
	}

	async metodo(state) {
		// magari fare anche un controllo sui valori che devono essere tutti positivi e interi
		if (calculateSum(state.totali.produzione) !== calculateSum(state.totali.fabbisogno)) {
			alert('i totali non corrispondono');
			return;
		}

		const areEmptyCelle = [
			...this.parentElement.querySelectorAll('[data-riga][data-colonna]'),
		].some((c) => c.dataset.value == '');
		const areEmptyProduzione = [...this.parentElement.querySelectorAll('[data-fabbisogno]')].some(
			(c) => c.dataset.value == ''
		);
		const areEmptyFabbisogno = [...this.parentElement.querySelectorAll('[data-produzione]')].some(
			(c) => c.dataset.value == ''
		);
		if (areEmptyCelle || areEmptyProduzione || areEmptyFabbisogno) {
			alert('ci sono delle celle non riempite');
			return;
		}

		document.querySelector('#matrice').querySelector('table').inert = true;

		// impostare il totali in basso a destra della somma dei totali e del value
		let totale = calculateSum(state.totali.produzione);
		const totaleEl = this.parentElement.querySelector('[data-totale]');
		totaleEl.innerText = totaleEl.dataset.totale = totale;

		await wait(0.5);

		RiepilogoView.clearPaper('#nordovest_paper');

		while (this.parentElement.querySelector('[data-riga][data-colonna]') !== null) {
			await wait(1);
			const cellaEl = this.parentElement.querySelector('[data-riga][data-colonna]');
			const fabbisognoEl = this.parentElement.querySelector('[data-fabbisogno]');
			const produzioneEl = this.parentElement.querySelector('[data-produzione]');

			const differenza = fabbisognoEl.dataset.fabbisogno - produzioneEl.dataset.produzione;

			if (differenza < 0) {
				RiepilogoView.aggiungiRiga(
					'#nordovest_paper',
					this.parentElement.querySelector('[data-produttore]').innerText,
					this.parentElement.querySelector('[data-consumatore]').innerText,
					fabbisognoEl.dataset.fabbisogno,
					cellaEl.dataset.value
				);

				this.costoTotale += Number(fabbisognoEl.dataset.fabbisogno) * Number(cellaEl.dataset.value);

				this.parentElement
					.querySelectorAll(`[data-colonna='${fabbisognoEl.dataset.colonna}']`)
					.forEach((el) => el.classList.add('bg-yellow-200'));

				cellaEl.classList.add('text-red-400');

				await wait(0.5);

				totaleEl.innerText -= fabbisognoEl.dataset.fabbisogno;
				totaleEl.dataset.totale -= fabbisognoEl.dataset.fabbisogno;
				totale -= fabbisognoEl.dataset.fabbisogno;

				produzioneEl.dataset.produzione = Math.abs(differenza);
				produzioneEl.innerText = Math.abs(differenza);

				await this.removeColumn(fabbisognoEl.dataset.colonna);
			} else if (differenza > 0) {
				RiepilogoView.aggiungiRiga(
					'#nordovest_paper',
					this.parentElement.querySelector('[data-produttore]').innerText,
					this.parentElement.querySelector('[data-consumatore]').innerText,
					produzioneEl.dataset.produzione,
					cellaEl.dataset.value
				);

				this.costoTotale += Number(produzioneEl.dataset.produzione) * Number(cellaEl.dataset.value);

				this.parentElement
					.querySelector(`[data-riga='${produzioneEl.dataset.riga}']`)
					.classList.add('[&>*]:bg-yellow-200');

				cellaEl.classList.add('text-red-400');

				await wait(0.5);

				totaleEl.innerText -= produzioneEl.dataset.produzione;
				totaleEl.dataset.totale -= produzioneEl.dataset.produzione;
				totale -= produzioneEl.dataset.produzione;

				fabbisognoEl.dataset.fabbisogno = Math.abs(differenza);
				fabbisognoEl.innerText = Math.abs(differenza);

				await this.removeRow(produzioneEl.dataset.riga);
			} else if (differenza === 0) {
				RiepilogoView.aggiungiRiga(
					'#nordovest_paper',
					this.parentElement.querySelector('[data-produttore]').innerText,
					this.parentElement.querySelector('[data-consumatore]').innerText,
					fabbisognoEl.dataset.fabbisogno,
					cellaEl.dataset.value
				);
				this.costoTotale += Number(produzioneEl.dataset.produzione) * Number(cellaEl.dataset.value);

				this.parentElement
					.querySelectorAll(`[data-colonna='${fabbisognoEl.dataset.colonna}']`)
					.forEach((el) => el.classList.add('bg-yellow-200'));

				this.parentElement
					.querySelector(`[data-riga='${produzioneEl.dataset.riga}']`)
					.classList.add('[&>*]:bg-yellow-200');

				cellaEl.classList.add('text-red-400');

				await wait(0.5);

				totaleEl.innerText -= fabbisognoEl.dataset.fabbisogno;
				totaleEl.dataset.totale -= fabbisognoEl.dataset.fabbisogno;
				totale -= fabbisognoEl.dataset.fabbisogno;

				await this.removeRow(produzioneEl.dataset.riga);
				await this.removeColumn(fabbisognoEl.dataset.colonna);
			}
		}
		RiepilogoView.aggiungiTotale('#nordovest_paper', this.costoTotale);
	}

	async removeColumn(colonna) {
		this.parentElement.querySelectorAll(`[data-colonna='${colonna}']`).forEach((el) => el.remove());
	}

	async removeRow(row) {
		this.parentElement.querySelector(`[data-riga='${row}']`).remove();
	}
}

export default new NordovestView();
