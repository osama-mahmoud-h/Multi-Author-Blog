import React,{useEffect,useState} from 'react';
import Helmet from 'react-helmet';
import toast, { Toaster } from "react-hot-toast";
import { Link,useNavigate,useParams} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { edit_tag,update_tag } from "../../store/actions/dashboard/tagAction";

const EditTag = () => {
    const dispatch = useDispatch();
    const {tagSlug} = useParams();
    const navigate = useNavigate();

    const {tagError, tagSuccessMessage,editTag,editRequest } = useSelector(state => state.dashboradTag);

    const [state, setState] = useState({
        tagName: '',
        tagDesc: ''
    })
    
    useEffect(()=>{
        if(editRequest){
            setState({
                tagName : editTag.tagName,
                tagDesc : editTag.tagDesc
            })
            dispatch({type : 'EDIT_REQUEST_CLEAR'})
        }else{
            dispatch(edit_tag(tagSlug));
        }
    },[editTag,tagSlug]);


    useEffect(()=>{
        if(tagSuccessMessage){
            toast.success(tagSuccessMessage,{
                position:'top-center'
            });
            dispatch({ type: 'TAG_ERROR_MESSAGE_CLEAR' });
            navigate('/dashboard/all-tag/page-1')
        }
    },[tagSuccessMessage])

    const inputHendle = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    useEffect(()=>{
        if(tagError){
            toast.error(tagError,{
                position:'top-center'
            });
            dispatch({ type: 'TAG_ERROR_MESSAGE_CLEAR' });
        }
    },[tagError]);
    
    const update = (e)=>{
        e.preventDefault();
        dispatch(update_tag(editTag._id,state));
    }
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
                <title>Tag Edit</title>
            </Helmet>
            <div className="added">
                <div className="title-show-article">
                    <h2>Edit Tag</h2>
                    <Link className='btn' to="/dashboard/all-tag/page-1">All Tag</Link>
                </div>
                <form onSubmit={update}>
                    <div className="form-group">
                        <label htmlFor="category_name">Tag name</label>
                        <input onChange={inputHendle} type="text" value={state.tagName} name='tagName' className="form-control" placeholder='tag name' id='tag_name' />
                        <p className='error'>{tagError && tagError.tagName}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_des">Tag description</label>
                        <textarea onChange={inputHendle} value={state.tagDesc} name='tagDesc' type="text" className="form-control" placeholder='tag description' id='tag_des' />
                        <p className='error'>{tagError && tagError.tagDesc}</p>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Update Tag</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTag;