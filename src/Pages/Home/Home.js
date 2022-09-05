import { useContext, useEffect } from "react"
import { moviesStore } from "../../Store/ContextStore"
import Header from "../../Components/Header/Header"
import Search from "../../Components/Search/Search"
import Shows from "../../Components/Shows/Shows"
import GenresComp from "../../Components/Generes/GenresComp/GenresComp"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import CustomPagination from "../../Components/Pagination/CustomPagination"
import "./Home.scss"
const Home = () => {
    let ctx = useContext(moviesStore)
    localStorage.removeItem("item")
    return (
        <>
            <div className="home__container">
                <Navbar />
                <Header />
                <Search />
                <GenresComp />
                <Shows shows={ctx.shows} />
                <CustomPagination />

            </div>
            <Footer />
        </>
    )
}

export default Home