class AsideView {
	parentElement = document.querySelector('aside');

	constructor() {
		this.settingsView = document.querySelector('#settings');
		this.matriceView = document.querySelector('#matrice');
		this.nordovestView = document.querySelector('#nordovest');
		this.minimicostiView = document.querySelector('#minimicosti');
		this.riepilogoView = document.querySelector('#riepilogo');
		this.alias = {
			settings: this.settingsView,
			matrice: this.matriceView,
			nordovest: this.nordovestView,
			minimicosti: this.minimicostiView,
			riepilogo: this.riepilogoView,
		};
	}
	addHandlerClick() {
		this.parentElement.addEventListener('click', (e) => {
			if (e.target?.dataset?.view) {
				const currentView = e.target.dataset.view;
				this.settingsView.classList.add('hidden');
				this.matriceView.classList.add('hidden');
				this.nordovestView.classList.add('hidden');
				this.minimicostiView.classList.add('hidden');
				this.riepilogoView.classList.add('hidden');

				this.alias[currentView].classList.remove('hidden');
			}
		});
	}
}

export default new AsideView();
