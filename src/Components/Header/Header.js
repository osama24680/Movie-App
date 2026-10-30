import { useContext } from "react"
import { Link } from "react-router-dom"
import { moviesStore } from "../../Store/ContextStore"
import { AiFillStar, AiOutlinePlayCircle } from "react-icons/ai"
import { BiCalendar } from "react-icons/bi"
import { ratingClass } from "../../lib/rating"
import "./Header.scss"

const Header = () => {
    const ctx = useContext(moviesStore)
    const movie = ctx.randomMovie

    if (!movie) return <section className="hero hero--loading" />

    const title = movie.title || movie.name || movie.original_title || movie.original_name
    const mediaType = movie.media_type || "movie"

    return (
        <section className="hero">
            <img className="hero__bg" src={ctx.imgBackgroundURL + movie.backdrop_path} alt="" />
            <div className="hero__content">
                <span className="hero__badge">🔥 Trending today</span>
                <h1 className="hero__title">{title}</h1>
                <div className="hero__meta">
                    {ctx.vote && <span className={ratingClass(movie.vote_average)}><AiFillStar /> {ctx.vote}</span>}
                    {ctx.annualDate && <span><BiCalendar /> {ctx.annualDate}</span>}
                    <span className="hero__pill">{mediaType === "tv" ? "TV Show" : "Movie"}</span>
                    <span className="hero__pill">{movie.original_language?.toUpperCase()}</span>
                </div>
                <p className="hero__overview">{ctx.truncate(movie.overview, 200)}</p>
                <div className="hero__actions">
                    <Link to={`/MovieDetails/${movie.id}/${mediaType}`} className="btn-gradient">
                        <AiOutlinePlayCircle size={22} /> Watch trailer
                    </Link>
                    <a href="#browse" className="btn-ghost">Browse all</a>
                </div>
            </div>
        </section>
    )
}

export default Header
