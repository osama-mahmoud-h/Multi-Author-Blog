import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { get_home_tag_category, get_old_recent_acticle } from '../../store/actions/home/homeAction'

const Footer = () => {

    const dispatch = useDispatch()
    const { oldArticle, recentArticle, allTag, allCategory } = useSelector(state => state.homeReducer)

    useEffect(() => {
        dispatch(get_old_recent_acticle());
        //dispatch(get_home_tag_category());
    }, []);

   // console.log("footer category: ",allTag)
    
    return (
        <section id="footer">
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="title">
                                <h3>Old Articles</h3>
                            </div>
                            {
                                oldArticle&&oldArticle.length > 0 && oldArticle.map((art, index) =>
                                    <div key={index} className="some-recent-artical">
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="img">
                                                    <img src={`/uploads/articleImages/${art.image}`} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="title-link">
                                                    <Link to={`/article/details/${art._id}`}>{art.title}</Link>
                                                    <br />
                                                    <span>{moment(art.createdAt).format('DD MMM YYYY')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-4">
                            <div className="title-cate-tag">
                                <div className="title">
                                    <h3>Category</h3>
                                </div>
                                <div className="cate-tag">
                                    <div className="cate">
                                        <ul className="cate-list">
                                            {
                                                allCategory&&allCategory.length > 0 && allCategory.map((cate, index) =>
                                                    <div key={index} className="cate-item">
                                                        <li><FaChevronRight /><Link to={`/article/category/${cate}/page-1`}>{cate}</Link></li>
                                                        <span></span>
                                                    </div>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className="tag">
                                        <div className="title">
                                            <h3>Tag</h3>
                                        </div>
                                        <ul className="tag-list">
                                            {
                                                allTag&&allTag.length > 0 && allTag.map((tag, index) => <li className='tag-item' key={index}><Link to={`/article/tag/${tag}/page-1`}>{tag}</Link></li>
                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="title">
                                <h3>Recent Articles</h3>
                            </div>
                            {
                                recentArticle&&recentArticle.length > 0 && recentArticle.map((art, index) =>
                                    <div key={index} className="some-recent-artical">
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="img">
                                                    <img src={`/uploads/articleImages/${art.image}`} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="title-link">
                                                    <Link to={`/article/details/${art._id}`}>{art.title}</Link>
                                                    <br />
                                                    <span>{moment(art.createdAt).format('DD MMM YYYY')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Footer;