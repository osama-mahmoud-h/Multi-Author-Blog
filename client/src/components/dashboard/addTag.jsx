import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { create_tag } from "../../store/actions/dashboard/tagAction";
import { useDispatch, useSelector } from "react-redux";

const AddTag = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader, tagError, tagSuccessMessage } = useSelector(state => state.dashboradTag);
    
    const [state, setState] = useState({
        tagName: '',
        tagDesc: ''
    })
    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const addTag = (e) => {
        e.preventDefault();
        dispatch(create_tag(state));
        
    }

    useEffect(() => {
        if (tagError) {
            toast.error(tagError,{
                position:'top-center'
            });
            dispatch({ type: 'TAG_ERROR_MESSAGE_CLEAR' });
           // console.log("tag err: ",tagError)
        }
        if (tagSuccessMessage) {
            toast.success(tagSuccessMessage,{
                position:'top-center'
            });
            dispatch({ type: 'TAG_SUCCESS_MESSAGE_CLEAR' });
            navigate('/dashboard/all-tag/page-1');
            //console.log("tag successe")
        }
        
    }, [tagError, tagSuccessMessage])
    return (
        <div className='add-category'>
            <Toaster position={'top-center'}
                reverseOrder={false}
                toastOptions={
                    {
                        style: {
                            fontSize: '15px'
                        }
                    }
                }
            />
            <Helmet>
                <title>Tag add</title>
            </Helmet>
            <div className="added">
                <div className="title-show-article">
                    <h2>Add Tag</h2>
                    <Link className='btn' to="/dashboard/all-tag/page-1">All Tag</Link>
                </div>
                <form onSubmit={addTag}>
                    <div className="form-group">
                        <label htmlFor="category_name">Tag name</label>
                        <input onChange={inputHendle} value={state.tagName} type="text" name='tagName' className="form-control" placeholder='tag name' id='tag_name' />
                        <p className='error'>{tagError? tagError.tagName : ""}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_des">Tag description</label>
                        <textarea onChange={inputHendle} value={state.tagDesc} name='tagDesc' type="text" className="form-control" placeholder='tag description' id='tag_des' />
                        <p className='error'>{tagError? tagError.tagDesc : ""}</p>
                    </div>
                    <div className="form-group">
                        {
                            loader ? <button className="btn btn-block">
                                <div className="spinner">
                                    <div className="spinner1"></div>
                                    <div className="spinner2"></div>
                                    <div className="spinner3"></div>
                                </div>
                            </button> : <button className="btn btn-block">Add Tag</button>

                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTag