class RiepilogoView {
	static parentElement = document.querySelector('#riepilogo');

	static clearPaper(paper) {
		document.querySelector(paper + '>ul').innerHTML = '';
	}

	static aggiungiRiga(paper, produttore, consumatore, unita, prezzo) {
		document.querySelector(paper);
		const html = this.createString(produttore, consumatore, unita, prezzo);
		document.querySelector(paper + '> ul').insertAdjacentHTML('beforeend', html);
	}

	static aggiungiTotale(paper, totale) {
		document.querySelector(paper + ' [data-totale]').innerText = totale;
	}

	static createString(produttore, consumatore, unita, prezzo) {
		return `
      <li>
        <div class="font-semibold">Da ${produttore} a ${consumatore}:</div>
        <p>${unita} unità a ${prezzo}€ = ${unita * prezzo}€</p>
      </li>
    `;
	}
}

export default RiepilogoView;
