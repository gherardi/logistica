import AsideView from './views/asideView.js';

import SettingsView from './views/settingsView.js';
import MatriceView from './views/matriceView.js';
import NordovestView from './views/nordovestView.js';
// import MinimicostiView from './views/minimicostiView.js';

import * as model from './model.js';

// const settingsView = document.querySelector('#settings');
// const matriceView = document.querySelector('#matrice');
// const nordovestView = document.querySelector('#nordovest');
// const minimicostiView = document.querySelector('#minimicosti');

// spostarsi tra le pagine
// const alias = {
// 	settings: settingsView,
// 	matrice: matriceView,
// 	nordovest: nordovestView,
// 	minimicosti: minimicostiView,
// };

// document.querySelector('aside').addEventListener('click', (e) => {
// 	if (e.target?.dataset?.view) {
// 		const currentView = e.target.dataset.view;
// 		settingsView.classList.add('hidden');
// 		matriceView.classList.add('hidden');
// 		nordovestView.classList.add('hidden');
// 		minimicostiView.classList.add('hidden');

// 		alias[currentView].classList.remove('hidden');
// 	}
// });

// impostare le variabili della matrice
// document.querySelector('#genera_tabella').addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const dataArr = [...new FormData(e.target)];
// 	const data = Object.fromEntries(dataArr);

// 	for (const key in data) data[key] = data[key] ? Number(data[key]) : 0;

// 	Object.assign(model.state, data);

// 	document.querySelector('#riempi_tabella').classList.remove('opacity-50');
// 	document.querySelector('#riempi_tabella').inert = false;
// });

const controlCreateTable = function (tableData) {
	Object.assign(model.state, tableData);
	model.riempiMatrice();
	MatriceView.renderTable(model.state);
	MatriceView.addHandlerChange(model.state, updateViews);
	updateViews();
};

const controlFillTable = function (matriceData, totaliData) {
	// settare le variabili nello state
	Object.assign(model.state.matrice, matriceData);
	Object.assign(model.state.totali, totaliData);
	// riempire le celle con i rispettivi valori
	model.riempiMatriceRandom();
	model.riempiTotali();
	// render della matrice sulla matriceView
	MatriceView.renderTable(model.state);
	MatriceView.addHandlerChange(model.state, updateViews);

	updateViews();
};

const updateViews = function () {
	NordovestView.renderTable(model.state);
	// MinimicostiView.renderTable(model.state);
};

// riempire la tabella in base ai parametri
// document.querySelector('#riempi_tabella').addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const dataArr = [...new FormData(e.target)];
// 	const data = Object.fromEntries(dataArr);

// 	for (const key in data) data[key] = data[key] ? Number(data[key]) : 0;
// 	if (data.minimo_matrice >= data.massimo_matrice || data.minimo_totali >= data.massimo_totali)
// 		return alert('il massimo deve essere maggiore del minimo');

// 	const matrice = { minimo: data.minimo_matrice, massimo: data.massimo_matrice };
// 	const totali = { minimo: data.minimo_totali, massimo: data.massimo_totali };
// 	Object.assign(model.state.matrice, matrice);
// 	Object.assign(model.state.totali, totali);
// });

// NAVIGATION
AsideView.addHandlerClick();

// IMPOSTARE I PARAMETRI
SettingsView.addHandlerCreate(controlCreateTable);
SettingsView.addHandlerFill(controlFillTable);

// document.querySelector('#root > div > header > aside > div:nth-child(2)').click();
