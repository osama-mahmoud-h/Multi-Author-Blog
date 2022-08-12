import React,{useEffect,useState} from 'react';
import Helmet from 'react-helmet';
import { Link,useNavigate,useParams} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { edit_category,update_category } from "../../store/actions/dashboard/categoryAction";

const EditCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cateSlug} = useParams();

    const {categoryError, categorySuccessMessage,editCategory,editRequest } = useSelector(state => state.dashboradCategory);

    const [state, setState] = useState({
        categoryName: '',
        categoryDesc: ''
    })
    
    useEffect(()=>{
        if(editRequest){
            setState({
                categoryName : editCategory.categoryName,
                categoryDesc : editCategory.categoryDesc
            })
            dispatch({type : 'EDIT_REQUEST_CLEAR'})
        }else{
            dispatch(edit_category(cateSlug));
        }
    },[editCategory,cateSlug]);


    useEffect(()=>{
        if(categorySuccessMessage){
            navigate('/dashboard/all-category/page-1')
        }
    },[categorySuccessMessage])

    const inputHendle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    
    const update = (e)=>{
        e.preventDefault();
        dispatch(update_category(editCategory._id,state));
    }
    
    return (
        <div className='add-category'>
            <Helmet>
                <title>Category Edit</title>
            </Helmet>
            <div className="added">
                <div className="title-show-article">
                    <h2>Edit Category</h2>
                    <Link className='btn' to="/dashboard/all-category/page-1">All Category</Link>
                </div>
                <form onSubmit={update}>
                    <div className="form-group">
                        <label htmlFor="category_name">Category name</label>
                        <input onChange={inputHendle} type="text" value={state.categoryName} name='categoryName' className="form-control" placeholder='category name' id='category_name' />
                        <p className='error'>{categoryError && categoryError.categoryName}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_des">Category description</label>
                        <textarea onChange={inputHendle} value={state.categoryDesc} name='categoryDesc' type="text" className="form-control" placeholder='category description' id='category_des' />
                        <p className='error'>{categoryError && categoryError.categoryDesc}</p>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Update Category</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory;