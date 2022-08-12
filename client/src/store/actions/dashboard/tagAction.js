import axios from 'axios';

export const create_tag = (data)=>async(dispatch)=>{
    dispatch({type : 'SET_LOADER'});
    try {
        const response = await axios.post('/api/dashboard/tag/create',data,{withCredentials:true});
        dispatch({
            type : 'TAG_ADD_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        dispatch({
            type : 'TAG_ADD_FAIL',
            payload : {
                error : error.response.data.error
            }
        })
    }
}

export const get_all_tag = (page,searchValue) =>async(dispatch)=>{
    try {
        const response  = await axios.get(`/api/dashboard/tag/all?currentPage=${page}&&searchValue=${searchValue}`,{withCredentials:true});
        dispatch({
            type : "DASHBORAD_TAG_GET_SUCCESS",
            payload : {
                allTag : response.data.allTags,
                perPage : response.data.perPage,
                tagCount : response.data.tagCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const delete_tag = (id)=> async(dispatch)=>{
    try {
        const response = await axios.delete(`/api/dashboard/tag/delete/${id}`,{withCredentials:true});
        dispatch({
            type : 'TAG_DELETE_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const edit_tag = (categorySlug)=>async(dispatch)=>{
    try {
        const response = await axios.get(`/api/dashboard/tag/edit/${categorySlug}`,{withCredentials:true});
        dispatch({
            type : 'EDIT_TAG_GET_SUCCESS',
            payload : {
                editTag : response.data.tag
            }
        });
        dispatch({
            type : 'EDIT_REQUEST_SET'
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const update_tag = (id,data)=>async(dispatch)=>{
    try {
        const response = await axios.put(`/api/dashboard/tag/update/${id}`,data,{withCredentials:true});
        dispatch({
            type : 'TAG_UPDATE_SUCCESS',
            payload : {
                successMessage : response.data.message
            }
        })
    } catch (error) {
        console.log("tag update error; ",error.response.data.error)
        dispatch({
            type : 'TAG_UPDATE_FAIL',
            payload : {
                error : error.response.data.error
            }
        })
    }
}

export const tag_count = ()=>async(dispatch)=>{
    try {
        const response  = await axios.get(`/api/dashboard/tag/count`,{withCredentials:true});
        dispatch({
            type : "DASHBORAD_TAG_GET_SUCCESS",
            payload : {
                allTag : [],
                perPage : 0,
                tagCount : response.data.tagCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}