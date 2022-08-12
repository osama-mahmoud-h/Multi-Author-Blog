import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import htmlToText from "react-html-parser";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from '../home/pagination';
import toast, { Toaster } from "react-hot-toast";

import { get_all_article, delete_article } from "../../store/actions/dashboard/articleAction";

const DashboradArticle = () => {

    const dispatch = useDispatch();
    const { currentPage } = useParams();

    const { allArticle, parPage, articleCount, articleSuccessMessage } = useSelector(state => state.dashboradArtical);

    //console.log("allArticle: ",allArticle)
    useEffect(() => {
        if (articleSuccessMessage) {
            toast.success(articleSuccessMessage)
            dispatch({ type: 'ART_SUCCESS_MESSAGE_CLEAR' })
        }
        
        dispatch(get_all_article(currentPage ? currentPage.split('-')[1] : 1))
        console.log("articleCount ,",articleCount," ,perPage, ",parPage)
    }, [currentPage,articleSuccessMessage])

    return (
        <div className='dashborad-article'>
            <Helmet>
                <title>All Article</title>
            </Helmet>
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
            <div className="article-action-pagination">
                <div className="numof-search-newAdd">
                    <div className="numof">
                        <h2>Article ({articleCount})</h2>
                    </div>
                    <div className="searchOf">
                        <div className="search">
                            <input onChange={(e) => dispatch(get_all_article(currentPage ? currentPage.split('-')[1] : 1, e.target.value))} type="text" placeholder='search article' className="form-control" />
                        </div>
                        <span><FaSearch /></span>
                    </div>
                    <div className="newAdd">
                        <Link className='btn' to='/dashboard/article-add'>Add New</Link>
                    </div>
                </div>
                <div className="height-70vh">
                    <div className="articles">
                        {
                           allArticle&&allArticle.length > 0 ? allArticle.map((art, index) =>
                                <div key={index} className="article">
                                    <img src={`http://localhost:3000/uploads/articleImages/${art.image}`} alt="" />
                                    <Link to={`/article/details/${art.titleSlug}`}>{htmlToText(art.title.slice(0, 30))}</Link>
                                         {htmlToText(art.text.slice(0, 50))}
                                    <div className="action">
                                        <span>
                                            <Link to={`/dashboard/article/edit/${art._id}`}><MdEdit /></Link>
                                        </span>
                                        <span>
                                            <Link to="/dashboard" ><FaRegEye /></Link>
                                        </span>
                                        <span onClick={() => dispatch(delete_article(art._id))}><MdDelete /></span>
                                    </div>
                                </div>
                            ) : 'Article not found...'
                        }
                    </div>
                </div>
                {
                    <Pagination
                        pageNumber={currentPage ? currentPage.split('-')[1] : 1}
                        parPage={parPage}
                        itemCount={articleCount}
                        path='/dashboard/all-article'
                    />
                }

            </div>
        </div>
    )
}

export default DashboradArticle