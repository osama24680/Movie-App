import React from 'react'
import "./Pagination.scss"
import { Pagination } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { useContext } from "react"
import { moviesStore } from "../../Store/ContextStore"
const darkTheme = createTheme({
    palette: {
        type: "light"
    }
})
const CustomPagination = (props) => {
    let ctx = useContext(moviesStore)
    const handlePage = (page) => {
        ctx.setPageNumber(page)
        window.scroll(0, 600)
    }
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div style={{ color: "red", width: "100%", display: "flex", justifyContent: "center", paddingBottom: "50px", paddingTop: "20px" }}>
                    <Pagination count={ctx.total_pages ? ctx.total_pages : 20} color="primary" onChange={(e) => handlePage(Number(e.target.textContent))} />
                </div>
            </ThemeProvider>


        </>

    )
}

export default CustomPagination

