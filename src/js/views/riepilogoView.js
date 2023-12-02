class RiepilogoView {
	parentElement = document.querySelector('#riepilogo');

	constructor() {
	}

  createString (produttore, consumatore, unita, prezzo){
    return `Da ${produttore} a ${consumatore} nr.${unita}: ${unita} unità a ${prezzo}€ = ${unita*prezzo}€`;
  }

}

export default new RiepilogoView();
