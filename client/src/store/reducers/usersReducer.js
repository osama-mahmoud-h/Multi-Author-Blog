const categoryState = {
    loader : false,
    usersError : '',
    usersSuccessMessage : '',
    users : [],
    visitors:[],
    perPage : 0,
    visitorsCount:0,
    usersCount : 0,
}

export const usersReducer = (state=categoryState,action)=>{
    const {type,payload} = action;

    if(type === 'SET_LOADER'){
        return {
            ...state,
            loader : true
        }
    }
  
    if(type === 'DASHBORAD_USERS_GET_SUCCESS'){
        return {
            ...state,
            users : payload.users,
            usersCount : payload.usersCount,
            perPage : payload.perPage
        }
    }

    if(type === 'DASHBORAD_VISITORS_GET_COUNT_SUCCESS'){
        return {
            ...state,
            visitorsCount : payload.visitorsCount
        }
    }
  
    if(type === 'DASHBORAD_USERS_GET_COUNT_SUCCESS'){
        return {
            ...state,
            usersCount : payload.usersCount,
        }
    }
   
    return state;
}