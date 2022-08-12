import axios from "axios";

export const users_count = ()=>async(dispatch)=>{
    try {
        const response  = await axios.get(`/api/dashboard/users/count`,{withCredentials:true});
        dispatch({
            type : "DASHBORAD_USERS_GET_COUNT_SUCCESS",
            payload : {
                usersCount : response.data.usersCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

export const visitors_count = ()=>async(dispatch)=>{
    try {
        const response  = await axios.get(`/api/dashboard/users/visitor/count`,{withCredentials:true});
        dispatch({
            type : "DASHBORAD_VISITORS_GET_COUNT_SUCCESS",
            payload : {
                visitorsCount : response.data.visitorsCount
            }
        })
    } catch (error) {
        console.log(error.response)
    }
}

