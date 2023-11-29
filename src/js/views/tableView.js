export default class TableView {
	constructor(parentClass) {
		this.parentElement = document.querySelector(parentClass);

		this.tableHeaderEl = this.parentElement.querySelector('thead > tr');
		this.tableBodyEl = this.parentElement.querySelector('tbody');
		this.tableFooterEl = this.parentElement.querySelector('tfoot > tr');
	}
	renderTable(state) {
		this.clear();

		this.drawHeader(state);
		this.drawBody(state);
		this.drawFooter(state);
	}

	drawHeader(state) {
		let headerHTML = `
	    <th scope="col" class="sticky left-0 bg-red-400"></th>
	  `;
		for (let c = 0; c < state.colonne; c++) {
			const consumatore = state.consumatori[c];
			headerHTML += `<th ${
				this.parentElement.id === 'matrice' ? 'contenteditable' : null
			} scope="col" data-consumatore=${c}>${consumatore}</th>`;
		}
		headerHTML += '<th scope="col">produzione</th>';
		this.tableHeaderEl.insertAdjacentHTML('beforeend', headerHTML);
	}

	drawBody(state) {
		let bodyHTML = ``;
		for (let r = 0; r < state.righe; r++) {
			const produttore = state.produttori[r];
			let rowHTML = `<tr class="[&>*]:border [&>*]:px-6 [&>*]:py-4" data-riga=${r}>
				<th ${
					this.parentElement.id === 'matrice' ? 'contenteditable' : null
				} scope="row" class="sticky left-0 font-semibold uppercase bg-red-400 whitespace-nowrap" data-produttore=${r}>${produttore}</th>`;
			for (let c = 0; c < state.colonne; c++) {
				const valore = state.matrice.valori[r][c];
				rowHTML += `<td ${
					this.parentElement.id === 'matrice' ? 'contenteditable' : null
				} data-riga=${r} data-colonna=${c} data-value=${valore}>${valore === 0 ? '' : valore}</td>`;
			}

			rowHTML += `<th ${
				this.parentElement.id === 'matrice' ? 'contenteditable' : null
			} scope="row" data-riga=${r} data-produzione=${state.totali.produzione[r]}>${
				state.totali.produzione[r] === 0 ? '' : state.totali.produzione[r]
			}</th></tr>`;
			bodyHTML += rowHTML;
		}
		this.tableBodyEl.insertAdjacentHTML('beforeend', bodyHTML);
	}

	drawFooter(state) {
		let footerHTML = `
			<th scope="col" class="sticky left-0 bg-red-400">fabbisogno</th>
		`;
		for (let c = 0; c < state.colonne; c++) {
			footerHTML += `<th ${
				this.parentElement.id === 'matrice' ? 'contenteditable' : null
			} scope="col" data-colonna=${c} data-fabbisogno=${state.totali.fabbisogno[c]}>${state.totali.fabbisogno[c] === 0 ? '' : state.totali.fabbisogno[c]}</th>`;
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
