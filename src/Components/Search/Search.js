import React from 'react'
import "./Search.scss"
import { AiOutlineSearch } from "react-icons/ai"
import { useContext } from "react"
import { moviesStore } from "../../Store/ContextStore"
const Search = () => {
    let ctx = useContext(moviesStore)
    return (

        <div className="input">
            <input onChange={(e)=>{ctx.setSearchText(e.target.value)}} type="search" placeholder="I'm looking for..." />
            {/* <AiOutlineSearch /> */}
        </div>

    )
}

export default Search