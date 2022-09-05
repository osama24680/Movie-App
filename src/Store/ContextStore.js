import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios"
import useGenres from "../Components/Generes/useGeneres"
import joi from "joi"
import { useNavigate } from "react-router-dom";
export const moviesStore = createContext(0)

export function MoviesStoreProvider(props) {
    const API_Key = `87be747ada7dcf3d3b24c834e67c68a1`
    const imgBackgroundURL = "https://image.tmdb.org/t/p/original"
    const imgPosterURL = "https://image.tmdb.org/t/p/w500"
    const unavailablePoster = "https://www.movienewz.com/img/films/poster-holder.jpg";
    const noPicturePerson = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
    const baseURL = `https://api.themoviedb.org/3`
    let navigate=useNavigate()

    const [randomMovie, setRandomMovie] = useState([])
    const [annualDate, setAnnualDate] = useState("")
    const [vote, setVote] = useState("")
    const [shows, setShows] = useState([])
    const [similarShows, setSimilarShows] = useState([])
    const [total_pages, setTotal_pages] = useState(0)
    const [PageNumber, setPageNumber] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [singleMovie, setSingleMovie] = useState({})
    const [itemType, setItemType] = useState("")
    const [showID, setShowID] = useState(0)
    const [showTYPE, setShowTYPE] = useState("")
    const [showELEMENT, setShowELEMENT] = useState("")
    const [dataType, seatDataType] = useState(null)
    const [trailer, setTrailer] = useState("")
    const [cast, setCast] = useState([])
    const [comingWord, setComingWord] = useState("")
    const [page, setPage] = useState(1)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])

    const [joiErrors, setJoiErrors] = useState({})
    const [registered, setRegistered] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [formDataLogin, setFormDataLogin] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [successLogin, setSuccessLogin] = useState(false)
    const [successSignUp, setSuccessSignUp] = useState(false)

    // ************************ getShow ****************************************
    const GetShows = async () => {
        const genreForURL = useGenres(selectedGenres)
        let item;
        if (localStorage.getItem("dataTypeShows")) {
            item = localStorage.getItem("dataTypeShows")
        } else {
            item = "trending"
        }
        if (item === "trending") {
            const { data } = await axios.get(`${baseURL}/trending/all/day?api_key=${API_Key}&page=${PageNumber}`)
            setShows(data.results)
            setTotal_pages(data.total_pages)
        }
        else if (item === "movie") {
            const { data } = await axios.get(`${baseURL}/discover/movie?api_key=${API_Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${PageNumber}&with_watch_monetization_types=flatrate&page=${PageNumber}&with_genres=${genreForURL}`)
            setShows(data.results)
            setTotal_pages(data.total_pages)
            seatDataType("movie")
        }
        else if (item === "tv") {
            const { data } = await axios.get(`${baseURL}/discover/tv?api_key=${API_Key}&language=en-US&sort_by=popularity.desc&page=${PageNumber}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&page=${PageNumber}&with_status=0&with_type=0&with_genres=${genreForURL}`)
            setShows(data.results)
            setTotal_pages(data.total_pages)
            seatDataType("tv")
        }

    }
    // ************************ getRandom ****************************************
    async function getRandom() {
        const { data } = await axios.get(`${baseURL}/trending/all/day?api_key=${API_Key}&page=${PageNumber}`)
        let bannerMovie = data.results[Math.floor((Math.random()) * (data.results.length - 1))]
        setRandomMovie(bannerMovie)
    }
    // ************************ getSingleMovie ****************************************
    async function getSingleMovie() {
        window.scroll(0, 0)
        const { data } = await axios.get(`${baseURL}/${showELEMENT}/${Number(showID)}?api_key=${API_Key}&language=en-US`)
        setSingleMovie(data)

        const video = await axios.get(`${baseURL}/${showELEMENT}/${Number(showID)}/videos?api_key=${API_Key}&language=en-US`)
        setTrailer(video.data.results[0]?.key)

        const castPersons = await axios.get(`${baseURL}/${showELEMENT}/${Number(showID)}/credits?api_key=${API_Key}&language=en-US`);
        setCast(castPersons.data.cast)

    }
    // ************************ getSimilar ****************************************
    async function getSimilar() {
        const { data } = await axios.get(`${baseURL}/${showELEMENT}/${Number(showID)}/similar?api_key=${API_Key}&language=en-US&page=${PageNumber}`)
        setSimilarShows(data.results)
    }
    // ************************ getGeneres ****************************************
    const fetchGenres = async () => {
        const { data } = await axios.get(`${baseURL}/genre/${showELEMENT}/list?api_key=${API_Key}&language=en-US`)
        setGenres(data.genres)
    }
    // ************************ Search ****************************************
    async function getSearch() {
        const { data } = await axios.get(`${baseURL}/search/multi?api_key=${API_Key}&language=en-US&page=${PageNumber}&include_adult=false&query=${searchText}`)
        setShows(data.results)
        console.log(data.results)
        setTotal_pages(data.total_pages)
        if (searchText.trim().length === 0) {
            GetShows()
            console.log("length====0")
        }
    }
    // ************************ handle banner Movie ****************************************
    const cutDate = useCallback(() => {
        let myDate;
        if (randomMovie) {
            if (randomMovie.first_air_date) {
                myDate = randomMovie.first_air_date
            } else {
                myDate = randomMovie?.release_date
            }
        }
        let stringDate = `${myDate}`
        let spliting = stringDate.split("-")
        setAnnualDate(spliting[0])
    }
    )
    const handleVote = useCallback(() => {
        if (randomMovie) {
            let vote = randomMovie?.vote_average
            let stringVote = `${vote}`
            if (stringVote.length > 3) {
                setVote(stringVote.slice(0, 3))
            } else {
                setVote(stringVote)
            }
        }

    })
    // ************************ handle String ****************************************
    function truncate(str, n) {
        return (
            str?.length > n ? str.substr(0, n - 1) + "..." : str
        )
    }
    // ********************************* Sign up *********************************************
    function handleInput(e) {
        let tempValues = { ...formData }
        tempValues[e.target.name] = e.target.value
        setFormData(tempValues)
    }

    const validateForm = (formData) => {
        let schema = joi.object({
            first_name: joi.string().label("First Name").pattern(/[A-Za-z]/).min(3).max(8).required().messages(
                validProps("First Name")
            ),
            last_name: joi.string().alphanum().min(3).max(8).required().messages(
                validProps("Last Name")
            ),
            age: joi.number().min(16).max(60).required().messages({
                'number.base': `Age should be a type of 'number'`,
                'number.empty': `Age cannot be an empty field`,
                'number.min': `minimum age is {#limit}`,
                'number.max': `maximum age is {#limit}`,
                'any.required': `Age is a required field`,
            }),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
                'string.base': `Email should be a type of 'text'`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`,
            }),
            password: joi.string().alphanum().pattern(/[A-Za-z0-9]{5}/).messages({
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password should have a minimum length of {#limit}`,
                'any.required': `Password is a required field`,
                'string.pattern.base': "passwords should be letters and numbers only"
            }),
        })
        return schema.validate(formData, { abortEarly: false })
    }

    function validProps(type) {
        let objectProps = {
            'string.base': `${type} should be a type of 'text'`,
            'string.empty': `${type} cannot be an empty field`,
            'string.min': `${type} should have a minimum length of {#limit}`,
            'string.max': `${type} should have a maximum length of {#limit}`,
            'any.required': `${type} is a required field`,
        }
        return objectProps;
    }

    async function HandleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        let validateResult = validateForm(formData)
        let listErrors = {};
        setJoiErrors(listErrors)
        if (validateResult.error) {
            for (let item of validateResult.error.details) {
                listErrors[item.path[0]] = item.message
            }
        } else {
            let { data } = await axios.post(`https://routeegypt.herokuapp.com/signup`, formData)
            if (data.message === "success") {
                navigate("/Login")
            } else {
                setRegistered(data.errors?.email.message)
            }
        }
        setIsLoading(false)
    }

    // ********************************** Log in ********************************************
    function handleInputLogin(e) {
        let tempValues = { ...formDataLogin }
        tempValues[e.target.name] = e.target.value
        setFormDataLogin(tempValues)
    }

    const validateFormLogin = (formDataLogin) => {
        let schema = joi.object({

            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
                'string.base': `Email should be a type of 'text'`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`,
            }),
            password: joi.string().alphanum().pattern(/[A-Za-z0-9]{5}/).messages({
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password should have a minimum length of {#limit}`,
                'any.required': `Password is a required field`,
                'string.pattern.base': "passwords should be letters and numbers only"
            }),
        })
        return schema.validate(formDataLogin, { abortEarly: false })
    }

    async function handleSubmitLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        let validateResult = validateFormLogin(formDataLogin)
        let listErrors = {};
        setJoiErrors(listErrors)
        if (validateResult.error) {
            for (let item of validateResult.error.details) {
                listErrors[item.path[0]] = item.message
            }
        } else {
            let { data } = await axios.post(`https://routeegypt.herokuapp.com/signin`, formDataLogin)

            if (data.message === "success") {
                localStorage.setItem("userMovie", JSON.stringify(data.user))
                setIsLoggedIn(true)
                navigate("/")
            } else {
                setRegistered(data.message)
            }
        }
        setIsLoading(false)

    }

    // ************************************Log out******************************************
    function logout(){
        navigate("/Login")
        localStorage.removeItem("userMovie")
    }
    // ******************************************************************************
    // ************************************ useEffect ******************************************

    useEffect(() => {
        getSingleMovie()
        getSimilar()
        fetchGenres()
    }, [PageNumber, showID])

    useEffect(() => {
        cutDate()
        handleVote()
    }, [cutDate, handleVote])


    useEffect(() => {
        getRandom()
    }, [])

    useEffect(() => {
        GetShows()
    }, [selectedGenres, PageNumber, showID])

    useEffect(() => {
        getSearch()
    }, [searchText])

    let values = {
        imgBackgroundURL,
        imgPosterURL,
        randomMovie,
        annualDate,
        vote,
        truncate,
        GetShows,
        shows,
        total_pages,
        setPageNumber,
        setSearchText,
        setItemType,
        setShowID,
        singleMovie,
        trailer,
        cast,
        noPicturePerson,
        unavailablePoster,
        setShowTYPE,
        showTYPE,
        setComingWord,
        getSingleMovie,
        setShowELEMENT,
        similarShows,
        selectedGenres,
        setSelectedGenres,
        genres,
        setGenres,
        PageNumber,
        showELEMENT,


        joiErrors,
        registered,
        isLoading,
        HandleSubmit,
        handleInput,
        isLoggedIn,
        successLogin,
        successSignUp,

        handleSubmitLogin,
        handleInputLogin,
        logout,

    }

    return (
        <moviesStore.Provider value={values} >
            {props.children}
        </moviesStore.Provider>
    )
}
