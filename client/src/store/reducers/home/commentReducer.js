const initState = {
    comments: [],
    isCommentAuthor:false,
    successMessage:'',
    errorMessage:'',

}
export const commentReducer = (state = initState, action) => {
    const { type, payload } = action;
    if (type === 'USER_COMMENT_SUCCESS') {
        return {
            ...state,
            successMessage:payload.successMessage
           
        }
    }

    if(type==='COMMENTS_GET_SUCCESS'){
        return {
            ...state,
         comments:payload.comments  
        }
    }

    if (type === 'USER_COMMENT_DELETE_SUCCESS') {
        return {
            ...state,
            successMessage:payload.successMessage
           
        }
    }
    if (type === 'USER_COMMENT_DELETE_ERROR') {
        return {
            ...state,
            errorMessage:payload.error
           
        }
    }

    if (type === 'USER_COMMENT_CLEAR_SUCCESS_MESSAGE') {
        return {
            ...state,
           sucessMessage:''
        }
    }
    if (type === 'USER_COMMENT_CLEAR_ERROR_MESSAGE') {
        return {
            ...state,
           errorMessage:''
        }
    }
    
    return state;
}