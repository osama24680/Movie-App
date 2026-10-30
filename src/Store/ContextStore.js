import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios"
export const moviesStore = createContext(0)

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: "87be747ada7dcf3d3b24c834e67c68a1", language: "en-US" },
})
// TMDB refuses pages above 500
const MAX_PAGES = 500
const imgBackgroundURL = "https://image.tmdb.org/t/p/original"
const imgPosterURL = "https://image.tmdb.org/t/p/w500"
const unavailablePoster = "https://www.movienewz.com/img/films/poster-holder.jpg";
const noPicturePerson = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
}

export function MoviesStoreProvider(props) {
    const [category, setCategoryState] = useState(() => localStorage.getItem("dataTypeShows") || "trending")
    const [randomMovie, setRandomMovie] = useState(null)
    const [shows, setShows] = useState([])
    const [isLoadingShows, setIsLoadingShows] = useState(true)
    const [total_pages, setTotal_pages] = useState(0)
    const [PageNumber, setPageNumber] = useState(1)
    const [searchText, setSearchTextState] = useState("")
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])

    const [showID, setShowID] = useState(null)
    const [showELEMENT, setShowELEMENT] = useState("")
    const [singleMovie, setSingleMovie] = useState({})
    const [trailer, setTrailer] = useState("")
    const [cast, setCast] = useState([])
    const [similarShows, setSimilarShows] = useState([])

    // ************************ category / search ****************************************
    const setCategory = useCallback((item) => {
        localStorage.setItem("dataTypeShows", item)
        setCategoryState(item)
        setSelectedGenres([])
        setPageNumber(1)
    }, [])

    const setSearchText = useCallback((text) => {
        setSearchTextState(text)
        setPageNumber(1)
    }, [])

    // ************************ banner movie ****************************************
    useEffect(() => {
        tmdb.get("/trending/all/day")
            .then(({ data }) => {
                const withBackdrop = data.results.filter((item) => item.backdrop_path)
                setRandomMovie(withBackdrop[Math.floor(Math.random() * withBackdrop.length)])
            })
            .catch(() => {})
    }, [])

    const annualDate = (randomMovie?.first_air_date || randomMovie?.release_date || "").split("-")[0]
    const vote = randomMovie?.vote_average ? randomMovie.vote_average.toFixed(1) : ""

    // ************************ shows list (search or category) ****************************************
    useEffect(() => {
        let ignore = false
        const query = searchText.trim()
        const withGenres = selectedGenres.map((g) => g.id).join(",")
        let request
        if (query) {
            request = tmdb.get("/search/multi", { params: { query, page: PageNumber, include_adult: false } })
        } else if (category === "movie" || category === "tv") {
            request = tmdb.get(`/discover/${category}`, {
                params: { sort_by: "popularity.desc", include_adult: false, page: PageNumber, with_genres: withGenres },
            })
        } else {
            request = tmdb.get("/trending/all/day", { params: { page: PageNumber } })
        }
        setIsLoadingShows(true)
        request
            .then(({ data }) => {
                if (ignore) return
                setShows(data.results.filter((item) => item.media_type !== "person"))
                setTotal_pages(Math.min(data.total_pages, MAX_PAGES))
            })
            .catch(() => !ignore && setShows([]))
            .finally(() => !ignore && setIsLoadingShows(false))
        return () => { ignore = true }
    }, [category, selectedGenres, PageNumber, searchText])

    // ************************ genres for the current category ****************************************
    useEffect(() => {
        if (category !== "movie" && category !== "tv") return setGenres([])
        tmdb.get(`/genre/${category}/list`)
            .then(({ data }) => setGenres(data.genres))
            .catch(() => setGenres([]))
    }, [category])

    // ************************ single movie / show ****************************************
    useEffect(() => {
        if (!showID || !showELEMENT) return
        let ignore = false
        const base = `/${showELEMENT}/${showID}`
        setSingleMovie({})
        setTrailer("")
        setCast([])
        Promise.all([tmdb.get(base), tmdb.get(`${base}/videos`), tmdb.get(`${base}/credits`)])
            .then(([details, videos, credits]) => {
                if (ignore) return
                setSingleMovie(details.data)
                const youtube = videos.data.results.filter((v) => v.site === "YouTube")
                setTrailer((youtube.find((v) => v.type === "Trailer") || youtube[0])?.key || "")
                setCast(credits.data.cast)
            })
            .catch(() => {})
        return () => { ignore = true }
    }, [showID, showELEMENT])

    useEffect(() => {
        if (!showID || !showELEMENT) return
        let ignore = false
        tmdb.get(`/${showELEMENT}/${showID}/similar`, { params: { page: PageNumber } })
            .then(({ data }) => !ignore && setSimilarShows(data.results))
            .catch(() => !ignore && setSimilarShows([]))
        return () => { ignore = true }
    }, [showID, showELEMENT, PageNumber])


    const values = useMemo(() => ({
        imgBackgroundURL,
        imgPosterURL,
        noPicturePerson,
        unavailablePoster,
        category,
        setCategory,
        randomMovie,
        annualDate,
        vote,
        truncate,
        shows,
        isLoadingShows,
        total_pages,
        PageNumber,
        setPageNumber,
        searchText,
        setSearchText,
        selectedGenres,
        setSelectedGenres,
        genres,
        setGenres,
        setShowID,
        setShowELEMENT,
        singleMovie,
        trailer,
        cast,
        similarShows,
    }), [category, setCategory, randomMovie, annualDate, vote, shows, isLoadingShows, total_pages, PageNumber,
        searchText, setSearchText, selectedGenres, genres, singleMovie, trailer, cast, similarShows])

    return (
        <moviesStore.Provider value={values} >
            {props.children}
        </moviesStore.Provider>
    )
}
