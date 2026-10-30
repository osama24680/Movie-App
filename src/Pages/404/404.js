import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
            <div>
                <h1 className="brand" style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}>4<span>0</span>4</h1>
                <p style={{ color: "var(--muted)", fontSize: "1.1rem", margin: "8px 0 28px" }}>
                    This scene was cut from the final version.
                </p>
                <Link to="/" className="btn-gradient">Back to home</Link>
            </div>
        </div>
    )
}

export default Error
