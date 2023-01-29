export declare class StarTrekDatabase {
    private episodes;
    private seasons;
    private series;
    constructor(onLoad: () => void);
    getAllEpisodes(limit?: number | null): Array<Episode>;
    getAllSeasons(limit?: number | null): Array<Season>;
    getAllSeries(limit?: number | null): Array<Series>;
    getEpisodeFromId(id: string): Episode | null;
    getSeasonFromId(id: string): Season | null;
    getSeriesFromId(id: string): Series | null;
    getRandomEpisode(filter?: ((episode: Episode) => boolean) | null): Episode;
}
export interface Episode {
    id: string;
    season: Season;
    series: Series;
    title: string;
    episodeNumber: number;
    stardateStart: number;
    stardateEnd: number;
    yearStart: number;
    yearEnd: number;
    usAirDate: Date;
}
export interface Season {
    id: string;
    series: Series;
    title: string;
    seasonNumber: number;
    episodeCount: number;
}
export interface Series {
    id: string;
    title: string;
    abbreviation: string;
    productionYearStart: number;
    productionYearEnd: number | null;
    runDateStart: Date;
    runDateEnd: Date | null;
    seasonCount: number;
    episodeCount: number;
}
