import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiCalendar, BiMap } from "react-icons/bi"
import { moviesStore, tmdb } from "../../Store/ContextStore"
import Shows from "../../Components/Shows/Shows"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import "../MovieDetails/MovieDetails.scss"
import "./Person.scss"

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

function ageOf(birthday, deathday) {
    const end = deathday ? new Date(deathday) : new Date()
    const birth = new Date(birthday)
    let age = end.getFullYear() - birth.getFullYear()
    if (end < new Date(end.getFullYear(), birth.getMonth(), birth.getDate())) age--
    return age
}

// Their most voted titles first, each title once, only ones with a poster
function knownFor(cast) {
    const seen = new Set()
    return [...cast]
        .sort((a, b) => b.vote_count - a.vote_count)
        .filter((item) => {
            const key = `${item.media_type}-${item.id}`
            if (!item.poster_path || seen.has(key)) return false
            seen.add(key)
            return true
        })
        .slice(0, 30)
}

const Person = () => {
    const ctx = useContext(moviesStore)
    const { id } = useParams()
    const [person, setPerson] = useState(null)
    const [credits, setCredits] = useState([])
    const [error, setError] = useState(false)
    const [showFullBio, setShowFullBio] = useState(false)

    useEffect(() => {
        let ignore = false
        setPerson(null)
        setCredits([])
        setError(false)
        setShowFullBio(false)
        window.scrollTo(0, 0)
        Promise.all([tmdb.get(`/person/${id}`), tmdb.get(`/person/${id}/combined_credits`)])
            .then(([details, combined]) => {
                if (ignore) return
                setPerson(details.data)
                setCredits(knownFor(combined.data.cast))
            })
            .catch(() => !ignore && setError(true))
        return () => { ignore = true }
    }, [id])

    const bio = person?.biography || ""
    const isLongBio = bio.length > 600

    return (
        <>
            <Navbar />
            <section className="details person">
                {credits[0]?.backdrop_path && (
                    <img className="details__backdrop" src={ctx.imgBackgroundURL + credits[0].backdrop_path} alt="" />
                )}
                <div className="details__inner">
                    <div className="details__poster">
                        {person ? (
                            <img src={person.profile_path ? ctx.imgPosterURL + person.profile_path : ctx.noPicturePerson} alt={person.name} />
                        ) : !error && <div className="details__skeleton" />}
                    </div>
                    {error && <p className="person__error">We couldn't load this person. Please try again later.</p>}
                    {person && (
                        <div className="details__info">
                            <span className="details__type">{person.known_for_department || "Actor"}</span>
                            <h1 className="details__title">{person.name}</h1>
                            <div className="details__meta">
                                {person.birthday && (
                                    <span>
                                        <BiCalendar /> {formatDate(person.birthday)}
                                        {!person.deathday && ` (${ageOf(person.birthday)} years)`}
                                    </span>
                                )}
                                {person.deathday && (
                                    <span>Died {formatDate(person.deathday)} ({ageOf(person.birthday, person.deathday)} years)</span>
                                )}
                                {person.place_of_birth && <span><BiMap /> {person.place_of_birth}</span>}
                            </div>
                            <p className="details__overview person__bio">
                                {!bio && "No biography available."}
                                {isLongBio && !showFullBio ? `${bio.slice(0, 600).trim()}...` : bio}
                            </p>
                            {isLongBio && (
                                <button type="button" className="person__more" onClick={() => setShowFullBio(!showFullBio)}>
                                    {showFullBio ? "Show less" : "Read more"}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {credits.length > 0 && (
                <main className="home__container details__body">
                    <section>
                        <h2 className="section-title">Known for</h2>
                        <Shows shows={credits} />
                    </section>
                </main>
            )}
            <Footer />
        </>
    )
}

export default Person
