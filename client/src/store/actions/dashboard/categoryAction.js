import axios from 'axios';

const ENDPOINT = '/api/dashboard/category/';

export const create_category = (data)=>async(dispatch)=>{
    dispatch({type : 'SET_LOADER'});
    try {
        const response = await axios.post(ENDPOINT+'create',data,{withCredentials:true});
        dispatch({
            type : 'CATEGORY_ADD_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        dispatch({
            type : 'CATEGORY_ADD_FAIL',
            payload : {
                error : error.response.data.error
            }
        })
    }
}

export const get_all_category = (page,searchValue) =>async(dispatch)=>{
    try {
        const response  = await axios.get(ENDPOINT+`all?currentPage=${page}&&searchValue=${searchValue}`,{withCredentials:true});
        dispatch({
            type : "DASHBORAD_CATEGORY_GET_SUCCESS",
            payload : {
                allCategory : response.data.allCategories,
                parPage : response.data.perPage,
                categoryCount : response.data.categoryCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const delete_category = (id)=> async(dispatch)=>{
    try {
        const response = await axios.delete(`${ENDPOINT}delete/${id}`,{withCredentials:true});
        dispatch({
            type : 'CATEGORY_DELETE_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const edit_category = (categorySlug)=>async(dispatch)=>{
    try {
        const response = await axios.get(`${ENDPOINT}edit/${categorySlug}`,{withCredentials:true});
        dispatch({
            type : 'EDIT_CATEGORY_GET_SUCCESS',
            payload : {
                editCategory : response.data.category
            }
        });
        dispatch({
            type : 'EDIT_REQUEST_SET'
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const update_category = (id,data)=>async(dispatch)=>{
    try {
        const response = await axios.put(`${ENDPOINT}update/${id}`,data,{withCredentials:true});
        dispatch({
            type : 'CATEGORY_UPDATE_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        dispatch({
            type : 'CATEGORY_UPDATE_FAIL',
            payload : {
                error : error.response.data.error
            }
        })
    }
}

export const category_count = ()=>async(dispatch)=>{
    try {
        const response  = await axios.get(`/api/dashboard/category/count`,{withCredentials:true});
        dispatch({
            type : "DASHBORAD_CATEGORY_GET_SUCCESS",
            payload : {
                allTag : [],
                perPage : 0,
                categoryCount : response.data.categoryCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}