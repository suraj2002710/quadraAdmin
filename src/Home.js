import React, { useEffect, useState } from 'react'
import logoprofile from './images/logo.png';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
import { useCookies, Cookies } from "react-cookie"
import { Spinner } from 'react-bootstrap';
import { createBrowserHistory } from "history"
import {AiFillEyeInvisible} from "react-icons/ai"
import {MdVisibility} from "react-icons/md"
import { baseurl } from './Baseurl';
const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    width: 100%;
position: relative;
button.btn.btn-primary.btn-block {
    background: #00aa8d !important;
    border: none;
    display: block;
    color: #fff;
    border-radius: 2px;
    width: 100%;
    padding: 8px 0;
}
 
.wraper-outer{ text-align:center;   width: 500px;  margin: auto;
  .login-logo{ text-align:center; img{ max-width:140px;}}

}
p.login-box-msg {
    margin: 0;
    padding: 0 20px 20px;
    text-align: center;
    font-size: 15px;
}
.profile-card {box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
    background-color: #fff;border-radius: 2px;
    background-clip: border-box;margin-top: 15px;
    border: 1px solid rgba(0,0,0,.125);
    padding: 20px ;
}

input[type='password'], input[type='text'] {
  height: 35px;
    padding: 0 2%;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    width: 96%;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 transparent;
    -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    
}
.input-group-append {

    position: relative;
    .input-group-text{     position: absolute;
    right: 0;
    color: #444;
    font-size: 13px;
    z-index: 1;
    line-height: 36px;
    padding: 0 8px;
    top: 0;
    border-left: 1px solid #ced4da;
    height: 36px;}
}
.login-box-me .input-group-me {
    display: block;
}
`



const Home = () => {
    const [emaildisplay, setemaildisplay] = useState('none')
    const [passdisplay, setpassdisplay] = useState('none')
    const [emailErrmsg,setemailErrmsg]=useState("")
    const [passErrmsg,setpassErrmsg]=useState("")
    const navigate = useNavigate()
    const [cookie, setcookei] = useCookies(['token'])
    const [showhideCls,setshowhideCls]=useState("password")
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const history = createBrowserHistory()
    const cookies = new Cookies()
    const token = cookies.get("token")
    const [loginloader, setloginloader] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email === "") {
            // setemailErrmsg("Please Enter Email")
            setemaildisplay("block")
        }
        if (user.password === "") {
            // setpassErrmsg("Please Enter password")
            setpassdisplay("block")
        } 
        else if(user.email === "" || user.password === ""){
                return false
        }
        else {
            setloginloader(true)
            axios.post(`${baseurl}/admin/login/`, user).then((res) => {
                console.log(res, "res");
                if (res.data.status === "Success") {
                    let adminInfo = {
                        admin_id: res.data.data.user_id,
                        admin_token: res.data.data.user_token,
                    }
                    let adminname = {
                        name: res.data.data.user_name
                    }
                    console.log(res.data.data);
                    setcookei("token",res.data.data.user_token,{path:"/",expires:new Date(Date.now()+2592000)})
                    localStorage.setItem("adminLogin", JSON.stringify(adminInfo))
                    localStorage.setItem("adminName", JSON.stringify(adminname))
                    setloginloader(false)
                    // localStorage.setItem("adminName",JSON.stringify(adminInfo))
                    navigate("/dashboard")
                } else {
                    setemaildisplay('none')
                    setpassdisplay("none")
                    setloginloader(false)
                    toast.error(res.data.message,   {position: toast.POSITION.TOP_CENTER})
                }
            }).catch((err) => {
                console.log(err.response.statusText)

            })
        }
    }
    useEffect(() => {
        if (token) {
            history.push("/dashboard")
            navigate("/dashboard")
        }
    }, [])

    return (
        <Wrapper className='login-box '>

            <div className='wraper-outer login-box-me' >
                <div className='login-logo'>      <img src={logoprofile} alt='logo' />       </div>

                <div className='profile-card'>
                    <div className='profile-card-body'>

                        <p className='login-box-msg'>Welcome to the Quadra Admin</p>
                        <form onSubmit={handleSubmit}>



                            <div className='input-group mb-3 input-group-me'>
                                <div className='input-group-append'><input type='email' name='email'
                                    value={user.email} onChange={(e) =>{ setUser({ ...user, email: e.target.value })
                                setemaildisplay("none")
                                }} className='form-control' placeholder='Username' required='' />
                                    <div className='input-group-text'>
                                        <FaUserAlt />
                                    </div>
                                </div>
                                <span style={{textAlign: "start", color: "red" }} className={emaildisplay}>Please Enter Email</span>
                            </div>
                            <div className='input-group mb-3 input-group-me'>
                                <div className='input-group-append'>
                                    <input type={showhideCls} name='Password' className='form-control' placeholder='Password' required=''
                                        value={user.password} onChange={(e) => {setUser({ ...user, password: e.target.value })
                                        setpassdisplay("none")
                                    }} />
                                    

                                     <div className='input-group-text' onClick={(e)=>{
                                        if(showhideCls==="password"){
                                            setshowhideCls("text")
                                        }
                                        else{
                                            setshowhideCls("password")
                                        }
                                     }}>
                                     
                                     {showhideCls==="password" ?<AiFillEyeInvisible size={20}/>: <MdVisibility size={20}/>}
                                </div>
                                </div>
                                <span style={{textAlign: "start", color: "red" }} className={passdisplay}>Please Enter password</span>
                            </div>

                            <div className='btn-row-block'>
                                <button type='submit' className='btn btn-primary btn-block'  >
                                    {loginloader ? <Spinner animation="border" size="sm" /> : "Log in"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </Wrapper>
    )
}

export default Home
