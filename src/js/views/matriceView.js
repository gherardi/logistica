import TableView from './tableView.js';
class MatriceView extends TableView {
	constructor() {
		super('#matrice');
	}

	addHandlerChange(state, handler) {
		// MODIFICARE I VALORI DELLA MATRICE CELLE
		this.parentElement.querySelectorAll('[data-riga][data-colonna]').forEach((cella) => {
			cella.addEventListener('keypress', (e) => {
				if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
			});
			cella.addEventListener('keyup', (e) => {
				e.target.dataset.value = Number(e.target.innerText);
				const { riga, colonna } = e.target.dataset;
				state.matrice.valori[riga][colonna] = Number(e.target.innerText);
				handler();
			});
		});

		// MODIFICARE I VALORI DEL TOTALI PRODUZIONE
		this.parentElement.querySelectorAll('[data-riga][data-produzione]').forEach((cella) => {
			cella.addEventListener('keypress', (e) => {
				if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
			});
			cella.addEventListener('keyup', (e) => {
				e.target.dataset.produzione = Number(e.target.innerText);
				const { riga, produzione } = e.target.dataset;
				state.totali.produzione[riga] = Number(produzione);
				handler();
			});
		});

		// MODIFICARE I VALORI DEL TOTALI FABBISOGNO
		this.parentElement.querySelectorAll('[data-colonna][data-fabbisogno]').forEach((cella) => {
			cella.addEventListener('keypress', (e) => {
				if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
			});
			cella.addEventListener('keyup', (e) => {
				e.target.dataset.fabbisogno = Number(e.target.innerText);
				const { colonna, fabbisogno } = e.target.dataset;
				state.totali.fabbisogno[colonna] = Number(fabbisogno);
				handler();
			});
		});

		// MODIFICARE I NOMINATIVI DEI PRODUTTORI
		this.parentElement.querySelectorAll('[data-produttore]').forEach((cella) => {
			cella.addEventListener('keyup', (e) => {
				const { produttore } = e.target.dataset;
				state.produttori[produttore] = e.target.innerText;
				handler();
			});
		});

		// MODIFICARE I NOMINATIVI DEI CONSUMATORI
		this.parentElement.querySelectorAll('[data-consumatore]').forEach((cella) => {
			cella.addEventListener('keyup', (e) => {
				const { consumatore } = e.target.dataset;
				state.consumatori[consumatore] = e.target.innerText;
				handler();
			});
		});
	}
}

export default new MatriceView();
