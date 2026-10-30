import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Store/AuthContext'

// Pages that need a logged-in user
export const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth()
    const location = useLocation()
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

// Login / signup / forgot password: logged-in users go straight to the app
export const GuestRoute = () => {
    const { isLoggedIn } = useAuth()
    return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />
}

export default ProtectedRoute
