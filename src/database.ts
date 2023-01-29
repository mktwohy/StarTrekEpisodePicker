export class StarTrekDatabase {
    private episodes: Episode[] = []
    private seasons: Season[] = []
    private series: Series[] = []

    constructor(onLoad: () => void) {
        let path = '/StarTrekEpisodePicker/src/db/json/'
        Promise.all([
            getJSON(path + 'series.json'),
            getJSON(path + 'seasons.json'),
            getJSON(path + 'episodes.json')
        ])
            .then(([series, seasons, episodes]: Array<any>) => {
                this.series = series.map(parseToSeries)
                this.seasons = seasons.map((json: any) =>
                    parseToSeason(
                        json,
                        this.getSeriesFromId(json.series.uid)!!
                    )
                )
                this.episodes = episodes.map((json: any) =>
                    parseToEpisode(
                        json,
                        this.getSeriesFromId(json.series.uid)!!,
                        this.getSeasonFromId(json.season.uid)!!
                    )
                )
                onLoad()
            })
    }

    getAllEpisodes(limit: number | null = null): Array<Episode> {
        return getAll_(this.episodes, limit)
    }

    getAllSeasons(limit: number | null = null): Array<Season> {
        return getAll_(this.seasons, limit)
    }

    getAllSeries(limit: number | null = null): Array<Series> {
        let compareFunc = (a: Series, b: Series) =>
            a.productionYearStart - b.productionYearStart

        return getAll_(this.series, limit).sort(compareFunc)
    }

    getEpisodeFromId(id: string): Episode | null {
        return this.episodes.filter(episode => episode.id === id)[0]
    }

    getSeasonFromId(id: string): Season | null {
        return this.seasons.filter(season => season.id === id)[0]
    }

    getSeriesFromId(id: string): Series | null {
        return this.series.filter(series => series.id === id)[0]
    }

    getRandomEpisode(filter: ((episode: Episode) => boolean) | null = null): Episode {
        return (filter !== null)
            ? this.episodes.filter(filter).random()
            : this.episodes.random()
    }
}

function getAll_<T>(list: T[] , limit: number | null) {
    return (limit !== null) ? list.slice(0, limit) : list
}

function getJSON(url: string): Promise<object> {
    return fetch(url)
        .then(response => response.json())
        .then(data => data as Array<object>)
}

export interface Episode {
    id: string
    season: Season
    series: Series
    title: string
    episodeNumber: number
    stardateStart: number
    stardateEnd: number
    yearStart: number
    yearEnd: number
    usAirDate: string
}

export interface Season {
    id: string,
    series: Series
    title: string,
    seasonNumber: number,
    episodeCount: number
}

export interface Series {
    id: string,
    title: string,
    abbreviation: string,
    productionYearStart: number,
    productionYearEnd: number | null,
    runYearStart: number,
    runYearEnd: number | null,
    seasonCount: number,
    episodeCount: number
}

function parseToEpisode(json: any, series: Series, season: Season): Episode {
    return {
        id: json.uid,
        series: series,
        season: season,
        title: json.title,
        episodeNumber: json.episodeNumber,
        stardateStart: json.stardateFrom,
        stardateEnd: json.stardateTo,
        yearStart: json.yearFrom,
        yearEnd: json.yearTo,
        usAirDate: json.usAirDate
    }
}

function parseToSeason(json: any, series: Series): Season {
    return {
        id: json.uid,
        series: series,
        title: json.title,
        seasonNumber: json.seasonNumber,
        episodeCount: json.numberOfEpisodes
    }
}

function parseToSeries(json: any): Series {
    return {
        id: json.uid,
        title: (json.title as string).replace("Star Trek: ", ""),
        abbreviation: json.abbreviation,
        seasonCount: json.seasonsCount,
        episodeCount: json.episodesCount,
        productionYearStart: json.productionStartYear,
        productionYearEnd: json.productionEndYear,
        runYearStart: json.originalRunStartDate,
        runYearEnd: json.originalRunEndDate
    }
}
