import { useContext } from "react"
import { moviesStore } from "../../../Store/ContextStore"
import { FaTimes } from 'react-icons/fa'
import "./GenresComp.scss"

const GenresComp = () => {
    const ctx = useContext(moviesStore)
    const { selectedGenres, setSelectedGenres, genres, setGenres, setPageNumber } = ctx

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        setPageNumber(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter(selected => selected.id !== genre.id))
        setGenres([...genres, genre])
        setPageNumber(1)
    }

    // Genres only apply to Movies / TV, and not while searching
    if (genres.length === 0 && selectedGenres.length === 0) return null
    if (ctx.searchText.trim()) return null

    return (
        <div className="genres">
            {selectedGenres.map((genre) => (
                <button type="button" key={genre.id} className="genres__chip is-selected" onClick={() => handleRemove(genre)}>
                    {genre.name} <FaTimes />
                </button>
            ))}
            {genres.map((genre) => (
                <button type="button" key={genre.id} className="genres__chip" onClick={() => handleAdd(genre)}>
                    {genre.name}
                </button>
            ))}
        </div>
    )
}

export default GenresComp
