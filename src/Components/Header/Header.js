import { useContext} from "react"
import { moviesStore } from "../../Store/ContextStore"
import { CgCalendarDates } from "react-icons/cg"
import { FaVoteYea } from "react-icons/fa"
import "./Header.scss"
const Header = () => {
    let ctx = useContext(moviesStore)
    let randomMovie = ctx.randomMovie

    return (
        <div className="header">
            <img src={ctx.imgBackgroundURL + randomMovie?.backdrop_path} alt="" />
            <div className="header__Content">
                <div className="first_line">
                    <p > <CgCalendarDates />{ctx.annualDate}</p>
                    <p > <FaVoteYea />{ctx.vote}</p>
                    <p className="language">{randomMovie?.original_language}</p>
                </div>
                <h3 className="second_title">{randomMovie?.name || randomMovie?.original_name || randomMovie?.original_title}</h3>
            </div>
        </div>
    )
}

export default Header