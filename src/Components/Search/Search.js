import { useContext } from "react"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import { moviesStore } from "../../Store/ContextStore"
import "./Search.scss"

const Search = () => {
    const ctx = useContext(moviesStore)
    return (
        <div className="search">
            <AiOutlineSearch className="search__icon" />
            <input
                value={ctx.searchText}
                onChange={(e) => ctx.setSearchText(e.target.value)}
                type="search"
                placeholder="Search movies, TV shows..."
                aria-label="Search movies and TV shows"
            />
            {ctx.searchText && (
                <button type="button" className="search__clear" onClick={() => ctx.setSearchText("")} aria-label="Clear search">
                    <AiOutlineClose />
                </button>
            )}
        </div>
    )
}

export default Search
