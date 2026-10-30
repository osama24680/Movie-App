import { useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import { useAuth } from "../../Store/AuthContext"
import { Field, SubmitButton } from "../Auth/AuthLayout"
import { schemas, useAuthForm } from "../Auth/authForm"
import "../Auth/Auth.scss"
import "./Profile.scss"

const Profile = () => {
    const { user, updateProfile, changePassword } = useAuth()
    const [notice, setNotice] = useState("")
    const infoForm = useAuthForm({ name: user?.name, email: user?.email, phone: "" })
    const passwordForm = useAuthForm()

    const onUpdateInfo = infoForm.submit(schemas.profile, async (values) => {
        // Send only what changed: the API rejects the user's own unchanged email as "already in use"
        const changes = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value && value !== user?.[key])
        )
        if (Object.keys(changes).length === 0) {
            setNotice("Nothing to update")
            return
        }
        await updateProfile(changes)
        setNotice("Your details were updated")
    })

    const onChangePassword = passwordForm.submit(schemas.changePassword, async (values) => {
        await changePassword(values)
        passwordForm.setValues({})
        setNotice("Your password was changed")
    })

    return (
        <>
            <div className="home__container profile">
                <Navbar />
                <h1 className="profile__title">My account</h1>
                {notice && <p className="auth__notice">{notice}</p>}
                <div className="profile__grid">
                    <form className="auth__card auth__form" onSubmit={onUpdateInfo} noValidate>
                        <h2 className="profile__heading">Personal details</h2>
                        <Field form={infoForm} name="name" label="Name" autoComplete="name" />
                        <Field form={infoForm} name="email" label="Email" type="email" autoComplete="email" />
                        <Field form={infoForm} name="phone" label="Phone" type="tel" placeholder="01xxxxxxxxx" autoComplete="tel" />
                        <SubmitButton form={infoForm}>Save changes</SubmitButton>
                    </form>
                    <form className="auth__card auth__form" onSubmit={onChangePassword} noValidate>
                        <h2 className="profile__heading">Change password</h2>
                        <Field form={passwordForm} name="currentPassword" label="Current password" type="password" autoComplete="current-password" />
                        <Field form={passwordForm} name="password" label="New password" type="password" autoComplete="new-password" />
                        <Field form={passwordForm} name="rePassword" label="Confirm new password" type="password" autoComplete="new-password" />
                        <SubmitButton form={passwordForm}>Change password</SubmitButton>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile
