import React, { useContext, useEffect } from 'react'
import { moviesStore } from "../../Store/ContextStore"
import "./Login.scss"
import { Loader } from '@mantine/core';
import netflix from "../../assests/netflix.png"
import amazon from "../../assests/amazon.png"
import hulu from "../../assests/hulu.png"
import disney from "../../assests/disney.png"
import espn from "../../assests/espn.png"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Login = () => {
    let ctx = useContext(moviesStore)

    return (
        <div className="container__signup">
            <div className="black__layer">
                <form className="formContainer" onSubmit={(e) => ctx.handleSubmitLogin(e)}>
                    <input onChange={ctx.handleInputLogin} type="email" name="email" placeholder='Email' />
                    <p className="inputError">{ctx.joiErrors.email && ctx.joiErrors.email}</p>
                    <input onChange={ctx.handleInputLogin} type="password" name="password" placeholder='Password' />
                    <p className="inputError">{ctx.joiErrors.password && ctx.joiErrors.password}</p>
                    <button className="FormBtn">{ctx.isLoading ? <Loader color="blue" size="sm" /> : `Confirm`}</button>
                    {ctx.registered && <h3 className="registeredError" style={{ color: "#ff0808d1" }}>{ctx.registered}</h3>}
                    <p className="have">You do not have an account? <Link to="/Signup">Sign Up</Link></p>
                </form>
                <div className="formImg">
                    <img src={netflix} alt="" />
                    <img src={amazon} alt="" />
                    <img src={hulu} alt="" />
                    <img src={disney} alt="" />
                    <img src={espn} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login
