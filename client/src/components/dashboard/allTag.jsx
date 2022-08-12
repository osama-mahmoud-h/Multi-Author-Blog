import React,{useEffect} from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";
import Pagination from '../home/pagination'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { get_all_tag,delete_tag } from "../../store/actions/dashboard/tagAction";

const AllTag = () => {

    const dispatch = useDispatch();
    const { currentPage } = useParams();
    const { perPage, allTag, tagCount,tagSuccessMessage } = useSelector(state => state.dashboradTag);

    useEffect(() => {
        if(tagSuccessMessage){
            toast.success(tagSuccessMessage,{
                position:'top-center'
            });
            dispatch({type : 'TAG_SUCCESS_MESSAGE_CLEAR'});
        }
        dispatch(get_all_tag(currentPage ? currentPage.split('-')[1] : 1));
    }, [currentPage,tagSuccessMessage])

    console.log("all cate pag, ",currentPage," ,",perPage," ,",tagCount);

    return (
        <div className='all-category'>
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
                <title>All Tag</title>
            </Helmet>
            <div className="show-category-action">
                <div className="numof-search-newAdd">
                    <div className="numof">
                        <h2>({tagCount})</h2>
                    </div>
                    <div className="searchOf">
                        <div className="search">
                            <input onChange={(e)=>dispatch(get_all_tag(currentPage ? currentPage.split('-')[1] : 1,e.target.value))} type="text" placeholder='search tag' className="form-control" />
                        </div>
                        <span><FaSearch /></span>
                    </div>
                    <div className="newAdd">
                        <Link className='btn' to='/dashboard/add-tag'>Add New</Link>
                    </div>
                </div>
                <div className="height-60vh">
                <div className="categorys">
                        {
                           allTag && allTag.length > 0 ? allTag.map((c,index) => <div key={index} className="category">
                                <div className="name">{c.tagName}</div>
                                <div className="action">
                                    <span><Link to={`/dashboard/tag/edit/${c.tagSlug}`}><MdEdit /></Link></span>
                                    <span onClick={()=>dispatch(delete_tag(c._id))}><MdDelete /></span>
                                </div>
                            </div>) : "Tag not found..."
                        }
                    </div>
                </div>
                <Pagination 
                    pageNumber ={currentPage ? currentPage.split('-')[1]:1}
                    parPage = {perPage}
                    itemCount = {tagCount}
                    path = '/dashboard/all-tag'
                />
            </div>
        </div>
    )
}

export default AllTag;