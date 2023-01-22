import {Database} from "sqlite3";

const db = new Database('db/StarTrek.sqlite3')

export interface Episode {
    episodeId: string,
    seasonId: string,
    title: string,
    episodeNumber: number,
    stardateStart: number,
    stardateEnd: number,
    yearStart: number,
    yearEnd: number,
    usAirDate: number
}

export class StarTrekDatabase {
    getAllEpisodes(limit: number | null = null): Promise<Episode> {
        let limitClause = limit == null ? "" : `LIMIT ${limit}`
        let query = `SELECT * FROM Episode ${limitClause}`
        return databaseRunSelect<Episode>(query)
    }

}

function databaseRunSelect<T>(
    query: string,
    params: any[] = [],
): Promise<T> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(`\nRUN FAILED: \n\tquery: ${query} \n\tparams: ${params}\n\terror: ${err}\n`)
            } else {
                console.log(`\nRUN: \n\tquery: ${query} \n\tparams: ${params}\n`)
                resolve(rows as T);
            }
        });
    })
}

function databaseRun(query: string, params: any[]=[]): Promise<void> {
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