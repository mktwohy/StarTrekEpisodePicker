import {filterNotNull, random} from "./extensions/array-extensions";
import {Episode, Series, StarTrekDatabase} from "./database";

const db = new StarTrekDatabase(
    onload= () => {
        populateSeries()
        showRandomEpisode()
    }
)

// extension boilerplate
Array.prototype.random = function() { return random(this) }
Array.prototype.filterNotNull = function() { return filterNotNull(this) }


$(document).ready(() => {
    $('#btn_new_episode').on('click', showRandomEpisode)
})

function populateSeries() {
    let series = db.getAllSeries()
    let seriesFilters = $('#series_filters')
    for (let s of series) {
        seriesFilters.append(`
            <li>
                <div class="toggle-button">
                    <input type="checkbox" id="${s.id}">
                    <label for="${s.id}">
                        <span>${s.title}</span>
                    </label>
                </div>
            </li>
        `)
    }
    seriesFilters
        .find('li input')
        .prop('checked', true)
}

function getToggledSeries(): Series[] {
    return $('#series_filters')
        .find('input:checked')
        .toArray()
        .map(item => db.getSeriesFromId(item.id))
        .filter(item => item)
        .filterNotNull()
}

function seriesIsSelected(uid: string) {
    let series = db.getSeriesFromId(uid)
    if (series === null) return false
    return series.title.includes("Star Trek:")
}

function showRandomEpisode() {
    let toggledSeriesIds = getToggledSeries().map(series => series.id)
    let episode = db.getRandomEpisode(episode=>
        toggledSeriesIds.includes(episode.series.id)
    )
    if (episode === undefined || episode === null) return
    $('#episode').text(episode.title)
    $('#season').text(`SEASON ${leftPadZeros(episode.season.seasonNumber)}`)
    $('#series').text(episode.series.title.toUpperCase())
    $('#episode_number').text(`EPISODE ${leftPadZeros(episode.episodeNumber)}`)
}

function leftPadZeros(num: number, targetLength: number = 2): string {
    return num.toString().padStart(targetLength, '0');
}
