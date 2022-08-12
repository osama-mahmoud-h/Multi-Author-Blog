import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";import { BsTrash } from "react-icons/bs";
import moment from 'moment'
import { useDispatch ,useSelector} from 'react-redux';
import { get_all_comments, user_article_comment, user_delete_comment } from '../../store/actions/home/articleDetailsAction';

const Comments = ({articleId,userInfo}) => {

  const {comments,isCommentAuthor,successMessage,errorMessage } = useSelector(state => state.commentReducer);
  const dispatch = useDispatch();
  const [comment,setComment]=useState('');

  useEffect(()=>{
    if(articleId){
        dispatch(get_all_comments(articleId));
       console.log('all comments')
    }
  },[articleId,]);

  //console.log("new comment",successMessage)
  useEffect(()=>{
    if(successMessage){
     toast.success(successMessage);
     dispatch({
        type:'USER_COMMENT_CLEAR_SUCCESS_MESSAGE'
     });
    
     dispatch(get_all_comments(articleId));
    setComment(''); 
   
    }
    if(errorMessage){
        toast.error(errorMessage);
        dispatch({
           type:'USER_COMMENT_CLEAR_ERROR_MESSAGE'
        })
       }
  },[successMessage,errorMessage]);


   const postComment = (e)=>{
    e.preventDefault();
    dispatch(user_article_comment({
        articleId:articleId,
        userId:userInfo.id,
        comment:comment
    }));

   }
//console.log("comment :",comment)
    return (
        <>
        <div className='comments'>
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
            {
                comments&&comments.length>0 ?
                comments.map((comm,index)=>
                <div key={index} className="main-reply-comment">
                  <div className="image-comment-time-name">
                      <img src="/static/images/osama.jpg" alt="" />
                      <div className="name-time-comment">
                          <div className="name-time">
                              <h4>{comm.author.userName}</h4>
                              <span>{moment(comm.createdAt).fromNow()}</span>
                          </div>
                          <p> {comm.content}</p>
                      </div>
                  </div>
                  {
                  userInfo&&comm.author._id===userInfo.id
                  ?
                  <div className="trash" onClick={()=>dispatch(user_delete_comment(comm._id))}><BsTrash /></div>
                    :''
                  }
                     
              </div>)
              :'no comments yet'
              
            }

        </div>
        <div className="comment_submit">
            <h2>Give Your Comment</h2>
            <div className="form-group">
                <textarea className='form-control' placeholder='write something' name="comment" id="" cols="20" rows="10" onChange={(e)=>setComment(e.target.value)} value={comment}></textarea>
            </div>
            <div className="form-group">
                <button className="btn" onClick={postComment}>Submit</button>
            </div>
        </div>
        </>
    )
}

export default Comments