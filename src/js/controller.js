import AsideView from './views/asideView.js';

import SettingsView from './views/settingsView.js';
import MatriceView from './views/matriceView.js';
import NordovestView from './views/nordovestView.js';
import MinimicostiView from './views/minimicostiView.js';

import * as model from './model.js';

const controlCreateTable = function (tableData) {
	Object.assign(model.state, tableData);
	model.riempiMatrice();
	model.riempiTotali();

	MatriceView.renderTable(model.state, updateViews);

	updateViews();
};

const controlFillTable = function (matriceData, totaliData) {
	Object.assign(model.state.matrice, matriceData);
	Object.assign(model.state.totali, totaliData);

	model.riempiMatriceRandom();
	model.riempiTotaliRandom();

	MatriceView.renderTable(model.state, updateViews);

	updateViews();
};

const updateViews = function () {
	NordovestView.renderTable(model.state);
	MinimicostiView.renderTable(model.state);
};

// NAVIGATION
AsideView.addHandlerClick();

// IMPOSTARE I PARAMETRI
SettingsView.addHandlerCreate(controlCreateTable);
SettingsView.addHandlerFill(controlFillTable);

// SPAGHETTI CODE PROVISSORIO PER DEVELOPMENT
// setTimeout(() => {
// 	document.querySelector('#genera_tabella > input[type=submit]').click();
// 	document.querySelector('#riempi_tabella > input[type=submit]').click();
// 	// setTimeout(() => {
// 		// document.querySelector('#root > div > header > aside > div:nth-child(5)').click();
// 		setTimeout(() => {
// 			console.log(model.state);
// 			NordovestView.metodo(model.state);
// 			MinimicostiView.metodo(model.state);
// 		}, 1*60*1000);
// 	// }, 500);
// }, 500);
