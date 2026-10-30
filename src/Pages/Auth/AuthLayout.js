import { Link } from "react-router-dom"
import { Loader } from "@mantine/core"
import netflix from "../../assests/netflix.png"
import amazon from "../../assests/amazon.png"
import hulu from "../../assests/hulu.png"
import disney from "../../assests/disney.png"
import espn from "../../assests/espn.png"
import "./Auth.scss"

export const AuthLayout = ({ title, subtitle, children }) => (
    <div className="auth">
        <div className="auth__overlay">
            <Link to="/" className="brand auth__logo">Cina<span>Flix</span></Link>
            <div className="auth__card">
                <h1 className="auth__title">{title}</h1>
                {subtitle && <p className="auth__subtitle">{subtitle}</p>}
                {children}
            </div>
            <div className="auth__brands">
                {[netflix, amazon, hulu, disney, espn].map((src, i) => (
                    <img key={i} src={src} alt="" />
                ))}
            </div>
        </div>
    </div>
)

export const Field = ({ form, name, label, type = "text", ...props }) => (
    <label className="auth__field">
        <span>{label}</span>
        <input
            name={name}
            type={type}
            value={form.values[name] ?? ""}
            onChange={form.handleChange}
            className={form.errors[name] ? "has-error" : ""}
            {...props}
        />
        {form.errors[name] && <small className="auth__error">{form.errors[name]}</small>}
    </label>
)

export const SubmitButton = ({ form, children }) => (
    <>
        {form.apiError && <p className="auth__alert">{form.apiError}</p>}
        <button className="auth__btn" disabled={form.isLoading}>
            {form.isLoading ? <Loader color="white" size="sm" /> : children}
        </button>
    </>
)
