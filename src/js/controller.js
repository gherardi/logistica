import AsideView from './views/asideView.js';

import SettingsView from './views/settingsView.js';
import MatriceView from './views/matriceView.js';
import NordovestView from './views/nordovestView.js';
import MinimicostiView from './views/minimicostiView.js';
import RiepilogoView from './views/riepilogoView.js';

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
	NordovestView.addHandlerResolve(model.state);
	MinimicostiView.renderTable(model.state);
	MinimicostiView.addHandlerResolve(model.state);
};

// NAVIGATION
AsideView.addHandlerClick();

// IMPOSTARE I PARAMETRI
SettingsView.addHandlerCreate(controlCreateTable);
SettingsView.addHandlerFill(controlFillTable);


console.log('https://github.com/gherardi/logistica');