import { useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import { BiCalendar, BiTime } from "react-icons/bi"
import { moviesStore } from "../../Store/ContextStore"
import { ratingClass, yearOf } from "../../lib/rating"
import useDocumentTitle from "../../lib/useDocumentTitle"
import Shows from "../../Components/Shows/Shows"
import Navbar from "../../Components/Navbar/Navbar"
import CustomPagination from "../../Components/Pagination/CustomPagination"
import Footer from "../../Components/Footer/Footer"
import "./MovieDetails.scss"

function formatRuntime(movie) {
    const minutes = movie.runtime || movie.episode_run_time?.[0]
    if (!minutes) return ""
    const h = Math.floor(minutes / 60)
    return h ? `${h}h ${minutes % 60}m` : `${minutes}m`
}

const MovieDetails = () => {
    const ctx = useContext(moviesStore)
    const { id, element } = useParams()
    const { setShowID, setShowELEMENT, setPageNumber } = ctx
    const movie = ctx.singleMovie

    useEffect(() => {
        setShowID(id)
        setShowELEMENT(element)
        setPageNumber(1)
        window.scrollTo(0, 0)
    }, [id, element, setShowID, setShowELEMENT, setPageNumber])

    const isLoaded = String(movie.id) === String(id)
    const title = movie.title || movie.name || movie.original_title || movie.original_name
    useDocumentTitle(isLoaded ? title : "")

    return (
        <>
            <Navbar />
            <section className="details">
                {isLoaded && movie.backdrop_path && (
                    <img className="details__backdrop" src={ctx.imgBackgroundURL + movie.backdrop_path} alt="" />
                )}
                <div className="details__inner">
                    <div className="details__poster">
                        {isLoaded ? (
                            <img src={movie.poster_path ? ctx.imgPosterURL + movie.poster_path : ctx.unavailablePoster} alt={title} />
                        ) : <div className="details__skeleton" />}
                    </div>
                    {isLoaded && (
                        <div className="details__info">
                            <span className="details__type">{element === "tv" ? "TV Show" : "Movie"}</span>
                            <h1 className="details__title">{title}</h1>
                            {movie.tagline && <p className="details__tagline">“{movie.tagline}”</p>}
                            <div className="details__meta">
                                {movie.vote_average > 0 && (
                                    <span className={ratingClass(movie.vote_average)}>
                                        <AiFillStar /> {movie.vote_average.toFixed(1)}
                                        <small>({movie.vote_count?.toLocaleString()})</small>
                                    </span>
                                )}
                                {yearOf(movie) && <span><BiCalendar /> {yearOf(movie)}</span>}
                                {formatRuntime(movie) && <span><BiTime /> {formatRuntime(movie)}</span>}
                            </div>
                            <div className="details__genres">
                                {movie.genres?.map((g) => <span key={g.id}>{g.name}</span>)}
                            </div>
                            <p className="details__overview">{movie.overview || "No overview available."}</p>
                        </div>
                    )}
                </div>
            </section>

            <main className="home__container details__body">
                {ctx.trailer && (
                    <section>
                        <h2 className="section-title">Trailer</h2>
                        <div className="details__trailer">
                            <iframe
                                src={`https://www.youtube.com/embed/${ctx.trailer}`}
                                title={`${title} trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </section>
                )}

                {ctx.cast.length > 0 && (
                    <section>
                        <h2 className="section-title">Top cast</h2>
                        <div className="details__cast">
                            {ctx.cast.slice(0, 20).map((person) => (
                                <Link className="castCard" key={person.credit_id} to={`/person/${person.id}`}>
                                    <img
                                        src={person.profile_path ? ctx.imgPosterURL + person.profile_path : ctx.noPicturePerson}
                                        alt={person.name}
                                        loading="lazy"
                                    />
                                    <b>{person.name}</b>
                                    <small>{person.character}</small>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {ctx.similarShows.length > 0 && (
                    <section id="similar">
                        <h2 className="section-title">You may also like</h2>
                        <Shows shows={ctx.similarShows} mediaType={element} />
                        <CustomPagination scrollTo="similar" />
                    </section>
                )}
            </main>
            <Footer />
        </>
    )
}

export default MovieDetails
