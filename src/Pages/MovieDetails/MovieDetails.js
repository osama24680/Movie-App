import { useContext, useEffect } from "react"
import { moviesStore } from "../../Store/ContextStore"
import "./MovieDetails.scss"
import { useParams } from "react-router-dom"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Shows from "../../Components/Shows/Shows"
import Navbar from "../../Components/Navbar/Navbar"
import CustomPagination from "../../Components/Pagination/CustomPagination"
import Footer from "../../Components/Footer/Footer";

const MovieDetails = () => {
    let ctx = useContext(moviesStore)
    let { id, type, element } = useParams()
    ctx.setShowID(id)
    ctx.setShowTYPE(type)
    ctx.setShowELEMENT(element)

    let movieDetails = ctx.singleMovie

    useEffect(() => {

    }, [id, type])
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 3,
        },
        1024: {
            items: 5,
        },
    };
    const handleDragStart = (e) => e.preventDefault();

    const items = ctx.cast.map((cast) => (
        <div className="carouselItem">
            <img
                src={cast.profile_path ? ctx.imgPosterURL + cast.profile_path : ctx.noPicturePerson}
                alt={cast?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
                style={{ cursor: "pointer" }}
            />
            <b className="carouselItem__txt">{cast?.name}</b>
        </div>
    ))

    return (
        <>
            <div className="Details__container">
                <Navbar />
                <div className="movieDetails">
                    <div className="poster__section">
                        <div className="poster__section-img">
                            <img src={movieDetails.poster_path ? ctx.imgPosterURL + movieDetails.poster_path : ctx.unavailablePoster} alt="" />
                        </div>
                        <div className="poster__section-trailer">
                            <iframe width={560} height={315} src={`https://www.youtube.com/embed/${ctx.trailer}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen />
                            <div className="AliceCarouselDiv">
                                <AliceCarousel
                                    mouseTracking
                                    infinite
                                    disableDotsControls
                                    disableButtonsControls
                                    responsive={responsive}
                                    items={items}
                                    autoPlay
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overview__section">
                        <span>Overview</span>
                        <p>{movieDetails.overview}</p>
                    </div>
                    {localStorage.getItem("MEDIA_TYPE_IS_FOUND") === "false" && (
                        <div className="similar__section">
                            <span className="spanSimilar">Similar Results</span>
                            <Shows shows={ctx.similarShows} />
                        </div>
                    )}
                </div>
                <CustomPagination />
            </div>
            <Footer />
        </>

    )
}

export default MovieDetails

