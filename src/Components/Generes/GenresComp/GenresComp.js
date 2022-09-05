import { useContext } from "react"
import { moviesStore } from "../../../Store/ContextStore"
import "./GenresComp.scss"
import { FaTimes } from 'react-icons/fa'
const GenresComp = () => {
    let ctx = useContext(moviesStore)
    let selectedGenres = ctx.selectedGenres
    let setSelectedGenres = ctx.setSelectedGenres
    let genres = ctx.genres
    let PageNumber = ctx.PageNumber
    let showELEMENT = ctx.showELEMENT  //type
    let setGenres = ctx.setGenres



    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        // setPage(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter(selected => selected.id !== genre.id))
        setGenres([...genres, genre])
        // setPage(1)
    }
    const is_here = localStorage.getItem("dataTypeShows")
    return (
        <>

            {localStorage.getItem("dataTypeShows") !== "trending" && (
                <div className="selectedGenres">
                    {genres.map((genre, index) => (
                        <span className="notSlected" style={{ margin: 3 }} key={index} onClick={() => handleAdd(genre)}>{genre.name}</span>
                    ))}
                    {selectedGenres.map((genre, index) => (
                        <span key={index} className="is_Slected" style={{ margin: 3 }}>{genre.name} <FaTimes onClick={() => handleRemove(genre)} /></span>
                    ))}
                </div>
            )}
        </>

    )


}


export default GenresComp