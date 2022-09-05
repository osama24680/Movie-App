import React, { useContext, useEffect } from 'react'
import { moviesStore } from "../../Store/ContextStore"
import "./Signup.scss"
import { Loader } from '@mantine/core';
import netflix from "../../assests/netflix.png"
import amazon from "../../assests/amazon.png"
import hulu from "../../assests/hulu.png"
import disney from "../../assests/disney.png"
import espn from "../../assests/espn.png"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    let ctx = useContext(moviesStore)

    return (
        <div className="container__signup">
            <div className="black__layer">
                <form className="formContainer" onSubmit={(e) => ctx.HandleSubmit(e)}>
                    <input onChange={ctx.handleInput} type="text" name="first_name" placeholder='First Name' />
                    <p className="inputError">{ctx.joiErrors.first_name && ctx.joiErrors.first_name}</p>
                    <input onChange={ctx.handleInput} type="text" name="last_name" placeholder='Last Name' />
                    <p className="inputError">{ctx.joiErrors.last_name && ctx.joiErrors.last_name}</p>
                    <input onChange={ctx.handleInput} type="number" name="age" placeholder='Age' />
                    <p className="inputError">{ctx.joiErrors.age && ctx.joiErrors.age}</p>
                    <input onChange={ctx.handleInput} type="email" name="email" placeholder='Email' />
                    <p className="inputError">{ctx.joiErrors.email && ctx.joiErrors.email}</p>
                    <input onChange={ctx.handleInput} type="password" name="password" placeholder='Password' />
                    <p className="inputError">{ctx.joiErrors.password && ctx.joiErrors.password}</p>
                    <button className="FormBtn">{ctx.isLoading ? <Loader color="blue" size="sm" /> : `Confirm`}</button>
                    {ctx.registered && <h3 className="registeredError" style={{ color: "#ff0808d1" }}>{ctx.registered}</h3>}
                    <p className="have">You have an account? <Link to="/Login">Log In</Link></p>
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

export default Signup
