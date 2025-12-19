export type FaunaUser = {
    roles: string[],
    locale?: string,
}

export type FaunaPresentUser = {
    id: number | null,
    username: string,
    picture: string,
    twitter?: string,
    github?: string,
    url?: string,
};

