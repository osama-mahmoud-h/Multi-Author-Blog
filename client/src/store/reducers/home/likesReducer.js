const initState = {
    like: 0,
    dislike: 0,
    like_status: '',
    dislike_status: '',
    like_dislike_error: '',
    like_dislike_message: ''
}
export const likesReducer = (state = initState, action) => {
    const { type, payload } = action;

    if(type === 'READ_ARTICLE_GET_SUCCESS'){
        return {
            ...state,
            like:payload.readArticle.like,
            dislike:payload.readArticle.dislike
        }
    }
    if (type === 'ARTICLE_LIKES_GET_SUCCESS') {
        return {
            ...state,
            like_status: payload.status
        }
    }
    if(type === 'USER_DISLIKE_SUCCESS'){
        return {
            ...state,
            like_dislike_message: payload.message,
            like_status:payload.status,
            like:payload.like,
            dislike:payload.dislike
        }
    }
    if (type === 'USER_LIKE_SUCCESS' ) {
        return {
            ...state,
            like_dislike_message: payload.message,
            like_status:payload.status,
            like:payload.like,
            dislike:payload.dislike
        }
    }
    if (type === 'USER_LIKE_DISLIKE_MESSAGE_CLEAR') {
        return {
            ...state,
            like_dislike_message: ''
        }
    }
    return state;
}