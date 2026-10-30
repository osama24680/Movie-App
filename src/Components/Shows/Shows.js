import { useContext } from "react"
import { Link } from "react-router-dom"
import { AiFillStar, AiOutlinePlayCircle } from "react-icons/ai"
import { moviesStore } from "../../Store/ContextStore"
import { ratingClass, yearOf } from "../../lib/rating"
import "./Shows.scss"

// mediaType is the fallback for lists whose items don't carry media_type (discover, similar)
const Shows = ({ shows, mediaType = "movie", isLoading = false }) => {
    const ctx = useContext(moviesStore)

    if (isLoading) {
        return (
            <div className="Shows">
                {Array.from({ length: 12 }).map((_, i) => <div key={i} className="movieCard movieCard--skeleton" />)}
            </div>
        )
    }

    if (!shows?.length) {
        return <p className="Shows__empty">Nothing here yet. Try another search or category 🎬</p>
    }

    return (
        <div className="Shows">
            {shows.map((movie, index) => {
                const title = movie.title || movie.name || movie.original_title || movie.original_name
                const type = movie.media_type || mediaType
                return (
                    <Link
                        key={`${movie.id}-${index}`}
                        to={`/MovieDetails/${movie.id}/${type}`}
                        className="movieCard"
                        style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
                    >
                        <div className="movieCard__poster">
                            <img
                                src={movie.poster_path ? ctx.imgPosterURL + movie.poster_path : ctx.unavailablePoster}
                                alt={title}
                                loading="lazy"
                            />
                            {movie.vote_average > 0 && (
                                <span className={`movieCard__rating ${ratingClass(movie.vote_average)}`}>
                                    <AiFillStar /> {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                            <span className="movieCard__play"><AiOutlinePlayCircle /></span>
                        </div>
                        <h3 className="movieCard__title">{ctx.truncate(title, 32)}</h3>
                        <p className="movieCard__sub">
                            {yearOf(movie)}{yearOf(movie) && " • "}{type === "tv" ? "TV Show" : "Movie"}
                        </p>
                    </Link>
                )
            })}
        </div >
    )
}

export default Shows
