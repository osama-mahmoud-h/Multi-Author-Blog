import React, { useEffect } from 'react';
import { Link, useOutlet, useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronRight } from "react-icons/bs";
import { AiFillTag, AiFillDislike, AiFillLike } from "react-icons/ai";
import {  AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { FaEye  } from "react-icons/fa";

import { FaFacebookSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import Comments from './comments';
import { get_article_details, like_dislike_get, user_article_dislike, user_article_like } from '../../store/actions/home/articleDetailsAction';
import htmlParser from 'react-html-parser';


const ArticalDetails = () => {
    const [userInfo] = useOutletContext();
    console.log('userInfo',userInfo)
    const dispath = useDispatch();
    const  {articleId}  = useParams();
  //  console.log("articleId: ",articleId)
    const { related_article, readMore, read_article, moreTag } = useSelector(state => state.homeReducer);
    const { like, dislike, like_status, like_dislike_message } = useSelector(state => state.likesReducer);
    //const { userInfo } = useSelector(state => state.adminReducer);

    useEffect(() => {
        if(articleId){
            dispath(get_article_details(articleId));
            dispath(like_dislike_get({
                articleId:articleId,
                userId:userInfo.id
            }));
          
           // console.log("artId: ",articleId)
        }
        console.log("artId: ",articleId)
    }, []);
    
    useEffect(()=>{
        console.log('like_status: ',like_status);
    },[like_status]);

 /*   useEffect(() => {
      //  dispath(like_dislike_get(articleId))
    }, [articleId])*/

    const article_like = (e) => {
        e.preventDefault()
        const obj = {
            articleId: read_article._id,
            userId:userInfo.id
        }
        dispath(user_article_like(obj))
    }
    const article_dislike = (e) => {
        e.preventDefault()
        const obj = {
            articleId: read_article._id,
            userId:userInfo.id
        }
        dispath(user_article_dislike(obj))
        console.log("user Info ,",userInfo)
    }

    return (
        <div className="article-details">
            <div className="path">
                <Link to='/'>Home</Link>
                <span className='arrow'><BsChevronRight /></span>
                <Link to={`/article/category/${read_article?.category_slug}/page-1`}>{read_article?.category}</Link>
                <span className='arrow'><BsChevronRight /></span>
                <span>{read_article?.title}</span>
            </div>
            <div className="title">
                <h3><Link to="/">{read_article?.title}</Link></h3>
            </div>
            <div className="auth-time">
                <div className="auth">
                    <h4><AiFillTag /></h4>
                    <span><Link to={`/article/tag/${read_article?.tag_slug}/page-1`}>{read_article?.tag}</Link></span>
                </div>
                <div className="time">
                    <span>2 jun 2020</span>
                </div>
            </div>
            <div className="home-artical-image">
                <img src={`/uploads/articleImages/${read_article?.image}`} alt="" />
            </div>
            <div className="home-artical-text">
                {htmlParser(read_article?.text)}
            </div>
            <div className="like-dislike-view">
                <div className="like-dislike">
                <div className="dislike">
                        {
                          userInfo&&userInfo.role === 'user' 
                            ? 
                          <button onClick={article_dislike} className={'icon'} > {like_status === 'dislike'?<AiFillDislike/>:<AiOutlineDislike/>} </button> 
                           :
                           <button disabled className='icon'><AiFillDislike /></button>
                           /**/
                        }
                        <div className="like-number">({dislike})</div>
                    </div>
                    <div className="like">
                        {
                            userInfo&&userInfo.role === 'user' ? <button onClick={article_like} className={ 'icon'} >{like_status === 'like'?<AiFillLike/>:<AiOutlineLike/>}</button> : <button disabled className='icon'><AiFillLike /></button>
                        }
                        <div className="dislike-number">({like})</div>
                    </div>
                </div>
                <div className="view">
                    <span>{read_article.views}</span>
                    <span><FaEye/></span>
                </div>
            </div>
            <div className="read-more">
                <span>Read more : </span>
                <Link to={"/readMore?._id"}>{readMore?.title}</Link>
            </div>
            <div className="more-tags">
                <span>Tags</span>
                {
                    moreTag&&moreTag.length > 0 && moreTag.map((teg, index) => <Link to={`/article/tag/${teg}`} key={index}>{teg.split('-').join(' ')}</Link>)
                }
            </div>
            <div className="social-icons">
                <a className='l1' href=""><FaFacebookSquare /></a>
                <a className='l2' href=""><FaTwitterSquare /></a>
                <a className='l3' href=""><FaGithubSquare /></a>
                <a className='l4' href=""><ImLinkedin /></a>
            </div>
            <div className="related-article">
                <div className="more">
                    <h3>Related Articles</h3>
                </div>
                <div className="articles">
                    {
                       related_article&&related_article.length > 0 ? related_article.map((art, index) => <Link key={index} to={`/article/details/${art._id}`} className='article'>
                            <img src={`/uploads/articleImages/${art?.image}`} alt="" />
                            <span>very popular during the Renaissance. The first line of</span>
                        </Link>) : <span>Related article not found</span>
                    }

                </div>
            </div>
            <div className="comment_title">
                <h3>Article comments</h3>
            </div>
            <Comments articleId={articleId} userInfo={userInfo} />
        </div>
    )
};

export default ArticalDetails;