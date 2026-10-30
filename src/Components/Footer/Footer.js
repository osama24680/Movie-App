import { Link } from "react-router-dom"
import "./Footer.scss"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div>
                    <Link to="/" className="brand">Cina<span>Flix</span></Link>
                    <p className="footer__tagline">Discover what to watch next.</p>
                </div>
                <nav className="footer__links">
                    <Link to="/home/trending">Trending</Link>
                    <Link to="/home/movie">Movies</Link>
                    <Link to="/home/tv">TV Shows</Link>
                    <Link to="/profile">My account</Link>
                </nav>
            </div>
            <div className="footer__bottom">
                <span>© {new Date().getFullYear()} CinaFlix. All rights reserved.</span>
                <span>Data by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a></span>
            </div>
        </footer>
    )
}

export default Footer
