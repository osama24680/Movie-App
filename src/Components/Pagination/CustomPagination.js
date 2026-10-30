import { useContext } from "react"
import { Pagination } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { moviesStore } from "../../Store/ContextStore"
import "./Pagination.scss"

// ChakraProvider replaces the emotion theme, so MUI needs its own
const muiTheme = createTheme({ palette: { mode: "dark" } })

const CustomPagination = ({ scrollTo = "browse" }) => {
    const ctx = useContext(moviesStore)

    if (!ctx.total_pages || ctx.total_pages < 2) return null

    const handlePage = (_, page) => {
        ctx.setPageNumber(page)
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="pagination">
            <ThemeProvider theme={muiTheme}>
            <Pagination
                count={ctx.total_pages}
                page={ctx.PageNumber}
                onChange={handlePage}
                shape="rounded"
                siblingCount={1}
                sx={{
                    "& .MuiPaginationItem-root": { color: "#c7cdd9", borderColor: "rgba(255,255,255,0.1)", fontFamily: "Poppins" },
                    "& .MuiPaginationItem-root:hover": { backgroundColor: "rgba(47,128,255,0.15)" },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        color: "#fff",
                        background: "linear-gradient(135deg, #2f80ff 0%, #8b5cf6 100%)",
                        boxShadow: "0 6px 20px rgba(47,128,255,0.4)",
                    },
                }}
            />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
