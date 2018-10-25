const apiURL = 'http://api.tvmaze.com/search/showss?q='
const btnSearch = document.querySelector('#btnSearch')

btnSearch.addEventListener('click', function (e) {
	e.preventDefault();
	let contenido = document.querySelector('#tbxSearch').value
	let query = `${apiURL}${contenido}`
	toogle(e.target)

	setTimeout(function () {
		fetch(query).
		then(function (data) {
			return data.json()
		}).
		then(function (response) {
			let totalSeries = document.querySelector('.total-series')
			totalSeries.innerHTML = templateTotal(response.length)
			let containerSeries = document.querySelector('.cards-series')
			 containerSeries.innerHTML =  ''
			response.forEach(function (serie) {
				containerSeries.innerHTML += templateSerie(serie)
			})
		}).catch(function () {
			alert('ocurrió un error')
		}).
		finally(function () {
			toogle(e.target)
		})	
	}, 1000)
	
})

const templateTotal = function (total) {
	return `<h2>Se han encontrado ${total} resultado(s)</h2>`
}

const templateSerie = function (serie) {
	let img = serie.show.image ? serie.show.image.medium : 'images/default.png'
	return `<div class="card">
                <div class="card-hero">
                    <img src="${img}" alt="">
                </div>
                <div class="card-title">
                    <h3>${serie.show.name}</h3>
                </div>
            </div>`

}

const toogle = function (el) {
	if(!el.classList.contains('load')) {
		el.classList.add('load')
		el.textContent = 'Buscando...'
		el.disabled = true
	} else {
		el.classList.remove('load')
		el.textContent = 'Buscar'
		el.disabled = false
	}
}