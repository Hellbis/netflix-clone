import React from 'react'
import { Movie } from '../interfaces'
import '../styles/FeaturedMovie.css'

export const FeaturedMovie = ({ 
        id, 
        name, 
        backdrop_path, 
        vote_average,
        number_of_seasons,
        overview, 
        genres,
        first_air_date
    }: Movie) => {

    const firstDate = new Date(first_air_date)
    const genresAtribute = [] as any
    genres?.forEach((value) => {
        genresAtribute.push(value.name)
    })

    let description = overview
    if(description.length > 200) {
        description = description.substring(0, 200) + '...'
    }
    
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(http://image.tmdb.org/t/p/original${backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured-horizontal">
                    <div className="featured--name">{name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{number_of_seasons} {number_of_seasons !== 1 ? 'temporadas':'temporada'}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gênero: </strong>{genresAtribute.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}