import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { moviesStore } from "../../Store/ContextStore"
import Header from "../../Components/Header/Header"
import Search from "../../Components/Search/Search"
import Shows from "../../Components/Shows/Shows"
import GenresComp from "../../Components/Generes/GenresComp/GenresComp"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import CustomPagination from "../../Components/Pagination/CustomPagination"
import "./Home.scss"

const titles = { trending: "Trending today", movie: "Popular movies", tv: "Popular TV shows" }

const Home = () => {
    const ctx = useContext(moviesStore)
    const { type } = useParams()
    const { setCategory } = ctx

    // /home/movie, /home/tv, /home/trending pick the category
    useEffect(() => {
        if (type && titles[type]) setCategory(type)
    }, [type, setCategory])

    const query = ctx.searchText.trim()

    return (
        <>
            <Navbar />
            <Header />
            <main className="home__container" id="browse">
                <div className="browse__head">
                    <h2 className="section-title">{query ? `Results for "${query}"` : titles[ctx.category]}</h2>
                    <Search />
                </div>
                <GenresComp />
                <Shows
                    shows={ctx.shows}
                    isLoading={ctx.isLoadingShows}
                    mediaType={ctx.category === "tv" ? "tv" : "movie"}
                />
                <CustomPagination />
            </main>
            <Footer />
        </>
    )
}

export default Home
