import { createContext, useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"

// Route e-commerce API (only its auth endpoints are used here)
const api = axios.create({ baseURL: "https://ecommerce.routemisr.com/api/v1" })
const STORAGE_KEY = "userMovie"

export const authStore = createContext(null)
export const useAuth = () => useContext(authStore)

// The API answers with either { message } or { errors: { msg } }
export function getErrorMessage(error) {
    const data = error?.response?.data
    return data?.errors?.msg || data?.message || "Something went wrong, please try again"
}

function readSession() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
    } catch {
        return null
    }
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState(readSession) // { token, user: { name, email, role } }

    const saveSession = useCallback((next) => {
        if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        else localStorage.removeItem(STORAGE_KEY)
        setSession(next)
    }, [])

    const authHeaders = () => ({ headers: { token: session?.token } })

    // Drop a stored token the API no longer accepts (expired / from the old API)
    useEffect(() => {
        if (!session?.token) return
        api.get("/auth/verifyToken", { headers: { token: session.token } })
            .catch(() => saveSession(null))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signup(values) {
        await api.post("/auth/signup", values)
    }

    async function signin(values) {
        const { data } = await api.post("/auth/signin", values)
        saveSession({ token: data.token, user: data.user })
    }

    function logout() {
        saveSession(null)
    }

    async function forgotPassword(email) {
        await api.post("/auth/forgotPasswords", { email })
    }

    async function verifyResetCode(resetCode) {
        await api.post("/auth/verifyResetCode", { resetCode })
    }

    async function resetPassword(email, newPassword) {
        await api.put("/auth/resetPassword", { email, newPassword })
    }

    async function updateProfile(values) {
        const { data } = await api.put("/users/updateMe", values, authHeaders())
        saveSession({ ...session, user: { ...session.user, ...data.user } })
    }

    async function changePassword(values) {
        const { data } = await api.put("/users/changeMyPassword", values, authHeaders())
        // Changing the password invalidates the old token, so keep the new one
        saveSession({ token: data.token, user: data.user || session.user })
    }

    const value = {
        user: session?.user || null,
        isLoggedIn: Boolean(session?.token),
        signup,
        signin,
        logout,
        forgotPassword,
        verifyResetCode,
        resetPassword,
        updateProfile,
        changePassword,
    }

    return <authStore.Provider value={value}>{children}</authStore.Provider>
}
