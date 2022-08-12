import axios from 'axios';

const ENDPOINT = '/api/dashboard/article/';

export const get_tag_category = ()=>async(dispatch)=>{
    try {

        const response = await axios.get('http://localhost:5000/rest-api/get-tag-category',{withCredentials:true});
        dispatch({
            type : 'CATE_TAG_GET_SUCCESS',
            payload : {
                allCategory : response.data.allCategory,
                allTag : response.data.allTag
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const create_articale = (data)=>async(dispatch)=>{
    
    dispatch({
        type : 'ART_SET_LOADER'
    })
    try {
        const response = await axios.post(ENDPOINT+'create',data,{withCredentials:true});
        dispatch({
            type : 'ARTICLE_ADD_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
      // console.log( "article err: ",JSON.parse ( error.response.data.error))
        dispatch({
            type : 'ARTCLE_ADD_FAIL',
            payload :{
                errorMessage : JSON.parse( error.response.data.error)
            }
        });
    }
}

export const get_all_article = (currentPage,searchValue)=>async(dispatch)=>{
    try {
        const response = await axios.get(`${ENDPOINT}all?currentPage=${currentPage}&&searchValue=${searchValue}`,{withCredentials:true});
        dispatch({
            type : 'DASH_ARTICLE_GET_SUCCESS',
            payload :{
                allArticle : response.data.allArticles,
                articleCount : response.data.articleCount,
                perPage : response.data.perPage,
            }
        })
    } catch (error) {
       // console.log(error)
        console.log(error.response)
    }
}


export const article_edit = (articleId)=>async(dispatch)=>{
    try {
        const response = await axios.get(`${ENDPOINT}edit/${articleId}`,{withCredentials:true});
        
        dispatch({
            type : 'EDIT_ARTICLE_GET_SUCCESS',
            payload:{
                edtiArticle : response.data.article
            }
        })
        dispatch({
            type : 'EDIT_ARTICLE_REQUEST_SET',
        })
        
    } catch (error) {
        console.log(error.response)
    }
}


export const article_update = (articleId,data)=>async(dispatch)=>{
    
    dispatch({
        type : 'ART_SET_LOADER'
    })
    try {
        const response = await axios.put(`${ENDPOINT}update/${articleId}`,data,{withCredentials:true});
        dispatch({
            type : 'ARTICLE_UPDATE_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        dispatch({
            type : 'ARTCLE_UPDATE_FAIL',
            payload :{
                errorMessage :  error.response.data.error
            }
        })
    }
}

export const delete_article = (articleId)=>async(dispatch)=>{
    try {
        const response = await axios.delete(`${ENDPOINT}delete/${articleId}`,{withCredentials:true})
        dispatch({
            type : 'ARTICLE_DELETE_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        dispatch({
            type : 'ARTCLE_DELETE_FAIL',
            payload :{
                errorMessage :  error.response.data.message
            }
        })
    }
}


export const article_count = ()=>async(dispatch)=>{
    try {
        const response  = await axios.get(`/api/dashboard/article/count`,{withCredentials:true});
        dispatch({
            type : "DASH_ARTICLE_GET_SUCCESS",
            payload : {
                allArticle : [],
                parPage : 0,
                articleCount : response.data.articleCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}