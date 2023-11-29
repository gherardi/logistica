import { calculateSum } from '../helper.js';
import TableView from './tableView.js';
class NordovestView extends TableView {
	constructor() {
		super('#nordovest');
	}

	// impostare il totali in basso a destra della somma dei totali
	metodo(state) {
		// magari fare anche un controllo sui valori che devono essere tutti positivi e interi
		if (calculateSum(state.totali.produzione) !== calculateSum(state.totali.fabbisogno)) {
			alert('i totali non corrispondono');
			return;
		}
		this.tableFooterEl.querySelector('[data-totale]').innerText = calculateSum(
			state.totali.produzione
		);
	}
}

export default new NordovestView();
