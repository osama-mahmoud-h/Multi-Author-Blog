import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { create_category } from "../../store/actions/dashboard/categoryAction";
import { useDispatch, useSelector } from "react-redux";
const AddCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loader, categoryError, categorySuccessMessage } = useSelector(state => state.dashboradCategory);
    
    const [state, setState] = useState({
        categoryName: '',
        categoryDesc: ''
    })
    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const addCategory = (e) => {
        e.preventDefault();
        dispatch(create_category(state));
    }

    useEffect(()=>{
        if(categoryError && categoryError.error){
            toast.error(categoryError.error);
            dispatch({type : 'CATE_ERROR_MESSAGE_CLEAR'});
        }
        if(categorySuccessMessage){
            toast.success(categorySuccessMessage);
            dispatch({type : 'CATE_SUCCESS_MESSAGE_CLEAR'});
            navigate('/dashboard/all-category/page-1');
        }
    },[categoryError,categorySuccessMessage])
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
                <title>Category add</title>
            </Helmet>
            <div className="added">
                <div className="title-show-article">
                    <h2>Add Category</h2>
                    <Link className='btn' to="/dashboard/all-category/page-1">All Category</Link>
                </div>
                <form onSubmit={addCategory}>
                    <div className="form-group">
                        <label htmlFor="category_name">Category name</label>
                        <input onChange={inputHendle} type="text" name='categoryName' className="form-control" placeholder='category name' id='category_name' />
                        <p className='error'>{categoryError? categoryError.categoryName : ""}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_des">Category description</label>
                        <textarea onChange={inputHendle} name='categoryDesc' type="text" className="form-control" placeholder='category description' id='category_des' />
                        <p className='error'>{categoryError? categoryError.categoryDesc : ""}</p>
                    </div>
                    <div className="form-group">
                        {
                            loader ? <button className="btn btn-block">
                                <div className="spinner">
                                    <div className="spinner1"></div>
                                    <div className="spinner2"></div>
                                    <div className="spinner3"></div>
                                </div>
                            </button> :<button className="btn btn-block">Add Category</button>

                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory