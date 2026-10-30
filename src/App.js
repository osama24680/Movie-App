import { ProtectedRoute, GuestRoute } from "./Components/ProtectedRoute/ProtectedRoute"
import Home from "./Pages/Home/Home"
import MovieDetails from "./Pages/MovieDetails/MovieDetails"
import Signup from "./Pages/Signup/Signup"
import Login from "./Pages/Login/Login"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import Profile from "./Pages/Profile/Profile"
import Person from "./Pages/Person/Person"
import Error from "./Pages/404/404"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/:type" element={<Home />} />
        <Route path="/MovieDetails/:id/:element" element={<MovieDetails />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
