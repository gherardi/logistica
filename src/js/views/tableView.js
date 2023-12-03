export default class TableView {
	constructor(parentClass) {
		this.parentElement = document.querySelector(parentClass);

		this.tableHeaderEl = this.parentElement.querySelector('thead > tr');
		this.tableBodyEl = this.parentElement.querySelector('tbody');
		this.tableFooterEl = this.parentElement.querySelector('tfoot > tr');
	}
	renderTable(state, updateViews = () => {}) {
		this.clear();

		this.drawHeader(state);
		this.drawBody(state);
		this.drawFooter(state);

		if (this.addHandlerChange) this.addHandlerChange(state, updateViews);

		// render bottone esegui funzione
		this.parentElement.id === 'matrice' ? null : this.drawButton();

		this.parentElement.querySelector('[data-trigger]')?.addEventListener('click', () => {
			this.me;
		});
	}

	drawButton(state) {
		this.parentElement.querySelector('[data-trigger]')?.remove();
		const html = `
			<button
				data-trigger
				class="absolute bottom-0 left-0 px-6 py-3 mb-5 ml-5 font-medium rounded-md bg-neutral-900 text-neutral-100"
			>
				Risolvi matrice
			</button>`;
		this.parentElement.insertAdjacentHTML('beforeend', html);
	}

	drawHeader(state) {
		let headerHTML = `<th scope="col" class="sticky left-0 bg-white"></th>`;
		const isEditable = this.parentElement.id === 'matrice' ? 'contenteditable' : '';
		for (let c = 0; c < state.colonne; c++) {
			const consumatore = state.consumatori[c];
			headerHTML += `<th ${isEditable} scope="col" data-colonna=${c} data-consumatore=${c}>${consumatore}</th>`;
		}
		headerHTML += '<th scope="col">produzione</th>';
		this.tableHeaderEl.insertAdjacentHTML('beforeend', headerHTML);
	}

	drawBody(state) {
		let bodyHTML = ``;
		const isEditable = this.parentElement.id === 'matrice' ? 'contenteditable' : '';
		for (let r = 0; r < state.righe; r++) {
			const produttore = state.produttori[r];

			let rowHTML = `<tr class="[&>*]:border [&>*]:px-6 [&>*]:py-4 first:bg-white" data-riga=${r}>
				<th ${isEditable} scope="row" class="sticky left-0 uppercase whitespace-nowrap font-semibold" data-produttore=${r}
				style="background-color: white !important"
				>${produttore}</th>`;
			for (let c = 0; c < state.colonne; c++) {
				const valore = state.matrice.valori[r][c];
				rowHTML += `<td ${isEditable} data-riga=${r} data-colonna=${c} data-value=${valore}>${valore}</td>`;
			}
			rowHTML += `<th ${isEditable} scope="row" data-riga=${r} data-produzione=${state.totali.produzione[r]}>${state.totali.produzione[r]}</th></tr>`;
			bodyHTML += rowHTML;
		}
		this.tableBodyEl.insertAdjacentHTML('beforeend', bodyHTML);
	}

	drawFooter(state) {
		let footerHTML = `<th scope="col" class="sticky left-0 font-semibold bg-white">fabbisogno</th>`;
		const isEditable = this.parentElement.id === 'matrice' ? 'contenteditable' : '';
		for (let c = 0; c < state.colonne; c++) {
			footerHTML += `<th ${isEditable} scope="col" data-colonna=${c} data-fabbisogno=${state.totali.fabbisogno[c]}>${state.totali.fabbisogno[c]}</th>`;
		}
		footerHTML += `<th scope="col" data-totale=''></th>`;
		this.tableFooterEl.insertAdjacentHTML('beforeend', footerHTML);
	}

	clear() {
		this.tableHeaderEl.innerHTML = '';
		this.tableBodyEl.innerHTML = '';
		this.tableFooterEl.innerHTML = '';
	}
}
