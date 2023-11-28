import TableView from './tableView.js';
class MatriceView extends TableView {
	constructor() {
		super('#matrice');
	}

	render(state) {
		this.renderTable(state);
		this.addHandlerChange(state);
	}

	addHandlerChange(state) {
		document.querySelectorAll('[data-riga][data-colonna]').forEach((cella) => {
			cella.addEventListener('keypress', (e) => {
				if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
			});
			cella.addEventListener('keyup', (e) => {
				e.target.dataset.value = Number(e.target.innerText);
				const { riga, colonna } = e.target.dataset;
				state.matrice.valori[riga][colonna] = Number(e.target.innerText);
			});
		});

		document.querySelectorAll('[data-produttore]').forEach((cella) => {
			cella.addEventListener('keyup', (e) => {
				const { produttore } = e.target.dataset;
				state.produttori[produttore] = e.target.innerText;
				console.log(state.produttori);
			});
		});

		document.querySelectorAll('[data-consumatore]').forEach((cella) => {
			cella.addEventListener('keyup', (e) => {
				const { consumatore } = e.target.dataset;
				state.consumatori[consumatore] = e.target.innerText;
				console.log(state.consumatori);
			});
		});
	}
}

export default new MatriceView();
