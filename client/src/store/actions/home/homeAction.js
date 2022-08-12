import axios from 'axios';
const ENDPOINT = '/api/home/';

export const get_all_article = (currentPage, searchValue) => async (dispatch) => {
    try {
        const response = await axios.get(`${ENDPOINT}article/all?currentPage=${currentPage}&&searchValue=${searchValue}`, { withCredentials: true });
        dispatch({
            type: "HOME_ARTICLE_GET_SUCCESS",
            payload: {
                articles: response.data.allArticles,
                perPage: response.data.perPage,
                articleCount: response.data.articleCount,
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const get_home_tag_category = () => async (dispatch) => {
    try {
        const resp = await axios.get(`${ENDPOINT}tag-category/all`, { withCredentials: true })
        
        dispatch({
            type: "HOME_CATEGORY_TAG_GET_SUCCESS",
            payload:{
                allUsedCategories:resp.data.allUsedCategories,
                allUsedTags:resp.data.allUsedTags
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const get_old_recent_acticle = () => async (dispatch) => {
    try {
        const response = await axios.get(ENDPOINT+'article/old-recent', { withCredentials: true })
        dispatch({
            type: "GET_OLD_RECENT_ATICLE_SUCCESS",
            payload:{
                recentArticles: response.data.recentArticles,
                oldArticles:response.data.oldArticles
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const get_category_article = (categorySlug, currentPage) => async (dispatch) => {
    try {
        const response = await axios.get(`${ENDPOINT}article/category/?categorySlug=${categorySlug}&&currentPage=${currentPage}`, { withCredentials: true })
        dispatch({
            type: 'CATEGORY_ARTICLE_GET_SUCCESS',
            payload: {
                articlesOfCategory: response.data.articlesOfCategory,
                articlesOfCategoryCount: response.data.articlesOfCategoryCount,
                perPage: response.data.perPage
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const get_tag_article = (tagSlug, currentPage) => async (dispatch) => {
    try {
        const response = await axios.get(`${ENDPOINT}article/tag/?tagSlug=${tagSlug}&&currentPage=${currentPage}`, { withCredentials: true })
        dispatch({
            type: 'TAG_ARTICLE_GET_SUCCESS',
            payload: {
                articlesOfTag: response.data.articlesOfTag,
                articlesOfTagCount: response.data.articlesOfTagCount,
                perPage: response.data.perPage
            }
        })
    } catch (error) {
        console.log(error)
    }
}



export const get_popular_articles = ()=>async(dispatch)=>{
    try {
        const response = await axios.get(`${ENDPOINT}article/popular`, { withCredentials: true })
        dispatch({
            type: 'HOME_POPULAR_ARTICLES_GET_SUCCESS',
            payload: {
                popularArticles: response.data.popularArticles
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const add_visitor = ()=>async(dispatch)=>{
    try {
        if(!localStorage.getItem('blogOfOsamaMH')){
        const response = await axios.post(`${ENDPOINT}visitor/add`, { withCredentials: true });
        localStorage.setItem('blogOfOsamaMH',true);
        }
       
    } catch (error) {
        console.log(error)
    }
}
