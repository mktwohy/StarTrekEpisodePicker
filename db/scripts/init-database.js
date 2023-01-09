const sqlite3 = require('sqlite3')
const fs = require('fs')
const path = require('path')

const dirPath = {
    db: path.join(__dirname, '..'),
    json: path.join(__dirname, '..', 'json'),
    scripts: path.join(__dirname, '..', 'scripts')
}
const filePath = {
    starTrek_sqlite3: path.join(dirPath.db, 'StarTrek.sqlite3'),
    episodes_json: path.join(dirPath.json, 'episodes.json'),
    seasons_json: path.join(dirPath.json, 'seasons.json'),
    series_json: path.join(dirPath.json, 'series.json'),

}
const db = new sqlite3.Database(filePath.starTrek_sqlite3)
const sqlStatement = {
    clearTables: {
        query: `DELETE FROM Series; DELETE FROM Season; DELETE FROM Episode;`
    },
    insertSeries: {
        query: `INSERT OR REPLACE INTO Series VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        getParams: (series) => [
            series.uid,
            series.title,
            series.abbreviation,
            series.productionStartYear,
            series.productionEndYear,
            series.originalRunStartDate,
            series.originalRunEndDate,
            series.seasonsCount,
            series.episodesCount,
            series.featureLengthEpisodesCount
        ]
    },
    insertSeason: {
        query: `INSERT OR REPLACE INTO Season VALUES (?, ?, ?, ?, ?)`,
        getParams: (season) => [
            season.uid,
            season.series.uid,
            season.title,
            season.seasonNumber,
            season.numberOfEpisodes
        ]
    },
    insertEpisode: {
        query: `INSERT OR REPLACE INTO Episode VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        getParams: (episode) => [
            episode.uid,
            episode.season.uid,
            episode.title,
            episode.episodeNumber,
            episode.starDateFrom,
            episode.stardateTo,
            episode.yearFrom,
            episode.yearTo,
            episode.usAirDate
        ]
    }
}

function main() {
    let allSeries = getJSONSync(filePath.series_json)
    let allEpisodes = getJSONSync(filePath.episodes_json)
    let allSeasons = getJSONSync(filePath.seasons_json)

    databaseRun(sqlStatement.clearTables.query)
        .then(() =>
            databaseRunForEach(sqlStatement.insertSeries, allSeries)
        )
        .then(() =>
            databaseRunForEach(sqlStatement.insertSeason, allSeasons)
        )
        .then(() =>
            databaseRunForEach(sqlStatement.insertEpisode, allEpisodes)
        )
        .catch((err) => {
            console.log(err)
        })
}

function databaseRun(query, params=[]) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                reject(`\nRUN FAILED: \n\tquery: ${query} \n\tparams: ${params}\n\terror: ${err}\n`)
            } else {
                console.log(`\nRUN: \n\tquery: ${query} \n\tparams: ${params}\n`)
                resolve();
            }
        });
    })
}

function databaseRunForEach(statement, paramList) {
    return Promise.all(paramList.map(c =>
        databaseRun(statement.query, statement.getParams(c))
    ))
}

function getJSON(path) {
    return fs.promises.readFile(path)
        .then(fileContent =>
            JSON.parse(fileContent.toString())
        )
}

function getJSONSync(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

main()
