export interface IAllCharacters {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: ICharacter[];
}

export interface IOrigin {
    name: string;
    url: string;
}

export interface ILocation {
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
    location: ILocation;
    episode?: string[];
    url?: string;
    created?: Date
}

export interface CharacterProps extends ICharacter {
    isCharacter?: boolean;
}