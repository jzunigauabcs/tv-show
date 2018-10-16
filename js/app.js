const apiUrl = 'http://api.tvmaze.com/search/shows?q='
let btnSearch = document.querySelector('#btnSearch')

btnSearch.addEventListener('click', () => {
	let txtSearch = document.querySelector('#txtSearch').value
	let query = `${apiUrl}${txtSearch}`
	fetch(query).
		then((data) => {
			return data.json()
		}).
		then((response) => {
			console.log(response[0].show.name)
		})
})