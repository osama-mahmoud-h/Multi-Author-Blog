import React, { useState } from 'react';
import { BsAt } from 'react-icons/bs';
import { FaLock, FaUser } from 'react-icons/fa';
import Navbar from '../home/navbar';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { user_register } from '../../store/actions/userAuthAction'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errorMessage, successMessage, loader,authenticate } = useSelector(state => state.userAuthReducer)
    const [state, setState] = useState({
        name: "",
        email: '',
        password: '',
        image: ''
    });


    const [showImage, setShowImage] = useState("")

    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            setState({
                ...state,
                image: e.target.files[0]
            })

            const rander = new FileReader()
            rander.onload = () => {
                setShowImage(rander.result)
            }
            rander.readAsDataURL(e.target.files[0])
        }
    }

    const userRegister = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('userName', state.name)
        formData.append('email', state.email)
        formData.append('password', state.password)
        formData.append('image', state.image)

        console.log("user data: ",formData)
        dispatch(user_register(formData))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch({type:'REGISTER_SUCCES_MESSAGE_CLEAR'})
            navigate('/')
        }
        if (errorMessage.error!==undefined) {
           
            toast.error(errorMessage.error)
            dispatch({ type: 'ERROR_CLEAR' })
        }
    }, [successMessage, errorMessage, authenticate])
    useEffect(() => {
        dispatch({ type: 'ERROR_CLEAR' })
    }, [])
    return <>
        <Navbar />
        <div className="register">
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
                    <h3>Register</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <div className="icon-input">
                                <div className="icon"><FaUser /></div>
                                <input onChange={inputHendle} type="text" name='name' id='userName' placeholder='user name' className="form-control" />
                            </div>
                            <p className='error'>{errorMessage?.userName}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="icon-input">
                                <div className="icon"><BsAt /></div>
                                <input onChange={inputHendle} type="email" name='email' id='email' placeholder='email' className="form-control" />
                            </div>
                            <p className='error'>{errorMessage?.email}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="icon-input">
                                <div className="icon"><FaLock /></div>
                                <input onChange={inputHendle} type="password" name='password' id='password' placeholder='password' className="form-control" />
                            </div>
                            <p className='error'>{errorMessage?.password}</p>
                        </div>
                        <div className="form-group">
                            <input onChange={imageHandle} hidden type="file" name='image' id='reg-image' />
                            <div className="image-file">
                                <div className="image">
                                    {
                                        showImage && <img src={`${showImage}`} alt='profile image' />
                                    }
                                </div>
                                <div className="file-name">
                                    <div className="form-control">{state.image && state.image.name}</div>
                                    <label htmlFor="reg-image">Browser</label>
                                </div>
                            </div>
                            <p className='error'>{errorMessage?.image}</p>
                        </div>
                        <div className="form-group">
                            {
                                loader ? <button className="btn btn-block">
                                    <div className="spinner">
                                        <div className="spinner1"></div>
                                        <div className="spinner2"></div>
                                        <div className="spinner3"></div>
                                    </div>
                                </button> : <button onClick={userRegister} className="btn btn-block">
                                    Register
                                </button>
                            }
                        </div>
                        <div className="form-group">
                            <div className="login-page">
                                <Link to='/login'>login your account</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="image-logo">
                    <img src="/static/images/image4.jpg" alt="" />
                </div>
            </div>
        </div>
    </>;
};

export default Register;