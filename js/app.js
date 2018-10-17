const apiUrl = 'http://api.tvmaze.com/search/shows?q='
let btnSearch = document.querySelector('#btnSearch')
let cardContainer = document.querySelector('.card-container')

btnSearch.addEventListener('click', (e) => {
	let txtSearch = document.querySelector('#txtSearch').value
	let query = `${apiUrl}${txtSearch}`
	toogle(e.target)
	fetch(query).
		then((data) => {
			return data.json()
		}).
		then((response) => {
			cardContainer.innerHTML = ''
			document.querySelector('.total-series').innerHTML = templateResult(response.length)
			response.forEach((serie) => {
				cardContainer.innerHTML +=  templateSerie(serie)
			})
		}).
		finally(() => {
			toogle(e.target)
		})
})

const templateSerie = (serie) => {
	const DEFAULT_IMG = 'images/default.png'
	let img = serie.show.image ? serie.show.image.medium : DEFAULT_IMG
	return `<div class="card">
				<div class="card-hero" >
					<div class="${serie.show.status === 'Ended' ? 'cancel':''}"></div>
					<img src="${img}" alt="" />
				</div>
				<div class="card-title"><h3>${serie.show.name}</h3></div>
			</div>`
}

const templateResult = (count) => {
	return `<h2>Se han encontrado ${count} resultado(s)</h2>`
}

const toogle = (el) => {
	if(!el.classList.contains('load')) {
		el.textContent = 'Cargando....'
		el.classList.add('load')
		el.disabled = true
	} else {
		el.textContent = 'Buscar'
		el.classList.remove('load')
		el.disabled = false
	}
}