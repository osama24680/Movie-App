import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Store/AuthContext"
import { AuthLayout, Field, SubmitButton } from "../Auth/AuthLayout"
import { schemas, useAuthForm } from "../Auth/authForm"

// Three steps on one page: email -> code from the email -> new password
const steps = {
    email: { title: "Forgot your password?", subtitle: "Enter your email and we'll send you a reset code" },
    code: { title: "Check your email", subtitle: "Enter the reset code we sent you" },
    password: { title: "Set a new password", subtitle: "Choose a password you haven't used before" },
}

const ForgotPassword = () => {
    const { forgotPassword, verifyResetCode, resetPassword } = useAuth()
    const navigate = useNavigate()
    const [step, setStep] = useState("email")
    const form = useAuthForm()

    const onSendEmail = form.submit(schemas.forgotEmail, async ({ email }) => {
        await forgotPassword(email)
        setStep("code")
    })

    const onVerifyCode = form.submit(schemas.resetCode, async ({ resetCode }) => {
        await verifyResetCode(resetCode)
        setStep("password")
    })

    const onResetPassword = form.submit(schemas.newPassword, async ({ newPassword }) => {
        await resetPassword(form.values.email, newPassword)
        navigate("/login", { replace: true, state: { passwordReset: true } })
    })

    return (
        <AuthLayout title={steps[step].title} subtitle={steps[step].subtitle}>
            {step === "email" && (
                <form className="auth__form" onSubmit={onSendEmail} noValidate>
                    <Field form={form} name="email" label="Email" type="email" autoComplete="email" />
                    <SubmitButton form={form}>Send reset code</SubmitButton>
                </form>
            )}
            {step === "code" && (
                <form className="auth__form" onSubmit={onVerifyCode} noValidate>
                    <Field form={form} name="resetCode" label="Reset code" inputMode="numeric" autoComplete="one-time-code" />
                    <SubmitButton form={form}>Verify code</SubmitButton>
                    <button type="button" className="auth__link auth__link--btn" onClick={() => setStep("email")}>
                        Use a different email
                    </button>
                </form>
            )}
            {step === "password" && (
                <form className="auth__form" onSubmit={onResetPassword} noValidate>
                    <Field form={form} name="newPassword" label="New password" type="password" autoComplete="new-password" />
                    <Field form={form} name="rePassword" label="Confirm password" type="password" autoComplete="new-password" />
                    <SubmitButton form={form}>Reset password</SubmitButton>
                </form>
            )}
            <p className="auth__switch">Remembered it? <Link to="/login" className="auth__link">Back to log in</Link></p>
        </AuthLayout>
    )
}

export default ForgotPassword
