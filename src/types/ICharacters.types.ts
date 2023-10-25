export interface IGetCharactersRequest {
    info: IInfoResponse;
    results: ICharacter[];
}

export interface IGetLocationsRequest {
    info: IInfoResponse;
    results: ILocation[];
}

export interface IGetEpisodesRequest {
    info: IInfoResponse;
    results: IEpisode[];
}

export interface IGetFilterCharacterRequest {
    characters: IGetCharactersRequest;
    location: IGetLocationsRequest;
    episode: IGetEpisodesRequest;
}

export interface IInfoResponse {
    count: number;
    pages: number;
    next?: string | null;
    prev?: string | null;
}

export interface IOrigin {
    name: string;
    url: string;
}

export interface ICharacter {
    id: string;
    name: string;
    status: string;
    species: string;
    type?: string;
    gender?: string;
    origin: IOrigin;
    image: string;
    location: Pick<ILocation, 'name' | 'url'>;
    episode?: string[];
    url?: string;
    created?: Date
}

export interface CharacterProps extends ICharacter {
    isCharacter?: boolean;
}

export interface ICharacterFilter {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
    page: number;
}

export interface ICharactersFilter {
    character: ICharacterFilter;
    episode: IEpisodeFilter;
    location: ILocationFilter;
}

export interface ILocationFilter {
    name: string;
    type: string;
    dimension: string;
}

export interface IEpisodeFilter {
    name: string;
    episode: string;
}

export interface ILocation {
    id: string
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
}

export interface IEpisode {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
}



















