class SettingsView {
	parentElement = document.querySelector('#settings');

	created = false;

	addHandlerCreate(handler) {
		this.parentElement.querySelector('#genera_tabella').addEventListener('submit', (e) => {
			e.preventDefault();
			if (this.created === true) {
				this.created = false;
				alert('La tabella attuale verrà sovrascritta, riprova per continuare');
				return;
			}
			this.created = true;
			const dataArr = [...new FormData(e.target)];
			const data = Object.fromEntries(dataArr);
			for (const key in data) data[key] = data[key] ? Number(data[key]) : 0;
			this.parentElement.querySelector('#riempi_tabella').classList.remove('opacity-25');
			this.parentElement.querySelector('#riempi_tabella').inert = false;
			document.querySelector('#matrice').querySelector('table').inert = false;

			document.querySelector('[data-view="matrice"]').classList.add('flash');

			handler(data);
		});
	}
	addHandlerFill(handler) {
		this.parentElement.querySelector('#riempi_tabella').addEventListener('submit', (e) => {
			e.preventDefault();

			this.parentElement.querySelector('#riempi_tabella').inert = false;
			
			const dataArr = [...new FormData(e.target)];
			const data = Object.fromEntries(dataArr);

			for (const key in data) data[key] = data[key] ? Number(data[key]) : 0;

			const { minimo_matrice, massimo_matrice, minimo_totali, massimo_totali } = data;

			if (minimo_matrice >= massimo_matrice || minimo_totali >= massimo_totali) {
				return alert('Il massimo deve essere maggiore del minimo');
			}

			const matriceValori = { minimo: minimo_matrice, massimo: massimo_matrice };
			const totaliValori = { minimo: minimo_totali, massimo: massimo_totali };

			handler(matriceValori, totaliValori);
		});
	}
}

export default new SettingsView();
