function pickRandomEpisode() {
    // getJSON('http://stapi.co/api/v1/rest/episode/search')
    //     .then(allEpisodes => {
    //         let episode = allEpisodes.episodes.random()
    //         $('#episode').text(`${episode.season.title}: ${episode.title}`)
    //     })
}

function getJSON(url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest()
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    resolve(JSON.parse(req.response))
                }
                else {
                    reject(req.response)
                }
            }
        }
        req.open('GET', url, true)
        req.send()
    })
}

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
}