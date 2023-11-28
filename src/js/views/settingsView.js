class SettingsView {
	parentElement = document.querySelector('#settings');

	addHandlerCreate(handler) {
		this.parentElement.querySelector('#genera_tabella').addEventListener('submit', (e) => {
			e.preventDefault();
			const dataArr = [...new FormData(e.target)];
			const data = Object.fromEntries(dataArr);
			for (const key in data) data[key] = data[key] ? Number(data[key]) : 0;
			this.parentElement.querySelector('#riempi_tabella').classList.remove('opacity-50');
			this.parentElement.querySelector('#riempi_tabella').inert = false;

      handler(data);
		});
	}
  addHandlerFill(handler) {
    this.parentElement.querySelector('#riempi_tabella').addEventListener('submit', (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(e.target)];
      const data = Object.fromEntries(dataArr);
    
      for (const key in data) data[key] = data[key] ? Number(data[key]) : 0;
      if (data.minimo_matrice >= data.massimo_matrice || data.minimo_totali >= data.massimo_totali)
        return alert('il massimo deve essere maggiore del minimo');
    
      const matriceValori = { minimo: data.minimo_matrice, massimo: data.massimo_matrice };
      const totaliValori = { minimo: data.minimo_totali, massimo: data.massimo_totali };
      handler(matriceValori, totaliValori)
    });
  }

}

export default new SettingsView();
