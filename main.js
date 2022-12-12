let episodes

$(document).ready(() => {
    $.getJSON('episodes.json')
        .then((data) => {
            episodes = data
            pickRandomEpisode()
        })
})


function pickRandomEpisode() {
    if (episodes === undefined) {
        console.error("Cannot pick random episode; episodes have not been read from file yet.")
        return
    }
    let episode = episodes.random()
    console.log("Randomly picked episode: ", episode)
    $('#episode').text(`${episode.season.title}: ${episode.title}`)
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}