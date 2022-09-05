import { useContext } from "react"
import { moviesStore } from "../../Store/ContextStore"
import { AiOutlineStar, AiOutlinePlayCircle } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { Link } from "react-router-dom"
import "./Shows.scss"
const Shows = ({ shows }) => {
    let ctx = useContext(moviesStore)

    const handleClick = (movie) => {
        ctx.getSingleMovie()
        if (movie.media_type) {
            localStorage.setItem("similar_media_type", movie.media_type)
            localStorage.setItem("MEDIA_TYPE_IS_FOUND", "true")
        }else{
            localStorage.setItem("MEDIA_TYPE_IS_FOUND", "false")
        }
    }



    return (
        <div className="Shows">
            {shows?.map((movie, index) => {

                return (

                    <div className="movieItem" key={index} onClick={() => handleClick(movie)}>
                        <Link to={`/MovieDetails/${movie.id}/${movie.media_type ? movie.media_type : localStorage.getItem("dataTypeShows") ? localStorage.getItem("dataTypeShows") : localStorage.getItem("similar_media_type")}`} >
                            <img src={movie.poster_path? ctx.imgPosterURL + movie.poster_path : ctx.unavailablePoster} alt="" />

                            <div className="shows__content">
                                <div className="spans_icons">
                                    <span><BsBookmark /></span>
                                    <span className="spanDouble"> <AiOutlineStar />{movie.vote_average}</span>
                                </div>
                            </div>
                            <div className="play"><AiOutlinePlayCircle /></div>
                            <p>{ctx.truncate((movie?.name || movie?.original_name || movie?.original_title), 25)}</p>
                        </Link>
                    </div>
                )
            })
            }
        </div >
    )
}

export default Shows

