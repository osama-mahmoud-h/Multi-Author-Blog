import axios from 'axios';

const ENDPOINT = '/api/home/article/';

export const get_article_details = (articleId) => async (dispath) => {
    try {
        const response = await axios.get(`${ENDPOINT}details/${articleId}`, { withCredentials: true })
        dispath({
            type: 'READ_ARTICLE_GET_SUCCESS',
            payload:{
                relatedArticles:response.data.relatedArticles,
                moreTags:response.data.moreTags,
                readArticle:response.data.readArticle
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const like_dislike_get = (data) => async (dispath) => {
    try {
        const response = await axios.post(`${ENDPOINT}get-like`,data, { withCredentials: true })
        console.log("likes response: ",response);
        dispath({
            type: 'ARTICLE_LIKES_GET_SUCCESS',
            payload:{
                status:response.data.status
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const user_article_like = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${ENDPOINT}user-like`, data, { withCredentials: true })
        dispatch({
            type: 'USER_LIKE_SUCCESS',
            payload:{ 
                successMessage:response.data.message,
                status:response.data.status,
                like:response.data.like,
                dislike:response.data.dislike
            }
        });
       // console.log('like resp ',response.data)
    } catch (error) {
        console.log(error.response)
    }
}

export const user_article_dislike = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${ENDPOINT}user-dislike`, data, { withCredentials: true })
        dispatch({
            type: 'USER_DISLIKE_SUCCESS',
            payload: {
                successMessage:response.data.message,
                status:response.data.status,
                like:response.data.like,
                dislike:response.data.dislike
            }
        })
      //  console.log('dislike resp ',response.data)
    } catch (error) {
        console.log(error.response)
    }
}

export const user_article_comment = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${ENDPOINT}user-comment`, data, { withCredentials: true })
        dispatch({
            type: 'USER_COMMENT_SUCCESS',
            payload:{
                successMessage:response.data.message
            }
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type:'USER_COMMENT_ERROR',
            payload:{
                error:error.response.data.error
            }
        })
    }
}

export const user_delete_comment = (commentId) => async (dispatch) => {
    try {
        const response = await axios.delete(`${ENDPOINT}user-comment/delete/${commentId}`, { withCredentials: true })
        dispatch({
            type: 'USER_COMMENT_DELETE_SUCCESS',
            payload: {
                successMessage:response.data.message
            }
        })
    } catch (error) {
        dispatch({
            type: 'USER_COMMENT_DELETE_ERROR',
            payload: {
                error:error.response.data.error
            }
        });
        console.log(error.response)
    }
}

export const get_all_comments = (articleId) => async (dispatch) => {
    try {
        const response = await axios.get(`${ENDPOINT}comments/${articleId}`, { withCredentials: true })
        dispatch({
            type: 'COMMENTS_GET_SUCCESS',
            payload: {
                comments:response.data.comments}
        });

    } catch (error) {
        console.log(error.response)
    }
}
