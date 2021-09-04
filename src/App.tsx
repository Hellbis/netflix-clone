import React, { useEffect, useState } from 'react';
import { MovieRow } from './components/MovieRow';
import { Category, Movie } from './interfaces'
import { FeaturedMovie } from './components/FeaturedMovie'
import Header from './components/Header';
import Tmdb from './Tmdb'
import './App.css'

function App() {
  const [movieList, setMovieList] = useState<Array<Category>>()
  const [featuredData, setFeaturedData] = useState<Movie>()
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }
      else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [blackHeader])

  useEffect(() => {
    const loadAll = async () => {
      const list = await Tmdb.getHomeList()
      setMovieList(list)

      const originals = list.filter(i => i.slug === 'originals')
      const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      const chosen = originals[0].items.results[randomChosen]
      const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie 
          id={featuredData.id} 
          name={featuredData.name}
          overview={featuredData.overview}
          backdrop_path={featuredData.backdrop_path}
          vote_average={featuredData.vote_average}
          number_of_seasons={featuredData.number_of_seasons}
          genres={featuredData.genres}
          first_air_date={featuredData.first_air_date}/>
      }

      <section className="lists">
        {movieList?.map((item, key) => (
          <div key={key}>
            <MovieRow key={key} 
              title={item.title} 
              slug={item.slug} 
              items={item.items} />
          </div>
        ))}
      </section>
      <footer>
        Direitos de imagem para Netflix <br/>
        Dados pegos de site Themoviedb.org
      </footer>
      {movieList === null && 
        <div className="loading">
          <img src="https://1.bp.blogspot.com/-B9juta27w6o/Xzk4GGrOziI/AAAAAAABtpE/0OMhU_0hPTY7PhayDfL3eJ5mIc2csWWWwCLcBGAsYHQ/s1600/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  )
}

export default App;
