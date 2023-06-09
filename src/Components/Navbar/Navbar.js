import React, { useState, useEffect } from 'react'
import { BiLogIn } from "react-icons/bi"
import { useContext } from "react"
import { moviesStore } from "../../Store/ContextStore"
import { Link } from "react-router-dom"
import "./Navbar.scss"
const Navbar = () => {
    let ctx = useContext(moviesStore)
    const categories = ["trending", "movie", "tv"]
    const [userName, setUserName] = useState("oso")

    function handleCat(item="movie") {
        localStorage.setItem("dataTypeShows", item)
        ctx.GetShows()
        window.scroll(0, 900)
        ctx.setComingWord(item)
    }

    function getData() {
        let checkedData = localStorage.getItem("userMovie")
        if (checkedData) {
            let parsedData = JSON.parse(checkedData)
            setUserName(parsedData.first_name + " " + parsedData.last_name)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <div className="navbar">
            <div className='logo'><Link to="/">Cina<span>Flix</span></Link></div>
            <div className='menu'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li className="Categories">
                        Categories
                        <ul className="nestedList">
                            {categories.map((cat, index) => (
                                <Link to={`/home/${cat}`} key={index}>
                                    <li onClick={(e) => handleCat(e.target.textContent)}>{cat}</li>
                                </Link>

                            ))}
                        </ul>
                    </li>
                </ul>
            </div>

            {/* <div className="form">
                <p className="userName">
                    {userName}
                    <div className="login" onClick={ctx.logout}>
                        <p>Logout</p>
                        <BiLogIn />
                    </div>
                </p>

            </div> */}

        </div>

    )
}

export default Navbar