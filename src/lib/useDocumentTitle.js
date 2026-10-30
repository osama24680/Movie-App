import { useEffect } from "react"

// Shows "<title> | CinaFlix" in the browser tab, or just "CinaFlix" while title is empty
export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | CinaFlix` : "CinaFlix"
        return () => { document.title = "CinaFlix" }
    }, [title])
}
