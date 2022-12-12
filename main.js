
let allSeries
let allEpisodes

$(document).ready(() => {
    Promise.all([
        $.getJSON('json/series.json'),
        $.getJSON('json/episodes.json')
    ])
        .then((data) => {
            allSeries = data[0]
            allEpisodes = data[1]
            populateSeries()
            showRandomEpisode()
        })
})

function populateSeries() {
    allSeries.sort((a, b) => a.productionStartYear - b.productionStartYear)

    let seriesFilters = $('#series_filters')
    for (let s of allSeries) {
        seriesFilters.append(`
            <li>
                <input type="checkbox" id="${s.uid}">
                ${s.title}
            </li>
        `)
    }
    seriesFilters
        .find('li input')
        .prop('checked', true)
}

function getToggledSeries() {
    return $('#series_filters')
        .find('input:checked')
        .toArray()
        .map(item => getSeriesFromId(item.id))
}

function seriesIsSelected(uid) {
    let series = getSeriesFromId(uid)
    if (series === null) return false
    return series.title.includes("Star Trek:")
}

function getSeriesFromId(uid) {
    return allSeries.filter(s => s.uid === uid)[0] || null
}

function showRandomEpisode() {
    if (allEpisodes === undefined) {
        console.error("Cannot pick random episode; episodes have not been read from file yet.")
        return
    }
    console.log("toggled: ", getToggledSeries())

    let toggledSeriesIds = getToggledSeries().map(s => s.uid)
    let episode = allEpisodes
        .filter(e => toggledSeriesIds.includes(e.series.uid))
        .random()
    console.log("Randomly picked episode: ", episode)
    if (episode === undefined) return
    $('#episode').text(`${episode.season.title}: ${episode.title}`)
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}
