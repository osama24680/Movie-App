
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import Home from "./Pages/Home/Home"
import MovieDetails from "./Pages/MovieDetails/MovieDetails"
import Signup from "./Pages/Signup/Signup"
import Login from "./Pages/Login/Login"
import Error from "./Pages/404/404"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Home/:type" element={<Home />} />
          <Route path="/MovieDetails/:id/:element" element={<MovieDetails />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
