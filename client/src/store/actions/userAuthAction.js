import axios from "axios"
const ENDPOINT = '/api/user/auth/';
export const googleLogin = (resp)=> async(dispach)=>{
    try {
       console.log("gooogle login action")
        const response = await axios.post(`${ENDPOINT}google-login`,{tokenId:resp.tokenId},{withCredentials:true});
        dispach({
            type:'USER_LOGIN_SUCCESS',
            payload:{
                successMessage:response.data.message,
                userInfo:response.data.user
            }
        });
       
    } catch (err) {
        console.log("google auth login err: ",err);
    }
}

export const user_login = (data) => async (dispatch) => {
    dispatch({ type: 'LOADER_RUN' })
    try {
        const response = await axios.post(ENDPOINT+'login', data, { withCredentials: true });
        console.log("response is auth user: ",response.data)
        //just for test
       localStorage.setItem('userInfo',JSON.stringify(response.data.user));
        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: {
                successMessage:response.data.message,
                userInfo:response.data.user
            }
        })
    } catch (err) {
       console.log("error:" ,err.response.data.error)
        dispatch({
            type: "USER_LOGIN_FAIL",
            payload: {
                error:err.response.data.error
            }
        })
    }
}

export const user_register = (data) => async (dispatch) => {
    dispatch({ type: 'LOADER_RUN' })
    try {
        const response = await axios.post(ENDPOINT+'register', data, { withCredentials: true });
      //  console.log("response register: ",response.data)
        
        dispatch({
            type: "USER_REGISTER_SUCCESS",
            payload: {
                successMessage:response.data.message,
                userInfo:response.data.user
            }
        })
    } catch (err) {
        //console.log("error:" ,JSON.parse(err.response.data.error).image)
        dispatch({
            type: "USER_REGISTER_FAIL",
            payload:{
                error:JSON.parse(err.response.data.error)}
        })
    }
}

export const is_user_auth = ()=>async(dispatch)=>{
    try {
        const response = await axios.get(ENDPOINT+'is-user-auth', { withCredentials: true });
      //  console.log("response register: ",response.data)
        
        dispatch({
            type: "USER_IS_AUTH",
            payload: {
                successMessage:response.data.message,
                userInfo:response.data.user
            }
        })
    } catch (err) {
        //console.log("error:" ,JSON.parse(err.response.data.error).image)
        dispatch({
            type: "USER_IS_NOT_AUTH",
            payload:{
                error:(err.response.data.error)
            }
        })
    }
}
