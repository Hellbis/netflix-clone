export interface Category {
    slug: string
    title: string
    items: Pages
}

export interface Pages {
    page: number
    total_pages: number
    results: Array<Movie>
}

export interface Movie {
    id: number
    name: string
    poster_path?: string
    backdrop_path?: string
    vote_average?: number
    number_of_seasons?: number
    overview: string
    genres?: Array<Genres>
    first_air_date: string
}

export interface Genres {
    id: number
    name: string
}