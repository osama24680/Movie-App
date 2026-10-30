import { useContext, useEffect, useState } from "react"
import { BiLogOut, BiUser } from "react-icons/bi"
import { moviesStore } from "../../Store/ContextStore"
import { useAuth } from "../../Store/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.scss"

const links = [
    { label: "Trending", category: "trending" },
    { label: "Movies", category: "movie" },
    { label: "TV Shows", category: "tv" },
]

const Navbar = () => {
    const ctx = useContext(moviesStore)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    function handleLogout() {
        logout()
        navigate("/login", { replace: true })
    }

    return (
        <header className={`navbar ${isScrolled ? "navbar--solid" : ""}`}>
            <div className="navbar__inner">
                <Link to="/" className="brand">Cina<span>Flix</span></Link>

                <nav className="navbar__links">
                    {links.map((link) => (
                        <Link
                            key={link.category}
                            to={`/home/${link.category}`}
                            className={ctx.category === link.category ? "is-active" : ""}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {user && (
                    <div className="user">
                        <button className="user__name" type="button" aria-label="Account menu">
                            <span className="user__avatar">{user.name?.[0]?.toUpperCase()}</span>
                            <span className="user__label">{user.name}</span>
                        </button>
                        <div className="user__menu">
                            <Link to="/profile"><BiUser /> My account</Link>
                            <button type="button" onClick={handleLogout}><BiLogOut /> Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
