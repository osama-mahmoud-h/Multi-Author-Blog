const initState = {
    authenticate: false,
    userInfo: '',
    errorMessage: '',
    successMessage: '',
    loader: true
}

export const userAuthReducer = (state = initState, action) => {
    const { payload, type } = action;

    if (type === 'LOADER_RUN') {
        return {
            ...state,
            loader: true
        }
    }
    if(type === 'USER_LOGIN_SUCCESS'){
        return {
            ...state,
            loader : false,
            authenticate : true,
            errorMessage : '',
            successMessage : payload.successMessage,
            userInfo:payload.userInfo
        }
    }

    if(type === 'USER_REGISTER_SUCCESS'){
        return {
            ...state,
            loader : false,
            authenticate : true,
            errorMessage : '',
            successMessage : payload.successMessage
        }
    }

    if(type === 'SUCCES_MESSAGE_CLEAR'||type === 'REGISTER_SUCCES_MESSAGE_CLEAR'){
        return {
            ...state,
            successMessage : ''
        }
    }
    if (type === "USER_LOGIN_FAIL"||type === "USER_REGISTER_FAIL") {
        return {
            ...state,
            loader: false,
            errorMessage: payload.error,
            authenticate: false,
            userInfo: '',
            successMessage: '',
        }
    }
    if(type === 'USER_LOGIN_ERROR_CLEAR'||type === 'USER_REGISTER_ERROR_CLEAR'){
        return{
            ...state,
            errorMessage: "",
        }
    }
    if(type==='USER_IS_AUTH'){
        return {
            ...state,
            authenticate:true,
            loader:false,
            userInfo:payload.userInfo
        }
    }
    if(type==='USER_IS_NOT_AUTH'){
        return {
            ...state,
            authenticate:false,
            loader:false
        }
    }
    return state;
}