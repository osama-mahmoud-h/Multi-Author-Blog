import React, { useState, useEffect } from 'react';
import { BsAt } from 'react-icons/bs';
import { FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import FacebookLogin from 'react-facebook-login';
import Navbar from '../home/navbar';
import { is_user_auth, user_login } from '../../store/actions/userAuthAction';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../store/actions/userAuthAction';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("roue",window.location.href); 
    const { errorMessage,successMessage, loader, authenticate } = useSelector(state => state.userAuthReducer);
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    useEffect(()=>{
        dispatch(is_user_auth());
    },[]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch({ type: 'SUCCES_MESSAGE_CLEAR' })
        }
        if (authenticate) {
            navigate('/');
            console.log("navigte to home")
        }
        if(errorMessage){
            toast.error(errorMessage)
        }
      //  console.log("successMessage:",successMessage)
    }, [successMessage, authenticate,errorMessage])

    useEffect(() => {
            function start() {
              gapi.client.init({
                clientId: "851675571873-oprbk6uhl07gld619mm76obfclanjekp.apps.googleusercontent.com",
                scope: 'email',
              });
            }
        
            gapi.load('client:auth2', start);
        
         dispatch({ type: 'ERROR_CLEAR' }) 
    }, [])

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const login = (e) => {
        e.preventDefault()
        dispatch(user_login(state))
    }

   // console.log("env: ",process.env.REACT_APP_API_KEY)

   const responseGoogleSuccess = async(resp)=>{
    console.log("google login succes: ",resp)
    dispatch(googleLogin(resp))
   }

   const responseGoogleError = (resp)=>{
    console.log("google login err falir: ",resp)
    //dispatch()
   }

   const responseFacebookSuccess = (resp)=>{
    console.log("facebook login succes: ",resp)
   }

   const responseFacebookError = (resp)=>{
    console.log("facebook login err: ",resp)
   }
   
    return <>
        <Navbar />
        <div className="login">
            <Toaster
                position={'top-center'}
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '16px'
                    }
                }}
            />
            <div className="card">
                <div className="auth">
                    <h3>Login</h3>
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="icon-input">
                                <div className="icon"><BsAt /></div>
                                <input onChange={inputHandle} type="email" name='email' id='email' placeholder='email' className="form-control" />
                            </div>
                            <p>{errorMessage?.email}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="icon-input">
                                <div className="icon"><FaLock /></div>
                                <input onChange={inputHandle} type="password" name='password' id='password' placeholder='password' className="form-control" />
                            </div>
                            <p>{errorMessage?.password}</p>
                        </div>
                        <div className="form-group">
                            {
                                loader ? <button className="btn btn-block">
                                    <div className="spinner">
                                        <div className="spinner1"></div>
                                        <div className="spinner2"></div>
                                        <div className="spinner3"></div>
                                    </div>
                                </button> : <button onClick={login} className="btn btn-block">
                                    Login
                                </button>
                            }


                        </div>
                    </form>
                    <div className="or">or</div>
                    <div className="fb-google-auth">
                        <div className="fb-google-logo">
                       {/* <FacebookLogin
                            appId="1088597931155576"
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={null}
                            callback={responseFacebookSuccess} 
                            />*/}
                            <GoogleLogin
                            clientId='851675571873-oprbk6uhl07gld619mm76obfclanjekp.apps.googleusercontent.com' 
                            onSuccess={responseGoogleSuccess} 
                            onFailure={responseGoogleError}
                            cookiePolicy={'single_host_origin'}
                            buttonText="Login with google"

                           
                            />   
                           
                        </div>
                    </div>
                    <div className="login-page">
                        <Link to='/register'>Register your account</Link>
                    </div>
                </div>
                <div className="image-logo">
                    <img src="/static/images/image4.jpg" alt="" />
                </div>
            </div>
        </div>
    </>;
};

export default Login;