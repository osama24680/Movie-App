import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoute = () => {
    return (
        <div>
            {localStorage.getItem("userMovie") ? <Outlet /> :<Navigate to="Login" />}
        </div>
    )
}
export default ProtectedRoute
