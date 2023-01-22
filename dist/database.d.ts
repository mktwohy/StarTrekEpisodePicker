export interface Episode {
    episodeId: string;
    seasonId: string;
    title: string;
    episodeNumber: number;
    stardateStart: number;
    stardateEnd: number;
    yearStart: number;
    yearEnd: number;
    usAirDate: number;
}
export declare class StarTrekDatabase {
    getAllEpisodes(limit?: number | null): Promise<Episode>;
}
