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
	}

	drawHeader(state) {
		let headerHTML = `<th scope="col" class="sticky left-0"></th>`;
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
				rowHTML += `<td ${isEditable} data-riga=${r} data-colonna=${c} data-value=${valore}>${
					valore === 0 ? '' : valore
				}</td>`;
			}
			rowHTML += `<th ${isEditable} scope="row" data-riga=${r} data-produzione=${
				state.totali.produzione[r]
			}>${state.totali.produzione[r] === 0 ? '' : state.totali.produzione[r]}</th></tr>`;
			bodyHTML += rowHTML;
		}
		this.tableBodyEl.insertAdjacentHTML('beforeend', bodyHTML);
	}

	drawFooter(state) {
		let footerHTML = `<th scope="col" class="sticky left-0 font-semibold">fabbisogno</th>`;
		const isEditable = this.parentElement.id === 'matrice' ? 'contenteditable' : '';
		for (let c = 0; c < state.colonne; c++) {
			footerHTML += `<th ${isEditable} scope="col" data-colonna=${c} data-fabbisogno=${
				state.totali.fabbisogno[c]
			}>${state.totali.fabbisogno[c] === 0 ? '' : state.totali.fabbisogno[c]}</th>`;
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
