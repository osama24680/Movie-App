import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Store/AuthContext"
import { AuthLayout, Field, SubmitButton } from "../Auth/AuthLayout"
import { schemas, useAuthForm } from "../Auth/authForm"

const Signup = () => {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const form = useAuthForm()

    const onSubmit = form.submit(schemas.signup, async (values) => {
        await signup(values)
        navigate("/login", { replace: true, state: { registered: true } })
    })

    return (
        <AuthLayout title="Create your account" subtitle="Movies and TV shows in one place">
            <form className="auth__form" onSubmit={onSubmit} noValidate>
                <Field form={form} name="name" label="Name" autoComplete="name" />
                <Field form={form} name="email" label="Email" type="email" autoComplete="email" />
                <Field form={form} name="phone" label="Phone" type="tel" placeholder="01xxxxxxxxx" autoComplete="tel" />
                <Field form={form} name="password" label="Password" type="password" autoComplete="new-password" />
                <Field form={form} name="rePassword" label="Confirm password" type="password" autoComplete="new-password" />
                <SubmitButton form={form}>Sign up</SubmitButton>
            </form>
            <p className="auth__switch">Already have an account? <Link to="/login" className="auth__link">Log in</Link></p>
        </AuthLayout>
    )
}

export default Signup
