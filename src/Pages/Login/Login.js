import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../Store/AuthContext"
import { AuthLayout, Field, SubmitButton } from "../Auth/AuthLayout"
import { schemas, useAuthForm } from "../Auth/authForm"

const Login = () => {
    const { signin } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()
    const form = useAuthForm()
    const notice = state?.registered
        ? "Account created, you can log in now"
        : state?.passwordReset ? "Password updated, log in with your new password" : ""

    const onSubmit = form.submit(schemas.signin, async (values) => {
        await signin(values)
        navigate("/", { replace: true })
    })

    return (
        <AuthLayout title="Welcome back" subtitle="Log in to keep watching">
            {notice && <p className="auth__notice">{notice}</p>}
            <form className="auth__form" onSubmit={onSubmit} noValidate>
                <Field form={form} name="email" label="Email" type="email" autoComplete="email" />
                <Field form={form} name="password" label="Password" type="password" autoComplete="current-password" />
                <Link to="/forgot-password" className="auth__link auth__link--end">Forgot password?</Link>
                <SubmitButton form={form}>Log in</SubmitButton>
            </form>
            <p className="auth__switch">Don't have an account? <Link to="/signup" className="auth__link">Sign up</Link></p>
        </AuthLayout>
    )
}

export default Login
